import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScrollToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {backToTopButton && (
        <button
          className="btn btn-dark position-fixed bottom-0 end-0 m-5 shadow"
          onClick={scrollUp}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
