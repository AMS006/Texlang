const express = require('express');
const multer = require('multer');
const { uploadWork } = require('../controllers/work');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage });

router.post('/upload',upload.single('file'),uploadWork)


module.exports = router