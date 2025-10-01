# Backend for Voting for Ideas Project

Backend service for managing ideas and voting system built with **Express.js**, **TypeScript**, and **PostgreSQL**.

---

## Getting Started

### Prerequisites

-   Node.js (version 18 or higher)
-   Docker and Docker Compose

### Installation & Setup

1. **Environment Configuration**

    ```bash
    cp .env.example .env
    # Fill in your environment variables in the .env file
    ```

2. **Database Setup**

    ```bash
    docker-compose up -d
    ```

3. **Database Migration & Seeding**

    ```bash
    npm run prisma:gen
    npm run seed
    ```

4. **Running the Application**

    ```bash
    # Development mode
    npm run dev

    # Production mode
    npm run build
    npm start
    ```

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (IP detection, error handling)
│   ├── config/          # Configuration files
│   ├── prisma/          # Database schema and migrations
│   ├── types/           # TypeScript type definitions
│   └── errors/          # Error classes and handlers
├── docker-compose.yml   # Database container configuration
└── .env.example         # Environment variables template
```

---

## Backend Features

-   **IP Address Detection**: Custom middleware to extract client IP addresses with support for proxy headers (`X-Forwarded-For`).
-   **Extended Express Types**: TypeScript declarations for custom request properties (`clientIp`, `clientIps`).
-   **API Routes**:
    -   `GET /api` — Retrieve all ideas with voting status
    -   `POST /api/vote` — Submit a vote for an idea
-   **Voting Logic**:
    -   IP-based voting with maximum vote limits (10 votes per IP)
    -   Duplicate vote prevention
    -   Transaction-safe vote recording
-   **Error Handling**: Centralized error handling with custom error classes
-   **Security**:
    -   Rate limiting
    -   Proxy trust configuration
    -   Input validation
-   **Database**: Prisma ORM with PostgreSQL for data persistence

---

## Technology Stack

-   **Runtime**: Node.js with Express.js
-   **Language**: TypeScript
-   **Database**: PostgreSQL with Prisma ORM
-   **Containerization**: Docker & Docker Compose
-   **Validation**: Zod schema validation
-   **Security**: Express Rate Limit

---

## API Documentation

### Get Ideas

```http
GET /api
```

Returns list of all ideas with voting information for the current client IP.

---

### Submit Vote

```http
POST /api/vote
Content-Type: application/json

{
  "ideaId": "string"
}
```

Submits a vote for the specified idea. Limited to **10 votes per IP address**.

---

## Configuration

The application supports various environment configurations:

-   `TRUST_PROXY` — Configure proxy trust settings (`true`, `false`, or specific IP ranges)
-   Database connection settings
-   Rate limiting parameters

For detailed configuration options, refer to the `.env.example` file.
