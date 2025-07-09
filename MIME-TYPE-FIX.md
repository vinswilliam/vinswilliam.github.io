# MIME Type Error Troubleshooting Guide

## Problem
Error: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/css"`

## Root Cause
This error occurs when the browser tries to load a CSS file as a JavaScript module, typically when:
1. Accessing the HTML file directly (file://) instead of through a server
2. Server configuration issues with MIME types
3. Browser cache issues

## Solutions

### ✅ Solution 1: Use the Development Server (Recommended)
Always use the Vite development server, not direct file access:

```bash
# ✅ Correct way
npm run dev
# Then open http://localhost:3000

# ❌ Wrong way - Don't open index.html directly in browser
```

### ✅ Solution 2: Clear Browser Cache
1. Open browser DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Ctrl+Shift+R (Cmd+Shift+R on Mac)

### ✅ Solution 3: For Production/Built Version
Use the preview server for testing the built version:

```bash
npm run build
npm run preview
# Then open http://localhost:4173
```

### ✅ Solution 4: For GitHub Pages
Ensure you're accessing the GitHub Pages URL, not the repository files directly:

```
✅ Correct: https://yourusername.github.io/repository-name
❌ Wrong: https://github.com/yourusername/repository-name/blob/main/index.html
```

### ✅ Solution 5: GitHub Pages Repository Type Fix
**For `username.github.io` repositories:**

If your URL is `https://username.github.io/` (not `https://username.github.io/project-name/`), you need absolute paths:

```javascript
// vite.config.js
export default defineConfig({
  base: '/', // ✅ For username.github.io repos
})
```

**For project repositories:**

If your URL is `https://username.github.io/project-name/`, you need relative or project-specific paths:

```javascript
// vite.config.js  
export default defineConfig({
  base: './', // ✅ For project repos
})
```

After changing the config:
```bash
npm run build
git add .
git commit -m "Fix GitHub Pages paths"
git push origin main
```

## Quick Fixes

### Fix 1: Restart Development
```bash
# Stop any running processes
pkill -f "vite"

# Clean and restart
rm -rf node_modules/.vite
npm run dev
```

### Fix 2: Check File Structure
Ensure your files are in the correct locations:
```
project/
├── index.html          ✅ Main HTML file
├── src/
│   ├── main.js         ✅ Main JavaScript file
│   └── style.css       ✅ CSS file
├── package.json        ✅ Dependencies
└── vite.config.js      ✅ Vite configuration
```

### Fix 3: Verify Import Statement
In `src/main.js`, ensure CSS import is correct:
```javascript
import './style.css';  // ✅ Correct relative path
```

## Browser-Specific Issues

### Chrome/Edge
- Clear cache: DevTools → Application → Storage → Clear site data
- Disable cache: DevTools → Network → Disable cache (while DevTools open)

### Firefox
- Clear cache: Ctrl+Shift+Delete → Select "Cache" → Clear
- Hard refresh: Ctrl+F5

### Safari
- Clear cache: Develop → Empty Caches
- Hard refresh: Cmd+Option+R

## Prevention

1. **Always use development server** for local development
2. **Never open HTML files directly** in browser during development
3. **Use the correct URLs** for accessing deployed sites
4. **Keep browser cache clear** during development

## If Error Persists

1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. Check browser console for additional errors
3. Verify network requests in DevTools → Network tab
4. Ensure no other processes are using port 3000

## Verification Commands

```bash
# Check if dev server is running correctly
curl http://localhost:3000

# Check if main.js is accessible
curl http://localhost:3000/src/main.js

# Check if style.css is accessible  
curl http://localhost:3000/src/style.css
```

All responses should return the file contents, not 404 errors.
