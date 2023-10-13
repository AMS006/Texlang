const express = require('express')
const isUser = require('../middleware/isUser')
const { addProject, getProjects, getProject } = require('../controllers/project')

const router  = express.Router()

router.get('/',isUser,getProjects)

router.post('/',isUser,addProject)

router.get('/:id',isUser,getProject)


module.exports = router