import React from 'react';
import { Navbar, Container, Nav, NavDropdown, FormControl, Figure } from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <FormControl
            type="search"
            placeholder="Search"
            className="me-3 w-50"
            aria-label="Search"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-5">
              <NavDropdown title="English" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Spanish</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Another language</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-1">
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
            </Nav>
          </Navbar.Collapse>
          <Figure className="navBar-profile">
            <Figure.Image width={171} height={180} alt="171x180" src="holder.js/171x180" />
            <Figure.Caption>Nulla vitae elit libero</Figure.Caption>
          </Figure>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
