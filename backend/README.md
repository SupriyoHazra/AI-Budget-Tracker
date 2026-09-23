# Finova AI Budget Tracker - Backend Service

A modular, production-ready Express.js REST API service for the AI Budget Tracker group project.

---

## 👥 Group Project Architecture & Division of Work

| Role / Responsibility | Assigned Member | Status | Notes |
|---|---|---|---|
| **Frontend UI** | Group Member #1 | Complete | Fully designed React + Vite application in `/frontend` |
| **Backend Architecture & APIs** | Group Member #2 (You) | Complete | Modular Express architecture in `/backend` with 25 working REST endpoints |
| **Database & Persistence** | Group Member #3 | Ready for Integration | See [DATABASE_INTEGRATION_GUIDE.md](./DATABASE_INTEGRATION_GUIDE.md) |
| **AI / ML & OCR** | Group Member #4 | Ready for Integration | See [AI_ML_INTEGRATION_GUIDE.md](./AI_ML_INTEGRATION_GUIDE.md) |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:5000` with hot-reloading.

### 3. Run Automated Endpoint Verification Tests
```bash
npm test
```
Executes the comprehensive automated test suite verifying all 25 REST endpoints.

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/              # Server configuration and environment defaults
│   ├── data/
│   │   ├── seedData.js      # Seed financial data aligned with frontend views
│   │   └── memoryStore.js   # In-memory repository with thread-safe CRUD methods
│   ├── middleware/
│   │   ├── errorHandler.js  # Centralized error and 404 handlers
│   │   ├── requestLogger.js # Colorized HTTP request logging
│   │   └── validator.js     # Request payload validation helpers
│   ├── services/
│   │   ├── aiService.js     # AI Assistant service + AI/ML teammate integration hooks
│   │   └── receiptOcrService.js # Receipt OCR parser + AI/ML teammate integration hooks
│   ├── controllers/         # Express controllers handling HTTP requests
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── transactionController.js
│   │   ├── budgetController.js
│   │   ├── goalController.js
│   │   ├── analyticsController.js
│   │   ├── aiController.js
│   │   ├── receiptController.js
│   │   └── settingsController.js
│   ├── routes/              # Express routers
│   └── server.js            # Main Express application entry point
├── test-api.js              # Automated test suite (25 test cases)
├── API_DOCUMENTATION.md     # Detailed API documentation with sample payloads
├── DATABASE_INTEGRATION_GUIDE.md # Instructions for Database teammate
└── AI_ML_INTEGRATION_GUIDE.md    # Instructions for AI-ML teammate
```

---

## 🔗 Available Endpoints Overview

| Module | Route | Methods | Description |
|---|---|---|---|
| **System** | `/` | `GET` | API Information and routes index |
| **Health** | `/api/health` | `GET` | Health check and uptime |
| **Auth** | `/api/auth/login` | `POST` | User login |
| | `/api/auth/register` | `POST` | User registration |
| | `/api/auth/me` | `GET` | Current user profile |
| **Dashboard** | `/api/dashboard/stats` | `GET` | High-level KPI metric cards |
| | `/api/dashboard/summary` | `GET` | Aggregated dashboard overview |
| **Transactions** | `/api/transactions` | `GET`, `POST` | List and create transactions |
| | `/api/transactions/:id` | `GET`, `PATCH`, `DELETE` | Read, update, delete transaction |
| **Budgets** | `/api/budgets` | `GET`, `POST` | Budgets with spent & limit calculations |
| | `/api/budgets/:id` | `PUT`, `DELETE` | Update and remove budget |
| **Goals** | `/api/goals` | `GET`, `POST` | Savings goals with progress % |
| | `/api/goals/:id/contribute` | `POST` | Deposit funds towards goal |
| | `/api/goals/:id` | `PUT`, `DELETE` | Update and remove goal |
| **Analytics** | `/api/analytics/spending` | `GET` | Category spending distribution |
| | `/api/analytics/trends` | `GET` | Monthly income vs expense trends |
| | `/api/analytics/cashflow` | `GET` | Cash flow and savings rate % |
| **AI Assistant** | `/api/ai/chat` | `POST` | Financial AI Assistant chat |
| | `/api/ai/suggestions` | `GET` | Quick prompt suggestions |
| | `/api/ai/insights` | `GET` | Automated spending insights |
| **Receipts** | `/api/receipts` | `GET`, `POST` | List and add receipts |
| | `/api/receipts/scan` | `POST` | OCR receipt parsing endpoint |
| **Settings** | `/api/settings` | `GET`, `PUT` | Read and update preferences |
| | `/api/settings/export` | `GET` | Full JSON data backup |
| | `/api/settings/reset` | `POST` | Reset data to default seed |

---

## 📖 Detailed Guides for Group Members

- **Full API Documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Database Integration**: See [DATABASE_INTEGRATION_GUIDE.md](./DATABASE_INTEGRATION_GUIDE.md)
- **AI & ML Integration**: See [AI_ML_INTEGRATION_GUIDE.md](./AI_ML_INTEGRATION_GUIDE.md)
