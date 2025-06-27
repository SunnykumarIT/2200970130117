# 🔗 React URL Shortener Web App

A fully client-side React application that allows users to shorten URLs, view analytics, and manage redirections — all without a backend.

---

## 🚀 Features Implemented

| Feature                       | Status   |
|------------------------------|----------|
| 📁 Folder Structure           | ✅ Done   |
| 🛡️ Custom Logging Middleware | ✅ Done   |
| 🔗 URL Shortener Page         | ✅ Done   |
| 🔁 Redirect Page              | ✅ Done   |
| 📊 Stats Page                 | ✅ Done   |
| ✅ Form Validation            | ✅ Done   |
| ✏️ Custom Shortcode Support  | ✅ Done   |
| ⏳ Expiry Logic (30m default) | ✅ Done   |
| 📋 Click Tracking             | ✅ Done   |
| 🎨 Material UI Only           | ✅ Done   |
| 🖥️ Works on localhost         | ✅ Done   |

---

## 🛠️ Tech Stack

- ⚛️ React (with Vite)
- 💅 Material UI
- 📦 localStorage + sessionStorage
- 🔀 React Router

---

## 📦 Folder Structure

src/
├── components/ # Reusable UI parts (optional)
├── middleware/ # Custom logger
├── pages/ # App screens (shorten, stats, redirect)
├── utils/ # Shortening logic and helpers
├── App.jsx # Root app component
└── main.jsx # App entry point


---

## 📈 Shortener Features

- Accepts up to 5 URLs at once
- Optional custom shortcode (validated)
- Optional expiry (in minutes); defaults to 30
- Generates unique shortcodes
- Validates input before submission

---

## 🔁 Redirection

- Uses React Router to match `/:shortcode`
- Checks for expiry before redirect
- Logs each redirect with:
  - Timestamp
  - Referrer
  - Location (stubbed)

---

## 📊 Stats Page

Displays a list of all shortened URLs with:
- Creation and expiry timestamps
- Click count
- Click history:
  - Time of click
  - Source URL (referrer)
  - Approx. location

---

## 🧠 Logging Middleware

Implemented in `src/middleware/logger.js`
- Logs every user action with:
  - Timestamp
  - Message
  - Metadata
- Stores logs in `sessionStorage`

---

## 🖥️ Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173

