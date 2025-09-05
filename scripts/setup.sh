#!/bin/bash

# Secure DevOps Project Setup Script
echo "🚀 Setting up Secure DevOps Demo Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please update .env file with your actual values"
fi

# Create database directory
echo "🗄️  Setting up database..."
mkdir -p data

# Run tests
echo "🧪 Running tests..."
npm test

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t secure-devops-demo .

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Set up SonarQube (see docs/SONARQUBE_SETUP.md)"
echo "3. Configure GitHub secrets:"
echo "   - SONAR_TOKEN"
echo "   - SONAR_HOST_URL"
echo "4. Push to GitHub to trigger CI/CD pipeline"
echo ""
echo "🚀 To start the application:"
echo "   npm start"
echo ""
echo "🐳 To start with Docker:"
echo "   docker-compose up"
echo ""
echo "📊 To run SonarQube locally:"
echo "   docker-compose up sonarqube"
echo ""
echo "🔒 Security vulnerabilities are intentionally included for demonstration."
echo "   DO NOT USE IN PRODUCTION!"
