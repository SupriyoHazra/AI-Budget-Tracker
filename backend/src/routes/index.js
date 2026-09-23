const express = require("express");

const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const transactionRoutes = require("./transactionRoutes");
const budgetRoutes = require("./budgetRoutes");
const goalRoutes = require("./goalRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const aiRoutes = require("./aiRoutes");
const receiptRoutes = require("./receiptRoutes");
const settingsRoutes = require("./settingsRoutes");

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Budget Tracker Backend API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mount modules
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/transactions", transactionRoutes);
router.use("/budgets", budgetRoutes);
router.use("/goals", goalRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/ai", aiRoutes);
router.use("/receipts", receiptRoutes);
router.use("/settings", settingsRoutes);

module.exports = router;
