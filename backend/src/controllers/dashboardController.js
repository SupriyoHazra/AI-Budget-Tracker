const memoryStore = require("../data/memoryStore");
const aiService = require("../services/aiService");

class DashboardController {
  async getStats(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const { transactions } = await memoryStore.getTransactions({ userId });

      const incomeTransactions = transactions.filter((t) => t.type === "INCOME");
      const expenseTransactions = transactions.filter((t) => t.type === "EXPENSE");

      const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
      const totalExpense = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
      const totalBalance = Math.max(0, totalIncome - totalExpense);
      const totalSavings = Math.max(0, Math.round(totalBalance * 0.25));

      const stats = [
        {
          title: "Total Balance",
          value: `₹${totalBalance.toLocaleString("en-IN")}`,
          rawAmount: totalBalance,
          change: "+12.8%",
          positive: true,
          accent: "cyan",
        },
        {
          title: "Expenses",
          value: `₹${totalExpense.toLocaleString("en-IN")}`,
          rawAmount: totalExpense,
          change: "-5.2%",
          positive: true,
          accent: "violet",
        },
        {
          title: "Income",
          value: `₹${totalIncome.toLocaleString("en-IN")}`,
          rawAmount: totalIncome,
          change: "+8.4%",
          positive: true,
          accent: "emerald",
        },
        {
          title: "Savings",
          value: `₹${totalSavings.toLocaleString("en-IN")}`,
          rawAmount: totalSavings,
          change: "+16.3%",
          positive: true,
          accent: "amber",
        },
      ];

      res.json({
        success: true,
        stats,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const { transactions } = await memoryStore.getTransactions({ userId });
      const budgets = await memoryStore.getBudgets(userId);
      const goals = await memoryStore.getGoals(userId);

      const income = transactions.filter((t) => t.type === "INCOME");
      const expenses = transactions.filter((t) => t.type === "EXPENSE");

      const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);
      const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
      const balance = Math.max(0, totalIncome - totalExpense);

      // Category spending aggregation
      const categoryMap = {};
      expenses.forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
      });

      const categorySpending = Object.entries(categoryMap).map(([name, amount]) => ({
        name,
        amount,
        percentage: totalExpense > 0 ? Number(((amount / totalExpense) * 100).toFixed(1)) : 0,
      }));

      // AI insight
      const insight = aiService.generateInsights({ transactions, budgets, goals });

      res.json({
        success: true,
        data: {
          balance,
          totalIncome,
          totalExpense,
          recentTransactions: transactions.slice(0, 5),
          categorySpending,
          budgets,
          goals,
          aiInsight: insight,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
