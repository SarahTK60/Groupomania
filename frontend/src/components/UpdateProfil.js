import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import axios from "axios";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function UpdateProfil() {
  const { authenticatedUser, setAuthenticatedUser } = useContext(
    AuthenticatedUserContext
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [avatarUrl, setAvatarUrl] = useState(authenticatedUser.avatarUrl);

  const [file, setFile] = useState(null);

  const [firstname, setFirstname] = useState(authenticatedUser.firstname);
  const [lastname, setLastname] = useState(authenticatedUser.lastname);

  const refAvatar = useRef();
  const refFirstname = useRef();
  const refLastname = useRef();

  const refFirstnameError = useRef();
  const refLastnameError = useRef();
  const refSubmitError = useRef();

  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const deleteAvatarTooltip = (props) => (
    <Tooltip id="button-deleteAvatar-tooltip" {...props}>
      Supprimer l'avatar
    </Tooltip>
  );

  const checkFirstname = (firstname) => {
    if (firstname.trim() === "") {
      setFirstname(authenticatedUser.firstname);
      return true;
    } else if (firstname.trim().length < 2 || firstname.trim().length > 30) {
      refFirstnameError.current.innerText =
        "Votre prénom doit faire entre 2 et 30 caractères";
      return false;
    } else {
      refFirstnameError.current.innerText = "";
      return true;
    }
  };

  const checkLastname = (lastname) => {
    if (lastname.trim() === "") {
      setLastname(authenticatedUser.lastname);
      return true;
    } else if (lastname.trim().length < 2 || lastname.trim().length > 30) {
      refLastnameError.current.innerText =
        "Votre nom doit faire entre 2 et 30 caractères";
      return false;
    } else {
      refLastnameError.current.innerText = "";
      return true;
    }
  };

  const handleUpdateProfil = (e) => {
    e.preventDefault();
    if (firstname || lastname || file || avatarUrl) {
      if (checkFirstname(firstname) && checkLastname(lastname)) {
        const updatedUser = new FormData();
        if (file) {
          updatedUser.append("image", file);
        }
        updatedUser.append("firstname", firstname);
        updatedUser.append("lastname", lastname);
        updatedUser.append("avatarUrl", avatarUrl);
        axios({
          method: "put",
          url:
            process.env.REACT_APP_BASE_URL +
            "api/user/" +
            authenticatedUser._id,
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
          transformRequest: () => updatedUser,
        })
          .then((res) => {
            const response = res.data.userObject;
            const userUpdated = authenticatedUser;
            if (firstname) {
              userUpdated.firstname = firstname;
            }
            if (lastname) {
              userUpdated.lastname = lastname;
            }
            if (response.avatarUrl) {
              userUpdated.avatarUrl = response.avatarUrl;
            } else if (!file && avatarUrl) {
              userUpdated.avatarUrl = avatarUrl;
            } else {
              userUpdated.avatarUrl = "";
            }
            setAuthenticatedUser(userUpdated);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        refSubmitError.current.innerText =
          "Erreur: Vérifiez les informations saisies dans le formulaire !";
      }
    }
    setShow(false);
    window.location = "/";
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Modification du profil
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifiez votre profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProfil}>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-center">
                {file ? (
                  <div className="image-container position-relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="nouveau post"
                      className="image-form"
                    />
                    <div className="position-absolute top-0 start-0">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={deleteAvatarTooltip}
                      >
                        <button className="btn" onClick={() => setFile("")}>
                          <FontAwesomeIcon icon="fa-rectangle-xmark" />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>
                ) : avatarUrl ? (
                  <div className="image-container position-relative">
                    <img
                      src={avatarUrl}
                      alt="nouveau post"
                      className="image-form"
                    />
                    <div className="position-absolute top-0 start-0">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={deleteAvatarTooltip}
                      >
                        <button
                          type="button"
                          className="btn"
                          onClick={() => {
                            setFile("");
                            setAvatarUrl("");
                          }}
                        >
                          <FontAwesomeIcon icon="fa-rectangle-xmark" />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    className="defaultavatar rounded"
                  />
                )}
              </div>
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="avatarFile"
              >
                <div className="text-light bg-dark rounded p-1 clickable mt-2">
                  Télécharger une image
                  <FontAwesomeIcon icon="fa-upload" className="ms-2" />
                </div>
              </Form.Label>
              <Form.Control
                className="d-none"
                type="file"
                id="avatarFile"
                accept=".png,.jpg,.jpeg,.gif"
                ref={refAvatar}
                onChange={changeImage}
              />
            </Form.Group>
            {/* Firstname */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputFirstname">
                Modifiez votre prénom
              </Form.Label>
              <Form.Control
                id="inputFirstname"
                type="text"
                name="firstname"
                aria-describedby="firstnameHelpBlock"
                onChange={(e) => setFirstname(e.target.value)}
                onBlur={(e) => checkFirstname(e.target.value)}
                value={firstname}
                ref={refFirstname}
              />
              <Form.Text
                className="text-primary"
                id="firstnameHelpBlock"
                ref={refFirstnameError}
              ></Form.Text>
            </Form.Group>
            {/* Lastname */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputLastname">
                Modifiez votre Nom
              </Form.Label>
              <Form.Control
                id="inputLastname"
                type="text"
                name="lastname"
                aria-describedby="lastnameHelpBlock"
                onChange={(e) => setLastname(e.target.value)}
                onBlur={(e) => checkLastname(e.target.value)}
                value={lastname}
                ref={refLastname}
              />
              <Form.Text
                className="text-primary"
                id="lastnameHelpBlock"
                ref={refLastnameError}
              ></Form.Text>
            </Form.Group>

            {/* Submit error */}
            <div className="text-primary" ref={refSubmitError}></div>
            <div className="text-center">
              <Button
                variant="dark"
                type="submit"
                onClick={(e) => {
                  checkFirstname(firstname);
                  checkLastname(lastname);
                }}
              >
                Enregistrez les modifications
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateProfil;
