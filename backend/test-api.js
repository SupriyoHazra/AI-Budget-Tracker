/**
 * Automated API Test Script
 * Verifies all endpoints exposed by the Finova AI Budget Tracker backend.
 */

const http = require("http");
const app = require("./src/server");

const TEST_PORT = 5001;

async function runTests() {
  console.log("Starting automated backend API tests on port " + TEST_PORT + "...\n");

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(TEST_PORT, resolve));

  const BASE_URL = `http://localhost:${TEST_PORT}`;
  let passed = 0;
  let failed = 0;

  async function testEndpoint(name, url, options = {}, validator) {
    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
      });

      const data = await res.json();
      const isValid = validator ? validator(res, data) : res.ok;

      if (isValid) {
        console.log(`✅ [PASS] ${name} (${res.status})`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${name} (${res.status}):`, data);
        failed++;
      }
      return data;
    } catch (err) {
      console.error(`❌ [ERROR] ${name}:`, err.message);
      failed++;
    }
  }

  try {
    // 1. Root & Health
    await testEndpoint("Root Info", "/", {}, (res, d) => res.ok && d.status === "running");
    await testEndpoint("Health Check", "/api/health", {}, (res, d) => res.ok && d.status === "ok");

    // 2. Auth
    await testEndpoint(
      "Auth Login",
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email: "alex.morgan@finova.ai", password: "password123" }),
      },
      (res, d) => res.ok && d.success === true && d.token
    );

    await testEndpoint(
      "Auth Current User",
      "/api/auth/me?userId=user-1",
      {},
      (res, d) => res.ok && d.success === true && d.user.name === "Alex Morgan"
    );

    // 3. Dashboard
    await testEndpoint(
      "Dashboard Stats",
      "/api/dashboard/stats",
      {},
      (res, d) => res.ok && d.success === true && Array.isArray(d.stats)
    );

    await testEndpoint(
      "Dashboard Summary",
      "/api/dashboard/summary",
      {},
      (res, d) => res.ok && d.success === true && d.data.balance !== undefined
    );

    // 4. Transactions
    await testEndpoint(
      "Get Transactions",
      "/api/transactions",
      {},
      (res, d) => res.ok && d.success === true && Array.isArray(d.transactions) && d.count > 0
    );

    const createdTx = await testEndpoint(
      "Create Expense Transaction",
      "/api/transactions",
      {
        method: "POST",
        body: JSON.stringify({
          title: "Test Coffee",
          amount: 150,
          category: "Food & Dining",
          type: "EXPENSE",
          description: "Automated test coffee",
        }),
      },
      (res, d) => res.status === 201 && d.success === true && d.transaction.title === "Test Coffee"
    );

    if (createdTx && createdTx.transaction) {
      const txId = createdTx.transaction.id;

      await testEndpoint(
        "Update Transaction",
        `/api/transactions/${txId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ amount: 160 }),
        },
        (res, d) => res.ok && d.transaction.amount === 160
      );

      await testEndpoint(
        "Delete Transaction",
        `/api/transactions/${txId}`,
        {
          method: "DELETE",
        },
        (res, d) => res.ok && d.success === true
      );
    }

    // 5. Budgets
    await testEndpoint(
      "Get Budgets",
      "/api/budgets",
      {},
      (res, d) => res.ok && d.success === true && Array.isArray(d.budgets) && d.summary !== undefined
    );

    await testEndpoint(
      "Create / Update Budget",
      "/api/budgets",
      {
        method: "POST",
        body: JSON.stringify({
          category: "Test Budget",
          limit: 3000,
        }),
      },
      (res, d) => res.status === 201 && d.success === true
    );

    // 6. Goals
    await testEndpoint(
      "Get Goals",
      "/api/goals",
      {},
      (res, d) => res.ok && d.success === true && Array.isArray(d.goals)
    );

    const createdGoal = await testEndpoint(
      "Create Goal",
      "/api/goals",
      {
        method: "POST",
        body: JSON.stringify({
          title: "Test Camera",
          targetAmount: 40000,
          currentAmount: 5000,
          category: "Electronics",
        }),
      },
      (res, d) => res.status === 201 && d.goal.title === "Test Camera"
    );

    if (createdGoal && createdGoal.goal) {
      await testEndpoint(
        "Contribute to Goal",
        `/api/goals/${createdGoal.goal.id}/contribute`,
        {
          method: "POST",
          body: JSON.stringify({ amount: 2000 }),
        },
        (res, d) => res.ok && d.goal.currentAmount === 7000
      );
    }

    // 7. Analytics
    await testEndpoint(
      "Analytics Spending by Category",
      "/api/analytics/spending",
      {},
      (res, d) => res.ok && Array.isArray(d.categories)
    );

    await testEndpoint(
      "Analytics Trends",
      "/api/analytics/trends",
      {},
      (res, d) => res.ok && Array.isArray(d.trends)
    );

    await testEndpoint(
      "Analytics Cash Flow",
      "/api/analytics/cashflow",
      {},
      (res, d) => res.ok && d.cashFlow.inflow !== undefined
    );

    // 8. AI Assistant
    await testEndpoint(
      "AI Chat",
      "/api/ai/chat",
      {
        method: "POST",
        body: JSON.stringify({ prompt: "How can I save more this month?" }),
      },
      (res, d) => res.ok && d.success === true && typeof d.reply === "string"
    );

    await testEndpoint(
      "AI Suggestions",
      "/api/ai/suggestions",
      {},
      (res, d) => res.ok && Array.isArray(d.suggestions)
    );

    await testEndpoint(
      "AI Insights",
      "/api/ai/insights",
      {},
      (res, d) => res.ok && d.insights.title !== undefined
    );

    // 9. Receipts
    await testEndpoint(
      "Get Receipts",
      "/api/receipts",
      {},
      (res, d) => res.ok && Array.isArray(d.receipts)
    );

    await testEndpoint(
      "Scan Receipt (OCR Stub)",
      "/api/receipts/scan",
      {
        method: "POST",
        body: JSON.stringify({ fileName: "sample-receipt.jpg" }),
      },
      (res, d) => res.ok && d.result.extracted.merchant !== undefined
    );

    // 10. Settings
    await testEndpoint(
      "Get Settings",
      "/api/settings",
      {},
      (res, d) => res.ok && d.settings.currency === "INR"
    );

    await testEndpoint(
      "Export Data",
      "/api/settings/export",
      {},
      (res, d) => res.ok && d.data.transactions !== undefined
    );

    console.log(`\n==================================================`);
    console.log(`Tests Completed! Passed: ${passed} | Failed: ${failed}`);
    console.log(`==================================================\n`);
  } finally {
    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  }
}

runTests();
