import { Route, Routes } from 'react-router';
import Layout from '../components/layout/Layout';
import {
  Customers,
  Dashboard,
  NewUser,
  NotFound,
  Products,
  Sales,
  Shopping,
  Transactions,
} from '../pages';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Dashboard />} />
        {/* <Route path="user/:id" element={<UserDetails />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="new-user" element={<NewUser />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="sales" element={<Sales />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
