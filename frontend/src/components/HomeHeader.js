import { useContext } from "react";
import { Container, ListGroup, Navbar, Offcanvas } from "react-bootstrap";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteUser from "./DeleteUser";
import UpdateProfil from "./UpdateProfil";
import logo from "../assets/images/logo.svg";
import Logout from "./Logout";
import UpdateIdentifiers from "./UpdateIdentifiers";

function HomeHeader() {
  const { authenticatedUser } = useContext(AuthenticatedUserContext);

  return (
    <Navbar bg="dark" expand="false" className="mb-3" fixed="top">
      <Container fluid className="header-nav-container">
        <Navbar.Brand>
          <div className="d-flex">
            <img className="logo-header mx-2" src={logo} alt="Groupomania" />
            <h1 className="page-heading">Groupomania</h1>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          className="text-light p-0"
          aria-controls="offcanvasNavbar"
        >
          {authenticatedUser.avatarUrl ? (
            <img
              src={authenticatedUser.avatarUrl}
              alt="avatar"
              className="avatar rounded"
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              className="defaultavatar rounded"
            />
          )}
        </Navbar.Toggle>
        <Navbar.Offcanvas
          className="bg-dark text-light"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-light">
                <UpdateProfil />
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                <UpdateIdentifiers />
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                <Logout />
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                <DeleteUser />
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default HomeHeader;
