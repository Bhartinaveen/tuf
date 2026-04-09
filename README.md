# 📆 Photorealistic Interactive Wall Calendar

A premium, interactive React-based wall calendar component designed for the **Frontend Engineering Challenge**. This project translates a static physical calendar concept into a highly functional, responsive, and visually stunning web experience.

## ✨ Features

- **🖼️ Wall Calendar Aesthetic:** Features a 3D-perspective "zoomed-out" wall view and a detailed "zoomed-in" interaction mode.
- **🎨 Seasonal Themes:** 12 locally generated seasonal images paired with dynamic color palettes that adapt based on the current month.
- **📆 Advanced Day Range Selector:** Smooth click-and-drag selection for start and end dates with clear visual states (start, end, and range highlight).
- **📝 Integrated Notes System:** Persistent notes tied to specific dates, stored locally using `localStorage`, featuring a live search filter.
- **🔄 Smooth Directional Animations:** Elegant sliding and flipping transitions when navigating between months or years.
- **🕌 Multi-Religious Festivals:** Comprehensive support for Hindu, Muslim, Christian, Sikh, Jain, and Buddhist festivals across any past or future year.
- **📱 Fully Responsive:** Adaptive layout from desktop side-by-side panels to mobile-first vertical stacking.
- **🌙 Dark Mode Support:** Seamlessly integrated dark theme for late-night planning.
- **⚙️ Modern Year Selector:** Custom glassmorphic dropdown for effortless year navigation.

## 🛠️ Technology Stack

- **Framework:** React 18 (with TypeScript)
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (Modern CSS variables & animations)
- **Holiday Engine:** `date-holidays` (for global historical/future holiday computation)
- **Icons:** Custom SVG iconography

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bhartinaveen/tuf.git
   cd tuf
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

- `src/components/`: Modular React components (`CalendarGrid`, `HeroSection`, `NotesPanel`, etc.)
- `src/utils/`: Utility functions for date calculations and holiday mapping.
- `src/index.css`: Core design system and interaction animations.
- `public/backgrounds/`: Locally stored seasonal assets.

---

Built with ❤️ for the Frontend Engineering Challenge.
