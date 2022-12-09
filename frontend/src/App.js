import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './views/Home'
import ClientPage from './views/ClientMainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}/>
              <Route path="/clients" element={<ClientPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
