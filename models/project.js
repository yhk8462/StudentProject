const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  sId: {
    type: String,
    required: true
  },
  sName: {
    type: String,
    required: true
  },
  sYear: {
    type: String,
    required: true
  },
  cId: {
    type: String,
    required: true
  },
  cName: {
    type: String,
    required: true
  },
  sem: {
    type: String,
    required: true
  },
  aName: {
    type: String,
    required: true
  },
  aDes: {
    type: String,
    required: true
  },
  aPer: {
    type: String,
    required: true
  }, 
  tech: {
    type: String,
    required: true
  }, 
  scope: {
    type: String,
    required: true
  }, 
  des: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  app: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Project', projectSchema)