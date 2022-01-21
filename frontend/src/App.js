import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';
import DashboardRoutes from './router/DashboardRoutes';
import { Login } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
