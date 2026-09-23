const memoryStore = require("../data/memoryStore");

class TransactionController {
  async getTransactions(req, res, next) {
    try {
      const { userId = "user-1", type, category, search, limit, offset, sort } = req.query;

      const result = await memoryStore.getTransactions({
        userId,
        type,
        category,
        search,
        limit,
        offset,
        sort,
      });

      res.json({
        success: true,
        count: result.total,
        transactions: result.transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || "user-1";

      const transaction = await memoryStore.getTransactionById(id, userId);

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      res.json({
        success: true,
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const {
        title,
        amount,
        category,
        type,
        description,
        date,
        paymentMethod,
        recurrence,
        userId = "user-1",
      } = req.body;

      if (!title || amount === undefined || !category || !type) {
        return res.status(400).json({
          success: false,
          message: "Please provide title, amount, category, and type (INCOME or EXPENSE)",
        });
      }

      const upperType = type.toUpperCase();
      if (!["INCOME", "EXPENSE"].includes(upperType)) {
        return res.status(400).json({
          success: false,
          message: "Type must be either INCOME or EXPENSE",
        });
      }

      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
      }

      const transaction = await memoryStore.createTransaction({
        title,
        amount: numAmount,
        category,
        type: upperType,
        description,
        date,
        paymentMethod,
        recurrence,
        userId,
      });

      res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const { userId = "user-1", title, amount, category, type, description, date, paymentMethod } = req.body;

      const updates = {};
      if (title !== undefined) updates.title = title.trim();
      if (amount !== undefined) {
        const num = Number(amount);
        if (isNaN(num) || num <= 0) {
          return res.status(400).json({ success: false, message: "Amount must be a positive number" });
        }
        updates.amount = num;
      }
      if (category !== undefined) updates.category = category.trim();
      if (type !== undefined) {
        const upper = type.toUpperCase();
        if (!["INCOME", "EXPENSE"].includes(upper)) {
          return res.status(400).json({ success: false, message: "Type must be INCOME or EXPENSE" });
        }
        updates.type = upper;
      }
      if (description !== undefined) updates.description = description.trim();
      if (date !== undefined) updates.date = new Date(date).toISOString();
      if (paymentMethod !== undefined) updates.paymentMethod = paymentMethod;

      const updated = await memoryStore.updateTransaction(id, updates, userId);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      res.json({
        success: true,
        message: "Transaction updated successfully",
        transaction: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || req.body.userId || "user-1";

      const deleted = await memoryStore.deleteTransaction(id, userId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      res.json({
        success: true,
        message: "Transaction deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionController();
