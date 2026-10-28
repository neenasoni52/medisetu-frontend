import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sessionService } from '../../services/sessionService';

// Async Thunk: Start Intake Session (POST /sessions/start)
export const startSession = createAsyncThunk(
  'session/startSession',
  async ({ patientId, language }, { rejectWithValue }) => {
    try {
      const response = await sessionService.startSession(patientId, language);
      return response; // SessionResponse { sessionId, patientId, tokenNumber, isTemporary, maskedName, language, ... }
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        status: err.status,
        details: err.details,
      });
    }
  }
);

// Async Thunk: Get Session by ID (GET /sessions/{id})
export const fetchSession = createAsyncThunk(
  'session/fetchSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await sessionService.getSession(sessionId);
      return response;
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        status: err.status,
      });
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    currentSession: null, // Holds the active session object
    loading: false,
    error: null,
  },
  reducers: {
    resetSession: (state) => {
      state.currentSession = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Start Session
    builder
      .addCase(startSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to start session';
      });

    // Fetch Session
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch session';
      });
  },
});

export const { resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
