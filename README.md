# To-Do List Backend API

Express & Node.js REST API service connected to MongoDB with Mongoose object modeling for the To-Do List Mobile Application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Middleware**: CORS, Dotenv, Custom Validator, Error Handler

---

## Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Define the required variables in `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:5173
```

> **Note**: `MONGODB_URI` must be provided as an environment variable and is never committed to source control.

---

## Installation & Running Locally

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Seed Initial Data (Optional)**:

   Generates sample tasks across current, previous, and future weeks:

   ```bash
   npm run seed
   ```

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`.

4. **Start Production Server**:

   ```bash
   npm start
   ```

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/tasks` | Get all tasks (supports `?search=query`) |
| `GET` | `/api/tasks/:id` | Get single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `PATCH` | `/api/tasks/:id/status` | Update task status (`in_progress` / `completed`) |
| `DELETE` | `/api/tasks/:id` | Delete task by ID |

---

## Example Task Payload

```json
{
  "title": "Finishing Wireframe",
  "description": "Complete UI wireframes for mobile screens and review with team.",
  "scheduledAt": "2026-08-22T10:00:00.000Z",
  "priority": "high",
  "status": "in_progress"
}
```

---

## Deployment Instructions

This backend can be deployed independently to platforms like **Render**, **Railway**, or **Vercel/AWS**:
1. Connect the `server/` repository to your deployment provider.
2. Configure environment variables (`MONGODB_URI`, `PORT`, `CLIENT_URL`).
3. Set the build command to `npm install` and start command to `npm start`.
