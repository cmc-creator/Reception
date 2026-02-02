# Quick Troubleshooting Checklist

## My changes are missing! Where are they?

Follow this checklist to find and fix your issue:

### ☑️ Step 1: Are your changes saved in files?

**In VS Code:**
- Check if file tabs show a white dot (unsaved changes)
- If yes: Press Ctrl+S (Windows/Linux) or Cmd+S (Mac) to save all files

---

### ☑️ Step 2: Are your changes committed to Git?

**In VS Code Source Control (Ctrl+Shift+G / Cmd+Shift+G):**
- Do you see any files listed under "Changes"?
- **YES** → Changes are saved but not committed. Continue to Step 3.
- **NO** → Changes are committed. Continue to Step 4.

---

### ☑️ Step 3: Commit your changes

**In VS Code:**
1. Open Source Control panel (Ctrl+Shift+G)
2. Click the `+` button next to each file (or click `+` at the top to stage all)
3. Type a commit message in the text box
4. Click the checkmark ✓ button

**Or in Terminal:**
```bash
git add .
git commit -m "Describe your changes"
```

---

### ☑️ Step 4: Are your changes pushed to GitHub?

**In Terminal:**
```bash
git log origin/main..main
```

- **Shows commits?** → You have unpushed commits. Continue to Step 5.
- **Shows nothing?** → Everything is pushed. Continue to Step 6.

**Or check VS Code status bar:**
- Look for ↑ (up arrow) with a number → unpushed commits
- Look for ↓ (down arrow) with a number → unpulled commits from GitHub

---

### ☑️ Step 5: Push your changes to GitHub

**In VS Code:**
- Click the sync button (↻ or ↑) in the status bar

**Or in Terminal:**
```bash
git push origin main
```

---

### ☑️ Step 6: Are you on the correct branch?

**Check your branch:**
```bash
git branch
```

- You should see `* main` (asterisk next to main)
- If you're on a different branch (like `feature-branch`):
  - Either merge it to main: `git checkout main && git merge feature-branch`
  - Or push your branch and create a Pull Request on GitHub

---

### ☑️ Step 7: Check deployment status

**On GitHub:**
1. Go to: https://github.com/cmc-creator/Reception
2. Click **Actions** tab
3. Look for the latest "pages build and deployment" workflow
4. ✅ Green = Deployed successfully
5. 🟡 Yellow = Currently deploying (wait 1-3 minutes)
6. 🔴 Red = Failed (click to see error details)

---

### ☑️ Step 8: Check the live site

**Visit:** https://cmc-creator.github.io/Reception/

**If changes still don't appear:**
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or open in incognito/private mode to bypass cache

---

## Quick Commands Reference

```bash
# Where am I? What's changed?
git status
git branch

# See what's different
git diff

# Commit workflow
git add .
git commit -m "Your message"
git push origin main

# Check if everything is pushed
git log origin/main..main    # Should show nothing if all is pushed

# Check deployment status
# Go to: https://github.com/cmc-creator/Reception/actions
```

---

## Still Stuck?

### Check these common issues:

**❌ File tabs show white dots**
→ Save your files (Ctrl+S / Cmd+S)

**❌ Source Control shows changed files**
→ Commit them (see Step 3)

**❌ Status bar shows ↑ with a number**
→ Push your changes (see Step 5)

**❌ You're on a different branch**
→ Switch to main or merge your branch (see Step 6)

**❌ GitHub Actions shows red X**
→ Click on it to see error details, fix the errors, and push again

**❌ Live site is cached**
→ Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

---

## More Help

- **Git basics**: See [SYNCING_VS_CODE_CHANGES.md](./SYNCING_VS_CODE_CHANGES.md)
- **Deployment**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **GitHub Actions**: Check https://github.com/cmc-creator/Reception/actions

---

## The Golden Rule

Remember the pipeline:

```
Save Files → Commit → Push → Deploy → Live Site
   (Ctrl+S)  (git)   (git)  (GitHub)  (1-3 min)
```

**Every step must happen for changes to appear on the live website!**
