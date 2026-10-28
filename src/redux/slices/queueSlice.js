import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patientService } from '../../services/patientService';

// Async Thunk: Fetch live patient records from MySQL via Spring Boot
export const fetchQueue = createAsyncThunk(
  'queue/fetchQueue',
  async (onlyPermanent = false, { rejectWithValue }) => {
    try {
      const response = await patientService.getAllPatients(onlyPermanent);
      return response; // Array of real PatientResponse from DB
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch patients queue');
    }
  }
);

const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    patientsQueue: [], // 100% REAL DATA from database, NO mock/seed data
    activeConsultation: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveConsultation: (state, action) => {
      state.activeConsultation = action.payload;
    },
    clearQueue: (state) => {
      state.patientsQueue = [];
      state.activeConsultation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.patientsQueue = action.payload;
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveConsultation, clearQueue } = queueSlice.actions;
export default queueSlice.reducer;
