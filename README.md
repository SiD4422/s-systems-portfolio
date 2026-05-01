# JS Systems — Full Stack Website

## Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: SQLite (dev) → swap to PostgreSQL for production
- **Auth**: JWT (admin login)
- **Email**: Nodemailer (Gmail SMTP)
- **Deploy**: Vercel (frontend) + Railway (backend)

## Folder Structure
```
js-systems/
├── frontend/          ← React app
│   ├── src/
│   │   ├── components/    Navbar, Hero, Services, Portfolio, Contact, Footer
│   │   ├── pages/         Home.jsx, Admin.jsx, Login.jsx
│   │   ├── context/       AuthContext.jsx
│   │   ├── hooks/         useAuth.js
│   │   └── utils/         api.js  ← all fetch calls to backend
│   ├── package.json
│   └── vite.config.js
│
└── backend/           ← Express API
    ├── routes/            orders.js, feedback.js, auth.js
    ├── controllers/       orderController.js, feedbackController.js, authController.js
    ├── middleware/        authMiddleware.js
    ├── models/            db.js  ← SQLite setup
    ├── config/            email.js
    ├── server.js
    └── package.json
```

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
node server.js
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## Environment Variables (backend/.env)
```
PORT=5000
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@jssystems.dev
ADMIN_PASSWORD=changeme123
GMAIL_USER=yourmail@gmail.com
GMAIL_PASS=your_app_password       # Gmail App Password (not your real password)
NOTIFICATION_EMAIL=admin@jssystems.dev
FRONTEND_URL=http://localhost:5173
```

## Production Deploy
- **Frontend** → push `frontend/` to Vercel. Set `VITE_API_URL` env var to your Railway URL.
- **Backend** → push `backend/` to Railway. Set all env vars in Railway dashboard.
- Swap SQLite for PostgreSQL: install `pg` + update `models/db.js` queries.
