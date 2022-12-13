import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './views/Home'

// Routes import
import SchedulePage from './views/ScheduleMainPage'
import ClinicPage from './views/ClinicMainPage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* Clients */}
            <Route path="/clinics" element={<ClinicPage/>}/>
            {/* Equipment */}
            {/* Patients */}
            <Route path="/schedule" element={<SchedulePage/>}/>
            {/* Employees */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;