import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/patientSlice';
import sessionReducer from './slices/sessionSlice';
import queueReducer from './slices/queueSlice';
import interviewReducer from './slices/interviewSlice';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    session: sessionReducer,
    queue: queueReducer,
    interview: interviewReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
