import api from './api';

export const patientService = {
  // POST /medisetu/api/v1/patients
  createPatient: (patientData) => {
    return api.post('/patients', patientData);
  },

  // POST /medisetu/api/v1/patients/lookup
  lookupPatient: (identifier) => {
    return api.post('/patients/lookup', { identifier: String(identifier).trim() });
  },

  // GET /medisetu/api/v1/patients?onlyPermanent=true|false
  // onlyPermanent = false (Registration Desk: sees all records)
  // onlyPermanent = true  (Doctor Cabin: sees only permanent records)
  getAllPatients: (onlyPermanent = false) => {
    return api.get(`/patients${onlyPermanent ? '?onlyPermanent=true' : ''}`);
  },
};
