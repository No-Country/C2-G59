import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import { Home, NotFound } from './pages';
// components
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />} />
          {/* <Route path="/panel" index element={<Dashboard />} /> */}
          {/* <Route path="/user/:id" index element={<UserDetails />} /> */}
          {/* <Route path="/transactions" index element={<Transactions />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
