import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  FormControl,
  Figure,
  Dropdown,
} from 'react-bootstrap';

export default function NavBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* <FormControl
            type="search"
            placeholder="Search"
            className="me-3 w-50"
            aria-label="Search"
          /> */}
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

          {/* <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse> */}

          {/* <Figure className="navBar-profile">
            <Figure.Image width={171} height={180} alt="171x180" src="holder.js/171x180" />
            <Figure.Caption>Nulla vitae elit libero</Figure.Caption>
          </Figure> */}

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
                {/* <p className="mb-0 d-none d-sm-block navbar-profile-name justify-content-center">
                  <h6>Samantha Smith</h6>
                </p> */}
                {/* <i className="mdi mdi-menu-down d-none d-sm-block"></i> */}
          
              </div>
          
        </Container>
      </Navbar>
    </div>
  );
}
