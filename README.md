# 🌤️ ClimaTrack — Weather Forecasting App

## 📌 Project Objective

ClimaTrack helps users get real-time weather updates and 5-day forecasts using city-based search. It offers clean UI, interactive charts, and animations. Built with Vite, React, TailwindCSS, Recharts, and OpenWeatherMap API.

---

## ✅ Submission Requirements

- 🔁 20+ meaningful client commits  
- 📄 Includes a `README.md` with:  
  - Project name  
  - Purpose  
  - Live URL  
  - Key features  
  - NPM packages used  
- 📱 Fully responsive on mobile, tablet & desktop  
- 🔐 Environment variables securely stored in `.env.local`  
- 🎨 Clean and modern UI with TailwindCSS

---

## 🚀 Deployment Guidelines

- ❌ No CORS/404/504 errors in production  
- 🔁 Live site must load correctly on refresh  
- 🌐 Add correct domain configuration in Firebase (if used)

---

## 🧱 Layout & Structure

- **Header:** Sticky, responsive, includes logo and navigation  
- **Footer:** Branding, contact info, GitHub & portfolio links  
- **Main Section:** Route-based views with animations

---

## 🏠 Home Page

### 🔝 Navbar Includes:
- 🌤️ Logo  
- 🔍 Search bar for city weather  
- 📅 Forecast link  
- 🌗 Light/Dark mode toggle  
- 🔐 Login / Logout (for future use)

### 📷 Banner Section
- Background image with animated weather info  
- Dynamic temperature, weather status, location  
- Weather icon and city name

---

## 📍 Weather Forecast Page

### Displays:
- 🌡️ Current temperature (°C/°F toggle)  
- 💨 Wind speed  
- 🌫️ Humidity  
- ☁️ Cloud coverage  
- 📆 5-day forecast  
- 📊 Graph (Recharts) of temperature trends

> ⚠️ Invalid city handling and loading states included

---

## 🔢 Components

- `Navbar.jsx`  
- `SearchInput.jsx`  
- `WeatherCard.jsx`  
- `ForecastChart.jsx`  
- `Footer.jsx`

---

## 🔧 NPM Packages Used

- `axios` — API requests  
- `react-router-dom` — routing  
- `recharts` — charting weather trends  
- `react-icons` — icons  
- `tailwindcss` — UI framework  
- `framer-motion` — animations  
- `dotenv` — environment variables support  

---

## 📂 Folder Structure

climatrack-client/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── main.jsx
├── .env.local
├── package.json
└── vite.config.js

---

## ⚙️ API Integration

- Uses [OpenWeatherMap API](https://openweathermap.org/api)
- API key stored securely in `.env.local`

```env
VITE_WEATHER_API_KEY=your_api_key_here