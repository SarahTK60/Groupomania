import React from "react";
import logo from "../assets/images/logoGroupomania.png";

function NotFound() {
  return (
    <>
      <div className="text-center pagenotfound">
        <img src={logo} alt="Groupomania" className="img-fluid" />
        <div className="text-center huge">404</div>
        <div className="text-center big">Page non trouvée !!!</div>
        <button
          className="btn btn-dark mt-3 text-center"
          onClick={() => (window.location = "/")}
        >
          Retour à l'accueil
        </button>
      </div>
    </>
  );
}

export default NotFound;
