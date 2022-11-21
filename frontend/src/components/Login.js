import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/loginpagestyle.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const refEmail = useRef();
  const refPassword = useRef();

  const refEmailError = useRef();
  const refPasswordError = useRef();
  const refLoginError = useRef();

  const checkEmail = (email) => {
    if (email.trim() === "") {
      refEmailError.current.innerText = "Complétez ce champ avec votre adresse email";
      return false;
    } else {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check = regex.test(String(email).toLowerCase());
      refEmailError.current.innerText = `${check ? "" : "Format d'adresse email incorrect"}`;
      if (check) return true;
      else return false;
    }
  };

  const checkPassword = (password) => {
    if (password.trim() === "") {
      refPasswordError.current.innerText = "Complétez ce champ avec votre mot de passe";
      return false;
    } else {
      return true;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      checkEmail(refEmail.current.value) &&
      checkPassword(refPassword.current.value)
    ) {
      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "api/auth/login/",
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          window.location = "/";
        })
        .catch((err) => {
          if (err.response.data.message) {
            refLoginError.current.innerText = err.response.data.message;
          }
          console.log(err.response.data);
        });
    }
  };

  return (
    <Form onSubmit={handleLogin} className="align-items-center">
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
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => checkPassword(e.target.value)}
          value={password}
          ref={refPassword}
        />
        <Form.Text
          className="text-primary"
          id="passwordHelpBlock"
          ref={refPasswordError}
        ></Form.Text>
      </Form.Group>
      {/* Submit error */}
      <div className="text-primary mb-4" ref={refLoginError}></div>
      <div className="text-center">
        <Button
          variant="dark"
          type="submit"
          onClick={() => {
            checkEmail(email);
            checkPassword(password);
          }}>
          Se connecter
        </Button>
      </div>
    </Form>
  );
}

export default Login;
