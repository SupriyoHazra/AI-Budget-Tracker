# 📖 AI Budget Tracker REST API Documentation

Base URL: `http://localhost:5000/api`

All responses are returned in JSON format with a standard `success: true|false` structure.

---

## 1. System & Health

### `GET /`
Returns backend service identity and directory of available resource endpoints.

### `GET /api/health`
Health check endpoint returning system status and uptime.
```json
{
  "status": "ok",
  "service": "AI Budget Tracker Backend API",
  "uptime": 14.52,
  "timestamp": "2026-09-22T16:15:00.000Z"
}
```

---

## 2. Authentication & Users (`/api/auth`)

### `POST /api/auth/login`
Authenticate user with email and password.
- **Request Body:**
  ```json
  {
    "email": "alex.morgan@finova.ai",
    "password": "anypassword"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "demo-jwt-token-user-1-1790093619",
    "user": {
      "id": "user-1",
      "name": "Alex Morgan",
      "email": "alex.morgan@finova.ai"
    }
  }
  ```

### `POST /api/auth/register`
Register a new user account.
- **Request Body:**
  ```json
  {
    "name": "Alex Morgan",
    "email": "alex@example.com",
    "password": "securepassword"
  }
  ```
- **Response (201):** Returns token and created user object.

### `GET /api/auth/me`
Retrieve currently authenticated profile.
- **Query Params:** `userId` (optional, defaults to `"user-1"`)
- **Response (200):** Returns current user object.

### `POST /api/auth/logout`
Terminates session.

---

## 3. Dashboard (`/api/dashboard`)

### `GET /api/dashboard/stats`
Returns high-level KPI metric cards (Total Balance, Expenses, Income, Savings with percentage trends).
- **Query Params:** `userId` (optional)
- **Response (200):**
  ```json
  {
    "success": true,
    "stats": [
      {
        "title": "Total Balance",
        "value": "₹52,480",
        "rawAmount": 52480,
        "change": "+12.8%",
        "positive": true,
        "accent": "cyan"
      },
      {
        "title": "Expenses",
        "value": "₹18,240",
        "rawAmount": 18240,
        "change": "-5.2%",
        "positive": true,
        "accent": "violet"
      },
      {
        "title": "Income",
        "value": "₹70,720",
        "rawAmount": 70720,
        "change": "+8.4%",
        "positive": true,
        "accent": "emerald"
      },
      {
        "title": "Savings",
        "value": "₹13,120",
        "rawAmount": 13120,
        "change": "+16.3%",
        "positive": true,
        "accent": "amber"
      }
    ]
  }
  ```

### `GET /api/dashboard/summary`
Returns full aggregated dashboard overview: balance, category spending, recent transactions, active budgets, active goals, and AI insight summary.

---

## 4. Transactions (`/api/transactions`)

### `GET /api/transactions`
List transactions with optional filtering and pagination.
- **Query Params:**
  - `type`: `"INCOME"` or `"EXPENSE"`
  - `category`: e.g. `"Food & Dining"`, `"Shopping"`, `"Freelance"`
  - `search`: Keyword search matching title, category, or description
  - `limit`: Number of items (e.g. `10`)
  - `offset`: Starting index (e.g. `0`)
  - `sort`: `"desc"` (default) or `"asc"`
- **Response (200):**
  ```json
  {
    "success": true,
    "count": 14,
    "transactions": [...]
  }
  ```

### `POST /api/transactions`
Create a new transaction.
- **Request Body:**
  ```json
  {
    "title": "College Canteen",
    "amount": 180,
    "category": "Food & Dining",
    "type": "EXPENSE",
    "description": "Lunch with friends",
    "paymentMethod": "UPI",
    "date": "2026-09-22T18:42:00.000Z"
  }
  ```
- **Response (201):** Returns created transaction object.

### `GET /api/transactions/:id`
Fetch a single transaction by ID.

### `PATCH /api/transactions/:id` / `PUT /api/transactions/:id`
Update transaction details.
- **Request Body:** Any subset of `title`, `amount`, `category`, `type`, `description`, `date`, `paymentMethod`.

### `DELETE /api/transactions/:id`
Deletes the transaction.

---

