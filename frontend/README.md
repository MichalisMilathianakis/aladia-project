# Aladia Frontend

This is the **frontend** for the **Aladia full-stack project**, built with **Next.js**, **React**, and **TailwindCSS v4**.  
It connects to the **NestJS Gateway** backend via REST endpoints and provides user registration, user listing, and a reusable UI component library.

---

## Features

### Core Functionality
- **Register Users** → `POST /auth/register`
- **List Users** → `GET /auth/users`
- **Dark / Light Mode** with persistent theme toggle
- **Responsive design** using Tailwind CSS
- **Component library** (Button, InputField, Card, Tabs, Modal, Navbar)

### Developer Tools
- **Type-safe API layer** in `lib/api.ts`
- **ESLint + Prettier** for clean code
- **Vitest + React Testing Library** for component tests
- **Live reload** via Next.js App Router

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                # Root layout with ThemeProvider & Navbar
│   ├── page.tsx                  # Redirects to /auth/register
│   └── auth/
│       ├── register/page.tsx     # Registration page
│       └── users/page.tsx        # User list page
│
├── components/
│   ├── theme/ThemeProvider.tsx   # Context-based dark/light theme
│   └── ui/                       # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── InputField.tsx
│       ├── Tabs.tsx
│       ├── Modal.tsx
│       ├── Navbar.tsx
│       ├── ThemeToggle.tsx
│       └── __tests__/            # Vitest test files
│
├── lib/api.ts                    # API client for backend
├── globals.css                   # Tailwind base + custom dark variants
├── vitest.config.ts              # Vitest configuration
├── vitest.setup.ts               # Jest-DOM setup
└── tsconfig.json
```

---

## Setup Instructions

### Prerequisites
Make sure you have:
- Node.js v20+
- npm v10+
- Backend running at `http://localhost:3000`

### Install Dependencies
```bash
cd frontend
npm install
```

### Create Environment File
Create `.env.local`:
```bash
NEXT_PUBLIC_API_BASE=http://localhost:3000
```

### Run Development Server
```bash
npm run dev
```
App available at: **http://localhost:3000**

---

## Running Tests

Used **Vitest** and **React Testing Library**.

### Run all tests
```bash
npm run test
```

### Watch mode
```bash
npm run test:watch
```

### UI test dashboard
```bash
npm run test:ui
```

---

## Component Library

| Component | Purpose | Notes |
|------------|----------|-------|
| `Button` | Primary, secondary, ghost actions | Supports loading state |
| `Card` | Container | Auto dark/light support |
| `InputField` | Text inputs | Validation & helper text |
| `Tabs` | Navigation tabs | Keyboard accessible |
| `Modal` | Dialog overlay | Closes on Esc / outside click |

---

## Dark Mode & Theming

- Uses `data-theme="dark"` on `<html>`
- Saves preference in `localStorage`
- Controlled via `ThemeToggle` in Navbar

---

## Integration with Backend

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/auth/register` | `POST` | Register new user |
| `/auth/users` | `GET` | Fetch all users |

Ensure the backend (Gateway) is running on **http://localhost:3000**.

---

## Build for Production

```bash
npm run build
npm start
```

Build output → `.next/`.

---

## Author

**Michalis Milathianakis**  
