import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown
} from 'react-bootstrap';

export default function NavBar({handleSidebar}) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick = {handleSidebar} />
          <div className='d-flex justify-content-end'><h1 className='text-white'>FINTECH</h1></div>

          <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
            <input type="text" className="form-control" placeholder="Search" />
          </form>
          <Nav className="ml-5">
            <NavDropdown title="English" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Spanish</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Another language</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="mr-1">
            <NavDropdown
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bell-fill text-light "
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Event Today</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Launch admin </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="navbar-profile d-flex">
            <img
              className="img-xs rounded-circle"
              src='https://github.com/mdo.png'
              alt="profile"
              width="40"
              height="40"
            />
            <NavDropdown title="Usuario" id="collasible-nav-dropdown navbar-profile-name">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
