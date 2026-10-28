import api from './api';

export const interviewService = {
  // GET /medisetu/api/v1/sessions/{sessionId}/interview/next
  getNextQuestion: (sessionId) => {
    return api.get(`/sessions/${sessionId}/interview/next`);
  },

  // POST /medisetu/api/v1/sessions/{sessionId}/interview/answer
  submitAnswer: (sessionId, answerData) => {
    return api.post(`/sessions/${sessionId}/interview/answer`, answerData);
  },

  // GET /medisetu/api/v1/sessions/{sessionId}/interview/review
  getInterviewReview: (sessionId) => {
    return api.get(`/sessions/${sessionId}/interview/review`);
  },

  // POST /medisetu/api/v1/sessions/{sessionId}/interview/acknowledge-redflag
  acknowledgeRedFlag: (sessionId) => {
    return api.post(`/sessions/${sessionId}/interview/acknowledge-redflag`);
  },
};

export default interviewService;
