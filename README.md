# Secret Santa Web App 🎄

A Christmas-themed web app for managing Secret Santa assignments, with special handling for participants who already have their assignments.

## Features

- 🎄 Beautiful Christmas-themed UI with animated snowflakes
- 🎁 Special section for Alex and Raphaël to input their existing assignments
- 🎲 Automatic random assignment for everyone else after Alex and Raphaël input theirs
- 💾 Local storage to save assignments (assignments stay the same once set)
- 👁️ View all assignments (for verification)
- 🔄 Reset functionality

## Running Locally

### Option 1: Simple (Just Open the File)
1. Double-click `index.html` to open it in your default browser
2. That's it! The app will work, though some browsers may have restrictions on localStorage

### Option 2: Using a Local Server (Recommended)
For the best experience, run a local web server:

**Using Python (if installed):**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

**Using Node.js (if installed):**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

## Deploying Online

### Option 1: GitHub Pages (Free & Easy)
1. Create a new repository on GitHub
2. Upload all files (`index.html`, `style.css`, `script.js`, `README.md`)
3. Go to Settings → Pages
4. Select your main branch and `/ (root)` folder
5. Click Save - your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free & Very Easy)
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop your project folder onto Netlify
3. Your site is instantly live with a URL like `https://random-name.netlify.app`
4. You can customize the domain name in settings

### Option 3: Vercel (Free & Easy)
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Install Vercel CLI: `npm i -g vercel`
3. In your project folder, run: `vercel`
4. Follow the prompts - your site will be deployed instantly

### Option 4: Any Web Hosting
Upload the files (`index.html`, `style.css`, `script.js`) to any web hosting service via FTP or their file manager.

## How to Use the App

1. **For Alex O and Raphaël**: 
   - Select your name from the dropdown
   - Select who you already have as your Secret Santa
   - Click "Save My Assignment"
   - Once both have entered, everyone else will be automatically assigned!
2. **For everyone else**:
   - Select your name from the dropdown
   - Click "🎁 View My Person!" to see your assignment
   - Your assignment was automatically created after Alex O and Raphaël entered theirs
3. **View all assignments**: Click the "View All Assignments" button at the bottom

## Family Members

The app includes these family members:
- Susan, Fadi, Alex O, Jenny Drew, Laetitia, Raphaël, Tanya, Alex B, Jack, Sarah, Grammie, Elkin, Bobby, Colby

## Important: Shared Assignments

**For everyone to see the same assignments, you need to set up Firebase** (free, takes 5 minutes).

See `FIREBASE_SETUP.md` for detailed instructions. Without Firebase, each person's browser will have different assignments.

## Notes

- **Shared Storage**: With Firebase set up, everyone sees the same assignments. Without it, assignments are per-browser (localStorage)
- **Validation**: People cannot view their assignments until Alex O and Raphaël have both entered theirs
- **Automatic Assignment**: Once Alex O and Raphaël enter their assignments, everyone else is automatically randomly assigned
- **Persistent**: Assignments stay the same once set (no redrawing)
- **No Self-Assignment**: The algorithm ensures no one gets themselves
- **Reset**: Use the "Reset All Assignments" button in the assignments view to start over

