<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <h1 class="app-title">
          <i class="pi pi-camera"></i>
          Snax
        </h1>
        <p class="app-subtitle">Turn your food photos into delicious meal ideas</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        
        <!-- Photo Upload Section -->
        <section class="upload-section" v-if="!analysisComplete">
          <div class="upload-card">
            <h2>Upload Photos of Your Food Storage</h2>
            <p>Take pictures of your refrigerator, freezer, or pantry</p>
            
            <div class="upload-area" @click="triggerFileInput" @drop="handleDrop" @dragover.prevent @dragenter.prevent>
              <input 
                ref="fileInput" 
                type="file" 
                multiple 
                accept="image/*" 
                @change="handleFileSelect" 
                class="file-input"
                :disabled="isProcessing"
              >
              
              <div v-if="selectedPhotos.length === 0" class="upload-placeholder">
                <i class="pi pi-cloud-upload upload-icon"></i>
                <p>Click to select photos or drag and drop</p>
                <small>Supports multiple images (JPG, PNG, WebP)</small>
              </div>
              
              <div v-else class="selected-photos">
                <div v-for="(photo, index) in selectedPhotos" :key="index" class="photo-preview">
                  <img :src="photo.preview" :alt="photo.name" />
                  <button @click.stop="removePhoto(index)" class="remove-photo" :disabled="isProcessing">
                    <i class="pi pi-times"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="selectedPhotos.length > 0" class="upload-actions">
              <Button 
                @click="uploadPhotos" 
                :loading="isProcessing" 
                icon="pi pi-upload"
                class="upload-btn"
                :disabled="selectedPhotos.length === 0"
              >
                {{ isProcessing ? 'Analyzing Photos...' : 'Analyze Photos' }}
              </Button>
            </div>
          </div>
        </section>

        <!-- Preferences Section -->
        <section class="preferences-section" v-if="ingredients.length > 0 && !isGenerating">
          <div class="preferences-card">
            <h2>Detected Ingredients</h2>
            <div class="ingredients-list">
              <Chip 
                v-for="ingredient in ingredients" 
                :key="ingredient.name"
                :label="ingredient.name"
                class="ingredient-chip"
              />
            </div>
            
            <h3>Meal Preferences</h3>
            <div class="preferences-grid">
              <div class="preference-group">
                <label>Cooking Method</label>
                <SelectButton 
                  v-model="preferences.cookingMethod" 
                  :options="cookingMethods" 
                  optionLabel="label" 
                  optionValue="value"
                  class="cooking-method-selector"
                />
              </div>
              
              <div class="preference-group">
                <label>Meal Type</label>
                <SelectButton 
                  v-model="preferences.mealTime" 
                  :options="mealTypes" 
                  optionLabel="label" 
                  optionValue="value"
                  class="meal-type-selector"
                />
              </div>
              
              <div class="preference-group">
                <Checkbox v-model="preferences.kidFriendly" inputId="kidFriendly" binary />
                <label for="kidFriendly" class="checkbox-label">Kid Friendly</label>
              </div>
            </div>
            
            <Button 
              @click="getMealSuggestions" 
              :loading="isGenerating"
              icon="pi pi-sparkles"
              class="generate-btn"
            >
              {{ isGenerating ? 'Finding Recipes...' : 'Get Meal Suggestions' }}
            </Button>
          </div>
        </section>

        <!-- Results Section -->
        <section class="results-section" v-if="mealSuggestions.length > 0">
          <div class="results-header">
            <h2>Suggested Meals & Snacks</h2>
            <Button 
              @click="startOver" 
              icon="pi pi-refresh" 
              severity="secondary"
              class="start-over-btn"
            >
              Start Over
            </Button>
          </div>
          
          <div class="meals-grid">
            <div 
              v-for="meal in mealSuggestions" 
              :key="meal.id"
              class="meal-card"
              @click="openRecipeDialog(meal)"
            >
              <div class="meal-header">
                <h3>{{ meal.name }}</h3>
                <div class="meal-badges">
                  <Badge :value="meal.type" class="meal-type-badge" />
                  <Badge v-if="meal.kidFriendly" value="Kid Friendly" severity="success" />
                  <Badge :value="meal.cookingMethod === 'bake' ? 'Baking' : 'No Baking'" :severity="meal.cookingMethod === 'bake' ? 'warn' : 'info'" />
                </div>
              </div>
              
              <div class="meal-info">
                <div class="prep-time">
                  <i class="pi pi-clock"></i>
                  {{ meal.prepTime }} min
                </div>
                <div class="difficulty">
                  <i class="pi pi-star"></i>
                  {{ meal.difficulty }}
                </div>
                <div class="match-score">
                  <i class="pi pi-check-circle"></i>
                  {{ Math.round(meal.matchScore * 100) }}% match
                </div>
              </div>
              
              <div class="ingredients-match">
                <small>{{ meal.matchingIngredients }}/{{ meal.totalIngredients }} ingredients available</small>
              </div>
            </div>
          </div>
        </section>

        <!-- Recipe Detail Dialog -->
        <Dialog 
          v-model:visible="showRecipeDialog" 
          :header="selectedMeal?.name" 
          modal 
          class="recipe-dialog"
          :style="{ width: '90vw', maxWidth: '600px' }"
        >
          <div v-if="selectedMeal" class="recipe-content">
            <div class="recipe-info">
              <div class="info-item">
                <strong>Prep Time:</strong> {{ selectedMeal.prepTime }} minutes
              </div>
              <div class="info-item">
                <strong>Difficulty:</strong> {{ selectedMeal.difficulty }}
              </div>
              <div class="info-item">
                <strong>Meal Type:</strong> {{ selectedMeal.type }}
              </div>
            </div>
            
            <div class="recipe-ingredients">
              <h4>Ingredients Needed:</h4>
              <ul>
                <li v-for="ingredient in selectedMeal.ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
            </div>
            
            <div class="recipe-instructions">
              <h4>Instructions:</h4>
              <ol>
                <li v-for="(step, index) in selectedMeal.instructions" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </Dialog>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import SelectButton from 'primevue/selectbutton'
