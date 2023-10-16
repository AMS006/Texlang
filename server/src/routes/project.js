const express = require('express')
const isUser = require('../middleware/isUser')
const { addProject, getProjects, getProjectDetailsUser,  } = require('../controllers/project')

const router  = express.Router()

router.get('/',isUser,getProjects)

router.post('/',isUser,addProject)

router.get('/:id',isUser,getProjectDetailsUser)



module.exports = router