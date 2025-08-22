const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Get meal suggestions based on ingredients and preferences
router.post('/suggestions', mealController.getMealSuggestions);

// Get meal details
router.get('/:id', mealController.getMealDetails);

module.exports = router;