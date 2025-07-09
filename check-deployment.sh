#!/bin/bash

# GitHub Pages Deployment Verification Script
# This script helps verify that your project is properly configured for GitHub Pages

echo "🔍 Checking GitHub Pages deployment configuration..."
echo

# Check if vite.config.js exists and has relative base path
if [ -f "vite.config.js" ]; then
    echo "✅ vite.config.js exists"
    if grep -q "base: './'," vite.config.js; then
        echo "✅ Relative base path configured correctly"
    else
        echo "❌ Base path not set to relative - check vite.config.js"
    fi
else
    echo "❌ vite.config.js not found"
fi

# Check if GitHub Actions workflow exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions deploy workflow exists"
else
    echo "❌ GitHub Actions workflow not found"
fi

# Check if dist folder exists (after build)
if [ -d "dist" ]; then
    echo "✅ dist folder exists (project has been built)"
    
    # Check if paths in built index.html are relative
    if grep -q 'src="\./assets/' dist/index.html; then
        echo "✅ JavaScript assets use relative paths"
    else
        echo "❌ JavaScript assets may not use relative paths"
    fi
    
    if grep -q 'href="\./assets/' dist/index.html; then
        echo "✅ CSS assets use relative paths"
    else
        echo "❌ CSS assets may not use relative paths"
    fi
else
    echo "⚠️  dist folder not found - run 'npm run build' first"
fi

# Check if development files exist
echo
echo "🔍 Checking development setup..."

if [ -f "src/main.js" ]; then
    echo "✅ src/main.js exists"
    if grep -q "import './style.css';" src/main.js; then
        echo "✅ CSS import in main.js is correct"
    else
        echo "⚠️  CSS import may be incorrect in main.js"
    fi
else
    echo "❌ src/main.js not found"
fi

if [ -f "src/style.css" ]; then
    echo "✅ src/style.css exists"
else
    echo "❌ src/style.css not found"
fi

# Check if servers can start
echo
echo "� Checking server configuration..."

# Check if port 3000 is free for dev server
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is in use (dev server may be running)"
else
    echo "✅ Port 3000 is available for dev server"
fi

# Check if port 4173 is free for preview server
if lsof -Pi :4173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 4173 is in use (preview server may be running)"
else
    echo "✅ Port 4173 is available for preview server"
fi

echo
echo "�📋 Next steps for GitHub Pages deployment:"
echo "1. Push your code to GitHub"
echo "2. Go to repository Settings → Pages"
echo "3. Set source to 'GitHub Actions'"
echo "4. Push to main branch to trigger deployment"
echo
echo "🌐 Your site will be available at: https://yourusername.github.io/repository-name"
echo
echo "🔧 To fix MIME type errors:"
echo "• Use 'npm run dev' for development (not direct file access)"
echo "• Use 'npm run preview' for testing built version"
echo "• Clear browser cache if issues persist"
echo "• See MIME-TYPE-FIX.md for detailed troubleshooting"
