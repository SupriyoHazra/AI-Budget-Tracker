# 🗄️ Database Integration Guide (For Database Team Member)

Hello! This backend has been structured using a clean **Repository / Store Pattern** so that you can easily integrate the persistent database of your choice without having to rewrite any controllers, validation logic, or routing.

---

## 📍 Where the Data Layer Lives

All data operations are currently centralized in:
`backend/src/data/memoryStore.js`

Every controller calls `memoryStore` methods such as:
- `memoryStore.getTransactions({ userId, type, category, search, limit, offset, sort })`
- `memoryStore.createTransaction(data)`
- `memoryStore.updateTransaction(id, data, userId)`
- `memoryStore.deleteTransaction(id, userId)`
- `memoryStore.getBudgets(userId)`
- `memoryStore.createBudget(data)`
- `memoryStore.getGoals(userId)`
- `memoryStore.createGoal(data)`
- `memoryStore.contributeToGoal(id, amount, userId)`
- `memoryStore.getReceipts(userId)`
- `memoryStore.getSettings(userId)`

---

## 🚀 How to Connect Your Database (e.g., Prisma + PostgreSQL)

The `backend/prisma/` directory and `prisma/schema.prisma` are already in place!

### Step 1: Configure your `.env`
Update `backend/.env` with your real database connection string:
```env
DATABASE_URL="postgresql://username:password@host:port/database_name?sslmode=require"
PORT=5000
```

### Step 2: Run Prisma Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Step 3: Connect Prisma in `memoryStore.js` or Swap with `prismaStore.js`
In `backend/src/lib/prisma.js`, Prisma is already instantiated:
```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
```

You can either:
1. Replace the methods inside `backend/src/data/memoryStore.js` with `prisma.<model>.findMany()`, `create()`, etc.
2. OR create `backend/src/data/prismaStore.js` implementing the same method signatures and export it in place of `memoryStore`.

### Example Prisma Integration for Transactions:
```javascript
const prisma = require("../lib/prisma");

async function getTransactions({ userId, type, category }) {
  const where = { userId };
  if (type) where.type = type;
  if (category && category !== "All") where.category = category;

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { date: "desc" },
  });

  return { total: transactions.length, transactions };
}
```

---

## 🧪 Verifying Your Database Changes
After replacing the methods, simply run:
```bash
npm test
```
The automated test suite (`test-api.js`) will verify that all 25 endpoints continue to work seamlessly!