import Checkbox from 'primevue/checkbox'
import Badge from 'primevue/badge'
import Dialog from 'primevue/dialog'
import { uploadPhotos as uploadPhotosAPI, getMealSuggestions as getMealSuggestionsAPI } from './services/api'

export default {
  name: 'App',
  components: {
    Button,
    Chip,
    SelectButton,
    Checkbox,
    Badge,
    Dialog
  },
  setup() {
    const fileInput = ref(null)
    const selectedPhotos = ref([])
    const isProcessing = ref(false)
    const isGenerating = ref(false)
    const analysisComplete = ref(false)
    const ingredients = ref([])
    const mealSuggestions = ref([])
    const selectedMeal = ref(null)
    const showRecipeDialog = ref(false)

    const preferences = reactive({
      cookingMethod: null,
      mealTime: null,
      kidFriendly: false
    })

    const cookingMethods = [
      { label: 'Any', value: null },
      { label: 'No Baking', value: 'non-bake' },
      { label: 'Baking', value: 'bake' }
    ]

    const mealTypes = [
      { label: 'Any', value: null },
      { label: 'Breakfast', value: 'breakfast' },
      { label: 'Lunch', value: 'lunch' },
      { label: 'Dinner', value: 'dinner' },
      { label: 'Snack', value: 'snack' }
    ]

    const triggerFileInput = () => {
      fileInput.value?.click()
    }

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files)
      addPhotos(files)
    }

    const handleDrop = (event) => {
      event.preventDefault()
      const files = Array.from(event.dataTransfer.files)
      addPhotos(files)
    }

    const addPhotos = (files) => {
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            selectedPhotos.value.push({
              file,
              name: file.name,
              preview: e.target.result
            })
          }
          reader.readAsDataURL(file)
        }
      })
    }

    const removePhoto = (index) => {
      selectedPhotos.value.splice(index, 1)
    }

    const uploadPhotos = async () => {
      if (selectedPhotos.value.length === 0) return

      isProcessing.value = true
      try {
        const formData = new FormData()
        selectedPhotos.value.forEach(photo => {
          formData.append('photos', photo.file)
        })

        const response = await uploadPhotosAPI(formData)
        ingredients.value = response.ingredients
        analysisComplete.value = true
      } catch (error) {
        console.error('Error uploading photos:', error)
        alert('Failed to analyze photos. Please try again.')
      } finally {
        isProcessing.value = false
      }
    }

    const getMealSuggestions = async () => {
      isGenerating.value = true
      try {
        const response = await getMealSuggestionsAPI({
          ingredients: ingredients.value,
          preferences: preferences
        })
        mealSuggestions.value = response.suggestions
      } catch (error) {
        console.error('Error getting meal suggestions:', error)
        alert('Failed to get meal suggestions. Please try again.')
      } finally {
        isGenerating.value = false
      }
    }

    const openRecipeDialog = (meal) => {
      selectedMeal.value = meal
      showRecipeDialog.value = true
    }

    const startOver = () => {
      selectedPhotos.value = []
      ingredients.value = []
      mealSuggestions.value = []
      selectedMeal.value = null
      showRecipeDialog.value = false
      analysisComplete.value = false
      isProcessing.value = false
      isGenerating.value = false
      Object.assign(preferences, {
        cookingMethod: null,
        mealTime: null,
        kidFriendly: false
      })
    }

    return {
      fileInput,
      selectedPhotos,
      isProcessing,
      isGenerating,
      analysisComplete,
      ingredients,
      mealSuggestions,
      selectedMeal,
      showRecipeDialog,
      preferences,
      cookingMethods,
      mealTypes,
      triggerFileInput,
      handleFileSelect,
      handleDrop,
      removePhoto,
      uploadPhotos,
      getMealSuggestions,
      openRecipeDialog,
      startOver
    }
  }
}
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px 0;
  text-align: center;
  color: white;
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.app-subtitle {
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
}

