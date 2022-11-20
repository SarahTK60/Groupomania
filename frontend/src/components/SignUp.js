import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";

function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [passwordFlag, setPasswordFlag] = useState({
    length: false,
    min: false,
    maj: false,
    num: false,
  });

  const [passwordFocus, setPasswordFocus] = useState(false);

  const refFirstname = useRef();
  const refLastname = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refPasswordConfirmation = useRef();

  const refPasswordInfos = useRef();

  const refFirstnameError = useRef();
  const refLastnameError = useRef();
  const refEmailError = useRef();
  const refPasswordError = useRef();
  const refPasswordConfirmationError = useRef();
  const refSubmitError = useRef();

  // Input Checker

  const checkFirstname = (firstname) => {
    if (firstname.trim() === "") {
      refFirstnameError.current.innerText = "Complétez ce champ avec votre prénom";
      return false;
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
      refLastnameError.current.innerText = "Complétez ce champ avec votre nom";
      return false;
    } else if (lastname.trim().length < 2 || lastname.trim().length > 30) {
      refLastnameError.current.innerText =
        "Votre nom doit faire entre 2 et 30 caractères";
      return false;
    } else {
      refLastnameError.current.innerText = "";
      return true;
    }
  };

  const checkEmail = (email) => {
    if (email.trim() === "") {
      refEmailError.current.innerText = "Complétez ce champ avec votre adresse email";
      return false;
    } else {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check = regex.test(String(email).toLowerCase());
      refEmailError.current.innerText = `${check ? "" : "Email incorrect"}`;
      if (check) return true;
      else return false;
    }
  };

  const checkPassword = (password) => {
    setPasswordFocus(true);
    if (password.trim() === "") {
      refPasswordError.current.innerText = "Complétez ce champ avec votre mot de passe";
      return false;
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
    } else if (passwordConfirmation.trim() === "") {
      refPasswordConfirmationError.current.innerHTML = "Complétez ce champ avec votre mot de passe";
      return false;
    } else {
      refPasswordConfirmationError.current.innerHTML =
        "Les mots de passe ne sont pas identiques";
      return false;
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { length, min, maj, num } = passwordFlag;
    if (
      checkFirstname(refFirstname.current.value) &&
      checkLastname(refLastname.current.value) &&
      checkEmail(refEmail.current.value) &&
      length &&
      min &&
      maj &&
      num &&
      checkSamePassword()
    ) {
      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "api/auth/signup/",
        data: {
          firstname,
          lastname,
          email,
          password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          window.location = "/";
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 401) {
            console.log(err.response.data.message);
            refEmailError.current.innerText = err.response.data.message;
          }
        });
    } else {
      refSubmitError.current.innerText = "Erreur: Vérifiez les informations saisies dans le formulaire !";
      console.log("Erreur: Vérifiez les informations saisies dans le formulaire !");
    }
  };

  return (
    <Form onSubmit={handleSignup} className="align-items-center">
      {/* Firstname */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="inputFirstname">Votre prénom</Form.Label>
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
        <Form.Label htmlFor="inputLastname">Votre Nom</Form.Label>
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
        <Form.Label htmlFor="inputPassword">Votre mot de passe</Form.Label>
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
          Confirmez votre mot de passe
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
            checkFirstname(firstname);
            checkLastname(lastname);
            checkEmail(email);
            checkPassword(password);
          }}>
          S'inscrire
        </Button>
      </div>
    </Form>
  );
}

export default SignUp;
