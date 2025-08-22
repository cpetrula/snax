#!/bin/bash

# Production deployment script for Snax

echo "🚀 Starting Snax production deployment..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --production

# Install frontend dependencies and build
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Create uploads directory
mkdir -p backend/uploads

# Copy environment example if .env doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating environment file..."
    cp backend/.env.example .env
fi

echo "✅ Deployment complete!"
echo ""
echo "To start the application:"
echo "  npm start"
echo ""
echo "The application will be available at: http://localhost:3000"