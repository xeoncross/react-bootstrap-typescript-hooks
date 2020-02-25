import React from "react";
// import { Redirect } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown
  // Form,
  // FormControl,
  // Button
} from "react-bootstrap";
import { useUser } from "./Components/UserContext";
import { useToken } from "./Components/TokenContext";
import Link from "./Components/Link";

// const linkStyle = {
//   textDecoration: "underline"
// };

const navBarStyles = {
  backgroundColor: "#fff",
  backgroundImage: "linear-gradient(0deg, #D2D2D2 0%, #97D9E1 100%);",
  boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.3)"
};

const Header: React.FC = () => {
  const { setToken } = useToken();
  const { user, setUser } = useUser();

  return (
    <div>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        sticky="top"
        style={navBarStyles}
      >
        <Container>
          <Navbar.Brand to="/" as={Link}>
            React+Bootstrap+Typescript
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Link to="/loading">Loading</Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="/loading">Loading</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button>Search</Button>
            </Form> */}

            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setToken(false);
                      setUser(false);
                    }}
                  >
                    logout
                  </Nav.Link>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="nav-scroller bg-white shadow-sm">
        <Container>
          <nav className="nav nav-underline">
            {/* <a className="nav-link active" href="#">
              Dashboard
            </a>
            <a className="nav-link" href="#">
              Friends
              <span className="badge badge-pill bg-light align-text-bottom">
                27
              </span>
            </a>
            <a className="nav-link" href="#">
              Explore
            </a>
            <a className="nav-link" href="#">
              Suggestions
            </a> */}
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Header;
