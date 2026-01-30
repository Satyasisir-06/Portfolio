# Satya Sisir - Portfolio

A premium, dark, luxury animated portfolio with 3D Three.js hero section, smooth Framer Motion animations, and responsive design.

## Features

- 🎨 3D rotating abstract ring with gradient materials
- ✨ Smooth cinematic animations
- 📱 Fully responsive, mobile-first design
- 🚀 Adaptive 3D performance for all devices
- 🌙 Dark luxury aesthetic
- 🎯 Awwwards-level quality

## Tech Stack

- Next.js 14
- React 18
- Three.js / @react-three/fiber / @react-three/drei
- Tailwind CSS
- Framer Motion
- TypeScript

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The static export will be in the `out` folder.

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to Repository Settings → Pages
3. Select "GitHub Actions" as source
4. The site will auto-deploy on push to main

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── HeroCanvas.tsx      # 3D rotating ring
    ├── HeroSection.tsx     # Hero with text & CTAs
    ├── Navigation.tsx      # Responsive navbar
    ├── AboutSection.tsx    # About with profile photo
    ├── SkillsSection.tsx   # Skills with animations
    ├── EducationSection.tsx # Education details
    ├── ServicesSection.tsx # Services cards
    ├── ContactSection.tsx  # Contact form
    └── Footer.tsx          # Footer
```

## Customization

Edit `src/app/page.tsx` to modify section order.
Edit component files to update content.

## License

MIT
