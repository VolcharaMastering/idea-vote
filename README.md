# Voting for Ideas Project

Full-stack application for managing and voting on ideas. The project consists of a React/TypeScript frontend and an Express/TypeScript backend with PostgreSQL database.

## Project Overview

This application allows users to:
- Get a list of ideas submitted by others
- Vote for their favorite ideas
- View real-time vote counts
- Be limited to 10 votes per IP address to ensure fair participation

The system automatically detects user IP addresses and prevents duplicate voting for the same idea while enforcing vote limits.

## Architecture

### Backend Services
- **API Server**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker & Docker Compose
- **Security**: Rate limiting, proxy trust configuration

### Frontend Application
- **Framework**: React + TypeScript + Vite
- **Styling**: SCSS modules
- **State Management**: React hooks
- **HTTP Client**: Axios

## Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- Docker and Docker Compose

### Full System Setup

#### Backend Setup
```bash
cd backend
cp .env.example .env
docker-compose up -d
npm run prisma:gen
npm run seed
npm run dev
```

#### Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

#### Access Application
- Frontend: http://localhost:5173 (Vite default)
- Backend API: http://localhost:8081 (or your configured port)

## Project Structure

```
project/
├── backend/           # API server and backend code (see ./backend)
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── middleware/      # Custom middleware (IP detection, etc.)
│   │   ├── prisma/          # Database schema and migrations
│   │   └── types/           # Type definitions
│   └── docker-compose.yml   # Database configuration
└── frontend/          # Frontend application (see ./frontend)
    ├── src/
    │   ├── components/     # React components
    │   │   ├── TheTable/      # Main table component
    │   │   ├── ListDataBar/   # Individual idea row
    │   │   └── UI/            # Reusable UI components
    │   ├── utils/          # Utility functions and API calls
    │   └── config/         # Configuration files
    ├── public/             # Static assets
    └── .env.example        # Environment variables template
```

## Key Features

### Core Functionality
- IP-based Voting: Automatic client IP detection with proxy support
- Vote Limiting: Maximum 10 votes per IP address
- Real-time Updates: Instant UI feedback after voting
- Duplicate Prevention: Cannot vote multiple times for same idea

### Technical Features
- Type Safety: Full TypeScript implementation across stack
- Error Handling: Centralized error management with user-friendly messages
- Security: Rate limiting, input validation, and secure headers
- Performance: Optimistic UI updates and efficient re-rendering

## API Endpoints
- `GET /api` - Get all ideas with current vote status
- `POST /api/vote` - Submit a vote for an idea

## Configuration

Both frontend and backend use environment variables for configuration:

- **Backend** (`./backend/.env.example`): Database connection, trust proxy settings, rate limiting
- **Frontend** (`./frontend/.env.example`): API base URL and Port

Refer to the individual `.env.example` files in each directory for complete configuration options.

## Detailed Documentation

- Backend Documentation - see `./backend/README.md`
- Frontend Documentation - see `./frontend/README.md`

## Development

The project is designed for easy development with hot-reload in both frontend and backend, type checking, and modern development tools.

For detailed development instructions, refer to the individual README files in each directory.
