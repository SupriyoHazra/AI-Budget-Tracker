const memoryStore = require("../data/memoryStore");

class SettingsController {
  async getSettings(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";
      const settings = await memoryStore.getSettings(userId);

      res.json({
        success: true,
        settings,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const userId = req.body.userId || "user-1";
      const updates = req.body;

      const updated = await memoryStore.updateSettings(updates, userId);

      res.json({
        success: true,
        message: "Settings updated successfully",
        settings: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async exportData(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const user = await memoryStore.getUser(userId);
      const { transactions } = await memoryStore.getTransactions({ userId });
      const budgets = await memoryStore.getBudgets(userId);
      const goals = await memoryStore.getGoals(userId);
      const receipts = await memoryStore.getReceipts(userId);
      const settings = await memoryStore.getSettings(userId);

      res.json({
        success: true,
        exportedAt: new Date().toISOString(),
        data: {
          user,
          transactions,
          budgets,
          goals,
          receipts,
          settings,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async resetData(req, res, next) {
    try {
      memoryStore.reset();

      res.json({
        success: true,
        message: "All data successfully reset to initial default state",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SettingsController();
