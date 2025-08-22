const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../middleware/uploadMiddleware');

// Upload and analyze photos
router.post('/upload', upload.array('photos', 5), photoController.uploadPhotos);

// Get analysis results
router.get('/analysis/:id', photoController.getAnalysis);

module.exports = router;