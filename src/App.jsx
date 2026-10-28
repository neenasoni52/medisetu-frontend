import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import KioskHome from './pages/kiosk/KioskHome';
import LanguageSelect from './pages/kiosk/LanguageSelect';
import ActiveSession from './pages/kiosk/ActiveSession';
import InterviewScreen from './pages/kiosk/InterviewScreen';
import RegistrationDesk from './pages/desk/RegistrationDesk';
import DoctorQueue from './pages/doctor/DoctorQueue';

export function App() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Default redirect to Kiosk */}
          <Route path="/" element={<Navigate to="/kiosk" replace />} />
          
          {/* Persona 3: Patient Kiosk Flow */}
          <Route path="/kiosk" element={<KioskHome />} />
          <Route path="/kiosk/language" element={<LanguageSelect />} />
          <Route path="/kiosk/session" element={<ActiveSession />} />
          <Route path="/kiosk/interview" element={<InterviewScreen />} />

          {/* Persona 1: OPD Registration Desk */}
          <Route path="/desk" element={<RegistrationDesk />} />

          {/* Persona 2: Doctor OPD Consultation Queue */}
          <Route path="/doctor" element={<DoctorQueue />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/kiosk" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
