"use strict";

var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  reatedAt: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model("user", UserSchema);