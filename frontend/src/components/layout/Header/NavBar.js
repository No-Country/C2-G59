import React from 'react';
import { Navbar, Container, Nav, NavDropdown, FormControl, Figure } from 'react-bootstrap';

export default function NavBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <FormControl type="search" placeholder="Search" className="me-3 w-50" aria-label="Search" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="English" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Spanish</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Another language</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
            <i class="fas fa-bell"></i>
              {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Figure className = "navBar-profile">
            <Figure.Image width={171} height={180} alt="171x180" src="holder.js/171x180" />
            <Figure.Caption >
              Nulla vitae elit libero
            </Figure.Caption>
          </Figure>
        </Container>
      </Navbar>
    </div>
  );
}

