import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Navbar from './components/Navbar'
import Home from './views/Home'
// Routes import
import PatientPage from './views/PatientsMainPage'
import SchedulePage from './views/ScheduleMainPage'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* Clients */}
            {/* Clinics */}
            {/* Equipment */}
            <Route path="/patients" element={<PatientPage/>}/>
            <Route path="/schedule" element={<SchedulePage/>}/>
            {/* Employees */}
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;