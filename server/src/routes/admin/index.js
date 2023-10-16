const express = require('express')
const { getWorks, getJobWiseData, getInvoiceWorks } = require('../../controllers/admin/work')
const { registerUser, getAllUser, updateUser, changeUserStatus } = require('../../controllers/admin/user')
const { getAllProjects, getLatestProject, getProjectDetailsAdmin, getProjectInvoices } = require('../../controllers/admin/project')

const router = express.Router()

router.post('/registerUser', registerUser)

router.put('/updateUser',updateUser)

router.put('/changeStatus',changeUserStatus)

router.get('/project/:id',getProjectDetailsAdmin)

router.get('/companyProjects', getAllProjects)

router.get('/latestProjects', getLatestProject)

router.get('/allUsers', getAllUser)

router.get('/invoices',getProjectInvoices)

router.get('/projectWork/:projectId', getWorks)

router.get('/projectWork/invoice/:projectId',getInvoiceWorks)

router.get('/jobWiseData',getJobWiseData)

module.exports = router