/**
 * AI Service Module
 *
 * NOTE FOR AI-ML TEAM MEMBER:
 * This service handles all AI interactions for the application.
 * You can easily integrate your LLM (Gemini / OpenAI / Claude) or custom Python ML microservice
 * inside the marked hook functions below.
 */

class AIService {
  /**
   * Main chat function for AI Assistant
   * @param {Object} params
   * @param {string} params.prompt - The user's query
   * @param {Array} params.history - Conversation history
   * @param {Array} params.transactions - User's transactions
   * @param {Array} params.budgets - User's budgets
   * @param {Array} params.goals - User's goals
   * @returns {Promise<{ reply: string, source: string, confidence: number }>}
   */
  async chatWithAssistant({ prompt = "", history = [], transactions = [], budgets = [], goals = [] }) {
    // =========================================================================
    // TODO: [AI-ML TEAM MEMBER]
    // Replace or enhance this section with your custom ML Model, LangChain,
    // Google Gemini API, OpenAI API, or your team's Python FastAPI endpoint.
    // Example:
    // const response = await callGeminiModel({ prompt, context: { transactions, budgets } });
    // return { reply: response.text, source: "gemini-flash" };
    // =========================================================================

    const lower = prompt.toLowerCase();

    // Financial calculations for intelligent context-aware responses
    const expenses = transactions.filter((t) => t.type === "EXPENSE");
    const income = transactions.filter((t) => t.type === "INCOME");

    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);

    // Category aggregations
    const categoryTotals = {};
    expenses.forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : ["Food & Dining", 0];

    // Intent recognition heuristics
    if (lower.includes("spending") || lower.includes("spent") || lower.includes("expense")) {
      return {
        reply: `Your total tracked spending is ₹${totalExpense.toLocaleString("en-IN")}. Your largest category is ${
          topCategory[0]
        } at ₹${topCategory[1].toLocaleString("en-IN")}${
          sortedCategories[1]
            ? `, followed by ${sortedCategories[1][0]} at ₹${sortedCategories[1][1].toLocaleString("en-IN")}`
            : ""
        }. Monitoring these key areas could significantly optimize your monthly savings.`,
        source: "heuristic-engine",
        confidence: 0.95,
      };
    }

    if (lower.includes("save") || lower.includes("saving")) {
      const netSavings = Math.max(0, totalIncome - totalExpense);
      return {
        reply: `You currently have a net cash surplus of ₹${netSavings.toLocaleString("en-IN")}. A proven method is the 50/30/20 rule: allocate 50% of income to essentials, 30% to personal goals, and 20% directly into an emergency fund as soon as your income arrives.`,
        source: "heuristic-engine",
        confidence: 0.92,
      };
    }

    if (lower.includes("budget")) {
      const totalBudgetLimit = budgets.reduce((sum, b) => sum + Number(b.limit), 0);
      const remaining = totalBudgetLimit - totalExpense;
      return {
        reply: `Your active category budgets total ₹${totalBudgetLimit.toLocaleString("en-IN")}, while your tracked expenses stand at ₹${totalExpense.toLocaleString("en-IN")}. You currently have approximately ₹${remaining.toLocaleString(
          "en-IN"
        )} buffer across your allocated limits.`,
        source: "heuristic-engine",
        confidence: 0.94,
      };
    }

    if (lower.includes("tip") || lower.includes("advice") || lower.includes("suggest")) {
      return {
        reply: "Tip: Small recurring micro-expenses often add up to more than 25% of monthly expenditures without notice. Reviewing daily food and beverage orders once a week can unlock extra savings of up to ₹2,500 every month.",
        source: "heuristic-engine",
        confidence: 0.9,
      };
    }

    if (lower.includes("goal")) {
      const goalCount = goals.length;
      const activeGoals = goals.filter((g) => !g.completed);
      return {
        reply: `You are tracking ${goalCount} goals (${activeGoals.length} in progress). Staying consistent with automated monthly transfers will keep your targets comfortably on schedule without compromising daily necessities.`,
        source: "heuristic-engine",
        confidence: 0.91,
      };
    }

    return {
      reply: "Based on your financial activity, your cash flow shows a positive trajectory with steady income and moderate discretionary spending. Let me know if you would like me to analyze a specific category, budget, or savings goal!",
      source: "heuristic-engine",
      confidence: 0.88,
    };
  }

  /**
   * Quick prompt suggestions for the chat interface
   */
  getSuggestions() {
    return [
      {
        id: "sug-1",
        label: "Analyze my spending",
        prompt: "Analyze my spending this month.",
      },
      {
        id: "sug-2",
        label: "How can I save more?",
        prompt: "How can I save more money this month?",
      },
      {
        id: "sug-3",
        label: "Check my budget",
        prompt: "How am I doing with my monthly budget?",
      },
      {
        id: "sug-4",
        label: "Give me a tip",
        prompt: "Give me a useful financial tip.",
      },
    ];
  }

  /**
   * Automated dashboard insight generation
   */
  generateInsights({ transactions = [], budgets = [], goals = [] }) {
    const expenses = transactions.filter((t) => t.type === "EXPENSE");
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      title: "Smart Spending Analysis",
      summary: `Your tracked expenses this month stand at ₹${totalExpense.toLocaleString("en-IN")}.`,
      highlight: "Food & Dining and Shopping account for over 50% of outlays.",
      recommendation: "Consider capping dining out to 2 times a week to save an extra ₹1,800 this month.",
      confidence: 0.94,
    };
  }
}

module.exports = new AIService();
