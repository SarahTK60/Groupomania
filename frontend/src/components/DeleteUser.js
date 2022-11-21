import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import axios from "axios";

function DeleteUser() {
  const { authenticatedUser, setAuthenticatedUser } = useContext(
    AuthenticatedUserContext
  );
  const [show, setShow] = useState(false);

  const handleDeleteUser = (userId) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASE_URL + "api/user/" + userId,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = (e) => {
    e.preventDefault();
    handleDeleteUser(authenticatedUser._id);
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
        Suppression du compte
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression de votre compte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer votre compte ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" className="btn btn-outline-dark" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="dark" onClick={handleConfirm}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
