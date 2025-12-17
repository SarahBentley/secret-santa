# Firebase Setup Instructions

To enable shared assignments (so everyone sees the same Secret Santa assignments), you need to set up Firebase.

## Quick Setup (5 minutes)

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter a project name (e.g., "secret-santa")
   - Click Continue
   - Disable Google Analytics (optional, not needed)
   - Click Create project

3. **Add a Web App**
   - Click the web icon (`</>`)
   - Register your app with a nickname (e.g., "Secret Santa Web")
   - Click "Register app"

4. **Copy Your Config**
   - You'll see a config object with your credentials
   - Copy these values

5. **Update firebase-config.js**
   - Open `firebase-config.js` in your project
   - Replace the placeholder values with your actual Firebase config:
     ```javascript
     const firebaseConfig = {
         apiKey: "YOUR_ACTUAL_API_KEY",
         authDomain: "your-project-id.firebaseapp.com",
         databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
         projectId: "your-project-id",
         storageBucket: "your-project-id.appspot.com",
         messagingSenderId: "123456789",
         appId: "1:123456789:web:abcdef"
     };
     ```

6. **Enable Realtime Database**
   - In Firebase Console, go to "Build" → "Realtime Database"
   - Click "Create Database"
   - Choose a location (closest to your users)
   - Click "Next"
   - **IMPORTANT**: Select "Start in test mode" (for now - you can secure it later)
   - Click "Enable"

7. **Update Database Rules (Optional but Recommended)**
   - Go to Realtime Database → Rules
   - Update to allow read/write (for testing):
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

## That's It!

Now when you deploy your app, everyone who opens it will see the same assignments because they're stored in Firebase, not in each person's browser.

## Without Firebase

If you don't set up Firebase, the app will still work but use localStorage, which means:
- Each person's browser will have different assignments
- Assignments won't be shared across devices
- This is fine for testing, but not for a real Secret Santa

## Security Note

The test mode rules allow anyone to read/write. For a family Secret Santa, this is fine. If you want to secure it later, you can add authentication or restrict access.

