# Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Easiest - Recommended) ⭐

1. **Go to [netlify.com](https://netlify.com)** and sign up (free)

2. **Drag and Drop Method:**
   - Simply drag your entire `secret-santa` folder onto the Netlify homepage
   - Your site will be live instantly!
   - You'll get a URL like `https://random-name-123.netlify.app`

3. **Custom Domain (Optional):**
   - Go to Site settings → Domain management
   - Add a custom domain if you want

**That's it!** Your site is live and everyone can access it.

---

### Option 2: GitHub Pages (Free)

1. **Initialize Git Repository:**
   ```bash
   cd /Users/sarahbentley/secret-santa
   git init
   git add .
   git commit -m "Initial commit - Secret Santa app"
   ```

2. **Create GitHub Repository:**
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon → "New repository"
   - Name it (e.g., "secret-santa")
   - **Don't** initialize with README
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/secret-santa.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch and "/ (root)" folder
   - Click "Save"
   - Your site will be at: `https://YOUR_USERNAME.github.io/secret-santa`

---

### Option 3: Vercel (Free)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /Users/sarahbentley/secret-santa
   vercel
   ```
   - Follow the prompts
   - Your site will be live instantly!

---

## Important: Enable Firebase Realtime Database

Before deploying, make sure you've enabled Realtime Database in Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `secret-santa-b7b29`
3. Click "Build" → "Realtime Database"
4. Click "Create Database"
5. Choose a location (closest to your users)
6. **Select "Start in test mode"**
7. Click "Enable"

8. **Update Database Rules:**
   - Go to "Rules" tab
   - Replace with:
     ```json
     {
       "rules": {
         "assignments": {
           ".read": true,
           ".write": true
         }
       }
     }
     ```
   - Click "Publish"

## Testing Locally First

Before deploying, test locally:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## After Deployment

1. Share the URL with your family
2. Have Alex O and Raphaël enter their assignments first
3. Everyone else will be automatically assigned!
4. Each person can then view their assignment

