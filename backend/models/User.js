const mongoose = require('mongoose');
// Mongoose unique validator prevents creating multiple accounts with the same email address
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');


// Defines user model to respect
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    maxlenght: 1024
  },
  firstname: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 25,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 25,
    trim: true
  },
  avatarUrl: {
    type: String,
    default: ""
  },
  role: {
    type: Number,
    default: 0
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);