const mongoose = require('mongoose')

// User Schema
const CaseSchema = mongoose.Schema({
  title: {
    type: String,
    index: true,
  },
  description: {
    type: String,
  },
  department: {
    type: String,
  },
  reporter: {
    type: String,
  },
  assignee: {
    type: String,
  },
  status: {
    type: Number,
  },
})

const CaseModel = (module.exports = mongoose.model('Issues', CaseSchema))

module.exports.createCase = function(newCase, callback) {
  newCase.save(callback)
}

module.exports.getCaseByTitle = function(title, callback) {
  CaseModel.findOne({ title }, callback)
}

module.exports.getCaseById = function(id, callback) {
  CaseModel.findById(id, callback)
}

module.exports.getAll = function(callback) {
  CaseModel.find({}, function(err, cases) {
    if (err) throw err
    callback(null, cases)
  })
}
