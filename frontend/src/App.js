import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './views/Home'
// Routes import
import PatientPage from './views/PatientsMainPage'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
       <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}/>
              <Route path="/patient" element={<PatientPage/>}/>
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
