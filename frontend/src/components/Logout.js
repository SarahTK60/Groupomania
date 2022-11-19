import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../assets/fontawesome";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";

function Logout() {
  const { setAuthenticatedUser } = useContext(
    AuthenticatedUserContext
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmLogout = (e) => {
    e.preventDefault();
    if (typeof Storage !== "undefined") {

      if (localStorage.getItem("token") !== null) {
        localStorage.removeItem("token");
      }
    }
    setShow(false);
    setAuthenticatedUser(null);
    window.location = "/";
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Déconnexion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Déconnexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" className="btn btn-outline-dark" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="dark" onClick={handleConfirmLogout}>
            Déconnexion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
