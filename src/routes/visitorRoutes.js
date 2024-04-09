// src/routes/visitorRoutes.js
const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Route for capturing visitor details
router.post('/capture-details', visitorController.captureDetails);

module.exports = router;
