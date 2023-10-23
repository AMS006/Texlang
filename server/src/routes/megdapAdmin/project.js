const express = require('express');
const { getUserProjects } = require('../../controllers/megdapAdmin/project');

const router = express.Router();

router.get('/user/:userId', getUserProjects)

module.exports = router