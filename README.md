# VoiceAxis — Enterprise AI Voice Platform

A production-ready full-stack SaaS website built for an AI voice automation company. Built with React (Vite), Node.js/Express, and MongoDB Atlas.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                        │
│  React Router → Lazy Pages → Components → CSS Modules       │
│  Vite build → dist/ → Netlify CDN                           │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP (REST)
                      │ /api/*
┌─────────────────────▼───────────────────────────────────────┐
│                   SERVER (Express)                           │
│  Routes → Middleware → Controllers → Mongoose → Atlas        │
│  Render or Vercel serverless                                 │
└─────────────────────┬───────────────────────────────────────┘
                      │ Mongoose ODM
┌─────────────────────▼───────────────────────────────────────┐
│                  MongoDB Atlas (Free Tier)                    │
│  contacts | demoBookings | newsletterSubscribers             │
└─────────────────────────────────────────────────────────────┘
```

**Key architectural decisions:**
- Monorepo with `client/` and `server/` directories
- Frontend completely decoupled from backend — communicates via REST
- API base URL driven by environment variable — zero localhost hardcoding
- CSS Modules for component-scoped styles, `index.css` for design tokens
- Lazy-loaded routes for optimal bundle splitting

---

## 2. Folder Structure

```
vai/
├── client/                    # React frontend (Vite)
│   ├── public/
│   │   └── _redirects         # Netlify SPA routing fix
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/        # Sticky nav, mobile menu, scroll detection
│   │   │   ├── Footer/        # Links, newsletter, social
│   │   │   ├── Button/        # Variants: primary, secondary, ghost
│   │   │   ├── SectionHeader/ # Reusable section heading block
│   │   │   ├── AnimatedCounter/ # Number ticker for stats
│   │   │   └── TrustBadge/    # Social proof logos
│   │   ├── pages/
│   │   │   ├── Home/          # Hero, stats, features, testimonials, CTA
│   │   │   ├── Features/      # Deep feature breakdown with demos
│   │   │   ├── About/         # Mission, team, timeline
│   │   │   ├── Pricing/       # Plan cards with billing toggle
│   │   │   └── Contact/       # Form with live validation, demo booking
│   │   ├── hooks/
│   │   │   ├── useForm.js     # Generic form state + validation
│   │   │   └── useInView.js   # Intersection Observer for animations
│   │   ├── utils/
│   │   │   └── api.js         # Centralized fetch wrapper
│   │   ├── styles/
│   │   │   └── index.css      # Reset, variables, typography, utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Node.js + Express backend
│   ├── config/
│   │   └── db.js              # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── contactController.js
│   │   ├── demoController.js
│   │   └── newsletterController.js
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error middleware
│   │   ├── notFound.js        # 404 handler
│   │   └── validateRequest.js # express-validator runner
│   ├── models/
│   │   ├── Contact.js
│   │   ├── DemoBooking.js
│   │   └── NewsletterSubscriber.js
│   ├── routes/
│   │   ├── contact.js
│   │   ├── demo.js
│   │   └── newsletter.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 3. Local Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier) OR local MongoDB

### Step 1 — Clone and install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2 — Configure environment

```bash
# Server
cp server/.env.example server/.env
# Edit: MONGODB_URI, PORT, CLIENT_URL

# Client
cp client/.env.example client/.env
# Edit: VITE_API_BASE_URL
```

### Step 3 — Run development servers

```bash
# Terminal 1: Start backend
cd server
npm run dev        # Runs on http://localhost:5000

# Terminal 2: Start frontend
cd client
npm run dev        # Runs on http://localhost:5173
```

---

## 7. Deployment

### MongoDB Atlas Setup
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free cluster
2. Create database user: Security → Database Access
3. Whitelist IP: Network Access → `0.0.0.0/0` (allow all for cloud deployments)
4. Get connection string: Connect → Drivers → Copy URI
5. Replace `<password>` in URI with your DB user password

### Backend → Render (Free)
1. Push repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect GitHub repo, select `server/` as root directory
4. Build: `npm install` | Start: `node server.js`
5. Add environment variables in Render dashboard:
   - `MONGODB_URI` = your Atlas URI
   - `CLIENT_URL` = your Netlify URL (set after frontend deploy)
   - `NODE_ENV` = `production`
6. Copy the Render URL (e.g., `https://vai-api.onrender.com`)

### Frontend → Netlify (Free)
1. Go to [netlify.com](https://netlify.com) → New Site → Import from Git
2. Base directory: `client`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL` = your Render URL + `/api`
6. Deploy — `_redirects` file handles SPA routing automatically

---

## 8. Assumptions & Future Improvements

### Assumptions
- No authentication required (public marketing site)
- Email sending mocked — production would integrate SendGrid/Resend
- Demo booking is a simple form, not a calendar integration
- Admin dashboard is out of scope for this build

### Future Improvements
1. **Email notifications** — SendGrid on form submission to notify sales team
2. **Calendar integration** — Calendly embed or Google Calendar API for demo booking
3. **CRM webhook** — Auto-push form data to HubSpot/Salesforce
4. **Bot protection** — hCaptcha/Cloudflare Turnstile on contact form
5. **Analytics** — Plausible.io (privacy-first) for page/conversion tracking
6. **i18n** — react-i18next for multilingual support (fitting for voice AI product)
7. **Testing** — Vitest + React Testing Library for components, Supertest for API routes
8. **Admin panel** — Protected route to view/manage submissions
9. **Redis caching** — Rate limit state management at scale
10. **CI/CD** — GitHub Actions for lint, test, deploy pipeline
