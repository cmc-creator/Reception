# Reception

A fully offline-first staff calendar for managing schedules, daily reports, and team communications. All data is primarily stored locally in your browser using localStorage, with optional Firebase sync when available.

## Features

- Visual calendar interface with shift assignments
- Personnel management (add/remove staff members)
- Daily report fields for tracking mail, property, supplies, lobby status, and AOC status
- Live chat feed for team communication
- Global alert system for critical notices
- Master reset functionality for admin users
- Automatic seeding of sample data on first load
- Print/export functionality for schedules
- Optional Firebase cloud sync (gracefully degrades to offline-only mode if unavailable)

## Getting Started

Simply open `index.html` in a modern web browser. No build step, server, or external services required!

On first load, the app automatically creates sample data including:
- Four staff members (Karen, Izzy, Annalissia, Hal)
- Sample shifts for the current month
- Example messages
- Sample daily report data

## Data Storage

**Primary Storage:** All data is stored locally in your browser's localStorage as the primary data source.

**Optional Firebase Sync:** If Firebase services are available, the app will automatically sync shifts and staff data to the cloud. If Firebase is unavailable (e.g., blocked by network policies, CDN issues), the app gracefully falls back to offline-only mode using localStorage.

### What this means:

- ✅ **Works offline:** No internet connection required for core functionality
- ✅ **No external dependencies required:** App works even if CDN resources fail to load
- ✅ **Data safety:** Your localStorage data is never overwritten by empty cloud data
- ✅ **No billing or subscription costs**
- ✅ **Complete privacy:** Your local data never leaves your browser unless Firebase sync is active
- ⚠️ Data is specific to each browser and device
- ⚠️ Clearing browser data will erase your local schedule
- ⚠️ Firebase sync is optional and requires Firebase services to be accessible

### Your Data is Safe

**Don't worry about losing your work!** Even if the app encounters issues loading:
- Your localStorage data persists in your browser
- Firebase being unavailable does NOT delete your local data
- The app will always load your local data first
- Cloud sync only adds data, it never removes local data

## Sharing Data

Since the app is primarily offline and local to your browser, you cannot share data in real-time with other users. To share your schedule:

1. Use the **Export Matrix** button to print your calendar
2. Save the print output as a PDF
3. Share the PDF via email or other means

## Admin Features

- **Admin Code**: Set in the configuration (default: `admin123`)
- **Master Reset**: Restores default personnel (Karen, Izzy, Annalissia, Hal) and creates a baseline schedule for the current month
- **Personnel Management**: Add or remove staff members through the Personnel Manifest

## Usage Tips

- The calendar always opens to the current month with today's date selected
- Click any day to select it and view/edit details in the sidebar
- Click the `+` button on any day to add a shift for that day
- Click on an existing shift to edit or delete it
- Daily reports are saved per day - select a day to see its reports
- Messages are displayed in chronological order
- The global alert bar at the top can be edited to show important notices

## Browser Compatibility

Works in all modern browsers that support:
- localStorage
- ES6 JavaScript
- React 18

Tested in: Chrome, Firefox, Safari, Edge

## Data Persistence

Your data persists across browser sessions as long as you:
- Use the same browser on the same device
- Don't clear browser data/cache
- Don't use incognito/private browsing mode

## Limitations

- **No multi-user collaboration**: Each user has their own independent local data (Firebase sync is optional)
- **No automatic cloud backup**: Local data is primary storage
- **No cross-device sync without Firebase**: Local data cannot be accessed from different devices
- **No data recovery**: Clearing browser data permanently deletes local information
- **Browser-specific**: Data in Chrome won't appear in Firefox, etc.

## Troubleshooting

### "The app shows a blank page"

**Check the browser console** (F12 or right-click → Inspect → Console):
- If you see warnings about Firebase not loading, this is **normal and expected**
- The app will log "Firebase not available - running in offline-only mode"
- Your local data is safe and the app should still work

**Common causes:**
- CDN resources blocked by network policy or ad blocker
- Check if other external resources (React, Tailwind) are loading
- Try disabling browser extensions temporarily

### "I can't see my data / Did I lose my work?"

**Your data is likely still there!** To check:
1. Open browser console (F12)
2. Go to the "Application" or "Storage" tab
3. Click on "Local Storage" → your site URL
4. Look for keys starting with `reception_`
5. If you see `reception_shifts`, `reception_staff`, etc., your data is intact!

**The app will automatically load this data** once the page loads successfully.

### "Firebase initialization failed"

This is **not an error** - it means Firebase cloud sync is unavailable, but the app will work perfectly in offline-only mode using localStorage. Your local data is completely safe.

## Technical Details

- Single-file React application using Babel for in-browser JSX transformation
- Tailwind CSS via CDN for styling
- Optional Firebase Firestore for cloud sync (gracefully degrades if unavailable)
- No build process required
- No backend server needed for core functionality
- Offline-first architecture with localStorage as primary data source
