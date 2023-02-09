import { createContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState({});

  const addEmployee = (employee) => {
    setEmployee(employee);
  };

  return (
    <EmployeeContext.Provider value={{ employee, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
