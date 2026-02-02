# Reception

A fully offline staff calendar for managing schedules, daily reports, and team communications. All data is stored locally in your browser using localStorage.


## Features

- Visual calendar interface with shift assignments
- Personnel management (add/remove staff members)
- Daily report fields for tracking mail, property, supplies, lobby status, and AOC status
- Live chat feed for team communication
- Global alert system for critical notices
- Master reset functionality for admin users
- Automatic seeding of sample data on first load
- Print/export functionality for schedules

## Getting Started

### For Users

Simply open `index.html` in a modern web browser. No build step, server, or external services required!

Or visit the live deployment at: **https://cmc-creator.github.io/Reception/**

### For Developers

This project is automatically deployed to GitHub Pages from the `main` branch. To deploy your changes:

1. Make changes in your code editor
2. Commit changes: `git commit -am "Your changes"`
3. Push to main: `git push origin main`
4. GitHub Pages will automatically deploy (takes 1-3 minutes)

📖 See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

On first load, the app automatically creates sample data including:
- Four staff members (Karen, Izzy, Annalissia, Hal)
- Sample shifts for the current month
- Example messages
- Sample daily report data

## Data Storage

**Important:** All data is stored locally in your browser's localStorage. This means:

- ✅ No internet connection required
- ✅ No external dependencies or API keys needed
- ✅ No billing or subscription costs
- ✅ Complete privacy - your data never leaves your browser
- ⚠️ Data is specific to each browser and device
- ⚠️ Clearing browser data will erase your schedule
- ⚠️ Data cannot be automatically synced between devices or users

## Sharing Data

Since the app is fully offline and local to your browser, you cannot share data in real-time with other users. To share your schedule:

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

- **No multi-user collaboration**: Each user has their own independent data
- **No cloud backup**: Data is only stored locally
- **No cross-device sync**: Cannot access the same data on different devices
- **No data recovery**: Clearing browser data permanently deletes all information
- **Browser-specific**: Data in Chrome won't appear in Firefox, etc.

## Technical Details

- Single-file React application using Babel for in-browser JSX transformation
- Tailwind CSS via CDN for styling
- No build process required
- No backend server needed
- No external API calls

## Development Workflow

If you're editing this project:

1. **Always commit your changes** after editing:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

2. **In VS Code**:
   - Use the Source Control panel (Ctrl+Shift+G / Cmd+Shift+G)
   - Stage changed files with the `+` button
   - Enter a commit message and click the checkmark
   - Click the sync button to push to GitHub

3. **Remember**: Saving files (Ctrl+S) is NOT the same as committing to Git!

📖 See [SYNCING_VS_CODE_CHANGES.md](./SYNCING_VS_CODE_CHANGES.md) for detailed Git workflow guidance.
