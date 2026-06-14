# ProductHub — MERN Stack Application

A full-stack web application with authentication, product management, and liked products functionality built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using TypeScript.

## Live Demo

- **Frontend:** [https://product-hub-frontend.vercel.app](https://product-hub-frontend.vercel.app)
- **Backend:** [https://product-hub-backend.onrender.com](https://product-hub-backend.onrender.com)

## Test Credentials

```
Email: testts@example.com
Password: password123
```

## Tech Stack

### Backend
- Node.js + Express.js (TypeScript)
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- bcryptjs for password hashing

### Frontend
- React.js (TypeScript)
- Tailwind CSS v4
- Zustand (state management)
- Zod (form validation)
- React Hot Toast (notifications)
- React Router DOM

## Project Structure

```
product-hub/
├── backend/
│   └── src/
│       ├── config/         # Database connection
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth & validation middleware
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API route definitions
│       ├── utils/          # Token generation
│       ├── validators/     # Zod schemas
│       └── server.ts       # Entry point
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── lib/            # Axios client & validator utility
│       ├── pages/          # Page components
│       ├── stores/         # Zustand stores
│       ├── types/          # TypeScript interfaces
│       ├── validators/     # Zod schemas
│       └── App.tsx         # Router setup
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Run the development server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add new product |
| PUT | `/api/products/:id` | Update product |
| PATCH | `/api/products/:id/like` | Toggle like/unlike |
| GET | `/api/products/liked` | Get liked products |

## Features

- User registration and login with JWT
- Form validation with Zod (frontend + backend)
- Product CRUD (Create, Read, Update)
- Like/Unlike products
- Liked products page
- User profile with logout
- Responsive design (mobile, tablet, desktop)
- Toast notifications for all feedback
