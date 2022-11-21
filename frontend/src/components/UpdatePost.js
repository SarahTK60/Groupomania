import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function UpdatePost(props) {
  const { authenticatedUser } = useContext(AuthenticatedUserContext);
  const isAdmin = authenticatedUser.role;
  const postId = props.postId;
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [textContent, setTextContent] = useState(props.textContent);
  const [imageUrl, setImageUrl] = useState(props.imageContentUrl);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdatePost = (e) => {
    e.preventDefault();
    if (isAdmin === 1) {
      props.handleAdminUpdatePost(postId, textContent, file, imageUrl);
    } else {
      props.handleUpdatePost(postId, textContent, file, imageUrl);
    }
    setShow(false);
  };

  const updateImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      if (imageUrl) setImageUrl(imageUrl);
    }
  };

  const updatePostTooltip = (props) => (
    <Tooltip id="button-addImage-tooltip" {...props}>
      Modifier la publication
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={updatePostTooltip}
      >
        <Button variant="light" className="text-dark" onClick={handleShow}>
          <FontAwesomeIcon icon="pen-to-square" />
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier votre publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            action="post"
            onSubmit={handleUpdatePost}
            id="post-form"
            className="align-items-center p-4"
          >
            <div className="mb-3">
              <input
                type="text"
                name="textContent"
                className="form-control"
                id="textContent"
                onChange={(e) => setTextContent(e.target.value)}
                value={textContent}
              />
              {/* <p className='content error'></p> */}

              <label className="label-file" htmlFor="imagefile">
                <FontAwesomeIcon icon="fa-solid fa-image" />
              </label>
              <input
                className="input-file"
                type="file"
                id="imagefile"
                accept=".png,.jpg,.jpeg,.gif"
                onChange={updateImage}
              />

              {file ? (
                <div>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="nouveau post"
                    className="image-post"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setFile("")}
                  >
                    <FontAwesomeIcon icon="fa-rectangle-xmark" />
                  </button>
                </div>
              ) : imageUrl ? (
                <div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setFile("");
                      setImageUrl("");
                    }}
                  >
                    <FontAwesomeIcon icon="fa-rectangle-xmark" />
                  </button>
                  <img
                    src={imageUrl}
                    alt="nouveau post"
                    className="image-post"
                  />
                </div>
              ) : null}
            </div>
            <div className="d-inline mx-1">
              <Button variant="outline-dark" onClick={handleClose}>
                Annuler
              </Button>
            </div>
            <div className="d-inline mx-1">
              <button type="submit" className="btn btn-dark">
                Envoyer
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePost;
