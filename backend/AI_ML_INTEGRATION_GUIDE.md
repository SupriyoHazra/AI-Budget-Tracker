# 🤖 AI & ML Integration Guide (For AI-ML Team Member)

Hello! The backend has been prepared with dedicated **Service Layer Hooks** so you can plug in your AI models, LLMs, or OCR pipelines without worrying about HTTP handling, CORS, routes, or database formatting.

---

## 📍 Where the AI/ML Logic Lives

You only need to edit two files:

1. **AI Assistant & Chat**:
   `backend/src/services/aiService.js`
2. **Receipt Scanning & OCR**:
   `backend/src/services/receiptOcrService.js`

---

## 💬 1. Integrating Your AI Assistant / LLM

In `backend/src/services/aiService.js`, locate the `chatWithAssistant()` method:

```javascript
async chatWithAssistant({ prompt, history, transactions, budgets, goals }) {
  // TODO: [AI-ML TEAM MEMBER] - Plug your model here!
}
```

### Parameters Passed to You:
- `prompt` (`string`): The user's question or command.
- `history` (`Array`): Previous conversation turns `[{ role: "user" | "ai", text: "..." }]`.
- `transactions` (`Array`): All user financial transactions (amount, category, type, date).
- `budgets` (`Array`): User's active budgets and limits.
- `goals` (`Array`): User's savings goals and targets.

### Expected Return Object:
```javascript
return {
  reply: "Your AI-generated response text here",
  source: "gemini-2.5-flash", // or "custom-model"
  confidence: 0.95
};
```

### Example: Connecting Google Gemini API
```javascript
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function chatWithAssistant({ prompt, transactions, budgets }) {
  const financialSummary = JSON.stringify({ transactions: transactions.slice(0, 20), budgets });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are Finova AI, a financial advisor. Here is user financial data: ${financialSummary}. User query: ${prompt}`,
  });

  return {
    reply: response.text,
    source: "gemini-2.5-flash",
    confidence: 0.98,
  };
}
```

### Example: Calling a Python ML Microservice (FastAPI / Flask)
```javascript
const response = await fetch("http://localhost:8000/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt, transactions }),
});
const data = await response.json();
return { reply: data.response, source: "python-ml-service", confidence: data.confidence };
```

---

## 🧾 2. Integrating Receipt OCR / Vision Model

In `backend/src/services/receiptOcrService.js`, locate `parseReceiptImage()`:

```javascript
async parseReceiptImage({ fileName, rawText }) {
  // TODO: [AI-ML TEAM MEMBER] - Plug your OCR or Vision model here!
}
```

### Expected Return Object:
```javascript
return {
  success: true,
  extracted: {
    merchant: "Store Name",
    category: "Food & Dining",
    amount: 450.00,
    date: "2026-09-22",
    confidence: 0.95,
    detectedItems: [
      { name: "Coffee", price: 200 },
      { name: "Sandwich", price: 250 }
    ]
  },
  source: "gemini-vision-ocr"
};
```

---

## 🧪 Testing Your AI Changes
Run the test suite anytime to ensure your changes work properly:
```bash
npm test
```
