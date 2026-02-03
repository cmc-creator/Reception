# Reception

A live, shareable staff calendar web application for managing schedules, daily reports, and team communications. Deploy once to GitHub Pages and share with your entire team!

## ⭐ Multi-User Setup

This app is designed to be **deployed as a live web app** that multiple employees can access simultaneously with **real-time Firebase cloud sync**.

### Quick Deployment (GitHub Pages)

1. **Enable GitHub Pages** for this repository:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your default branch) → `/` (root)
   - Click Save

2. **Access your live app** at: `https://[your-username].github.io/Reception/`

3. **Share the URL** with your employees - they can all access the same calendar!

### How Multi-User Sync Works

✅ **With Firebase (Recommended for Teams):**
- All users access the same shared data via Firebase Firestore
- Changes by any user are automatically synced to all other users
- Shifts and staff data are stored in the cloud (`shared` collection)
- Perfect for teams that need real-time collaboration

✅ **Without Firebase (Single-User Fallback):**
- App works offline using localStorage
- Each user has their own independent data
- No data sharing between users
- Use this mode if Firebase is blocked by your network

## Features

- Visual calendar interface with shift assignments
- Personnel management (add/remove staff members)
- Daily report fields for tracking mail, property, supplies, lobby status, and AOC status
- Live chat feed for team communication
- Global alert system for critical notices
- Master reset functionality for admin users
- Automatic seeding of sample data on first load
- Print/export functionality for schedules
- Progressive Web App (PWA) - installable on devices
- Service Worker for offline support

## Getting Started

### For Teams (Recommended)

1. Deploy this repository to GitHub Pages (see deployment steps above)
2. Ensure Firebase CDN resources can load (check browser console)
3. Share the GitHub Pages URL with your team
4. Everyone accesses the same shared calendar data

### For Local Testing

Simply open `index.html` in a modern web browser. No build step required!

On first load, the app automatically creates sample data including:
- Four staff members (Karen, Izzy, Annalissia, Hal)
- Sample shifts for the current month
- Example messages
- Sample daily report data

## Data Storage & Sync

### Firebase Cloud Sync (Multi-User Mode)

**When Firebase is available** (recommended for teams):
- ✅ **Shared data** across all users accessing the app
- ✅ **Real-time sync** of shifts and staff assignments
- ✅ **Accessible anywhere** via the web URL
- ✅ **No setup required** - Firebase is pre-configured
- ✅ **Free tier** suitable for small to medium teams

**Synced data:**
- Staff roster (shared across all users)
- Shift assignments (shared across all users)

**Local-only data:**
- Daily reports (browser-specific)
- Chat messages (browser-specific)
- Checklist items (browser-specific)
- Alert messages (browser-specific)

### localStorage Fallback (Single-User Mode)

**When Firebase is unavailable:**
- ✅ **Works offline** with no internet connection
- ✅ **Complete privacy** - data never leaves the browser
- ✅ **No external dependencies** required
- ⚠️ **Not shareable** - each user has independent data
- ⚠️ **Browser-specific** - data doesn't sync between devices
- ⚠️ **Can be lost** if browser data is cleared

## Sharing Your Calendar

### Option 1: Live Web App (Best for Teams)

Deploy to GitHub Pages and share the URL with your employees. Everyone sees the same data in real-time via Firebase sync.

### Option 2: Export & Share (For Reports)

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

### With Firebase (Multi-User Mode)
- Data is stored in Firebase Firestore cloud database
- Accessible from any device via the web URL
- Persists indefinitely (not affected by browser cache clearing)
- Shared across all users

### Without Firebase (Single-User Mode)
Your localStorage data persists across browser sessions as long as you:
- Use the same browser on the same device
- Don't clear browser data/cache
- Don't use incognito/private browsing mode

## Architecture & Modes

### Multi-User Mode (Firebase Active)
✅ **Best for teams** - Share calendar with employees
- Shifts and staff data synced via Firebase Firestore
- All users see the same calendar in real-time
- Deploy to GitHub Pages and share the URL
- No setup or configuration needed

### Single-User Mode (Firebase Unavailable)
✅ **Privacy-focused fallback** - Personal use only
- All data stored locally in browser localStorage
- Works completely offline
- Each user has independent data
- Use for personal scheduling or when Firebase is blocked

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

### "How do I share this with my team?"

**For multi-user sharing:**
1. Deploy to GitHub Pages (see deployment instructions above)
2. Ensure Firebase CDN can load (check browser console)
3. Share the GitHub Pages URL with your team
4. Everyone will access the same shared calendar

**Check Firebase connection:**
- Open browser console (F12)
- Look for "Firebase initialized successfully" message
- If you see "Firebase not available", the app is in single-user mode

### "Firebase initialization failed"

This message means Firebase cloud sync is unavailable, and the app is running in **single-user mode** using localStorage. 

**For team sharing, you need Firebase to work:**
- Check if CDN resources are blocked by firewall/ad blocker
- Ensure external resources can load from: `www.gstatic.com`, `firestore.googleapis.com`
- Contact your IT department if corporate firewall blocks these domains

**Your local data is completely safe** - it's just not synced to the cloud.

## Technical Details

- Single-file React application using Babel for in-browser JSX transformation
- Tailwind CSS via CDN for styling
- Firebase Firestore for multi-user cloud sync (gracefully degrades if unavailable)
- Progressive Web App (PWA) with service worker for offline support
- No build process required
- No backend server needed
- Dual-mode architecture: cloud-sync for teams, localStorage for privacy
