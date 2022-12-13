import { BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages and components
import Home from './views/Home'

// Routes import
import EquipmentMainPage from './views/EquipmentMainPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>


            <Route path="/equipment" element={<EquipmentMainPage/>}/>



          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