## 5. Budgets (`/api/budgets`)

### `GET /api/budgets`
Retrieve all category budgets enriched with dynamic `spent`, `remaining`, `percentage`, and `isOverBudget` calculations.
- **Response (200):**
  ```json
  {
    "success": true,
    "summary": {
      "totalBudget": 24000,
      "totalSpent": 17079,
      "totalRemaining": 6921
    },
    "budgets": [
      {
        "id": "b-1",
        "category": "Food & Dining",
        "limit": 8000,
        "spent": 840,
        "remaining": 7160,
        "percentage": 10.5,
        "isOverBudget": false
      }
    ]
  }
  ```

### `POST /api/budgets`
Set or update category budget limit.
- **Request Body:**
  ```json
  {
    "category": "Entertainment",
    "limit": 2000
  }
  ```

### `PUT /api/budgets/:id`
Update existing budget limit.

### `DELETE /api/budgets/:id`
Remove category budget.

---

## 6. Financial Goals (`/api/goals`)

### `GET /api/goals`
List savings goals with calculated progress percentage and total metrics.
- **Response (200):**
  ```json
  {
    "success": true,
    "summary": {
      "totalGoals": 4,
      "totalTarget": 180000,
      "totalSaved": 104500,
      "overallProgress": 58.1
    },
    "goals": [...]
  }
  ```

### `POST /api/goals`
Create a new savings goal.
- **Request Body:**
  ```json
  {
    "title": "New Laptop",
    "targetAmount": 100000,
    "currentAmount": 62000,
    "deadline": "2026-12-31",
    "category": "Technology"
  }
  ```

### `POST /api/goals/:id/contribute`
Contribute/deposit funds towards a specific goal.
- **Request Body:**
  ```json
  {
    "amount": 5000
  }
  ```

### `PUT /api/goals/:id`
Update goal fields.

### `DELETE /api/goals/:id`
Delete goal.

---

## 7. Analytics (`/api/analytics`)

### `GET /api/analytics/spending`
Category-wise distribution of expenses with absolute sums and percentages.

### `GET /api/analytics/trends`
Historical monthly comparisons (Income vs Expense vs Savings).

### `GET /api/analytics/cashflow`
Cash flow breakdown: total inflow, outflow, net savings, savings rate %, and surplus/deficit status.

---

## 8. AI Assistant (`/api/ai`)

### `POST /api/ai/chat`
Interactive financial Q&A endpoint.
- **Request Body:**
  ```json
  {
    "prompt": "How can I save more money this month?",
    "history": []
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "reply": "You currently have a net cash surplus of ₹52,480. A proven method is the 50/30/20 rule...",
    "metadata": {
      "source": "heuristic-engine",
      "confidence": 0.92,
      "timestamp": "2026-09-22T16:15:00.000Z"
    }
  }
  ```

### `GET /api/ai/suggestions`
Returns 4 quick prompt suggestions for the chat interface.

### `GET /api/ai/insights`
Returns automated financial insights on top spending categories and savings opportunities.

---

## 9. Receipts & OCR (`/api/receipts`)

### `GET /api/receipts`
List uploaded receipts and total scanned volume.

### `POST /api/receipts`
Record a new receipt item.

### `POST /api/receipts/scan`
OCR scanning simulation endpoint.
- **Request Body:**
  ```json
  {
    "fileName": "store_receipt.jpg"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Receipt scanned and parsed successfully",
    "result": {
      "success": true,
      "extracted": {
        "merchant": "Starbucks Coffee",
        "category": "Food & Dining",
        "amount": 350,
        "date": "2026-09-22",
        "confidence": 0.96,
        "detectedItems": [
          { "name": "Item #1", "price": 245 },
          { "name": "Tax / Packaging", "price": 105 }
        ]
      }
    }
  }
  ```

---

## 10. Settings & Data Management (`/api/settings`)

### `GET /api/settings`
Retrieve application preferences (notifications, currency, theme, etc.).

### `PUT /api/settings`
Update preferences.

### `GET /api/settings/export`
Export complete financial snapshot (transactions, budgets, goals, receipts, settings) in JSON format.

### `POST /api/settings/reset`
Reset application data back to seed state.
