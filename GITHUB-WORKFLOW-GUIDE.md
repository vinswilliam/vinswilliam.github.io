# How to Use GitHub Workflow for Automatic Deployment

## 🎯 What the Workflow Does

Your GitHub workflow automatically:
1. **Builds** your portfolio when you push code
2. **Deploys** it to GitHub Pages
3. **Updates** your live site at `https://vinswilliam.github.io/`

## 🚀 Step-by-Step Setup

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/vinswilliam/vinswilliam.github.io`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **"GitHub Actions"**
5. Save the settings

### Step 2: Push Your Code
Every time you push to the `main` branch, the workflow automatically runs:

```bash
# Make your changes to files
git add .
git commit -m "Update portfolio content"
git push origin main
```

### Step 3: Watch the Deployment
1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see the "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (usually 2-5 minutes)

## 📋 Workflow Breakdown

### What Happens When You Push:

```yaml
# 1. Triggers on push to main branch
on:
  push:
    branches: [ main ]

# 2. Sets up Ubuntu environment
runs-on: ubuntu-latest

# 3. Installs Node.js and dependencies
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'

# 4. Installs your project dependencies
- name: Install dependencies
  run: npm ci

# 5. Builds your project
- name: Build
  run: npm run build

# 6. Deploys to GitHub Pages
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

## 🔍 Monitoring Your Deployments

### Check Workflow Status:
1. **GitHub Repository** → **Actions** tab
2. Look for "Deploy to GitHub Pages" workflows
3. **Green checkmark** = successful deployment
4. **Red X** = failed deployment (check logs)

### View Deployment Logs:
1. Click on a workflow run
2. Click on the "build-and-deploy" job
3. Expand each step to see detailed logs
4. Look for any error messages

## 🛠️ Common Workflow Operations

### Manual Trigger (if needed):
1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages"
3. Click **"Run workflow"** button
4. Select branch and click **"Run workflow"**

### Check Build Output:
```bash
# The workflow runs these commands:
npm ci          # Install dependencies
npm run build   # Build your project
# Then uploads the dist/ folder to GitHub Pages
```

### Deployment Timeline:
- **Push code** → Workflow starts immediately
- **Build time** → 1-3 minutes
- **Deployment** → 1-2 minutes
- **Live update** → Additional 1-2 minutes

## 🎨 Workflow Features

### ✅ Automatic Deployment
- No manual steps required
- Triggers on every push to main
- Handles build and deployment

### ✅ Error Handling
- Shows detailed error messages
- Fails safely without breaking your site
- Easy to debug with logs

### ✅ Optimized Build
- Uses Node.js 18
- Caches dependencies for faster builds
- Minifies assets for production

### ✅ Security
- Uses official GitHub actions
- Proper permissions configuration
- No sensitive data exposure

## 🔧 Troubleshooting

### If Deployment Fails:
1. **Check Actions tab** for error details
2. **Common issues:**
   - Build errors (check your code)
   - Missing dependencies (check package.json)
   - Vite configuration issues

### If Site Doesn't Update:
1. **Clear browser cache** (Ctrl+Shift+R)
2. **Wait 5-10 minutes** for CDN update
3. **Check workflow completed successfully**

### If CSS/JS Not Loading:
1. **Verify vite.config.js** has correct base path
2. **Check build output** in workflow logs
3. **Test locally** with `npm run build && npm run preview`

## 📝 Workflow Files

### Current Configuration:
- **File**: `.github/workflows/deploy.yml`
- **Triggers**: Push to main branch
- **Node Version**: 18
- **Build Command**: `npm run build`
- **Deploy Target**: GitHub Pages

### Making Changes:
If you need to modify the workflow:
1. Edit `.github/workflows/deploy.yml`
2. Commit and push changes
3. The updated workflow will be used for next deployment

## 🎉 Ready to Use!

Your workflow is already configured and ready! Just:

1. **Push your code** → `git push origin main`
2. **Wait for deployment** → Check Actions tab
3. **View your site** → `https://vinswilliam.github.io/`

The workflow will handle everything automatically! 🚀
