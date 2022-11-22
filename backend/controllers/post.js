const Post = require("../models/Post");
const fs = require("fs");
const dayjs = require("dayjs");

// Returns an array of all posts in database
exports.getAllPosts = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// Returns the post with the id provided
exports.getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Adds a new post in database
exports.addPost = (req, res) => {
  const postObject = req.file
    ? {
        // if a file is sent, assign req.body and imageContentUrl: url to postObject
        ...req.body,
        imageContentUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // else just assign req.body to postObject

  delete postObject._id;
  delete postObject._authorId;
  const post = Post({
    ...postObject,
    authorId: req.userId,
    creation_date: dayjs().format(),
    likesCount: 0,
    likersId: [],
  });

  post
    .save()
    .then(() => {
      res.status(201).json({ post });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Updates the post with the id provided in database
exports.modifyPost = (req, res) => {
  const postObject = req.file
    ? {
        // if a file is sent, assign req.body and image: url to postObject
        ...req.body,
        imageContentUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // else just assign req.body to postObject

  delete postObject._userId;
  Post.findById(req.params.id)
    .then((post) => {
      if (post.authorId !== req.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else if (req.file && post.imageContentUrl) {
        // Change image
        const filename = post.imageContentUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.updateOne(
            { _id: req.params.id },
            {
              $set: {
                ...postObject,
                update_date: dayjs().format(),
              },
            }
          )
            .then(() => res.status(200).json({ postObject }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else if (!req.file && !req.body.keepPreviousImage) {
        // Delete image
        const filename = post.imageContentUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.updateOne(
            { _id: req.params.id },
            {
              $set: {
                ...postObject,
                imageContentUrl: "",
                update_date: dayjs().format(),
              },
            }
          )
            .then(() => res.status(200).json({ postObject }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        // Update post without delete previous image
        Post.updateOne(
          { _id: req.params.id },
          {
            $set: {
              ...postObject,
              update_date: dayjs().format(),
            },
          }
        )
          .then(() => res.status(200).json({ postObject }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyPostByAdmin = (req, res) => {
  const postObject = req.file
    ? {
        // if a file is sent, assign req.body and image: url to postObject
        ...req.body,
        imageContentUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // else just assign req.body to postObject

  delete postObject._userId;
  Post.findById(req.params.id)
    .then((post) => {
      if (req.file && post.imageContentUrl) {
        // Change image
        const filename = post.imageContentUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.updateOne(
            { _id: req.params.id },
            {
              $set: {
                ...postObject,
                update_date: dayjs().format(),
              },
            }
          )
            .then(() => res.status(200).json({ postObject }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else if (!req.file && !req.body.keepPreviousImage) {
        // Delete image
        const filename = post.imageContentUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.updateOne(
            { _id: req.params.id },
            {
              $set: {
                ...postObject,
                imageContentUrl: "",
                update_date: dayjs().format(),
              },
            }
          )
            .then(() => res.status(200).json({ postObject }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        // Update post without delete previous image
        Post.updateOne(
          { _id: req.params.id },
          {
            $set: {
              ...postObject,
              update_date: dayjs().format(),
            },
          }
        )
          .then(() => res.status(200).json({ postObject }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Removes the post with the id provided in database
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.authorId !== req.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        if (post.imageContentUrl) {
          const filename = post.imageContentUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
              .catch((error) => res.status(401).json({ error }));
          });
        } else {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Removes the post with the id provided in database
exports.deletePostByAdmin = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.imageContentUrl) {
        const filename = post.imageContentUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Post supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post.likersId.includes(req.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          { $push: { likersId: req.userId }, $inc: { likesCount: +1 } }
        )
          .then(() => {
            res.status(200).json({ likesCount: post.likesCount + 1 });
          })
          .catch((error) => res.status(401).json({ error }));
      } else if (post.likersId.includes(req.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          { $pull: { likersId: req.userId }, $inc: { likesCount: -1 } }
        )
          .then(() => {
            res.status(200).json({ likesCount: post.likesCount - 1 });
          })
          .catch((error) => res.status(401).json({ error }));
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteAllUserPosts = (req, res) => {
  Post.find({ authorId: req.params.id })
    .then((posts) => {
      const userId = req.userId;
      for (var i in posts) {
        const post = posts[i];
        if (post.authorId !== userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          if (post.imageContentUrl) {
            const filename = post.imageContentUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({ _id: post._id })
                .catch((error) => res.status(401).json({ error }));
            });
          } else {
            Post.deleteOne({ _id: post._id })
              .catch((error) => res.status(401).json({ error }));
          }
        }
      }
      res.status(200).json("Tous les messages de l'utilisateur supprimés");
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
