import { Dropdown, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="d-flex flex-column flex-shrink-0 p-3" style={{ minHeight: '100%' }}>
        {/* <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">Sidebar</span>
        </a>
        <hr /> */}
        <Nav defaultActiveKey="/" variant="pills" className="flex-column mb-auto">
          {/* <Link to="/">
            <Nav.Link href="/home">Active</Nav.Link>
          </Link> */}
          <li className="nav-item">
            <NavLink to="/" className="nav-link link-dark">
              {/* icon */}
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/transactions" className="nav-link link-dark">
              {/* icon */}
              Transactions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-link link-dark">
              {/* icon */}
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/customers" className="nav-link link-dark">
              {/* icon */}
              Suppliers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sales" className="nav-link link-dark disabled">
              {/* icon */}
              Sales
            </NavLink>
          </li>
          <hr />
          <li className="nav-item">
            <NavLink to="/new-user" className="nav-link link-dark">
              {/* icon */}
              New User
            </NavLink>
          </li>
        </Nav>
        {/* <hr />
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic2"
            className="d-flex align-items-center text-white link-dark text-decoration-none w-100"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Usuario</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-small shadow">
            <Dropdown.Item href="#/action-1">New product...</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    </aside>
  );
};

export default Sidebar;
