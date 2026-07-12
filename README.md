# OP Institute of Studies & OP Kids Pre School

Premium, modern, responsive website for OP Institute of Studies and OP Kids Pre School.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Hook Form + Zod** (form validation)
- **next-themes** (dark mode)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Pages and routing
├── components/       # Reusable UI components
│   ├── home/         # Home page sections
│   ├── layout/       # Navbar, Footer, etc.
│   ├── forms/        # Contact & Admission forms
│   └── ui/           # Shared UI primitives
├── data/             # Site content and data
└── lib/              # Utilities and schemas
```

## Customization

- Update contact info, address, and social links in `src/data/site.ts`
- Modify courses in `src/data/courses.ts`
- Add faculty members in `src/data/faculty.ts`
- Replace placeholder images with your own

## Deployment

Deploy to Vercel, Netlify, or any Node.js hosting platform. The project is production-ready.

## Features

- Premium responsive UI with glassmorphism and gradients
- OP Kids Pre School focus with colorful dedicated page
- SEO optimized with metadata, sitemap, and robots.txt
- Dark mode support
- Floating WhatsApp & call buttons
- Animated statistics counter
- Scroll reveal animations
- Form validation with React Hook Form + Zod
- Image lazy loading via Next.js Image
