import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import { Home, NotFound } from './pages';
import './App.css';
import NavBar from './components/layout/Header/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <div className="App">
        <Header />
        <div>
          <Routes>
            <Route path="/Login" index element={<Login />} />   
            <Route path="/" index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

