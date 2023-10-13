const express = require('express')
const { registerUser, getAllUser, updateUser, changeUserStatus } = require('../../controllers/admin/user')
const { getAllProjects, getLatestProject } = require('../../controllers/admin/project')
const { getWorks, getJobWiseData } = require('../../controllers/admin/works')

const router = express.Router()

router.post('/registerUser', registerUser)

router.put('/updateUser',updateUser)

router.put('/changeStatus',changeUserStatus)

router.get('/companyProjects', getAllProjects)

router.get('/latestProjects', getLatestProject);

router.get('/allUsers', getAllUser)

router.get('/projectWork/:projectId', getWorks);

router.get('/jobWiseData',getJobWiseData);

module.exports = router