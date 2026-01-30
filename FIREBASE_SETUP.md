# Firebase Configuration Setup

## Issue
The Reception Calendar app requires a valid Firebase API key to function properly. The code currently contains an API key that may not be configured correctly for your Firebase project.

## How to Fix

### Step 1: Get Your Firebase API Key
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **reception-calendar-1**
3. Click the gear icon (⚙️) next to "Project Overview" to open **Project Settings**
4. Under the **General** tab, scroll down to **Your apps**
5. You should see your web app configuration with the API key (starts with "AIzaSy...")

### Step 2: Update the Code
1. Open `index.html` in your editor
2. Find line 58 (around the `// --- INITIALIZATION ---` comment)
3. Replace the `apiKey` value in the config JSON with your actual Firebase Web API Key:

```javascript
const config = JSON.parse(window.__firebase_config || '{"apiKey":"YOUR_ACTUAL_API_KEY_HERE","authDomain":"reception-calendar-1.firebaseapp.com",...}');
```

### Step 3: Test
1. Save the file
2. Open `index.html` in your browser
3. The app should now load successfully

## Alternative: External Configuration

Instead of hardcoding the API key, you can inject it externally by setting `window.__firebase_config` before the script runs:

```html
<script>
  window.__firebase_config = JSON.stringify({
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "reception-calendar-1.firebaseapp.com",
    projectId: "reception-calendar-1",
    storageBucket: "reception-calendar-1.firebasestorage.app",
    messagingSenderId: "613158953901",
    appId: "1:613158953901:web:ed3f0a6cc4cb23f65df724"
  });
</script>
```

## Security Note
Firebase Web API keys are safe to include in client-side code. They identify your Firebase project but don't grant access to your data. Access control is managed through Firebase Security Rules.

## Need Help?
If you don't have access to the Firebase Console or can't find your API key, contact your Firebase project administrator.
