# Web Portfolio

A modern, futuristic web portfolio built with Vite and vanilla JavaScript, featuring smooth animations and interactive elements.

## ✨ Features

- **Modern Design**: Clean, futuristic aesthetic with dark themes and neon accents
- **Smooth Animations**: CSS transitions, scroll animations, and interactive hover effects
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Working Contact Form**: EmailJS integration for real email sending
- **Interactive Elements**: Typewriter effect, animated progress indicators, and smooth scrolling
- **Performance Optimized**: Efficient animations using CSS transforms and requestAnimationFrame
- **Accessibility**: Semantic HTML and ARIA labels for better accessibility

## 🚀 Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern features including Grid, Flexbox, and Custom Properties
- **JavaScript (ES6+)**: Modern JavaScript features and APIs
- **Vite**: Fast build tool and development server
- **Google Fonts**: Orbitron and Exo 2 for futuristic typography

## 🎨 Design Elements

### Color Scheme
- Primary: Cyan (`#00ffff`)
- Secondary: Magenta (`#ff00ff`) 
- Accent: Green (`#00ff00`)
- Background: Dark grays (`#0a0a0a`, `#1a1a1a`, `#2a2a2a`)

### Animations
- Fade-in animations on scroll
- Floating geometric shapes
- Typewriter effect for hero subtitle
- Animated skill progress bars
- Smooth hover transitions

## 📱 Sections

1. **Hero Section**: Animated introduction with typewriter effect and floating shapes
2. **About Section**: Personal information with animated statistics
3. **Skills Section**: Interactive skill bars with progress animations
4. **Projects Section**: Portfolio showcase with hover effects
5. **Contact Section**: Contact form with validation and contact information
6. **Footer**: Social links and copyright information

## 🛠️ Installation & Setup

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Option 2: GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: 
   - Push changes to `main` or `master` branch
   - GitHub Actions workflow automatically builds and deploys
   - Site will be available at `https://yourusername.github.io/repository-name`

2. **GitHub Pages Setup**:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"
   - The included workflow (`.github/workflows/deploy.yml`) handles everything

3. **Important GitHub Pages Configuration**:
   - For `username.github.io` repos: uses `base: '/'` in `vite.config.js`
   - For project repos: uses `base: './'` in `vite.config.js`
   - All CSS, JavaScript, and image files will load correctly

4. **Manual GitHub Pages Deployment**:
   ```bash
   npm run build
   # Then push the dist/ folder or use the GitHub Actions workflow
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎯 Key Features Implementation

### Typewriter Effect
Dynamic text animation cycling through different roles/descriptions.

### Intersection Observer
Efficient scroll-based animations that trigger when elements come into view.

### Smooth Scrolling
Custom smooth scrolling implementation for navigation links.

### Mobile Navigation
Responsive hamburger menu with smooth animations.

### Form Validation
Client-side form validation with custom notification system.

### Performance Monitoring
Built-in FPS monitoring to ensure smooth animations across devices.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: `< 480px`
- Tablet: `481px - 768px`
- Desktop: `> 768px`

## 🎨 Customization

### Colors
Modify the CSS custom properties in `src/style.css`:

```css
:root {
  --primary-color: #00ffff;
  --secondary-color: #ff00ff;
  --accent-color: #00ff00;
  /* ... other variables */
}
```

### Content
Update the content in `index.html` and modify the typewriter texts in `src/main.js`:

```javascript
const typewriterTexts = [
  'Full Stack Developer',
  'UI/UX Designer',
  'Creative Problem Solver',
  'Tech Enthusiast'
];
```

## 📧 Contact Form Setup

The contact form is configured to send emails using EmailJS. To make it functional:

1. **Set up EmailJS** (Recommended):
   - Follow the detailed guide in `emailjs-setup.md`
   - Update the configuration in `src/main.js` with your credentials

2. **Alternative: Use Formspree**:
   - Check `formspree-alternative.js` for simpler setup
   - Replace the contact form function as instructed

3. **Quick Start with Formspree**:
   ```bash
   # Go to https://formspree.io/
   # Create account and get your form endpoint
   # Update the form action in the code
   ```

## 🔧 Development Notes

- Uses modern CSS features like CSS Grid and Flexbox
- Implements CSS custom properties for easy theming
- Follows accessibility best practices
- Optimized for performance with efficient animations
- Mobile-first responsive design approach

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Contact

For any questions or feedback, please reach out through the contact form on the website or via:

- Email: hello@portfolio.dev
- GitHub: [@yourusername](https://github.com/yourusername)
---

Made with ❤️ and modern web technologies
