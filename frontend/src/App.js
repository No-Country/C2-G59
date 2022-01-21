import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import { Dashboard, NewUser, Transactions, Products, Customers, Login, NotFound } from './pages';
// components
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Dashboard />} />
          {/* <Route path="/user/:id" element={<UserDetails />} /> */}
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/new-user" element={<NewUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
