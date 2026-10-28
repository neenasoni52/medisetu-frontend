import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patientService } from '../../services/patientService';

// Async Thunk: Lookup patient by token, phone, or ABHA (POST /patients/lookup)
export const lookupPatient = createAsyncThunk(
  'patient/lookupPatient',
  async (identifier, { rejectWithValue }) => {
    try {
      const response = await patientService.lookupPatient(identifier);
      return response; // { patientId, firstName, age, gender }
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        status: err.status,
        details: err.details,
      });
    }
  }
);

// Async Thunk: Register new walk-in or desk patient (POST /patients)
export const registerPatient = createAsyncThunk(
  'patient/registerPatient',
  async (patientData, { rejectWithValue }) => {
    try {
      const response = await patientService.createPatient(patientData);
      return response; // PatientResponse with id, tokenNumber, isTemporary, etc.
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        status: err.status,
        details: err.details, // Map of field errors if 400 BAD_REQUEST
      });
    }
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    activePatient: null, // Holds the currently identified/registered patient
    loading: false,
    lookupError: null,
    registrationErrors: null, // Key-value map of { fieldName: message }
    generalError: null,
  },
  reducers: {
    setActivePatient: (state, action) => {
      state.activePatient = action.payload;
    },
    clearPatient: (state) => {
      state.activePatient = null;
      state.lookupError = null;
      state.registrationErrors = null;
      state.generalError = null;
    },
    clearErrors: (state) => {
      state.lookupError = null;
      state.registrationErrors = null;
      state.generalError = null;
    },
  },
  extraReducers: (builder) => {
    // Lookup Patient
    builder
      .addCase(lookupPatient.pending, (state) => {
        state.loading = true;
        state.lookupError = null;
        state.generalError = null;
      })
      .addCase(lookupPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.activePatient = {
          patientId: action.payload.patientId,
          firstName: action.payload.firstName,
          age: action.payload.age,
          gender: action.payload.gender,
        };
      })
      .addCase(lookupPatient.rejected, (state, action) => {
        state.loading = false;
        state.lookupError = action.payload?.message || 'Patient not found with this identifier';
      });

    // Register Patient
    builder
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.registrationErrors = null;
        state.generalError = null;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.activePatient = {
          patientId: action.payload.id,
          firstName: action.payload.fullName,
          tokenNumber: action.payload.tokenNumber,
          isTemporary: action.payload.isTemporary,
          age: action.payload.age,
          gender: action.payload.gender,
          phoneNumber: action.payload.phoneNumber,
          abhaNumber: action.payload.abhaNumber,
        };
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.details) {
          state.registrationErrors = action.payload.details; // 400 validation map
        } else {
          state.generalError = action.payload?.message || 'Registration failed';
        }
      });
  },
});

export const { setActivePatient, clearPatient, clearErrors } = patientSlice.actions;
export default patientSlice.reducer;
