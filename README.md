# Reception
A shared calendar with Firebase integration and offline demo mode.

## Configuration

### Firebase Config Injection

You can inject your Firebase configuration in two ways:

1. **Via window.__firebase_config** - Set this before the app loads:
```html
<script>
  window.__firebase_config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
    // measurementId: "G-XXXXXXXXXX" // Optional: Only if using Google Analytics
  };
</script>
```

2. **Via localStorage** - Store config as a JSON string:
```javascript
localStorage.setItem('firebaseConfig', JSON.stringify({
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
  // measurementId: "G-XXXXXXXXXX" // Optional: Only if using Google Analytics
}));
```

If no configuration is injected, the app will use bundled default configuration.

### Offline Demo Mode

If Firebase authentication fails or the API is disabled, the app automatically enters **demo mode** with:
- Pre-seeded staff members (Karen, Izzy, Annalissia, Hal)
- Sample shifts for the current month
- Demo messages and report data
- Full UI functionality (read-only for Firebase operations)

This allows you to explore the interface without requiring Firebase setup.

## Usage

Simply open `index.html` in a web browser. The app will:
1. Attempt to connect to Firebase using the configured credentials
2. Fall back to demo mode if connection fails
3. Display the calendar interface with staff scheduling capabilities

## Features

- Staff management and scheduling
- Daily report fields
- Live chat/message feed
- Monthly calendar view
- Print-friendly export
- Automatic offline fallback
