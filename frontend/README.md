# Frontend for Voting for Ideas Project

Frontend application for voting system built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

-   Node.js (version 18 or higher)
-   Backend server running (see backend README)

### Installation & Setup

1. **Environment Configuration**

    ```bash
    cp .env.example .env
    # Fill in your environment variables in the .env file
    # VITE_BASE_URL should point to your backend server
    # VITE_PORT should point to your backend port
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Running the Application**

    ```bash
    # Development mode
    npm run dev

    # Production build
    npm run build
    npm run preview
    ```

---

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── TheTable/      # Main table component
│   │   ├── ListDataBar/   # Individual idea row
│   │   └── UI/            # Reusable UI components
│   ├── utils/          # Utility functions and API calls
│   └── config/         # Configuration files
|   |__ styles/         # Global SCSS styles
├── public/             # Static assets
└── .env.example        # Environment variables template
```

---

## Frontend Features

-   **Idea Display**: Shows all ideas with names, descriptions, and current vote counts.
-   **Voting System**:
    -   Vote buttons for each idea.
    -   Visual feedback for already voted ideas ("voted" on disabled button).
    -   Automatic disabling of all buttons after 10 votes.
    -   Optimistic UI updates for instant feedback.
-   **SCSS**: SCSS-based styling.
-   **Error Handling**: User-friendly error messages for API failures.
-   **Loading States**: Loading indicators during data fetching.

---

## Key Components

-   **TheTable**: Main container that fetches and displays the list of ideas.
-   **ListDataBar**: Individual row component for each idea.
-   **CustomButton**: Reusable button with different states (vote/voted/expired).

---

## Technology Stack

-   **Framework**: React with TypeScript
-   **Build Tool**: Vite
-   **Styling**: SCSS modules
-   **HTTP Client**: Axios
-   **State Management**: React hooks (`useState`, `useEffect`, `useCallback`)

---

## Environment Variables

-   `VITE_BASE_URL` - Base URL for backend API
-   `VITE_PORT` - Basde Port for backend API

---

## API Integration

The frontend communicates with the backend through two main endpoints:

-   `GET /api` - Retrieves all ideas with current vote status
-   `POST /api/vote` - Submits a vote for a specific idea
