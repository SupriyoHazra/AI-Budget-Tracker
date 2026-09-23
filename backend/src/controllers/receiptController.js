const memoryStore = require("../data/memoryStore");
const receiptOcrService = require("../services/receiptOcrService");

class ReceiptController {
  async getReceipts(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";
      const receipts = await memoryStore.getReceipts(userId);

      const totalScanned = receipts.reduce((sum, r) => sum + Number(r.amount), 0);

      res.json({
        success: true,
        count: receipts.length,
        totalScanned,
        receipts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getReceiptById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || "user-1";

      const receipt = await memoryStore.getReceiptById(id, userId);
      if (!receipt) {
        return res.status(404).json({ success: false, message: "Receipt not found" });
      }

      res.json({ success: true, receipt });
    } catch (error) {
      next(error);
    }
  }

  async createReceipt(req, res, next) {
    try {
      const { merchant, category, amount, date, time, items, status, userId = "user-1" } = req.body;

      if (!merchant || amount === undefined || !category) {
        return res.status(400).json({
          success: false,
          message: "Merchant, category, and amount are required",
        });
      }

      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
      }

      const receipt = await memoryStore.createReceipt({
        merchant,
        category,
        amount: numAmount,
        date,
        time,
        items,
        status,
        userId,
      });

      res.status(201).json({
        success: true,
        message: "Receipt recorded successfully",
        receipt,
      });
    } catch (error) {
      next(error);
    }
  }

  async scanReceipt(req, res, next) {
    try {
      const { fileName, rawText } = req.body;

      const scanResult = await receiptOcrService.parseReceiptImage({ fileName, rawText });

      res.json({
        success: true,
        message: "Receipt scanned and parsed successfully",
        result: scanResult,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteReceipt(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || req.body.userId || "user-1";

      const deleted = await memoryStore.deleteReceipt(id, userId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Receipt not found",
        });
      }

      res.json({
        success: true,
        message: "Receipt deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReceiptController();
