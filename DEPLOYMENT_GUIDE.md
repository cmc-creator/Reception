# Deployment Guide for Reception Calendar

## How Deployment Works

This project is automatically deployed to **GitHub Pages** whenever changes are pushed to the `main` branch.

### Deployment Process

```
Your Computer (VS Code)
    ↓ Save files (Ctrl+S)
    ↓ Git commit
    ↓ Git push
GitHub Repository (main branch)
    ↓ Automatic trigger
GitHub Pages Deployment
    ↓ Build & Deploy
Live Website
```

## Understanding "Should be Deployed"

If VS Code or a deployment tool says changes "should be deployed," it typically means:

1. **Changes are saved locally** - But not committed to Git
2. **Changes are committed locally** - But not pushed to GitHub
3. **Changes are pushed to a branch** - But not merged to `main`
4. **Changes are on `main`** - GitHub Pages will auto-deploy them

## Check Deployment Status

### View Live Site

The deployed site is available at:
- `https://cmc-creator.github.io/Reception/`
- Or check the repository settings → Pages for the exact URL

### Check Deployment Status on GitHub

1. Go to: https://github.com/cmc-creator/Reception
2. Click the **Actions** tab
3. Look for "pages build and deployment" workflow runs
4. ✅ Green checkmark = Successfully deployed
5. 🔴 Red X = Deployment failed
6. 🟡 Yellow dot = Currently deploying

### From VS Code

If you have a GitHub extension installed, you might see deployment status in VS Code. However, this doesn't mean your changes are deployed - it means the workflow is configured.

## Why Your Changes Might Not Be Deployed

### 1. Changes Not Committed
**Problem**: Files are saved but not committed to Git
**Solution**: 
```bash
git status              # Check what's changed
git add .              # Stage all changes
git commit -m "message" # Commit changes
```

### 2. Changes Not Pushed
**Problem**: Commits exist locally but not on GitHub
**Solution**:
```bash
git push origin main   # Push to main branch
```

### 3. Changes on Wrong Branch
**Problem**: Changes are on a feature branch, not `main`
**Solution**: 
- Merge your feature branch into `main`
- Or create a Pull Request and merge it

### 4. GitHub Pages Not Enabled
**Problem**: Repository isn't configured for GitHub Pages
**Check**: Repository Settings → Pages → Ensure "Source" is set to deploy from `main` branch

### 5. Deployment Failed
**Problem**: Build or deployment errors
**Solution**: 
- Check the Actions tab for error messages
- Review the deployment logs
- Fix any errors in your code

## Complete Workflow to Deploy Changes

### Step-by-Step

1. **Make your changes in VS Code**
   - Edit files
   - Save files (Ctrl+S / Cmd+S)

2. **Check what changed**
   ```bash
   git status
   git diff
   ```

3. **Stage your changes**
   ```bash
   git add .
   # or stage specific files:
   git add index.html
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Describe what you changed"
   ```

5. **Push to GitHub**
   ```bash
   git push origin main
   ```

6. **Verify deployment**
   - Go to GitHub Actions tab
   - Wait for "pages build and deployment" to complete (1-2 minutes)
   - Visit your live site to see changes

### Using VS Code GUI

1. Open Source Control panel (Ctrl+Shift+G)
2. Review changed files
3. Click `+` to stage changes
4. Type commit message
5. Click checkmark ✓ to commit
6. Click sync/push button ↑

## Troubleshooting

### "VS Code says deployed but I don't see changes"

1. **Check which branch you're on**:
   ```bash
   git branch
   ```
   You should see `* main` (asterisk next to main)

2. **Check if changes were pushed**:
   ```bash
   git log origin/main..main
   ```
   If this shows commits, they haven't been pushed yet.

3. **Push the changes**:
   ```bash
   git push origin main
   ```

### Changes on website don't match GitHub

**Cause**: Browser cache
**Solution**: 
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or open in incognito/private mode

### Deployment is taking too long

- Normal deployment: 1-3 minutes
- Check Actions tab for status
- If stuck, check for workflow errors

## Important Notes

⚠️ **GitHub Pages deploys from `main` branch only** (by default)
- Changes on other branches won't be deployed until merged to `main`

⚠️ **Deployment is automatic**
- You don't manually trigger deployment
- Pushing to `main` automatically triggers it

⚠️ **Save ≠ Commit ≠ Push ≠ Deploy**
- **Save**: Updates file on your computer
- **Commit**: Records changes in Git history
- **Push**: Sends commits to GitHub
- **Deploy**: GitHub Pages publishes to the web

## Quick Reference Commands

```bash
# Check status
git status
git log origin/main..main

# Deploy workflow (push to main)
git add .
git commit -m "Your changes"
git push origin main

# Check your branch
git branch

# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# View deployment URL
# Check: https://github.com/cmc-creator/Reception/settings/pages
```

## Need Help?

1. Check the Actions tab for deployment logs
2. Run `git status` to see what's uncommitted
3. Run `git log origin/main..main` to see what's unpushed
4. See [SYNCING_VS_CODE_CHANGES.md](./SYNCING_VS_CODE_CHANGES.md) for Git basics

---

**Remember**: For your changes to appear on the live website, they must be:
1. ✅ Saved in files
2. ✅ Committed to Git
3. ✅ Pushed to GitHub
4. ✅ On the `main` branch
5. ✅ Successfully deployed by GitHub Pages (check Actions tab)
