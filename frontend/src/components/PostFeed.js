import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import AuthenticatedUserContext from "../context/AuthenticatedUserContext";

function PostFeed() {
  const { authenticatedUser } = useContext(AuthenticatedUserContext);
  const [posts, setPosts] = useState("");

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "api/posts/",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        const allPosts = res.data;
        setPosts(allPosts);
      })
      .catch((err) => {
        console.log(err);
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
        url: process.env.REACT_APP_BASE_URL + "api/posts/",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        transformRequest: () => postData,
      })
        .then((res) => {
          const NewPostList = [...posts, res.data.post];
          setPosts(NewPostList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLike = (postId) => {
    axios({
      method: "post",
      url: process.env.REACT_APP_BASE_URL + "api/posts/" + postId + "/like",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
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
        url: process.env.REACT_APP_BASE_URL + "api/posts/" + postId,
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAdminUpdatePost = (postId, textContent, file, imageUrl) => {
    const postData = new FormData();
    if (textContent || file || imageUrl) {

      postData.append("textContent", textContent);
      if (imageUrl) postData.append("keepPreviousImage", true);
      if (file) postData.append("image", file);

      axios({
        method: "put",
        url: process.env.REACT_APP_BASE_URL + "api/posts/admin/" + postId,
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeletePost = (postId) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASE_URL + "api/posts/" + postId,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
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
      url: process.env.REACT_APP_BASE_URL + "api/posts/admin/" + postId,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
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
