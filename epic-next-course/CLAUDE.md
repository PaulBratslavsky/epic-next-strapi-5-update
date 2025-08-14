# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack application with separate frontend and backend:

- **Frontend**: Next.js application in `/frontend` using TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: Strapi CMS in `/backend` providing headless content management

## Development Commands

### Frontend (Next.js)
```bash
cd frontend
yarn dev          # Start development server with turbopack
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
```

### Backend (Strapi)
```bash
cd backend
yarn develop      # Start development server with auto-reload
yarn start        # Start production server
yarn build        # Build admin panel
yarn strapi       # Access Strapi CLI commands
```

## Architecture Overview

### Backend Architecture
- **Strapi v5.21.0** headless CMS
- **Content Types**: Single type `home-page` with dynamic zones
- **Components**: Reusable components like `layout.hero-section`
- **Database**: SQLite (better-sqlite3) for local development
- **API Structure**: Standard Strapi REST API at `/api/`

### Frontend Architecture
- **Next.js 15.4.6** with App Router
- **TypeScript** throughout the application
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Data Fetching**: Server-side rendering with `fetch()` API
- **Component Structure**: Custom components in `/src/components/custom/`

### Data Flow
1. Frontend fetches data from Strapi backend at `http://localhost:1337`
2. Uses `qs` library to build complex query strings for Strapi API
3. Strapi returns structured data with populated relationships
4. Components render data using TypeScript interfaces

## Key Patterns

### Strapi Data Fetching
The application uses a centralized approach for fetching Strapi data:
- Base URL configured as `http://localhost:1337`
- Complex population queries built with `qs.stringify()`
- Error handling in the `getStrapiData()` function

### Component Structure
- Components follow shadcn/ui patterns with Radix UI primitives
- Path aliases configured: `@/components`, `@/lib`, `@/utils`
- TypeScript strict mode enabled

### Content Management
- Strapi admin accessible at `http://localhost:1337/admin`
- Dynamic zones allow flexible page building
- Component-based content architecture

## Testing and Quality

- ESLint configured for Next.js and TypeScript
- No test framework currently configured
- TypeScript strict mode for type safety

## Package Management

Both frontend and backend use Yarn (v1.22.22) as the package manager.