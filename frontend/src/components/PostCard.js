import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostCard(props) {
  const displayPosts = () => {
    const { posts } = props;

    if (posts) {
      return posts
        .slice(0)
        .reverse()
        .map((post) => {
          return (
            <article
              key={post._id}
              className="container-fluid p-0 mt-0 container border border-dark mb-3 shadow post-card"
            >
              <CardHeader
                authorFirstname={post.authorFirstname}
                authorLastname={post.authorLastname}
                authorAvatarUrl={post.authorAvatarUrl}
                authorRole={post.authorRole}
                creationDate={post.creation_date}
              />
              <div className="py-2 px-3 border-top">
                {post.textContent}
                {post.update_date ? (
                  <div className="pt-3 text-muted">
                    <FontAwesomeIcon icon="pen-to-square" className="pe-2" />
                    {"Modifié le " +
                      dayjs(post.update_date).format("DD/MM/YYYY") +
                      " à " +
                      dayjs(post.update_date).format("HH:mm")}
                  </div>
                ) : null}
              </div>
              {post.imageContentUrl ? (
                <div className="image-container">
                  <img
                    src={post.imageContentUrl}
                    alt="post"
                    className="image-post" />
                </div>
              ) : null}
              <CardFooter
                postId={post._id}
                authorId={post.authorId}
                textContent={post.textContent}
                imageContentUrl={post.imageContentUrl}
                likesCount={post.likesCount}
                handleLike={props.handleLike}
                handleAdminDeletePost={props.handleAdminDeletePost}
                handleDeletePost={props.handleDeletePost}
                handleUpdatePost={props.handleUpdatePost}
                handleAdminUpdatePost={props.handleAdminUpdatePost}
              />
            </article>
          );
        });
    } else {
      return <h3>Il n'y a aucune publication</h3>;
    }
  };
  return (
    <>
      {displayPosts(props)}
    </>
  );
}

export default PostCard;
