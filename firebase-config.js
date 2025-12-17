// Firebase Configuration
// REPLACE THESE VALUES with your Firebase project credentials
// Get them from: https://console.firebase.google.com → Your Project → Project Settings → General → Your apps
// 
// To set up Firebase:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use existing)
// 3. Click "Add app" → Web (</> icon)
// 4. Register your app
// 5. Copy the config values below
// 6. Enable Realtime Database: Build → Realtime Database → Create Database → Start in test mode

const firebaseConfig = {
    apiKey: "AIzaSyDUxRCXEKn49zgqDfouWVR361-wlo3oUDk",
    authDomain: "secret-santa-b7b29.firebaseapp.com",
    databaseURL: "https://secret-santa-b7b29-default-rtdb.firebaseio.com",
    projectId: "secret-santa-b7b29",
    storageBucket: "secret-santa-b7b29.firebasestorage.app",
    messagingSenderId: "1075911733194",
    appId: "1:1075911733194:web:78054f0ab444ef4a7f2933",
    measurementId: "G-VJ3PPPSHPZ"
};
  
// Initialize Firebase
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    window.firebaseReady = true;
} else {
    console.log('Firebase not configured - using localStorage (assignments will be per-browser)');
    window.firebaseReady = false;
}
