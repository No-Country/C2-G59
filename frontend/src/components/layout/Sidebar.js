const Sidebar = ({ ...rest }) => {
  return (
    <aside {...rest}>
      <div className="d-flex flex-column flex-shrink-0 p-3" style={{ minHeight: '100%' }}>
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">Sidebar</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#s" className="nav-link active" aria-current="page">
              {/* icon */}
              Dashboard
            </a>
          </li>
          <li>
            <a href="#s" className="nav-link link-dark">
              {/* icon */}
              Orders
            </a>
          </li>
          <li>
            <a href="#s" className="nav-link link-dark">
              {/* icon */}
              Products
            </a>
          </li>
          <li>
            <a href="#s" className="nav-link link-dark">
              {/* icon */}
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#s"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li>
              <a className="dropdown-item" href="#s">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#s">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#s">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#s">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
