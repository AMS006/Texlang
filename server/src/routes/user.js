const express = require('express');
const { loginUser, sendCode,forgotPassword, changePassword, getUser, resetPassword, logoutUser } = require('../controllers/user');
const isUser = require('../middleware/isUser');

const router = express.Router();

router.post('/sendCode',sendCode);

router.post('/login',loginUser);

router.get('/',isUser,getUser)

router.post('/forgotPassword',forgotPassword)

router.get('/logout',isUser,logoutUser)

router.post('/resetPassword',resetPassword)

router.post('/changePassword',isUser,changePassword)


module.exports = router;