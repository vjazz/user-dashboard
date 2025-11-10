# GIC Dashboard – Micro Frontend Architecture (React + Module Federation + MUI)

A modular dashboard application built with Vite React, Module Federation, and Material UI, simulating Micro Frontend (MFE) architecture.
Each micro app (remote) is independently built, deployed, and integrated dynamically at runtime into a host container (shell).

# Architecture Description

This project follows a Micro Frontend Architecture, configuring Module Federation in a Vite React project primarily involves using the @originjs/vite-plugin-federation plugin.

Each React application represents a separate domain (feature) and can run independently or be federated into the main host shell.

# 🗂 Project Structure Overview

user-dashboard/
│
├── shell/ # Port 3000
│ ├── src/
│ │ ├── types/User.ts
│ │ ├── theme.ts
│ │ ├── context/UserContext.tsx
│ │ ├── components/
│ │ │ ├── AppLayout.tsx
│ │ │ └── Navigation.tsx
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── vite-env.d.ts
│ ├── vite.config.ts
│ └── package.json
│
├── user-list/ # Port 3001
│ ├── src/
│ │ ├── types/User.ts
│ │ ├── services/userService.ts
│ │ ├── hooks/
│ │ │ ├── useUsers.ts
│ │ │ └── useDebounce.ts
│ │ ├── components/
│ │ │ ├── UserList.tsx
│ │ │ ├── UserTable.tsx
│ │ │ ├── SearchBar.tsx
│ │ │ └── Pagination.tsx
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── vite.config.ts
│ └── package.json
│
└── user-details/ # Port 3002
├── src/
│ ├── types/User.ts
│ ├── services/userService.ts
│ ├── hooks/useUserEdit.ts
│ ├── components/
│ │ ├── UserDetails.tsx
│ │ ├── UserProfile.tsx
│ │ └── EditUserForm.tsx
│ ├── App.tsx
│ └── main.tsx
├── vite.config.ts
└── package.json

# Communication Strategy

Communication between micro frontends is achieved using a shared React Context, which is provided by the host (shell) and consumed by all remotes.

🔗 Flow Diagram

<pre> ```
 ┌─────────────────────────────────────────────────────────────┐
 │                         SHELL APP  - Remote (3001)          │
 │  - Provides <UserContext.Provider>                          │
 │  - Handles navigation via React Router                      │
 │                                                             │
 │     ▲                                   │                   │
 │     │                                   ▼                   │
 │ ┌──────────────┐                 ┌────────────────┐         │
 │ │ USER-LIST    │ --select user→  │ USER-DETAILS   │         │
 │ │ Remote (3001)│                 │ Remote (3002)  │         │
 │ └──────────────┘                 └────────────────┘         │
 │                                                             │
 └─────────────────────────────────────────────────────────────┘
 ``` </pre>

# Setup Instructions

🛠 Prerequisites

Node.js ≥ 18
npm ≥ 8

🎯 Step 7: Run the Application
IMPORTANT: Start in this exact order!
Terminal 1 - User List (MUST START FIRST)
bashcd user-dashboard/user-list
npm run start-mf
✅ Wait for: Local: http://localhost:3001/

Terminal 2 - User Details (START SECOND)
bashcd user-dashboard/user-details
npm i
npm run start-mf
✅ Wait for: Local: http://localhost:3002/

Terminal 3 - Shell (START LAST)
bashcd user-dashboard/shell
npm i
npm run start-mf
✅ Wait for: Local: http://localhost:3000/

# => Alternativly run the app in once navigate to root /user-dashboard

1. npm install -g concurrently
2. run below command in terminal :
   `concurrently "cd user-list && npm run start-mf" "cd user-details && npm run start-mf" "cd shell && npm run start-mf"`

Visit:

🖥 Shell → http://localhost:3000

📋 User List → http://localhost:3001

🧍‍♂️ User Details → http://localhost:3002

The host (shell) dynamically loads both remotes at runtime.

If everything is working, you should have:

✅ 3 independent micro frontends running
✅ Module Federation working with runtime integration
✅ Material-UI design system
✅ Full CRUD operations
✅ Search, pagination, and navigation
✅ TypeScript throughout
✅ Performance optimizations

# Features Implemented

✅ Module Federation

True runtime integration
Independent deployments
Shared dependencies

✅ User List Micro Frontend

Real-time search with 300ms debouncing
Pagination (5 items per page)
React virtualization(implementing simple infinite scroll for user list till all users are rendered)
Material-UI table with avatars
Click to navigate to details

✅ User Details Micro Frontend

Profile view with cards
Edit mode with form validation
localStorage persistence
Success notifications

✅ Performance Optimizations

React.memo for components
useMemo for filtered/paginated data
useCallback for handlers
Lazy loading micro frontends
Code splitting

# What's Working

Module Federation ✅

Shell loads remote micro frontends
Shared React/MUI instances
Independent development

Search & Filter ✅

Debounced search (300ms)
Filters by name, email, username, company
Real-time results

Pagination ✅

5 items per page
Previous/Next buttons
Page counter

User Details ✅

Fetch from API
Display in cards
Edit functionality

Edit & Save ✅

Form validation (email, phone)
Real-time error display
localStorage persistence
Success notification

Navigation ✅

Breadcrumb navigation
React Router integration
Back button

# Performance Considerations

If scaling to enterprise level:

Optimization Benefit
🧱 Module Federation Shared Dependencies Avoids duplicate React/MUI bundles
🧩 Lazy Loading Remotes Loads only necessary micro apps
⚙️ Webpack Bundle Splitting Reduces initial load time
🧰 Memoization, debouncing, react-virtualization

# Author

Vinayak Jaiswal
Frontend Developer | React, Webpack, Module Federation, MUI
Mail: [vinayak.jaiswal24@gmail.com]
Linkdin: [https://www.linkedin.com/in/vinayak-jaiswal-53b00a74/]

# License

MIT License © 2025 Vinayak Jaiswal
