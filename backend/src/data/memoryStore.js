const crypto = require("crypto");
const {
  defaultUser,
  initialTransactions,
  initialBudgets,
  initialGoals,
  initialReceipts,
  initialSettings,
} = require("./seedData");

class MemoryStore {
  constructor() {
    this.reset();
  }

  reset() {
    this.users = [JSON.parse(JSON.stringify(defaultUser))];
    this.transactions = JSON.parse(JSON.stringify(initialTransactions));
    this.budgets = JSON.parse(JSON.stringify(initialBudgets));
    this.goals = JSON.parse(JSON.stringify(initialGoals));
    this.receipts = JSON.parse(JSON.stringify(initialReceipts));
    this.settings = { ...initialSettings };
  }

  generateId(prefix = "id") {
    return `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
  }

  // --- Users ---
  async getUser(id = "user-1") {
    return this.users.find((u) => u.id === id) || null;
  }

  async getUserByEmail(email) {
    if (!email) return null;
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async createUser({ name, email }) {
    const user = {
      id: this.generateId("user"),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  // --- Transactions ---
  async getTransactions({ userId = "user-1", type, category, search, limit, offset, sort = "desc" } = {}) {
    let list = this.transactions.filter((tx) => !userId || tx.userId === userId);

    if (type) {
      const upperType = type.toUpperCase();
      list = list.filter((tx) => tx.type === upperType);
    }

    if (category && category !== "All") {
      list = list.filter((tx) => tx.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (tx) =>
          tx.title.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q) ||
          (tx.description && tx.description.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sort === "asc" ? dateA - dateB : dateB - dateA;
    });

    const total = list.length;
    const start = offset ? Number(offset) : 0;
    const end = limit ? start + Number(limit) : undefined;
    const paginated = end ? list.slice(start, end) : list;

    return { total, transactions: paginated };
  }

  async getTransactionById(id, userId = "user-1") {
    return this.transactions.find((tx) => tx.id === id && (!userId || tx.userId === userId)) || null;
  }

  async createTransaction({ title, amount, category, type, description, date, paymentMethod, recurrence, userId = "user-1" }) {
    const newTx = {
      id: this.generateId("tx"),
      userId,
      title: title.trim(),
      amount: Number(Number(amount).toFixed(2)),
      category: category.trim(),
      type: type.toUpperCase(),
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      description: description ? description.trim() : "",
      paymentMethod: paymentMethod || "Other",
      recurrence: recurrence || "One-time",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.transactions.unshift(newTx);
    return newTx;
  }

  async updateTransaction(id, updates, userId = "user-1") {
    const index = this.transactions.findIndex((tx) => tx.id === id && (!userId || tx.userId === userId));
    if (index === -1) return null;

    const existing = this.transactions[index];
    const updated = {
      ...existing,
      ...updates,
      amount: updates.amount !== undefined ? Number(Number(updates.amount).toFixed(2)) : existing.amount,
      type: updates.type ? updates.type.toUpperCase() : existing.type,
      updatedAt: new Date().toISOString(),
    };

    this.transactions[index] = updated;
    return updated;
  }

  async deleteTransaction(id, userId = "user-1") {
    const index = this.transactions.findIndex((tx) => tx.id === id && (!userId || tx.userId === userId));
    if (index === -1) return false;
    this.transactions.splice(index, 1);
    return true;
  }

  // --- Budgets ---
  async getBudgets(userId = "user-1") {
    return this.budgets.filter((b) => !userId || b.userId === userId);
  }

  async getBudgetById(id, userId = "user-1") {
    return this.budgets.find((b) => b.id === id && (!userId || b.userId === userId)) || null;
  }

  async createBudget({ category, limit, month, year, userId = "user-1" }) {
    const existing = this.budgets.find(
      (b) => b.userId === userId && b.category.toLowerCase() === category.toLowerCase()
    );

    if (existing) {
      existing.limit = Number(Number(limit).toFixed(2));
      existing.updatedAt = new Date().toISOString();
      return existing;
    }

    const budget = {
      id: this.generateId("b"),
      userId,
      category: category.trim(),
      limit: Number(Number(limit).toFixed(2)),
      month: month || new Date().getMonth() + 1,
      year: year || new Date().getFullYear(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.budgets.push(budget);
    return budget;
  }

  async updateBudget(id, updates, userId = "user-1") {
    const index = this.budgets.findIndex((b) => b.id === id && (!userId || b.userId === userId));
    if (index === -1) return null;

    const current = this.budgets[index];
    const updated = {
      ...current,
      ...updates,
      limit: updates.limit !== undefined ? Number(Number(updates.limit).toFixed(2)) : current.limit,
      updatedAt: new Date().toISOString(),
    };

    this.budgets[index] = updated;
    return updated;
  }

  async deleteBudget(id, userId = "user-1") {
    const index = this.budgets.findIndex((b) => b.id === id && (!userId || b.userId === userId));
    if (index === -1) return false;
    this.budgets.splice(index, 1);
    return true;
  }

  // --- Goals ---
  async getGoals(userId = "user-1") {
    return this.goals.filter((g) => !userId || g.userId === userId);
  }

  async getGoalById(id, userId = "user-1") {
    return this.goals.find((g) => g.id === id && (!userId || g.userId === userId)) || null;
  }

  async createGoal({ title, targetAmount, currentAmount = 0, deadline, category, userId = "user-1" }) {
    const goal = {
      id: this.generateId("g"),
      userId,
      title: title.trim(),
      targetAmount: Number(Number(targetAmount).toFixed(2)),
      currentAmount: Number(Number(currentAmount).toFixed(2)),
      deadline: deadline || null,
      category: category || "Savings",
      completed: Number(currentAmount) >= Number(targetAmount),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.goals.push(goal);
    return goal;
  }

  async updateGoal(id, updates, userId = "user-1") {
    const index = this.goals.findIndex((g) => g.id === id && (!userId || g.userId === userId));
    if (index === -1) return null;

    const current = this.goals[index];
    const targetAmount = updates.targetAmount !== undefined ? Number(Number(updates.targetAmount).toFixed(2)) : current.targetAmount;
    const currentAmount = updates.currentAmount !== undefined ? Number(Number(updates.currentAmount).toFixed(2)) : current.currentAmount;

    const updated = {
      ...current,
      ...updates,
      targetAmount,
      currentAmount,
      completed: currentAmount >= targetAmount,
      updatedAt: new Date().toISOString(),
    };

    this.goals[index] = updated;
    return updated;
  }

  async contributeToGoal(id, amount, userId = "user-1") {
    const goal = await this.getGoalById(id, userId);
    if (!goal) return null;

    const addAmount = Number(amount);
    if (isNaN(addAmount) || addAmount <= 0) return null;

    goal.currentAmount = Number((goal.currentAmount + addAmount).toFixed(2));
    goal.completed = goal.currentAmount >= goal.targetAmount;
    goal.updatedAt = new Date().toISOString();

    return goal;
  }

  async deleteGoal(id, userId = "user-1") {
    const index = this.goals.findIndex((g) => g.id === id && (!userId || g.userId === userId));
    if (index === -1) return false;
    this.goals.splice(index, 1);
    return true;
  }

  // --- Receipts ---
  async getReceipts(userId = "user-1") {
    return this.receipts.filter((r) => !userId || r.userId === userId);
  }

  async getReceiptById(id, userId = "user-1") {
    return this.receipts.find((r) => r.id === id && (!userId || r.userId === userId)) || null;
  }

  async createReceipt({ merchant, category, amount, date, time, items = [], status = "Verified", userId = "user-1" }) {
    const receipt = {
      id: this.generateId("r"),
      userId,
      merchant: merchant.trim(),
      category: category.trim(),
      amount: Number(Number(amount).toFixed(2)),
      date: date || new Date().toISOString().split("T")[0],
      time: time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status,
      items,
      createdAt: new Date().toISOString(),
    };

    this.receipts.unshift(receipt);
    return receipt;
  }

  async deleteReceipt(id, userId = "user-1") {
    const index = this.receipts.findIndex((r) => r.id === id && (!userId || r.userId === userId));
    if (index === -1) return false;
    this.receipts.splice(index, 1);
    return true;
  }

  // --- Settings ---
  async getSettings(userId = "user-1") {
    return { ...this.settings, userId };
  }

  async updateSettings(updates, userId = "user-1") {
    this.settings = {
      ...this.settings,
      ...updates,
      userId,
    };
    return this.settings;
  }
}

// Singleton instance for in-memory persistence during server runtime
const memoryStore = new MemoryStore();

module.exports = memoryStore;
