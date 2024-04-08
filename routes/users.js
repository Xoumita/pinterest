const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dp: {
    type: String // You can adjust the type as per your requirement (String for file paths, or Buffer for storing files directly)
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.plugin(plm, { usernameField: 'username' });

module.exports = mongoose.model('User', userSchema);