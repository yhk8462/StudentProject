const express = require('express')
const router = express.Router()
const Project = require('../models/project')

// Getting all
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getProject, (req, res) => {
  res.json(res.project)
})

// Creating one
router.post('/', async (req, res) => {
  const project = new Project({
    sId: req.body.sId,
    sName: req.body.sName,
    sYear: req.body.sYear,
    cId: req.body.cId,
    cName: req.body.cName,
    sem: req.body.sem,
    aName: req.body.aName,
    aDes: req.body.aDes,
    aPer: req.body.aPer,
    tech: req.body.tech,
    scope: req.body.scope,
    des: req.body.des,
    company: req.body.company,
    app: req.body.app,
    photoURL: req.body.photoURL
  })
  try {
    const newProject = await project.save()
    res.status(201).json(newProject)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.put('/:id', getProject, async (req, res) => {
  if (req.body._id != null) {
    res.project._id = req.body._id
  }
  if (req.body.sId != null) {
    res.project.sId = req.body.sId
  }
  if (req.body.sName != null) {
    res.project.sName = req.body.sName
  }
  if (req.body.sYear != null) {
    res.project.sYear = req.body.sYear
  }
  if (req.body.cId != null) {
    res.project.cId = req.body.cId
  }
  if (req.body.cName != null) {
    res.project.cName = req.body.cName
  }
  if (req.body.sem != null) {
    res.project.sem = req.body.sem
  }
  if (req.body.aName != null) {
    res.project.aName = req.body.aName
  }
  if (req.body.aDes != null) {
    res.project.aDes = req.body.aDes
  }
  if (req.body.aPer != null) {
    res.project.aPer = req.body.aPer
  }
  if (req.body.tech != null) {
    res.project.tech = req.body.tech
  }
  if (req.body.scope != null) {
    res.project.scope = req.body.scope
  }
  if (req.body.des != null) {
    res.project.des = req.body.des
  }
  if (req.body.company != null) {
    res.project.company = req.body.company
  }
  if (req.body.app != null) {
    res.project.app = req.body.app
  }
  try {
    const updatedProject = await res.project.save()
    res.json(updatedProject)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getProject, async (req, res) => {
  try {
    await res.project.remove()
    res.json({ message: 'Deleted Project' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProject(req, res, next) {
  let project
  try {
    project = await Project.findById(req.params.id)
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find Project' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.project = project
  next()

}

module.exports = router