# Snax

A mobile-friendly web application that generates meal and snack ideas based on photos of your refrigerator, freezer, or pantry. Built with Node.js backend, Vue.js 3 frontend, and PrimeVue UI components in an MVC architecture.

## Features

- 📸 **Photo Upload**: Take pictures of your food storage with drag & drop support
- 🤖 **AI Food Recognition**: Mock service that identifies ingredients from photos  
- 🍽️ **Smart Meal Suggestions**: Get personalized recipe recommendations based on available ingredients
- 🎛️ **Preference Filters**: 
  - Cooking method (bake vs. no-bake)
  - Meal type (breakfast, lunch, dinner, snack)
  - Kid-friendly options
- 📱 **Mobile-Responsive**: Beautiful gradient UI that works on all devices
- ⚡ **Real-time**: Instant ingredient analysis and recipe matching

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MVC Architecture** (Models, Views, Controllers)
- **Multer** for file uploads
- **Mock AI Service** for food recognition

### Frontend  
- **Vue.js 3** with Composition API
- **PrimeVue** UI component library
- **Vite** for development and build
- **Axios** for API communication

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cpetrula/snax.git
   cd snax
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy example environment file (optional)
   cp backend/.env.example backend/.env
   ```

### Running the Application

#### Development Mode

**Option 1: Run Both Servers Simultaneously**
```bash
# Terminal 1: Start backend (port 3000)
npm run dev

# Terminal 2: Start frontend (port 5173)
npm run frontend:dev
```

**Option 2: Individual Services**
```bash
# Backend only
cd backend && node server.js

# Frontend only  
cd frontend && npm run dev
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### API Endpoints

#### Photos
- `POST /api/photos/upload` - Upload and analyze photos
- `GET /api/photos/analysis/:id` - Get analysis results

#### Meals
- `POST /api/meals/suggestions` - Get meal suggestions
- `GET /api/meals/:id` - Get meal details

#### Health
- `GET /api/health` - Server health check

## Usage

1. **Upload Photos**: Click the upload area or drag & drop images of your food storage
2. **View Ingredients**: The app will display detected ingredients as chips
3. **Set Preferences**: Choose your cooking method, meal type, and dietary preferences  
4. **Get Suggestions**: View personalized meal recommendations with match scores
5. **View Recipes**: Click any meal card to see detailed ingredients and instructions

## Project Structure

```
snax/
├── backend/
│   ├── controllers/          # Request handlers
│   ├── routes/              # API route definitions  
│   ├── services/            # Business logic
│   ├── middleware/          # Custom middleware
│   ├── uploads/            # File upload storage
│   └── server.js           # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── services/       # API integration
│   │   └── App.vue         # Main application
│   ├── public/             # Static assets
│   └── index.html          # Entry HTML
└── docs/                   # Documentation
```

## Sample Data

The application includes 8 sample recipes:
- Scrambled Eggs with Toast
- Chicken Caesar Salad  
- Spaghetti with Tomato Sauce
- Baked Chicken with Vegetables
- Veggie Stir Fry
- Banana Smoothie
- Cheese Quesadilla
- Apple Cinnamon Baked Oats

## Development

### Adding New Recipes
Edit `backend/services/mealService.js` and add new meal objects to the database array.

### Extending Food Recognition
Replace the mock service in `backend/services/foodRecognitionService.js` with real AI APIs like:
- Google Vision API
- AWS Rekognition  
- Custom ML models

### UI Customization
Modify the PrimeVue theme in `frontend/src/main.js` or customize CSS in `App.vue`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email help@snax.app or create an issue on GitHub.
