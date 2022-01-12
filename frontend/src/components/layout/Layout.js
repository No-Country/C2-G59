import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer/Footer';
import NavBar from './Header/NavBar';

const Layout = () => {
  return (
    <div className="d-flex">
      {/* <!-- Sidebar --> */}
      <Sidebar className="sidebar" />
      <div className="p-0 d-flex flex-column wrapper">
        {/* <!-- Header --> */}
        <NavBar />
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
