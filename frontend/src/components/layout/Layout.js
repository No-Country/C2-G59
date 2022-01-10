import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <div className="d-flex">
      {/* <!-- Sidebar --> */}
      <Sidebar className="sidebar" />
      <div className="p-0 d-flex flex-column wrapper">
        {/* <!-- Header --> */}
        <Header />
        <div className="px-4 mt-4 content">
          {/* <!-- Content Page --> */}
          <Outlet />
        </div>
        {/* <!-- Footer --> */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
