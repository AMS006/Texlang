const express = require('express')
const isUser = require('../middleware/isUser')
const { addProject, getProjects } = require('../controllers/project')

const router  = express.Router()

router.get('/',isUser,getProjects)

router.post('/',isUser,addProject)


module.exports = router