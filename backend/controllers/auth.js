// Import bcrypt to hash user password
const bcrypt = require("bcrypt");
// Import jsonwebtoken to assign token to user
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Add a user in database
exports.signup = (req, res) => {
  // Check if the email is already in database
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(401)
          .json({
            message:
              "Cette adresse email est déjà utilisée. Vous ne pouvez pas créer plusieurs comptes avec la même adresse email !",
          });
      }
      // if it doesn't exist, hash the password and create a user
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: 0,
          });
          user
            .save()
            .then(() =>
              res.status(201).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
                  expiresIn: "24h",
                }),
              })
            )
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Log a user
exports.login = (req, res) => {
  // Check user credentials
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire email/mot de passe incorrecte" });
      }
      // if the email is in the database use bcrypt.compare to verify the hash password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire email/mot de passe incorrecte" });
          }
          // If this is the correct password, return json Object with user id and token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};