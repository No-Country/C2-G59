import {
  Account,
  AddProduct,
  AddUser,
  Analytics,
  ChangePass,
  Dashboard,
  Login,
  Products,
  PurchaseDetails,
  Purchases,
  Sales,
  Users,
} from '../pages';

const privateRoutesList = [
  { path: '/', element: <Dashboard /> },
  { path: '/analytics', element: <Analytics /> },
  { path: '/products', element: <Products /> },
  { path: '/products/add', element: <AddProduct /> },
  // { path: '/products/:id', element: <EditProduct /> },
  { path: '/users', element: <Users /> },
  { path: '/users/add', element: <AddUser /> },
  { path: '/sales', element: <Sales /> },
  { path: '/purchases', element: <Purchases /> },
  { path: '/purchases/:id', element: <PurchaseDetails /> },
  { path: '/sales', element: <Sales /> },
  { path: '/account', element: <Account /> },
  { path: '/account/change-pass', element: <ChangePass /> },
];

const publicRoutesList = [{ path: '/login', element: <Login /> }];

export { privateRoutesList, publicRoutesList };
