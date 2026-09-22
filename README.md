# QuickStay - Full-Stack Hotel Booking Management System

A full-stack luxury hotel booking web application built with React, Vite, TailwindCSS, Node.js, Express, MongoDB, and Clerk Authentication.

## Features

- **Guest Portal:**
  - Browse luxury hotel rooms with dynamic filters (room type, price range, destination).
  - Search hotels by destination with autocomplete and recent search history.
  - Room details with interactive photo gallery, amenities, and pricing breakdown.
  - Dedicated **Experience** and **About Us** pages.
  - Secure room booking & checkout integrated with Stripe.
  - User booking dashboard to view active and past reservations.

- **Hotelier / Owner Portal:**
  - Seamless hotel registration with automated verification.
  - Management dashboard for hotel owners.
  - Add and list rooms with multi-image Cloudinary upload, custom amenities, and pricing.
  - Track room status and reservations.

- **Authentication & Security:**
  - Secure user authentication and session management via Clerk.
  - Automated role-based access control (User vs. Hotel Owner).
  - Webhook verification for Clerk and Stripe.

- **Database:**
  - Persistent MongoDB integration with automated local standalone engine fallback for offline development.

---

## Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS, React Router 7, React Hot Toast, Axios
- **Backend:** Node.js, Express.js, Mongoose, Clerk Express SDK
- **Database:** MongoDB
- **File Storage:** Cloudinary
- **Payment Processing:** Stripe
- **Email Service:** Nodemailer (SMTP / Brevo)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sanikamca24009/Hotel-Booking-Management-System-QuickStay-.git
cd Hotel-Booking-Management-System-QuickStay-
```

### 2. Configure Environment Variables
Copy `.env.example` in both `client` and `server`:

**In `server/.env`:**
```env
MONGODB_URI=mongodb://127.0.0.1:27017/hotel-booking
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PORT=4000
```

**In `client/.env`:**
```env
VITE_CURRENCY=$
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 3. Install Dependencies & Run

**Backend:**
```bash
cd server
npm install
npm run server
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.
