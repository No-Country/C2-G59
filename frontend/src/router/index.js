import {
  Account,
  AddProduct,
  AddUser,
  Analytics,
  Branches,
  AddBranches,
  ChangePass,
  Dashboard,
  Login,
  Products,
  PurchaseDetails,
  Purchases,
  AddPurchases,
  Category,
  Sales,
  AddSale,
  SuppliersPage,
  Users,
} from '../pages';

const privateRoutesList = [
  { path: '/', element: <Dashboard /> },
  { path: '/analytics', element: <Analytics /> },
  { path: '/products', element: <Products /> },
  { path: '/products/add', element: <AddProduct /> },
  { path: '/products/categories', element: <Category /> },
  // { path: '/products/:id', element: <EditProduct /> },
  { path: '/users', element: <Users /> },
  { path: '/users/add', element: <AddUser /> },
  { path: '/sales', element: <Sales /> },
  { path: '/sales/add', element: <AddSale /> },
  { path: '/purchases', element: <Purchases /> },
  { path: '/purchases/add', element: <AddPurchases /> },
  { path: '/branches', element: <Branches /> },
  { path: '/branches/add', element: <AddBranches /> },
  { path: '/suppliers', element: <SuppliersPage /> },
  { path: '/purchases/:id', element: <PurchaseDetails /> },
  { path: '/sales', element: <Sales /> },
  { path: '/account', element: <Account /> },
  { path: '/account/change-pass', element: <ChangePass /> },
];

const publicRoutesList = [{ path: '/login', element: <Login /> }];

export { privateRoutesList, publicRoutesList };
