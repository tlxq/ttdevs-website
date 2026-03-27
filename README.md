# TT Devs Portfolio

A high-performance, modern web application designed for Tom and Therese (TT Devs). This project serves as a technical showcase, blending a custom interactive terminal interface with a sophisticated, fluid developer portfolio.

## Project Overview

The application is engineered for speed, responsiveness, and a unique user experience. It transitions from a retro-modern CLI environment into a clean, professional landing page, demonstrating expertise in both interactive frontend logic and robust backend integrations.

## Core Features

- **Interactive Terminal Interface:** A custom-built CLI entry point featuring command-line simulations, dynamic typing effects, and seamless state transitions.
- **Fluid UI/UX:** High-performance smooth scrolling and scroll snapping implemented via Lenis for a cinematic browsing experience.
- **Responsive Architecture:** Fully optimized for all viewports with a "mobile-first" approach and accessibility-first components.
- **Enterprise-Grade Contact System:** Secure serverless contact form with built-in rate limiting, honeypot protection, and transactional email delivery.
- **Performance Optimized:** Leveraging Next.js Server Components and optimized asset delivery for near-instant load times.

## Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strictly Typed)
- **Styling:** Tailwind CSS v4 (Modern CSS Architecture)
- **Animation:** Framer Motion (Declarative animations) & Lenis (Smooth scroll)
- **Typography:** Geist & Mono variants for professional readability.

### Backend & Infrastructure
- **API Support:** Next.js Route Handlers (Serverless)
- **Email Delivery:** Resend API integration.
- **Data & Security:** Environment-driven configuration with rate-limiting and security headers.
- **Deployment:** Optimized for Vercel/Edge environments.

## Technical Highlights

### Component Architecture
The project follows a modular, atomic design pattern. UI primitives are abstracted into a shared library (`app/lib/components`), ensuring consistency and reusability across the terminal and portfolio sections.

### Performance & Motion
Animations are carefully calibrated using Framer Motion's hardware-accelerated transitions. The integration of Lenis ensures that scroll-based animations remain synchronized with the user's natural input, providing a premium feel without sacrificing performance.

### Security Implementation
The contact API features custom rate-limiting logic based on IP tracking to prevent automated spam. A silent honeypot mechanism further filters out bot submissions without interrupting the user experience for legitimate inquiries.

---

Built for performance and scalability by Tom & Therese.
