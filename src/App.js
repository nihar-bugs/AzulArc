import "./App.css";
import EmployeeList from "./pages/EmployeeList";
import { EmployeeProvider } from "../src/context/EmployeeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<EmployeeList />} />
          <Route path="/addEmp" element={<AddEmployee />} />
          <Route path="/editEmp" element={<EditEmployee />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
