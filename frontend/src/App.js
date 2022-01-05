import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import { Home, NotFound } from './pages';
import './App.css';
import PrimarySearchAppBar from './components/layout/Header/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Header />
        <PrimarySearchAppBar />
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
