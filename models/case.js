const mongoose = require('mongoose')
const util = require('util')

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

module.exports.createCase = function(newCase) {
  return util.promisify(newCase.save.bind(newCase))()
}

module.exports.getCaseByTitle = function(title) {
  return util.promisify(CaseModel.findOne.bind(CaseModel))({ title })
}

module.exports.getCaseById = function(id) {
  return util.promisify(CaseModel.findById.bind(CaseModel))(id)
}

module.exports.getAll = function(callback) {
  return util.promisify(CaseModel.find.bind(CaseModel))({})
}
