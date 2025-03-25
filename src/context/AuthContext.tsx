import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<string | null>(null);

// ojo: aquí se puede cambiar de "empleado" a "tfs" o "manager" para poder accesar sus respectivas páginas
const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value = "empleado">
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context should be utilized within a correct provider");
  }
  return context;
};

export { AuthProvider, useAuth };

