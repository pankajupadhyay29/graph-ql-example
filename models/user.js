const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
})

const User = (module.exports = mongoose.model('Employees', UserSchema))

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function(username, callback) {
  const query = { username }
  User.findOne(query, (err, user) => {
    if (err) throw err

    callback(user)
  })
}

module.exports.getUserByEmail = function(email) {
  return new Promise((resolve, reject) => {
    const query = { email }
    User.findOne(query, (err, user) => {
      if (err) {
        return reject(err)
      }
      resolve(user)
    })
  })
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, (err, user) => {
    if (err) throw err

    callback(user)
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err
    callback(null, isMatch)
  })
}

module.exports.getAll = function(callback) {
  User.find({}, function(err, users) {
    if (err) throw err
    callback(null, { users: users })
  })
}
