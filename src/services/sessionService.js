import api from './api';

export const sessionService = {
  // POST /medisetu/api/v1/sessions/start
  startSession: (patientId, language) => {
    return api.post('/sessions/start', {
      patientId: Number(patientId),
      language: String(language).trim().toLowerCase(),
    });
  },

  // GET /medisetu/api/v1/sessions/{sessionId}
  getSession: (sessionId) => {
    return api.get(`/sessions/${sessionId}`);
  },
};
