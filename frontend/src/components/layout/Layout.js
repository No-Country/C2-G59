import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [show, setShow] = useState(false);
  const handleSidebar = () => setShow(!show);
  const sidebarOn = show ? 'd-flex sidebar-on' : 'd-flex';

  return (
    <div className={sidebarOn}>
      {/* <!-- Sidebar --> */}
      <Sidebar />
      <div className="p-0 d-flex flex-column wrapper">
        {/* <!-- Header --> */}
        <Header handleSidebar={handleSidebar} />
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
