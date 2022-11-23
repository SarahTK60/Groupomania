import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import axios from "axios";
import { Button } from "react-bootstrap";

function UpdateIdentifiers() {
  const { authenticatedUser, setAuthenticatedUser } = useContext(
    AuthenticatedUserContext
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState(authenticatedUser.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [passwordFlag, setPasswordFlag] = useState({
    length: false,
    min: false,
    maj: false,
    num: false,
  });

  const [passwordFocus, setPasswordFocus] = useState(false);

  const refEmail = useRef();
  const refPassword = useRef();
  const refPasswordConfirmation = useRef();

  const refPasswordInfos = useRef();

  const refEmailError = useRef();
  const refPasswordError = useRef();
  const refPasswordConfirmationError = useRef();
  const refSubmitError = useRef();

  const checkEmail = (email) => {
    if (email.trim() === "") {
      setEmail(authenticatedUser.email);
      return true;
    } else {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check = regex.test(String(email).toLowerCase());
      refEmailError.current.innerText = `${
        check ? "" : "Format d'email invalide"
      }`;
      if (check) {
        refEmailError.current.innerText = "";
        return true;
      } else return false;
    }
  };

  const checkPassword = (password) => {
    setPasswordFocus(true);
    if (password.trim() === "") {
      return true;
    } else {
      var flags = {
        length: false,
        min: false,
        maj: false,
        num: false,
      };

      if (password.length >= 8) {
        flags.length = true;
      }
      if (password.match(/[a-z]/, "g")) {
        flags.min = true;
      }
      if (password.match(/[A-Z]/, "g")) {
        flags.maj = true;
      }
      if (password.match(/[0-9]/, "g")) {
        flags.num = true;
      }
      setPasswordFlag((prev) => ({ ...prev, ...flags }));
    }
  };

  const checkSamePassword = (passwordConfirmation) => {
    if (refPasswordConfirmation.current.value === refPassword.current.value) {
      refPasswordConfirmationError.current.innerHTML = "";
      return true;
    } else if (passwordConfirmation.trim() === "" && !password.trim() === "") {
      refPasswordConfirmationError.current.innerHTML =
        "Complétez ce champ avec votre mot de passe";
      return false;
    } else {
      refPasswordConfirmationError.current.innerHTML =
        "Les mots de passe ne sont pas identiques";
      return false;
    }
  };

  const checkValidForm = () => {
    const { length, min, maj, num } = passwordFlag;
    if (email && password) {
      if (
        checkEmail(email) &&
        length &&
        min &&
        maj &&
        num &&
        checkSamePassword(passwordConfirmation)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (checkEmail) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleUpdateIdentifiers = (e) => {
    e.preventDefault();
    if (checkValidForm()) {
      axios({
        method: "put",
        url:
          process.env.REACT_APP_BASE_URL +
          "api/user/identifiers/" +
          authenticatedUser._id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          const updatedUser = {
            _id: authenticatedUser._id,
            firstname: authenticatedUser.firstname,
            lastname: authenticatedUser.lastname,
            avatarUrl: authenticatedUser.avatarUrl,
            email: email,
          };
          setAuthenticatedUser(updatedUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setShow(false);
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Modification des identifiants
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifiez vos Identifiants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateIdentifiers}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputEmail">Votre adresse email</Form.Label>
              <Form.Control
                id="inputEmail"
                type="email"
                name="email"
                aria-describedby="emailHelpBlock"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => checkEmail(e.target.value)}
                value={email}
                ref={refEmail}
              />
              <Form.Text
                className="text-primary"
                id="emailHelpBlock"
                ref={refEmailError}
              ></Form.Text>
            </Form.Group>
            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPassword">
                Votre nouveau mot de passe
              </Form.Label>
              <Form.Control
                id="inputPassword"
                type="password"
                name="password"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPassword(e.target.value);
                }}
                onBlur={(e) => {
                  checkPassword(e.target.value);
                  checkSamePassword(passwordConfirmation);
                }}
                value={password}
                ref={refPassword}
              />
              <Form.Text
                className="text-primary"
                id="passwordHelpBlock"
                ref={refPasswordError}
              ></Form.Text>
              {/* Password format helpers */}
              {passwordFocus ? (
                <ul
                  className="list-group list-group-flush password infos"
                  ref={refPasswordInfos}
                >
                  <li className="list-group-item length">
                    {passwordFlag.length ? (
                      <FontAwesomeIcon
                        className="text-success pe-2"
                        icon="fa-solid fa-check"
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="text-primary pe-2"
                        icon="fa-solid fa-xmark"
                      />
                    )}{" "}
                    8 caractères
                  </li>
                  <li className="list-group-item maj">
                    {passwordFlag.maj ? (
                      <FontAwesomeIcon
                        className="text-success pe-2"
                        icon="fa-solid fa-check"
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="text-primary pe-2"
                        icon="fa-solid fa-xmark"
                      />
                    )}{" "}
                    Une majuscule
                  </li>
                  <li className="list-group-item min">
                    {passwordFlag.min ? (
                      <FontAwesomeIcon
                        className="text-success pe-2"
                        icon="fa-solid fa-check"
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="text-primary pe-2"
                        icon="fa-solid fa-xmark"
                      />
                    )}{" "}
                    Une minuscule
                  </li>
                  <li className="list-group-item num">
                    {passwordFlag.num ? (
                      <FontAwesomeIcon
                        className="text-success pe-2"
                        icon="fa-solid fa-check"
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="text-primary pe-2"
                        icon="fa-solid fa-xmark"
                      />
                    )}{" "}
                    Un nombre
                  </li>
                </ul>
              ) : null}
            </Form.Group>

            {/* Password confirmation */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputConfirmPassword">
                Confirmez votre nouveau mot de passe
              </Form.Label>
              <Form.Control
                id="inputConfirmPassword"
                type="password"
                name="confirmPassword"
                aria-describedby="passwordConfirmationHelpBlock"
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  checkSamePassword(e.target.value);
                }}
                onBlur={(e) => checkSamePassword(e.target.value)}
                value={passwordConfirmation}
                ref={refPasswordConfirmation}
              />
              <Form.Text
                className="text-primary"
                id="passwordConfirmationHelpBlock"
                ref={refPasswordConfirmationError}
              ></Form.Text>
            </Form.Group>

            {/* Submit error */}
            <div className="text-primary" ref={refSubmitError}></div>
            <div className="text-center">
              <Button
                variant="dark"
                type="submit"
                onClick={(e) => {
                  checkEmail(email);
                  checkPassword(password);
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

export default UpdateIdentifiers;
