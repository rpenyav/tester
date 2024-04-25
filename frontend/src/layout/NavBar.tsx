import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const NavBar: React.FC = () => {
  const history = useNavigate();
  const userData = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");

    history("/login");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "transparent" }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <NavDropdown
              title={userData?.name!}
              id="basic-nav-dropdown"
              className="custom-dropdown-menu"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item as="button">
                <button className="button-as-link" onClick={handleLogout}>
                  Logout
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
