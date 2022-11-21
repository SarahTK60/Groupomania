import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/index.scss";
import "./styles/custom.scss";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { useState, useEffect, useMemo } from "react";
import AuthenticatedUserContext from "./context/AuthenticatedUserContext";
import axios from "axios";
import NotFound from "./pages/NotFound";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const providerAuthenticatedUser = useMemo(
    () => ({ authenticatedUser, setAuthenticatedUser }),
    [authenticatedUser, setAuthenticatedUser]
  );

  useEffect(() => {
    getAuthUserData();
  }, []);

  function getAuthUserData() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "api/user/",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          setAuthenticatedUser(res.data);
          return true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <BrowserRouter>
      <AuthenticatedUserContext.Provider value={providerAuthenticatedUser}>
        <Switch>
          {authenticatedUser ? (
            <Route exact path="/" component={Home} />
          ) : (
            <Route exact path="/" component={LoginPage} />
          )}
          <Route exact path="*" component={NotFound} />
        </Switch>
      </AuthenticatedUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
