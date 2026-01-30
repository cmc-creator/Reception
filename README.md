# Reception

A shared calendar for managing staff schedules, daily reports, and team communications.

## Features

- Visual calendar interface with shift assignments
- Personnel management
- Daily report fields for tracking mail, property, supplies, lobby status, and AOC status
- Live chat feed for team communication
- Global alert system for critical notices
- Master reset functionality for admin users
- Offline demo mode with sample data

## Configuration

### Firebase Setup

The application can be configured to use your Firebase project in multiple ways:

#### Option 1: Inject Configuration via JavaScript (Recommended)

Add a script tag before loading the application to inject your Firebase configuration:

```html
<script>
  window.__firebase_config = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "reception-calendar-1.firebaseapp.com",
    projectId: "reception-calendar-1",
    storageBucket: "reception-calendar-1.appspot.com",
    messagingSenderId: "613158953901",
    appId: "1:613158953901:web:ed3f0a6cc4cb23f65df724"
  };
</script>
```

**Note**: You can also provide the configuration as a JSON string if needed for specific deployment scenarios:

```html
<script>
  window.__firebase_config = JSON.stringify({
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "reception-calendar-1.firebaseapp.com",
    projectId: "reception-calendar-1",
    storageBucket: "reception-calendar-1.appspot.com",
    messagingSenderId: "613158953901",
    appId: "1:613158953901:web:ed3f0a6cc4cb23f65df724"
  });
</script>
```

#### Option 2: localStorage Configuration

You can also store your Firebase configuration in localStorage:

```javascript
localStorage.setItem('firebase_config', JSON.stringify({
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "reception-calendar-1.firebaseapp.com",
  projectId: "reception-calendar-1",
  storageBucket: "reception-calendar-1.appspot.com",
  messagingSenderId: "613158953901",
  appId: "1:613158953901:web:ed3f0a6cc4cb23f65df724"
}));
```

#### Getting Your Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **reception-calendar-1**
3. Click the gear icon (⚙️) next to "Project Overview" to open **Project Settings**
4. Under the **General** tab, scroll down to **Your apps**
5. Copy your web app configuration

### Configuration Priority

The app loads Firebase configuration in the following priority order:

1. `window.__firebase_config` (if set before the app loads)
2. `localStorage.getItem('firebase_config')` (if available)
3. Bundled default configuration (fallback, may have empty API key)

All configuration sources are protected with JSON parsing error guards to prevent runtime failures.

### Offline/Demo Mode

If Firebase is not configured, the anonymous authentication fails, or Firestore is unreachable/disabled, the application will **automatically enable Demo Mode**. This ensures the UI is never blank and provides:

- **Four demo staff members** with scheduled shifts for the current month
- **Sample chat messages** explaining the demo mode
- **Demo report fields** with sample data
- **Demo alert banner** indicating offline status

**Demo mode features:**
- ✅ Browse the calendar interface with sample shifts
- ✅ View all UI components and layout
- ✅ Navigate between months
- ✅ Print/export the calendar
- ❌ Cannot create, edit, or delete data (all modifications are blocked)
- ❌ No data persistence or Firebase synchronization

The demo mode activates automatically in these scenarios:
- Firebase API key is missing or invalid
- Anonymous authentication fails
- Cloud Firestore API is disabled
- Network connectivity issues prevent Firebase access

**To exit demo mode:** Configure Firebase credentials properly and refresh the browser.

## Admin Features

- **Admin Code**: Set in the configuration (default: `admin123`)
- **Master Reset**: Restores default personnel and creates a baseline schedule for the current month
- **Personnel Management**: Add or remove staff members

## Security Note

Firebase Web API keys are safe to include in client-side code. They identify your Firebase project but don't grant access to your data. Access control is managed through Firebase Security Rules.

## Usage

Simply open `index.html` in a modern web browser. No build step or server required!
