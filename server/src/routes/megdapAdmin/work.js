const express = require('express');
const { getProjectWorks } = require('../../controllers/megdapAdmin/work');

const router = express.Router();

router.get('/project/:projectId', getProjectWorks)

module.exports = router