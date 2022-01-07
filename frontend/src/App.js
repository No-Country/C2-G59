import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import { Home, NotFound } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Header />
        <div>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
