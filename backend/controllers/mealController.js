const MealService = require('../services/mealService');

class MealController {
  async getMealSuggestions(req, res) {
    try {
      const { ingredients, preferences } = req.body;

      if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Ingredients array is required' });
      }

      const suggestions = await MealService.generateSuggestions(ingredients, preferences);

      res.json({
        success: true,
        suggestions,
        count: suggestions.length
      });
    } catch (error) {
      console.error('Error generating meal suggestions:', error);
      res.status(500).json({ error: 'Failed to generate meal suggestions' });
    }
  }

  async getMealDetails(req, res) {
    try {
      const { id } = req.params;
      const mealDetails = await MealService.getMealById(id);

      if (!mealDetails) {
        return res.status(404).json({ error: 'Meal not found' });
      }

      res.json(mealDetails);
    } catch (error) {
      console.error('Error getting meal details:', error);
      res.status(500).json({ error: 'Failed to get meal details' });
    }
  }
}

module.exports = new MealController();