import {
  Account,
  AddProduct,
  AddPurchase,
  AddSale,
  AddSupplier,
  AddUser,
  Analytics,
  Branches,
  Categories,
  ChangePass,
  Dashboard,
  Help,
  Login,
  Products,
  PurchaseDetails,
  Purchases,
  SaleDetails,
  Sales,
  Suppliers,
  Users,
} from '../pages';

const privateRoutesList = [
  { path: '/', element: <Dashboard /> },
  { path: '/analytics', element: <Analytics /> },
  { path: '/products', element: <Products /> },
  { path: '/products/add', element: <AddProduct /> },
  { path: '/categories', element: <Categories /> },
  // { path: '/products/:id', element: <EditProduct /> }, // para mostrar mas datos de cada producto
  { path: '/users', element: <Users /> },
  { path: '/users/add', element: <AddUser /> },
  // { path: '/users/:id', element: <EditUser /> },
  { path: '/sales', element: <Sales /> },
  { path: '/branches', element: <Branches /> },
  { path: '/purchases', element: <Purchases /> },
  { path: '/purchases/:id', element: <PurchaseDetails /> },
  { path: '/purchases/add', element: <AddPurchase /> },
  { path: '/sales', element: <Sales /> },
  { path: '/sales/:id', element: <SaleDetails /> },
  { path: '/sales/add', element: <AddSale /> },
  { path: '/suppliers', element: <Suppliers /> },
  { path: '/suppliers/add', element: <AddSupplier /> },
  { path: '/account', element: <Account /> },
  { path: '/account/change-pass', element: <ChangePass /> },
  { path: '/help', element: <Help /> },
];

const publicRoutesList = [{ path: '/login', element: <Login /> }];

export { privateRoutesList, publicRoutesList };
