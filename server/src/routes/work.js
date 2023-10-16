const express = require('express');
const multer = require('multer');
const { uploadWork, addComment } = require('../controllers/work');
const isUser = require('../middleware/isUser');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage });

router.post('/upload',isUser,upload.single('file'),uploadWork)

router.post('/comment/:id',isUser,addComment);


module.exports = router