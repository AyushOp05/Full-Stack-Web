# Full-Stack JWT Authentication App

A GitHub-ready full-stack authentication project using React, Node.js, Express, MongoDB, Mongoose, bcrypt, and JWT.

## Features

- User signup and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected dashboard route
- REST API for register, login, and profile
- MongoDB user storage with Mongoose validation
- Centralized backend error handling
- Basic responsive React UI
- Deployment notes for Render/Railway and Vercel/Netlify

## Folder Structure

```text
auth-fullstack-app/
  backend/
    src/
      config/
        db.js
      controllers/
        authController.js
        userController.js
      middleware/
        authMiddleware.js
        errorMiddleware.js
      models/
        User.js
      routes/
        authRoutes.js
        userRoutes.js
      utils/
        generateToken.js
    .env.example
    package.json
    render.yaml
    server.js
  frontend/
    src/
      api/
        axios.js
      components/
        ProtectedRoute.jsx
      context/
        AuthContext.jsx
      pages/
        Dashboard.jsx
        Login.jsx
        Signup.jsx
      App.jsx
      main.jsx
      styles.css
    .env.example
    index.html
    package.json
    vercel.json
  .gitignore
  package.json
  README.md
```

## API Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/users/profile` | Protected | Get logged-in user profile |

Protected requests must include:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Local Setup

1. Install Node.js 18 or newer.
2. Create a MongoDB database using MongoDB Atlas or a local MongoDB server.
3. Install dependencies:

```bash
npm run install:all
```

4. Configure the backend:

```bash
cd backend
cp .env.example .env
```

Set these values in `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

5. Configure the frontend:

```bash
cd ../frontend
cp .env.example .env
```

Set this value in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

6. Run the backend:

```bash
npm run dev:backend
```

7. In another terminal, run the frontend:

```bash
npm run dev:frontend
```

8. Open `http://localhost:5173`.

## Deployment

### Backend on Render

1. Push this project to GitHub.
2. Create a new Render Web Service.
3. Set the root directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:

```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend-domain.vercel.app
```

Render can also use `backend/render.yaml` as a starting blueprint.

### Backend on Railway

1. Create a Railway project from your GitHub repo.
2. Select the `backend` directory as the app root.
3. Add the same backend environment variables listed above.
4. Deploy with start command `npm start`.

### Frontend on Vercel

1. Import the GitHub repo in Vercel.
2. Set the root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:

```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

The included `frontend/vercel.json` handles React Router page refreshes.

### Frontend on Netlify

1. Import the GitHub repo in Netlify.
2. Set the base directory to `frontend`.
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add `VITE_API_URL` with your deployed backend API URL.

## Notes

- Never commit real `.env` files.
- Use a long random `JWT_SECRET` in production.
- In production, set `CLIENT_URL` exactly to your frontend URL so CORS allows the browser requests.
- The frontend stores the token in `localStorage` for a simple demo-friendly implementation.

