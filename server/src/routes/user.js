const express = require('express');
const { loginUser, sendCode,forgotPassword, changePassword, getUser, resetPassword } = require('../controllers/user');
const isUser = require('../middleware/isUser');

const router = express.Router();

router.post('/login',loginUser);

router.post('/sendCode',sendCode);

router.get('/',isUser,getUser)

router.post('/forgotPassword',forgotPassword)

router.post('/resetPassword',resetPassword)

router.post('/changePassword',isUser,changePassword)

module.exports = router;