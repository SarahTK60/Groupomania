import { useState } from "react";
import Postformheader from "./PostFormHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function PostForm(props) {
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();
    props.handleCreatePost(textContent, file);
    setTextContent("");
    setFile("");
  };

  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const addImageTooltip = (props) => (
    <Tooltip id="button-addImage-tooltip" {...props}>
      Ajouter une image
    </Tooltip>
  );

  const deleteImageTooltip = (props) => (
    <Tooltip id="button-deleteImage-tooltip" {...props}>
      Supprimer l'image
    </Tooltip>
  );

  return (
    <section className="container-fluid container border border-dark mb-3 px-0 shadow post-card">
      <Postformheader />
      <form
        action="post"
        onSubmit={handleCreatePost}
        id="post-form"
        className="align-items-center p-4"
      >
        <div className="mb-3">
          <label htmlFor="textContent" className="form-label">
            Quoi de neuf ?
          </label>
          <div className="d-flex">
            <input
              type="text"
              name="textContent"
              className="form-control me-2 mb-2"
              id="textContent"
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
            />

            <label className="label-file" htmlFor="file">
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={addImageTooltip}
              >
                <div className="btn btn-outline-dark">
                  <FontAwesomeIcon icon="fa-solid fa-image" />
                </div>
              </OverlayTrigger>
            </label>
            <input
              className="input-file"
              type="file"
              name="file"
              id="file"
              accept=".png,.jpg,.jpeg,.gif"
              onChange={changeImage}
            />
          </div>

          {file && (
            <div className="image-container position-relative">
              <img
                src={URL.createObjectURL(file)}
                alt="nouveau post"
                className="image-post"
              />
              <div className="position-absolute top-0 start-0">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={deleteImageTooltip}
                >
                  <button className="btn" onClick={() => setFile("")}>
                    <FontAwesomeIcon className="text-primary" icon="fa-xmark" />
                  </button>
                </OverlayTrigger>
              </div>
              
            </div>
          )}
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="Envoyer"
            className="btn btn-outline-dark"
          />
        </div>
      </form>
    </section>
  );
}

export default PostForm;
