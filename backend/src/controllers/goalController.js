const memoryStore = require("../data/memoryStore");

class GoalController {
  async getGoals(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const goals = await memoryStore.getGoals(userId);

      const enrichedGoals = goals.map((g) => {
        const target = Number(g.targetAmount);
        const current = Number(g.currentAmount);
        const progress = target > 0 ? Number(Math.min(100, (current / target) * 100).toFixed(1)) : 0;
        const remaining = Math.max(0, target - current);

        return {
          ...g,
          progress,
          remaining,
          completed: current >= target,
        };
      });

      const totalTarget = enrichedGoals.reduce((sum, g) => sum + g.targetAmount, 0);
      const totalSaved = enrichedGoals.reduce((sum, g) => sum + g.currentAmount, 0);

      res.json({
        success: true,
        summary: {
          totalGoals: enrichedGoals.length,
          totalTarget,
          totalSaved,
          overallProgress: totalTarget > 0 ? Number(((totalSaved / totalTarget) * 100).toFixed(1)) : 0,
        },
        goals: enrichedGoals,
      });
    } catch (error) {
      next(error);
    }
  }

  async getGoalById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || "user-1";

      const goal = await memoryStore.getGoalById(id, userId);
      if (!goal) {
        return res.status(404).json({ success: false, message: "Goal not found" });
      }

      res.json({ success: true, goal });
    } catch (error) {
      next(error);
    }
  }

  async createGoal(req, res, next) {
    try {
      const { title, targetAmount, currentAmount = 0, deadline, category, userId = "user-1" } = req.body;

      if (!title || targetAmount === undefined) {
        return res.status(400).json({
          success: false,
          message: "Title and targetAmount are required",
        });
      }

      const numTarget = Number(targetAmount);
      if (isNaN(numTarget) || numTarget <= 0) {
        return res.status(400).json({
          success: false,
          message: "targetAmount must be a positive number",
        });
      }

      const goal = await memoryStore.createGoal({
        title,
        targetAmount: numTarget,
        currentAmount: Number(currentAmount) || 0,
        deadline,
        category,
        userId,
      });

      res.status(201).json({
        success: true,
        message: "Goal created successfully",
        goal,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateGoal(req, res, next) {
    try {
      const { id } = req.params;
      const { title, targetAmount, currentAmount, deadline, category, completed, userId = "user-1" } = req.body;

      const updates = {};
      if (title !== undefined) updates.title = title.trim();
      if (targetAmount !== undefined) {
        const num = Number(targetAmount);
        if (isNaN(num) || num <= 0) {
          return res.status(400).json({ success: false, message: "targetAmount must be a positive number" });
        }
        updates.targetAmount = num;
      }
      if (currentAmount !== undefined) {
        const num = Number(currentAmount);
        if (isNaN(num) || num < 0) {
          return res.status(400).json({ success: false, message: "currentAmount cannot be negative" });
        }
        updates.currentAmount = num;
      }
      if (deadline !== undefined) updates.deadline = deadline;
      if (category !== undefined) updates.category = category;
      if (completed !== undefined) updates.completed = Boolean(completed);

      const updated = await memoryStore.updateGoal(id, updates, userId);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Goal not found",
        });
      }

      res.json({
        success: true,
        message: "Goal updated successfully",
        goal: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async contribute(req, res, next) {
    try {
      const { id } = req.params;
      const { amount, userId = "user-1" } = req.body;

      if (amount === undefined) {
        return res.status(400).json({
          success: false,
          message: "Amount is required",
        });
      }

      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Contribution amount must be a positive number",
        });
      }

      const updated = await memoryStore.contributeToGoal(id, numAmount, userId);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Goal not found",
        });
      }

      res.json({
        success: true,
        message: `Successfully contributed ₹${numAmount} to ${updated.title}`,
        goal: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteGoal(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.userId || req.body.userId || "user-1";

      const deleted = await memoryStore.deleteGoal(id, userId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Goal not found",
        });
      }

      res.json({
        success: true,
        message: "Goal deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GoalController();
