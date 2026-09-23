const express = require("express");
const receiptController = require("../controllers/receiptController");

const router = express.Router();

router.get("/", (req, res, next) => receiptController.getReceipts(req, res, next));
router.get("/:id", (req, res, next) => receiptController.getReceiptById(req, res, next));
router.post("/", (req, res, next) => receiptController.createReceipt(req, res, next));
router.post("/scan", (req, res, next) => receiptController.scanReceipt(req, res, next));
router.delete("/:id", (req, res, next) => receiptController.deleteReceipt(req, res, next));

module.exports = router;
