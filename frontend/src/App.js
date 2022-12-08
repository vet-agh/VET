import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import EmployeePage from './views/EmployeeMainPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}/>
              <Route path="/employees" element={<EmployeePage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
