# Quiz Builder Project

## Tech Stack

- **Frontend:** React, TypeScript, Vite, React Router, React Hook Form
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Styling:** CSS Modules
- **API:** REST

---

## Getting Started

### Prerequisites

- Node.js installed (recommended version 16+)
- PostgreSQL or another database system installed (if applicable)
- Clone the repository

---

### Database Setup

1. Create a database, for example, `quiz_builder`.
2. Create a `.env` file in the root folders of both `backend` and `frontend` (if needed).
3. Specify the database connection string in `backend/.env`:

DATABASE_URL=postgresql://username:password@localhost:5432/quiz_builder

4. Run migrations (if any) to initialize the database schema:

```bash
cd backend
npm install
npm run migrate
```

## Running the Backend

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server with hot reload:

```bash
npm run dev
```

The backend server will listen on the configured port (e.g., http://localhost:4000).

## Running the Frontend

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173 or the address shown in the terminal.

## Running Frontend and Backend Concurrently

To run both the frontend and backend servers at the same time, you can use the `concurrently` package.

Make sure `concurrently` is installed (usually as a dev dependency in the root folder):

```bash
npm install concurrently --save-dev
```

Add a script in your root package.json like this:

```bash
"scripts": {
  "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""
}
```

Then run:

```bash
npm start
```

This will start both the backend and frontend servers simultaneously, showing their output in the same terminal window.

## Creating a Sample Quiz

- Navigate to the quiz creation page in your browser (e.g., http://localhost:5173/create).

- Enter the quiz title.

- Add questions with different types (Boolean, Input, Checkbox).

- Fill in answer options if applicable.

- Save the quiz.

- Go back to the home page to see your new quiz listed.

This is the basic workflow to get you started with the project.
