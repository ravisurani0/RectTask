import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentComponent from './Components/DepartmentComponent';
import EmployeeComponent from './Components/EmployeeComponent';
import EmployeeDetailsComponent from './Components/EmployeeDetailsComponent';

function App() {
  return (
    <div className="container">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<EmployeeComponent />} />
          <Route path="/employeedetails" element={<EmployeeDetailsComponent />} >
            <Route path="/employeedetails/:id" element={<EmployeeDetailsComponent />} />
          </Route>
          <Route path="/department" element={<DepartmentComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
