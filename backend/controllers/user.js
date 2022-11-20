const User = require("../models/User");

// Returns an array of all users in database
exports.getAuthUser = (req, res) => {
  User.findOne({ _id: req.userId })
    .then((user) => {
      // copy user data except password
      const safeUser = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      };
      res.status(200).json(safeUser);
    })
    .catch((error) => res.status(404).json({ error }));
};


// Returns the user with the id provided
exports.getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      // copy user data except password
      const safeUser = {
        _id: user._id,
        email: user.email,
        avatar: user.avatar,
        firstname: user.firstname,
        lastname: user.lastname,
        avatarUrl: user.avatarUrl,
        role: user.role,
      };
      res.status(200).json(safeUser);
    })
    .catch((error) => res.status(404).json({ error }));
};

// Adds a new user in database
exports.addUser = (req, res) => {
  const userObject = JSON.parse(req.body.user);
  delete userObject._id;
  delete userObject._userId;
  const user = new User({
    ...userObject,
    userId: req.userId,
    avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    role: 0,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: "Utilisateur enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Updates the user with the id provided in database
// Updates firstname and/or lastname and/or avatar
exports.modifyUser = (req, res) => {
  const userObject = req.file
    ? {
      // if a file is sent, assign req.body and avatarUrl: url to userObject
      ...req.body,
      avatarUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }
    : { ...req.body }; // else just assign req.body to userObject
  // delete userObject._id;
  User.findById(req.params.id)
    .then((user) => {
      if (req.params.id !== req.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else if (req.body.image && user.avatarUrl) {
        // Change image
        const filename = user.avatarUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.updateOne(
            { _id: req.params.id },
            { $set: { ...userObject } }
          )
            .then(() => res.status(200).json({ userObject }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else if (!req.body.image && !req.body.keepPreviousAvatar) {
        // Delete avatar
        const filename = user.avatarUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.updateOne(
            { _id: req.params.id },
            {
              $set:
              {
                ...userObject,
                avatarUrl: ""
              },
            }
          )
            .then(() => res.status(200).json({ userObject }))
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        // Update user without delete previous avatar
        User.updateOne(
          { _id: req.params.id },
          { $set: { ...userObject } }
        )
          .then(() => res.status(200).json({ userObject }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};



// Removes the user with the id provided in database
// Delete All the posts created by the user
exports.deleteUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (req.params.id !== req.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else if (user.avatarUrl) {
        const filename = user.avatarUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Utilisateur supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        User.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Utilisateur supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
