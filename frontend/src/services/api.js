const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = localStorage.getItem("finova_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.warn(`[API] ${options.method || "GET"} ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const authApi = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  getMe: () => request("/auth/me"),
  logout: () => request("/auth/logout", { method: "POST" }),
};

export const dashboardApi = {
  getStats: () => request("/dashboard/stats"),
  getSummary: () => request("/dashboard/summary"),
};

export const transactionsApi = {
  getTransactions: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/transactions${query ? `?${query}` : ""}`);
  },
  getTransactionById: (id) => request(`/transactions/${id}`),
  createTransaction: (tx) =>
    request("/transactions", {
      method: "POST",
      body: JSON.stringify(tx),
    }),
  updateTransaction: (id, updates) =>
    request(`/transactions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  deleteTransaction: (id) =>
    request(`/transactions/${id}`, {
      method: "DELETE",
    }),
};

export const budgetsApi = {
  getBudgets: () => request("/budgets"),
  createBudget: (budget) =>
    request("/budgets", {
      method: "POST",
      body: JSON.stringify(budget),
    }),
  updateBudget: (id, updates) =>
    request(`/budgets/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),
  deleteBudget: (id) =>
    request(`/budgets/${id}`, {
      method: "DELETE",
    }),
};

export const goalsApi = {
  getGoals: () => request("/goals"),
  createGoal: (goal) =>
    request("/goals", {
      method: "POST",
      body: JSON.stringify(goal),
    }),
  updateGoal: (id, updates) =>
    request(`/goals/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),
  contributeToGoal: (id, amount) =>
    request(`/goals/${id}/contribute`, {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),
  deleteGoal: (id) =>
    request(`/goals/${id}`, {
      method: "DELETE",
    }),
};

export const analyticsApi = {
  getSpending: () => request("/analytics/spending"),
  getTrends: () => request("/analytics/trends"),
  getCashFlow: () => request("/analytics/cashflow"),
};

export const aiApi = {
  chat: (prompt, history = []) =>
    request("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ prompt, history }),
    }),
  getSuggestions: () => request("/ai/suggestions"),
  getInsights: () => request("/ai/insights"),
};

export const receiptsApi = {
  getReceipts: () => request("/receipts"),
  createReceipt: (receipt) =>
    request("/receipts", {
      method: "POST",
      body: JSON.stringify(receipt),
    }),
  scanReceipt: (data) =>
    request("/receipts/scan", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteReceipt: (id) =>
    request(`/receipts/${id}`, {
      method: "DELETE",
    }),
};

export const settingsApi = {
  getSettings: () => request("/settings"),
  updateSettings: (settings) =>
    request("/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    }),
  exportData: () => request("/settings/export"),
  resetData: () => request("/settings/reset", { method: "POST" }),
};
