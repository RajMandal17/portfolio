# Portfolio Website

## Overview

This is a professional portfolio website for Rajkumar Mandal, a Java Backend Developer specializing in microservices and Spring Boot. The application is built as a modern full-stack web application with a React frontend and Express backend, featuring a comprehensive showcase of skills, experience, GitHub integration, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **UI Library**: Radix UI components with shadcn/ui for consistent, accessible design system
- **Styling**: Tailwind CSS with custom design tokens and dark/light theme support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Development**: Hot module replacement and development server integration
- **Storage**: In-memory storage implementation with interface-based design for future database integration
- **API Design**: RESTful API structure with centralized error handling

### Component Architecture
- **Design System**: Modular component library with consistent styling and behavior
- **Layout**: Single-page application with smooth scrolling navigation between sections
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes
- **Accessibility**: ARIA-compliant components with keyboard navigation support

### Data Management
- **GitHub Integration**: Real-time fetching of repositories, user profile, and contribution data
- **Caching Strategy**: Intelligent caching with stale-while-revalidate patterns for GitHub API calls
- **Email Service**: EmailJS integration for contact form submissions
- **Static Data**: Local TypeScript modules for resume and skills data management

### Development Workflow
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: ESLint and Prettier integration with modern JavaScript standards
- **Build Process**: Separate client and server builds with optimized production assets
- **Hot Reloading**: Development environment with instant feedback and error overlays

## External Dependencies

### Third-Party Services
- **GitHub API**: Repository data, user profiles, and contribution graphs
- **EmailJS**: Contact form email delivery service
- **Cal-Heatmap**: Contribution calendar visualization library
- **Google Fonts**: Inter font family for consistent typography

### Development Tools
- **Replit Integration**: Development environment plugins and error handling
- **Font Awesome**: Icon library for consistent iconography
- **D3.js**: Data visualization support for contribution charts

### UI Component Library
- **Radix UI**: Accessible, unstyled component primitives
- **Lucide React**: Modern icon library with consistent styling
- **Embla Carousel**: Touch-friendly carousel implementation

### Database Preparation
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Database Schema**: User table structure ready for authentication features
- **Migration System**: Database schema versioning and deployment tools

The architecture is designed for scalability and maintainability, with clear separation of concerns and preparation for future enhancements like user authentication and dynamic content management.