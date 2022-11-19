import React, { useContext } from "react";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";
import "../assets/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

function CardFooter(props) {
  const { authenticatedUser } = useContext(AuthenticatedUserContext);

  const postId = props.postId;
  const likesCount = props.likesCount;

  const authorId = props.authorId;
  const textContent = props.textContent;
  const imageContentUrl = props.imageContentUrl;

  const handleLike = (e) => {
    e.preventDefault();
    props.handleLike(postId);
  };

  return (
    <footer>
      <div className="container d-flex justify-content-between border-top border-dark p-1 align-items-center">
        <div onClick={handleLike} className="clickable py-2 ps-3">
          J'aime
          {likesCount === 0 ? (
            <FontAwesomeIcon
              className="text-primary px-2"
              icon="fa-regular fa-heart"
            />
          ) : (
            <FontAwesomeIcon
              className="text-primary px-2"
              icon="fa-solid fa-heart"
            />
          )}
          <span>{likesCount}</span>
        </div>
        <nav className="nav d-inline-flex ml-auto px-3">
          {authorId === authenticatedUser._id ||
          authenticatedUser.role === 1 ? (
            <ul className="nav d-inline-flex align-self-center">
              <li className="nav-item px-1 d-inline">
                <UpdatePost
                  postId={postId}
                  textContent={textContent}
                  imageContentUrl={imageContentUrl}
                  handleUpdatePost={props.handleUpdatePost}
                  handleAdminUpdatePost={props.handleAdminUpdatePost}
                />
              </li>
              <li className="nav-item px-1 d-inline">
                <DeletePost
                  handleDeletePost={props.handleDeletePost}
                  handleAdminDeletePost={props.handleAdminDeletePost}
                  postId={postId}
                />
              </li>
            </ul>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}

export default CardFooter;
