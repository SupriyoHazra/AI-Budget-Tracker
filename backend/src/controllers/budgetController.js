const memoryStore = require("../data/memoryStore");

class BudgetController {
  async getBudgets(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const budgets = await memoryStore.getBudgets(userId);
      const { transactions } = await memoryStore.getTransactions({ userId, type: "EXPENSE" });

      // Calculate dynamic spent amount for each budget category
      const enrichedBudgets = budgets.map((b) => {
        const matchingExpenses = transactions.filter(
          (t) => t.category.toLowerCase() === b.category.toLowerCase()
        );
        const spent = matchingExpenses.reduce((sum, t) => sum + Number(t.amount), 0);
        const limit = Number(b.limit);
        const remaining = Math.max(0, limit - spent);
        const percentage = limit > 0 ? Number(((spent / limit) * 100).toFixed(1)) : 0;

        return {
          ...b,
          spent,
          remaining,
          percentage,
          isOverBudget: spent > limit,
        };
      });

      const totalBudget = enrichedBudgets.reduce((sum, b) => sum + b.limit, 0);
      const totalSpent = enrichedBudgets.reduce((sum, b) => sum + b.spent, 0);

      res.json({
        success: true,
        summary: {
          totalBudget,
          totalSpent,
          totalRemaining: Math.max(0, totalBudget - totalSpent),
        },
        budgets: enrichedBudgets,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBudgetById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || "user-1";

      const budget = await memoryStore.getBudgetById(id, userId);
      if (!budget) {
        return res.status(404).json({ success: false, message: "Budget not found" });
      }

      res.json({ success: true, budget });
    } catch (error) {
      next(error);
    }
  }

  async createBudget(req, res, next) {
    try {
      const { category, limit, month, year, userId = "user-1" } = req.body;

      if (!category || limit === undefined) {
        return res.status(400).json({
          success: false,
          message: "Category and limit are required",
        });
      }

      const numLimit = Number(limit);
      if (isNaN(numLimit) || numLimit <= 0) {
        return res.status(400).json({
          success: false,
          message: "Limit must be a positive number",
        });
      }

      const budget = await memoryStore.createBudget({
        category,
        limit: numLimit,
        month,
        year,
        userId,
      });

      res.status(201).json({
        success: true,
        message: "Budget set successfully",
        budget,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBudget(req, res, next) {
    try {
      const { id } = req.params;
      const { limit, category, userId = "user-1" } = req.body;

      const updates = {};
      if (limit !== undefined) {
        const num = Number(limit);
        if (isNaN(num) || num <= 0) {
          return res.status(400).json({ success: false, message: "Limit must be a positive number" });
        }
        updates.limit = num;
      }
      if (category) updates.category = category.trim();

      const updated = await memoryStore.updateBudget(id, updates, userId);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Budget not found",
        });
      }

      res.json({
        success: true,
        message: "Budget updated successfully",
        budget: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBudget(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || req.body.userId || "user-1";

      const deleted = await memoryStore.deleteBudget(id, userId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Budget not found",
        });
      }

      res.json({
        success: true,
        message: "Budget deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BudgetController();
