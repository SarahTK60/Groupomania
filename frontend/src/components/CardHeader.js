import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";

function CardHeader(props) {
  const authorFirstname = props.authorFirstname;
  const authorLastname = props.authorLastname;
  const authorAvatarUrl = props.authorAvatarUrl;
  const authorRole = props.authorRole;
  const creationDate = props.creationDate;

  return (
    <header className="container d-flex justify-content-between mb-1 p-1">
      <div className="d-flex">
        <div className="ms-1">
          {authorAvatarUrl ? (
            <img src={authorAvatarUrl} alt="avatar" className="avatar rounded" />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              className="defaultavatar rounded"
            />
          )}

        </div>
        <div>
          <div className="author-name">
            {authorFirstname} {authorLastname}
            {authorRole === 1 ? (
              <Badge className="ms-3" bg="dark">
                Admin
              </Badge>
            ) : null}
          </div>
          <div className="date d-inline mx-3 thin-margin-sm">
            {"le " +
              dayjs(creationDate).format("DD/MM/YYYY") +
              " à " +
              dayjs(creationDate).format("HH:mm")}
          </div>
        </div>
      </div>
    </header>
  );
}

export default CardHeader;
