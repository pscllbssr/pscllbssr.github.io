# Portfolio Website

A minimal, single-page portfolio website built with Astro and deployed to GitHub Pages.

## 🎨 Design Philosophy

- **Minimalist**: Black and white color scheme with generous whitespace
- **Typography-focused**: Clean, modern sans-serif fonts
- **Responsive**: Mobile-first design that looks excellent on all devices
- **Performance**: Fast loading times with static generation
- **Accessible**: Semantic HTML and proper ARIA labels

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:4321`

## 📝 Development

### Project Structure

```
/
├── public/
│   ├── images/
│   │   └── pascal.jpg          # Your profile photo
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.astro          # Hero section with animated text
│   │   ├── Projects.astro      # Featured projects
│   │   ├── OwnProjects.astro   # Personal projects
│   │   ├── Blog.astro          # Blog section (placeholder)
│   │   ├── Contact.astro       # Contact form
│   │   └── Footer.astro        # Footer
│   ├── pages/
│   │   ├── index.astro         # Main page
│   │   └── blog/
│   │       └── [slug].astro    # Blog post template
│   └── styles/
│       └── global.css          # Global styles
├── astro.config.mjs
└── package.json
```

### Available Commands

| Command           | Action                                       |
|:------------------|:---------------------------------------------|
| `pnpm install`    | Install dependencies                         |
| `pnpm dev`        | Start local dev server at `localhost:4321`   |
| `pnpm build`      | Build production site to `./dist/`           |
| `pnpm preview`    | Preview your build locally before deploying  |

## 🖼️ Adding Your Profile Photo

1. Add your profile photo to `public/images/pascal.jpg`
2. Recommended dimensions: 400x400px or larger (square aspect ratio)
3. Supported formats: JPG, PNG, WebP

## 📧 Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) (free tier):

1. Go to https://web3forms.com/
2. Create a free account
3. Get your access key
4. Open `src/components/Contact.astro`
5. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key

## 🌐 Deployment to GitHub Pages

### Initial Setup

1. **Create a GitHub repository** for your portfolio

2. **Update `astro.config.mjs`**:
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     // If deploying to a repo other than yourusername.github.io:
     // base: '/your-repo-name',
   });
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

4. **Push your code**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

The GitHub Action will automatically build and deploy your site. You can monitor the deployment in the "Actions" tab of your repository.

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in repository settings

## 🎯 Customization

### Update Personal Information

1. **Email**: Update the email link in `src/components/Hero.astro`
2. **Social Links**: Modify links in `src/components/Hero.astro`
3. **Projects**: Edit the projects array in `src/components/Projects.astro`

### Styling

All global styles are in `src/styles/global.css`. The design uses CSS custom properties (variables) for easy theming:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #000000;
  --color-gray: #666666;
  --spacing-md: 2rem;
  /* ... */
}
```

### Adding Blog Posts

Blog functionality is prepared but requires implementation:

1. Install `@astrojs/mdx` for markdown support
2. Create content collections in `src/content/blog/`
3. Update `src/pages/blog/[slug].astro` to render posts
4. Update `src/components/Blog.astro` to list posts

## 📱 Responsive Breakpoints

The design uses these breakpoints:

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🛠️ Technologies

- **Astro 4.0** - Static site generator
- **TypeScript** - Type safety
- **Pure CSS** - No framework dependencies
- **Web3Forms** - Form handling
- **GitHub Pages** - Free hosting

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 🤝 Contributing

This is a personal portfolio, but suggestions and bug reports are welcome!

---

Built with ❤️ using Astro
