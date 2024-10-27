# Personal Portfolio Website - [![Firebase Hosting Status](https://img.shields.io/badge/Firebase%20Hosting-Live-brightgreen?logo=firebase&logoColor=white)](https://portfolio-mfarah.web.app/)

A modern, responsive portfolio website built with React, TypeScript, and Firebase. Features a beautiful animated starry background, dark/light theme support, a seamless contact system, and a test-driven development approach for reliability and robustness.

[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-ffca28?logo=Firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE.svg?logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18.svg?logo=vitest&logoColor=white)](https://vitest.dev/)

## Features

- Interactive animated starfield background that responds to theme changes
- Dark/light theme support with persistent user preference
- Fully responsive design for all screen sizes
- Secure contact form with Google Authentication
- Real-time data fetching with Firebase
- Built with Vite for optimal performance
- Styled with Tailwind CSS for modern, maintainable styling
- Accessibility-focused development with ARIA labels and semantic HTML

## Structure

```
src/
├── components/        # React components
├── sections/          # Main content section components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── firebase/          # Firebase configuration
```

## Key Components

- `StarryBackground`: Dynamic starfield animation with theme-aware colouring
- `NavigationPanel`: Main navigation with social links and contact form
- `ThemeToggle`: Theme switcher with animated icons
- `ContactForm`: Google-authenticated contact form
- `ProjectCard`: Display component for portfolio projects
- `TimelineItem`: Experience timeline visualisation

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/michael-farah/portfolio.git
   cd portfolio
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up Firebase

   - Create a new Firebase project
   - Enable Authentication with Google provider
   - Create a Realtime Database
   - Add your Firebase configuration to `.env`:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Seed the database (optional)

   ```bash
   node scripts/seedDatabase.cjs
   ```

5. Start the development server

   ```bash
   pnpm dev
   ```

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests with Vitest and Testing Library for TDD
- `pnpm lint` - Run ESLint

## Deployment

The site is configured for Firebase Hosting. Deploy using:

```bash
pnpm build
firebase deploy
```

<p align="center">
  Made with ❤️ by <a href="https://github.com/michael-farah">Michael Farah</a>
</p>
