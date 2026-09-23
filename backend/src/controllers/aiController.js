const memoryStore = require("../data/memoryStore");
const aiService = require("../services/aiService");

class AIController {
  async chat(req, res, next) {
    try {
      const { prompt, history = [], userId = "user-1" } = req.body;

      if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
        return res.status(400).json({
          success: false,
          message: "Prompt is required and cannot be empty",
        });
      }

      // Fetch financial context for assistant
      const { transactions } = await memoryStore.getTransactions({ userId });
      const budgets = await memoryStore.getBudgets(userId);
      const goals = await memoryStore.getGoals(userId);

      const aiResponse = await aiService.chatWithAssistant({
        prompt: prompt.trim(),
        history,
        transactions,
        budgets,
        goals,
      });

      res.json({
        success: true,
        reply: aiResponse.reply,
        metadata: {
          source: aiResponse.source,
          confidence: aiResponse.confidence,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  getSuggestions(req, res) {
    const suggestions = aiService.getSuggestions();
    res.json({
      success: true,
      suggestions,
    });
  }

  async getInsights(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";

      const { transactions } = await memoryStore.getTransactions({ userId });
      const budgets = await memoryStore.getBudgets(userId);
      const goals = await memoryStore.getGoals(userId);

      const insights = aiService.generateInsights({
        transactions,
        budgets,
        goals,
      });

      res.json({
        success: true,
        insights,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AIController();
