const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

// GET all transactions with filtering/pagination
router.get("/", (req, res, next) => transactionController.getTransactions(req, res, next));

// GET single transaction
router.get("/:id", (req, res, next) => transactionController.getTransactionById(req, res, next));

// POST new transaction
router.post("/", (req, res, next) => transactionController.createTransaction(req, res, next));

// PATCH / PUT update transaction
router.patch("/:id", (req, res, next) => transactionController.updateTransaction(req, res, next));
router.put("/:id", (req, res, next) => transactionController.updateTransaction(req, res, next));

// DELETE transaction
router.delete("/:id", (req, res, next) => transactionController.deleteTransaction(req, res, next));

module.exports = router;
