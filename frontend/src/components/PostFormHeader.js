import React, { useContext } from "react";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import Avatar from "./Avatar";


function PostFormHeader() {

  const { authenticatedUser } = useContext(AuthenticatedUserContext);

  return (
    <header className="container p-1 border-bottom d-flex align-items-center">
      <Avatar avatarUrl={authenticatedUser.avatarUrl} />
      <div className="author-name">
        {authenticatedUser.firstname} {authenticatedUser.lastname}
      </div>
    </header>
  );
}

export default PostFormHeader;
