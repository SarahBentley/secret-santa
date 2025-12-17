#!/bin/bash
# Quick setup script for git and GitHub Pages deployment

echo "🚀 Setting up Secret Santa app for deployment..."

# Initialize git
git init
git add .
git commit -m "Initial commit - Secret Santa app"

echo ""
echo "✅ Git repository initialized!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com and create a new repository"
echo "2. Don't initialize it with a README"
echo "3. Then run these commands (replace YOUR_USERNAME with your GitHub username):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/secret-santa.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Go to your repo → Settings → Pages → Select 'main' branch → Save"
echo ""
echo "Your site will be live at: https://YOUR_USERNAME.github.io/secret-santa"

