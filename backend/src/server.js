const express = require("express");
const cors = require("cors");
const config = require("./config");
const requestLogger = require("./middleware/requestLogger");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const apiRoutes = require("./routes");

const app = express();

// Security and utility middleware
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Root informational endpoint
app.get("/", (req, res) => {
  res.json({
    status: "running",
    name: "Finova AI Budget Tracker - Backend API",
    version: "1.0.0",
    description: "Backend service for AI Budget Tracker",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      dashboard: "/api/dashboard",
      transactions: "/api/transactions",
      budgets: "/api/budgets",
      goals: "/api/goals",
      analytics: "/api/analytics",
      ai: "/api/ai",
      receipts: "/api/receipts",
      settings: "/api/settings",
    },
    documentation: "/api/health",
  });
});

// Mount all API endpoints under /api
app.use("/api", apiRoutes);

// Catch 404 routes
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

// Start server only when run directly
if (require.main === module) {
  const PORT = config.port;
  const server = app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Finova AI Budget Tracker Backend API is running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
    console.log(`==================================================\n`);
  });

  // Handle graceful termination
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("Process terminated.");
    });
  });
}

module.exports = app;