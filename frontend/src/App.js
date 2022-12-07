import { BrowserRouter, Routes, Route} from 'react-router-dom'

import ClientPage from './views/ClientMainPage'
import EmployeePage from './views/EmployeeMainPage'
import Navbar from './components/Navbar'
import Home from './views/Home'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            
            <Route path="/"element={<Home />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/clinics" element={<ClientPage />} />
            <Route path="/equipments" element={<ClientPage />} />
            <Route path="/patients" element={<ClientPage />} />
            <Route path="/schedules" element={<ClientPage />} />
            <Route path="/employees" element={<EmployeePage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;