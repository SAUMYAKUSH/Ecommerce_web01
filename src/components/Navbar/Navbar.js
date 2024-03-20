import React, { useContext } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom/cjs/react-router-dom";
import CartContext from "../../store/Cart-context";
import AuthContext from "../../store/auth-context";

const NavBar = (props) => {
  const cartCxt = useContext(CartContext);
  const authCxt = useContext(AuthContext);

  let isLoggedIn = authCxt.isLoggedIn;

  let cartQuantity = 0;
  cartCxt.items.forEach((item) => {
    return (cartQuantity = cartQuantity + Number(item.quantity));
  });

  return (
    <>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container>
          <Nav className="me-auto">
            {isLoggedIn && (
              <NavLink to="/" className="nav-link" style={{ color: "white" }}>
                Home
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                to="/Store"
                className="nav-link"
                style={{ color: "white" }}
              >
                Store
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                to="/Movie"
                className="nav-link"
                style={{ color: "white" }}
              >
                Movie
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                to="/About"
                className="nav-link"
                style={{ color: "white" }}
              >
                About
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                to="/Contact"
                className="nav-link"
                style={{ color: "white" }}
              >
                Contact US
              </NavLink>
            )}
            {!isLoggedIn && (
              <Link to="/auth" className="nav-link" style={{ color: "white" }}>
                Login
              </Link>
            )}
            {isLoggedIn && (
              <button onClick={() => authCxt.logout()}>Logout</button>
            )}
            {/* <Nav.Link href="/About" style={{color: 'white'}}>About </Nav.Link> this we using in botsrap@6*/}
            {isLoggedIn && (
              <Button
                onClick={props.onShowCart}
                style={{ marginLeft: "800px" }}
                variant="primary"
              >
                Cart{cartQuantity}
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
      <h1
        style={{
          background: "grey",
          color: "white",
          display: "flex",
          justifyContent: "center",
          marginTop: "2px",
        }}
      >
        The Generics
      </h1>
    </>
  );
};

export default NavBar;
