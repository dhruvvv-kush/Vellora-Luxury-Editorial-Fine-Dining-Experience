# 🍽️ Vellora — Luxury Editorial Fine Dining Experience

> A modern, responsive luxury restaurant landing page & interactive dining experience application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🌟 Key Features

- 🌗 **Atmosphere Theme Switcher Engine:** Seamless transition between **Evening Service** *(Dark Luxury Charcoal & Champagne Gold)* and **Daylight Dining** *(Warm Light Sand & Deep Bronze)* with persistent `localStorage` user preferences.
- 🕒 **Real-Time Booking Slot Selector:** Interactive table capacity chips (`Available`, `Limited / Only X left`, `Sold Out`) updating in real-time based on date and party size selections.
- 💾 **Client-Side Persistence Mock API:** Custom [`reservationApi.ts`](./src/services/reservationApi.ts) service with simulated network latency, unique reference code generation (`VEL-XXXX`), and full CRUD operations.
- 📅 **"My Bookings" Slide-Over Drawer:** Accessible modal drawer allowing guests to inspect confirmed table details, booking codes, seating area preferences, and cancel active reservations.
- 📜 **Parallax Motion & Micro-Interactions:** Scroll-driven parallax hero background scaling, dish selection previews, and glassmorphic header blur.
- 📱 **Fully Responsive Layout:** Optimized mobile drawer navigation and fluid typography across desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 7](https://vitejs.dev/) + Single-file bundler integration
- **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Gestures:** [Framer Motion 12](https://www.framer.com/motion/)
- **Iconography:** [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
editorial-food-photography-prompts/
├── public/
│   └── images/              # High-resolution food photography assets
├── src/
│   ├── services/
│   │   └── reservationApi.ts # Mock API service with localStorage persistence
│   ├── utils/
│   │   └── cn.ts             # Tailwind class merging utility
│   ├── App.tsx               # Main application component & theme state
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind v4 import & custom theme variables
├── index.html                # HTML entry point with Google Fonts
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite configuration & path aliases
└── package.json              # Project dependencies & scripts
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `yarn`

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruvvv-kush/Vellora-Luxury-Editorial-Fine-Dining-Experience.git
   cd Vellora-Luxury-Editorial-Fine-Dining-Experience
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
