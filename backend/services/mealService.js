// Mock meal suggestion service with recipe database

class MealService {
  static getMealDatabase() {
    return [
      {
        id: '1',
        name: 'Scrambled Eggs with Toast',
        type: 'breakfast',
        mealTime: ['breakfast', 'snack'],
        cookingMethod: 'non-bake',
        kidFriendly: true,
        prepTime: 10,
        difficulty: 'easy',
        ingredients: ['eggs', 'butter', 'bread', 'salt', 'pepper'],
        instructions: [
          'Beat eggs in a bowl with salt and pepper',
          'Melt butter in a pan over medium heat',
          'Pour in eggs and gently scramble',
          'Toast bread and serve alongside'
        ],
        tags: ['quick', 'protein-rich', 'breakfast']
      },
      {
        id: '2',
        name: 'Chicken Caesar Salad',
        type: 'lunch',
        mealTime: ['lunch', 'dinner'],
        cookingMethod: 'non-bake',
        kidFriendly: false,
        prepTime: 15,
        difficulty: 'easy',
        ingredients: ['chicken', 'lettuce', 'cheese', 'garlic', 'olive oil'],
        instructions: [
          'Cook chicken breast and slice',
          'Prepare lettuce and arrange in bowl',
          'Make dressing with garlic and olive oil',
          'Top with chicken and cheese'
        ],
        tags: ['healthy', 'protein-rich', 'low-carb']
      },
      {
        id: '3',
        name: 'Spaghetti with Tomato Sauce',
        type: 'dinner',
        mealTime: ['lunch', 'dinner'],
        cookingMethod: 'non-bake',
        kidFriendly: true,
        prepTime: 20,
        difficulty: 'easy',
        ingredients: ['pasta', 'tomatoes', 'garlic', 'onions', 'olive oil'],
        instructions: [
          'Boil pasta according to package directions',
          'Sauté garlic and onions in olive oil',
          'Add tomatoes and simmer',
          'Toss pasta with sauce'
        ],
        tags: ['vegetarian', 'comfort-food', 'family-friendly']
      },
      {
        id: '4',
        name: 'Baked Chicken with Vegetables',
        type: 'dinner',
        mealTime: ['dinner'],
        cookingMethod: 'bake',
        kidFriendly: true,
        prepTime: 45,
        difficulty: 'medium',
        ingredients: ['chicken', 'potatoes', 'carrots', 'onions', 'olive oil'],
        instructions: [
          'Preheat oven to 375°F',
          'Season chicken and vegetables',
          'Arrange in baking dish with olive oil',
          'Bake for 35-40 minutes'
        ],
        tags: ['healthy', 'protein-rich', 'one-dish']
      },
      {
        id: '5',
        name: 'Veggie Stir Fry',
        type: 'lunch',
        mealTime: ['lunch', 'dinner'],
        cookingMethod: 'non-bake',
        kidFriendly: true,
        prepTime: 15,
        difficulty: 'easy',
        ingredients: ['bell peppers', 'broccoli', 'carrots', 'onions', 'garlic', 'rice'],
        instructions: [
          'Cook rice according to package directions',
          'Heat oil in wok or large pan',
          'Stir fry vegetables starting with hardest',
          'Serve over rice'
        ],
        tags: ['vegetarian', 'healthy', 'colorful']
      },
      {
        id: '6',
        name: 'Banana Smoothie',
        type: 'snack',
        mealTime: ['snack', 'breakfast'],
        cookingMethod: 'non-bake',
        kidFriendly: true,
        prepTime: 5,
        difficulty: 'easy',
        ingredients: ['bananas', 'milk', 'yogurt'],
        instructions: [
          'Peel and slice bananas',
          'Add all ingredients to blender',
          'Blend until smooth',
          'Serve immediately'
        ],
        tags: ['healthy', 'quick', 'refreshing']
      },
      {
        id: '7',
        name: 'Cheese Quesadilla',
        type: 'snack',
        mealTime: ['snack', 'lunch'],
        cookingMethod: 'non-bake',
        kidFriendly: true,
        prepTime: 10,
        difficulty: 'easy',
        ingredients: ['bread', 'cheese', 'butter'],
        instructions: [
          'Butter one side of bread slices',
          'Place cheese between bread (butter side out)',
          'Cook in pan until golden and cheese melts',
          'Cut and serve'
        ],
        tags: ['comfort-food', 'cheesy', 'quick']
      },
      {
        id: '8',
        name: 'Apple Cinnamon Baked Oats',
        type: 'breakfast',
        mealTime: ['breakfast', 'snack'],
        cookingMethod: 'bake',
        kidFriendly: true,
        prepTime: 30,
        difficulty: 'easy',
        ingredients: ['apples', 'flour', 'sugar', 'eggs', 'milk'],
        instructions: [
          'Preheat oven to 350°F',
          'Mix dry ingredients',
          'Combine wet ingredients',
          'Fold in diced apples and bake 25 minutes'
        ],
        tags: ['healthy', 'sweet', 'fiber-rich']
      }
    ];
  }

  static async generateSuggestions(ingredients, preferences = {}) {
    const meals = this.getMealDatabase();
    const availableIngredients = ingredients.map(ing => 
      typeof ing === 'string' ? ing.toLowerCase() : ing.name.toLowerCase()
    );

    // Filter meals based on available ingredients
    let suggestions = meals.filter(meal => {
      const requiredIngredients = meal.ingredients.map(ing => ing.toLowerCase());
      const matchingIngredients = requiredIngredients.filter(req => 
        availableIngredients.some(avail => avail.includes(req) || req.includes(avail))
      );
      
      // Require at least 60% ingredient match
      return matchingIngredients.length >= Math.ceil(requiredIngredients.length * 0.6);
    });

    // Apply user preferences
    if (preferences.cookingMethod) {
      suggestions = suggestions.filter(meal => 
        meal.cookingMethod === preferences.cookingMethod
      );
    }

    if (preferences.kidFriendly) {
      suggestions = suggestions.filter(meal => meal.kidFriendly === true);
    }

    if (preferences.mealTime) {
      suggestions = suggestions.filter(meal => 
        meal.mealTime.includes(preferences.mealTime)
      );
    }

    // Calculate match score and sort
    suggestions = suggestions.map(meal => {
      const requiredIngredients = meal.ingredients.map(ing => ing.toLowerCase());
      const matchingIngredients = requiredIngredients.filter(req => 
        availableIngredients.some(avail => avail.includes(req) || req.includes(avail))
      );
      
      return {
        ...meal,
        matchScore: matchingIngredients.length / requiredIngredients.length,
        matchingIngredients: matchingIngredients.length,
        totalIngredients: requiredIngredients.length
      };
    });

    // Sort by match score (highest first)
    suggestions.sort((a, b) => b.matchScore - a.matchScore);

    return suggestions.slice(0, 10); // Return top 10 suggestions
  }

  static async getMealById(id) {
    const meals = this.getMealDatabase();
    return meals.find(meal => meal.id === id);
  }
}

module.exports = MealService;