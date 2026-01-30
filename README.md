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

### Offline/Demo Mode

If Firebase is not configured or the connection fails, the application will automatically offer to run in **Demo Mode**. This displays sample data including:

- Four demo staff members with scheduled shifts
- Sample chat messages
- A demo alert banner

Demo mode is view-only and does not persist any changes.

## Admin Features

- **Admin Code**: Set in the configuration (default: `admin123`)
- **Master Reset**: Restores default personnel and creates a baseline schedule for the current month
- **Personnel Management**: Add or remove staff members

## Security Note

Firebase Web API keys are safe to include in client-side code. They identify your Firebase project but don't grant access to your data. Access control is managed through Firebase Security Rules.

## Usage

Simply open `index.html` in a modern web browser. No build step or server required!