/* Main Content */
.main-content {
  padding: 40px 0;
}

/* Upload Section */
.upload-section {
  margin-bottom: 40px;
}

.upload-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.upload-card h2 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.upload-card p {
  color: #666;
  margin-bottom: 30px;
}

.upload-area {
  border: 3px dashed #ddd;
  border-radius: 15px;
  padding: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.file-input {
  display: none;
}

.upload-placeholder {
  text-align: center;
}

.upload-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 20px;
}

.selected-photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  width: 100%;
}

.photo-preview {
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-photo {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-actions {
  margin-top: 30px;
}

.upload-btn {
  padding: 15px 30px;
  font-size: 1.1rem;
}

/* Preferences Section */
.preferences-section {
  margin-bottom: 40px;
}

.preferences-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.preferences-card h2, .preferences-card h3 {
  color: #333;
  margin-bottom: 20px;
}

.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.ingredient-chip {
  background: #667eea !important;
  color: white !important;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.preference-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preference-group label {
  font-weight: 600;
  color: #333;
}

.checkbox-label {
  margin-left: 10px;
}

.generate-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
}

/* Results Section */
.results-section {
  margin-bottom: 40px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.results-header h2 {
  color: white;
  margin: 0;
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.meal-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.meal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.meal-header {
  margin-bottom: 15px;
}

.meal-header h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.meal-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meal-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #666;
}

.meal-info > div {
  display: flex;
  align-items: center;
  gap: 5px;
}

.ingredients-match {
  color: #888;
  font-size: 0.85rem;
}

/* Recipe Dialog */
.recipe-content {
  padding: 20px 0;
}

.recipe-info {
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.info-item {
  margin-bottom: 8px;
}

.recipe-ingredients, .recipe-instructions {
  margin-bottom: 25px;
}

.recipe-ingredients h4, .recipe-instructions h4 {
  color: #333;
  margin-bottom: 15px;
}

.recipe-ingredients ul, .recipe-instructions ol {
  padding-left: 20px;
}

.recipe-ingredients li, .recipe-instructions li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .app-title {
    font-size: 2.5rem;
  }
  
  .upload-card, .preferences-card {
    padding: 25px;
  }
  
  .upload-area {
    padding: 25px;
  }
  
  .preferences-grid {
    grid-template-columns: 1fr;
  }
  
  .results-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .meals-grid {
    grid-template-columns: 1fr;
  }
  
  .meal-info {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 10px;
  }
  
  .upload-card, .preferences-card {
    padding: 20px;
  }
  
  .selected-photos {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>