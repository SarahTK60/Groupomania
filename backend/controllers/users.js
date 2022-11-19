const User = require("../models/User");

// Returns an array of all users in database
// Need it ??!!
// remove password
exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
