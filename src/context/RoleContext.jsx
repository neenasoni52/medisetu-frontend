import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // Roles: 'kiosk' (Touch Kiosk), 'desk' (Registration Desk), 'doctor' (Doctor OPD)
  const [activeRole, setActiveRole] = useState('kiosk');

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
