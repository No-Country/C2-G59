import {
  Dashboard,
  Analytics,
  Account,
  ChangePass,
  Branches,
  AddBranches,
  Products,
  AddProduct,
  Category,
  Purchases,
  AddPurchases,
  PurchaseDetails,
  Sales,
  AddSale,
  SaleDetails,
  Suppliers,
  AddSupplier,
  Users,
  AddUser,
  Help,
  Login,
} from '../pages';

/**
 * Info sobre Permisos/Autorizacion
 * permission: Array
 *
 * Los Roles que coloquemos en el Array no le permitiran el ingreso a esa seccion
 *
 * ej
 * .. permission=['USER_ROLE', 'CEO_ROLE']
 * eso quiere decir que esa ruta no puede ingresar los que tienen USER_ROLE o CEO_ROLE
 *
 * ADMIN_ROLE no se deberia poner en ninguna ruta, porque a ese rol no se le restringira ninguna pagina/pantalla/componente
 *
 * Roles disponibles
 * ['USER_ROLE', 'MANAGER_ROLE', 'CEO_ROLE', 'ADMIN_ROLE']
 *
 */
const privateRoutesList = [
  { path: '/', element: <Dashboard /> },
  { path: '/analytics', element: <Analytics /> },
  { path: '/products', element: <Products /> },
  { path: '/products/add', element: <AddProduct /> },
  { path: '/products/categories', element: <Category /> },
  // { path: '/products/:id', element: <EditProduct /> },
  { path: '/users', element: <Users />, permission: ['CEO_ROLE'] },
  { path: '/users/add', element: <AddUser /> },
  // { path: '/users/:id', element: <EditUser /> },
  { path: '/sales', element: <Sales /> },
  { path: '/sales/add', element: <AddSale /> },
  { path: '/purchases', element: <Purchases /> },
  { path: '/purchases/add', element: <AddPurchases /> },
  { path: '/branches', element: <Branches /> },
  { path: '/branches/add', element: <AddBranches /> },
  { path: '/suppliers', element: <Suppliers />, permission: ['CEO_ROLE'] },
  { path: '/purchases/:id', element: <PurchaseDetails /> },
  { path: '/purchases/add', element: <AddPurchases /> },
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
