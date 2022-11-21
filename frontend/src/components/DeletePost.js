import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../assets/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function DeletePost(props) {
  const { authenticatedUser } = useContext(AuthenticatedUserContext);
  const [show, setShow] = useState(false);
  const postId = props.postId;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletePostTooltip = (props) => (
    <Tooltip id="button-deletePost-tooltip" {...props}>
      Supprimer la publication
    </Tooltip>
  );

  const handleConfirm = (e) => {
    e.preventDefault();
    if (authenticatedUser.role === 1) {
      props.handleAdminDeletePost(postId);
    } else {
      props.handleDeletePost(postId);
    }
    setShow(false);
  };
  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={deletePostTooltip}
      >
        <Button variant="light" className="text-dark" onClick={handleShow}>
          <FontAwesomeIcon icon="trash" />
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression de la publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer la publication ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
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

export default DeletePost;
