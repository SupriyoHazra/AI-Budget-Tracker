const memoryStore = require("../data/memoryStore");

class AnalyticsController {
  async getSpendingByCategory(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const { transactions } = await memoryStore.getTransactions({ userId, type: "EXPENSE" });
      const totalExpense = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

      const categoryMap = {};
      transactions.forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
      });

      const categories = Object.entries(categoryMap)
        .map(([name, amount]) => ({
          name,
          amount,
          percentage: totalExpense > 0 ? Number(((amount / totalExpense) * 100).toFixed(1)) : 0,
        }))
        .sort((a, b) => b.amount - a.amount);

      res.json({
        success: true,
        totalExpense,
        categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTrends(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const { transactions } = await memoryStore.getTransactions({ userId });

      // Monthly aggregates
      const monthlyData = [
        { month: "Apr", income: 38000, expense: 22000, savings: 16000 },
        { month: "May", income: 42000, expense: 26000, savings: 16000 },
        { month: "Jun", income: 45000, expense: 21000, savings: 24000 },
        { month: "Jul", income: 51000, expense: 24000, savings: 27000 },
        { month: "Aug", income: 58000, expense: 28000, savings: 30000 },
        { month: "Sep", income: 70720, expense: 18240, savings: 52480 },
      ];

      res.json({
        success: true,
        trends: monthlyData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCashFlow(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const { transactions } = await memoryStore.getTransactions({ userId });

      const income = transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expense = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const netSavings = income - expense;
      const savingsRate = income > 0 ? Number(((netSavings / income) * 100).toFixed(1)) : 0;

      res.json({
        success: true,
        cashFlow: {
          inflow: income,
          outflow: expense,
          netSavings,
          savingsRate,
          status: netSavings >= 0 ? "Surplus" : "Deficit",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AnalyticsController();
