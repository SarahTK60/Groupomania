import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";

function PostFeed() {
  const { authenticatedUser } = useContext(AuthenticatedUserContext);
  const [posts, setPosts] = useState("");

  useEffect(() => {
    console.log("effect");
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/posts/",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        const allPosts = res.data;
        setPosts(allPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreatePost = (textContent, file) => {
    const postData = new FormData();
    if (textContent || file) {
      if (textContent) {
        postData.append("textContent", textContent);
      }
      if (file) {
        postData.append("image", file);
      }
      postData.append("authorFirstname", authenticatedUser.firstname);
      postData.append("authorLastname", authenticatedUser.lastname);
      postData.append("authorRole", authenticatedUser.role);
      if (authenticatedUser.avatarUrl) {
        postData.append("authorAvatarUrl", authenticatedUser.avatarUrl);
      }

      axios({
        method: "post",
        url: "http://localhost:5000/api/posts/",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        transformRequest: () => postData,
      })
        .then((res) => {
          console.log(res);
          const NewPostList = [...posts, res.data.post];
          console.log(NewPostList);
          console.log("DATA" + res.data.post);
          setPosts(NewPostList);
          console.log("post envoyé !");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLike = (postId) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/posts/" + postId + "/like",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log("erreur res.data.errors true");
        }
        const likesCount = res.data.likesCount;
        const IdxOfpostToUpdt = posts.findIndex((post) => post._id === postId);
        const newPostsList = posts.filter((p) => p._id !== postId);
        const newPost = posts.find((p) => p._id === postId);
        newPost.likesCount = likesCount;
        newPostsList.splice(IdxOfpostToUpdt, 0, newPost);
        setPosts(newPostsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdatePost = (postId, textContent, file, imageUrl) => {
    const postData = new FormData();
    if (textContent || file || imageUrl) {

      postData.append("textContent", textContent);
      if (imageUrl) postData.append("keepPreviousImage", true);
      if (file) postData.append("image", file);

      axios({
        method: "put",
        url: "http://localhost:5000/api/posts/" + postId,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        transformRequest: () => postData,
      })
        .then((res) => {
          const IdxOfpostToUpdt = posts.findIndex(
            (post) => post._id === postId
          );
          const response = res.data.postObject;
          console.log(response);
          const newPost = posts.find((p) => p._id === postId);
          const newPostsList = posts.filter((p) => p._id !== postId);
          newPost.textContent = textContent;
          if (response.imageContentUrl) {
            newPost.imageContentUrl = response.imageContentUrl;
          } else if (!file && imageUrl) {
            newPost.imageContentUrl = imageUrl;
          } else {
            newPost.imageContentUrl = "";
          }
          newPost.update_date = response.update_date;
          newPostsList.splice(IdxOfpostToUpdt, 0, newPost);
          setPosts(newPostsList);
          console.log("post modifié !");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAdminUpdatePost = (postId, textContent, file, imageUrl) => {
    const postData = new FormData();
    if (textContent || file) {
      postData.append("textContent", textContent);
      if (imageUrl) postData.append("keepPreviousImage", true);
      if (file) postData.append("image", file);
      axios({
        method: "put",
        url: "http://localhost:5000/api/posts/admin/" + postId,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        transformRequest: () => postData,
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            console.log("erreur res.data.errors true");
          }
          const IdxOfpostToUpdt = posts.findIndex(
            (post) => post._id === postId
          );
          const response = res.data.postObject;
          console.log(response);
          const newPost = posts.find((p) => p._id === postId);
          const newPostsList = posts.filter((p) => p._id !== postId);
          newPost.textContent = textContent;
          if (response.imageContentUrl) {
            newPost.imageContentUrl = response.imageContentUrl;
          } else if (postData.keepPreviousImage) {
            newPost.imageContentUrl = imageUrl;
          } else {
            newPost.imageContentUrl = "";
          }
          
          newPost.update_date = response.update_date;
         
          newPostsList.splice(IdxOfpostToUpdt, 0, newPost);
          setPosts(newPostsList);
          console.log("post modifié !");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeletePost = (postId) => {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/posts/" + postId,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        }
        setPosts((current) =>
          current.filter((posts) => {
            return posts._id !== postId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdminDeletePost = (postId) => {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/posts/admin/" + postId,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        }
        setPosts((current) =>
          current.filter((posts) => {
            return posts._id !== postId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <>
      <PostForm handleCreatePost={handleCreatePost} />
      <section>
        <PostCard
          posts={posts}
          handleDeletePost={handleDeletePost}
          handleAdminDeletePost={handleAdminDeletePost}
          handleLike={handleLike}
          handleUpdatePost={handleUpdatePost}
          handleAdminUpdatePost={handleAdminUpdatePost}
        />
      </section>
    </>
  );
}

export default PostFeed;
