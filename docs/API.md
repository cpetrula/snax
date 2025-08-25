# API Documentation

## Overview
The Snax API provides endpoints for photo upload, food recognition, and meal suggestion generation.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Health Check
```http
GET /health
```
Returns server status and basic information.

**Response:**
```json
{
  "status": "OK",
  "message": "Snax API is running"
}
```

### Photo Upload and Analysis
```http
POST /photos/upload
```
Upload one or more photos for food recognition analysis.

**Parameters:**
- `photos` (file array): Image files (JPG, PNG, WebP) - max 5 files, 10MB each

**Response:**
```json
{
  "success": true,
  "analysisId": "1692672000000",
  "ingredients": [
    {
      "name": "chicken",
      "confidence": 0.95,
      "category": "protein"
    }
  ],
  "photoCount": 2
}
```

### Get Analysis Results
```http
GET /photos/analysis/:id
```
Retrieve previously processed photo analysis results.

**Response:**
```json
{
  "id": "1692672000000",
  "photos": [...],
  "ingredients": [...],
  "timestamp": "2023-08-22T10:20:00.000Z"
}
```

### Delete Analysis and Photos
```http
DELETE /photos/analysis/:id
```
Delete analysis results and associated photo files from the server.

**Response:**
```json
{
  "success": true,
  "message": "Analysis and photos deleted successfully",
  "deletionResults": [
    {
      "status": "deleted",
      "filename": "photos-1692672000000-123456789.jpg"
    }
  ]
}
```

### Meal Suggestions
```http
POST /meals/suggestions
```
Generate meal recommendations based on available ingredients and preferences.

**Request Body:**
```json
{
  "ingredients": [
    {"name": "chicken"},
    {"name": "rice"},
    {"name": "broccoli"}
  ],
  "preferences": {
    "cookingMethod": "non-bake",
    "mealTime": "dinner", 
    "kidFriendly": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "suggestions": [
    {
      "id": "4",
      "name": "Baked Chicken with Vegetables",
      "type": "dinner",
      "mealTime": ["dinner"],
      "cookingMethod": "bake",
      "kidFriendly": true,
      "prepTime": 45,
      "difficulty": "medium",
      "ingredients": ["chicken", "potatoes", "carrots", "onions", "olive oil"],
      "instructions": [...],
      "tags": ["healthy", "protein-rich", "one-dish"],
      "matchScore": 0.8,
      "matchingIngredients": 4,
      "totalIngredients": 5
    }
  ],
  "count": 1
}
```

### Get Meal Details
```http
GET /meals/:id
```
Get detailed information about a specific meal.

**Response:**
```json
{
  "id": "1",
  "name": "Scrambled Eggs with Toast",
  "type": "breakfast",
  "ingredients": ["eggs", "butter", "bread", "salt", "pepper"],
  "instructions": [
    "Beat eggs in a bowl with salt and pepper",
    "Melt butter in a pan over medium heat",
    "Pour in eggs and gently scramble", 
    "Toast bread and serve alongside"
  ],
  "prepTime": 10,
  "difficulty": "easy"
}
```

## Error Responses

All endpoints return standardized error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `400` - Bad Request (missing or invalid parameters)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Rate Limiting
Currently no rate limiting is implemented. In production, consider implementing rate limiting for photo upload endpoints.

## File Upload Limits
- Maximum file size: 10MB per file
- Maximum files per request: 5
- Supported formats: JPG, PNG, WebP
- Files are stored in `backend/uploads/` directory