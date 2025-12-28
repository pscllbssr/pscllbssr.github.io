# Image Optimization Guide

## How it works

Your site now uses Astro's built-in image optimization which automatically:
- ✅ Converts images to modern WebP format
- ✅ Creates responsive sizes
- ✅ Optimizes quality for web
- ✅ Lazy loads images

## For Profile/Static Images (like pascal.jpg)

**Where to put them:** `src/assets/images/`

**How to use:**
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/images/your-image.jpg';
---

<Image 
  src={myImage} 
  alt="Description"
  width={600}
  height={400}
  format="webp"
  quality={85}
/>
```

## For Blog Post Hero Images

**Where to put them:** `public/images/blog/`

**How to reference:** In your blog post frontmatter:
```yaml
---
title: "Your Blog Post"
heroImage: "/images/blog/your-image.jpg"
---
```

The image will be displayed with lazy loading.

## Workflow

### Option 1: Simple (Current Setup)
1. Drop your high-res JPG/JPEG into `public/images/blog/`
2. Reference it in the frontmatter
3. Astro will serve it with lazy loading

### Option 2: Full Optimization (Recommended)
1. Put images in `src/assets/images/blog/`
2. Import them in the blog post template
3. They'll be automatically converted to WebP and optimized

## Converting Existing Images to WebP (Optional)

If you want to manually convert images to WebP, run:

```bash
# Install imagemagick (one-time)
brew install imagemagick

# Convert a single image
magick convert input.jpg -quality 85 output.webp

# Batch convert all JPGs in a folder
for file in *.jpg; do magick convert "$file" -quality 85 "${file%.jpg}.webp"; done
```

## Current Setup

- ✅ Profile photo (`pascal.jpg`) is optimized via Astro Image
- ✅ Blog images use lazy loading
- ✅ Ready for WebP conversion when you want it
