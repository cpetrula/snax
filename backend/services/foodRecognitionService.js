// Mock food recognition service
// In a real application, this would integrate with AI services like Google Vision API, AWS Rekognition, or custom ML models

class FoodRecognitionService {
  static async analyzePhotos(photos) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock ingredient recognition based on common pantry/fridge items
    const commonIngredients = [
      'eggs', 'milk', 'cheese', 'butter', 'bread', 'tomatoes', 'onions', 'garlic',
      'carrots', 'potatoes', 'chicken', 'ground beef', 'pasta', 'rice', 'beans',
      'lettuce', 'spinach', 'bell peppers', 'mushrooms', 'broccoli', 'apples',
      'bananas', 'lemons', 'flour', 'sugar', 'olive oil', 'salt', 'pepper',
      'yogurt', 'cucumber', 'zucchini', 'corn', 'peas', 'avocado', 'strawberries'
    ];

    // Generate a realistic set of ingredients (simulate what might be detected)
    const detectedCount = Math.floor(Math.random() * 15) + 5; // 5-20 ingredients
    const shuffled = [...commonIngredients].sort(() => 0.5 - Math.random());
    const detected = shuffled.slice(0, detectedCount);

    return detected.map(ingredient => ({
      name: ingredient,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      category: this.categorizeIngredient(ingredient)
    }));
  }

  static categorizeIngredient(ingredient) {
    const categories = {
      'eggs': 'protein',
      'milk': 'dairy',
      'cheese': 'dairy',
      'butter': 'dairy',
      'yogurt': 'dairy',
      'chicken': 'protein',
      'ground beef': 'protein',
      'beans': 'protein',
      'bread': 'grain',
      'pasta': 'grain',
      'rice': 'grain',
      'flour': 'grain',
      'tomatoes': 'vegetable',
      'onions': 'vegetable',
      'garlic': 'vegetable',
      'carrots': 'vegetable',
      'potatoes': 'vegetable',
      'lettuce': 'vegetable',
      'spinach': 'vegetable',
      'bell peppers': 'vegetable',
      'mushrooms': 'vegetable',
      'broccoli': 'vegetable',
      'cucumber': 'vegetable',
      'zucchini': 'vegetable',
      'corn': 'vegetable',
      'peas': 'vegetable',
      'apples': 'fruit',
      'bananas': 'fruit',
      'lemons': 'fruit',
      'strawberries': 'fruit',
      'avocado': 'fruit',
      'olive oil': 'fat',
      'sugar': 'sweetener',
      'salt': 'seasoning',
      'pepper': 'seasoning'
    };

    return categories[ingredient] || 'other';
  }
}

module.exports = FoodRecognitionService;