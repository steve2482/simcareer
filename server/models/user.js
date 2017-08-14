const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  memberId: Number,
  userName: String,
  password: String,
  secretAnswer: String
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
    });
    bcrypt.hash(newUser.secretAnswer, salt, function(err, hash) {
      newUser.secretAnswer = hash;
    });
    newUser.save(callback);
  });
};

module.exports.hashNewPassword = function(newPassword) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newPassword, salt, function(err, hash) {
      return hash;
    });
  });
};

module.exports.getUserByUsername = function(userName, callback) {
  let query = {userName: userName};
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};