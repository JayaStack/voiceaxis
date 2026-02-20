# VoiceAxis — Enterprise AI Voice Platform

🚀 VoiceAxis
Enterprise AI Voice Automation Platform

Production-ready full-stack SaaS marketing website for an AI voice automation company.
Built with React (Vite), Node.js/Express, and MongoDB Atlas.

---

### 🌐 Live Demo

Frontend: https://voicaxis.netlify.app

Backend API: https://voiceaxis.onrender.com

## 1. Architecture Overview

Frontend (React - Netlify)
        ↓ REST API (/api)
Backend (Express - Render)
        ↓
MongoDB Atlas

---


## 2. Key Design Decisions

• Monorepo structure (client/ + server/)

• Fully decoupled frontend & backend

• Environment-based API configuration

• Production-ready folder organization

• Scalable controller-based backend architecture

---

## 3. Local Development Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier) OR local MongoDB

### Step 1 — Clone and install

```bash
# git Clone
git clone https://github.com/JayaStack/voiceaxis.git
cd voiceaxis


# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2 — Environment Variables

```bash
# Server (server/.env)
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
# Edit: MONGODB_URI, PORT, CLIENT_URL

# Client (client/.env)
VITE_API_BASE_URL=http://localhost:5000/api
# Edit: VITE_API_BASE_URL
```

### Step 3 — Run Development Servers
 
```bash
# Terminal 1: Start backend
cd server
npm run dev        # Runs on http://localhost:5000

# Terminal 2: Start frontend
cd client
npm run dev        # Runs on http://localhost:5173
```

---

## 4. 🚀 Deployment Guide

### MongoDB Atlas Setup
• MongoDB Atlas (Free Tier)

### Backend → Render (Free)
• Root directory → server

• Build → npm install

• Start → node server.js

• Add environment variables

### Frontend → Netlify (Free)
• Base directory → client

• Build → npm run build

• Publish → dist

• Add VITE_API_BASE_URL

---

## 5. Assumptions & Future Improvements

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
