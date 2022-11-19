import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function Avatar(props) {
  const avatarUrl = props.avatarUrl;

  return (
    <>
      {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="avatar rounded ms-3" />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              className="defaultavatar rounded ms-3"
            />
          )}
    </>
  )
}

export default Avatar