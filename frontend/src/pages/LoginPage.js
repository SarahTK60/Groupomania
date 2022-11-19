import React from "react";
import "../styles/loginpagestyle.scss";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useState } from "react";
import logogroupomania from "../assets/images/logo-grey.svg"

function LoginPage() {
  const [hiddenForm, setHiddenForm] = useState("login");

  return (
    <main className="container border border-dark rounded-3 shadow login-page">
      <img
        className="login-logo"
        src={logogroupomania}
        alt="Logo Groupomania"
      />
      <div className="p-5 login-form">
        <div>{hiddenForm === "login" ? <Login /> : <SignUp />}</div>
        <div className="mt-5 underlined">
          {hiddenForm === "login" ? (
            <div
              className="clickable text-center"
              onClick={() => setHiddenForm("signup")}
            >
              Pas encore de compte ? Inscrivez-vous
            </div>
          ) : (
            <div
              className="clickable text-center"
              onClick={() => setHiddenForm("login")}
            >
              Déjà Inscrit ? connectez-vous
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
