import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  PiggyBank,
  Wallet,
  Lightbulb,
  ArrowUpRight,
  User,
} from "lucide-react";
import { aiApi } from "../services/api";

const suggestions = [
  {
    icon: TrendingUp,
    label: "Analyze my spending",
    prompt: "Analyze my spending this month.",
  },
  {
    icon: PiggyBank,
    label: "How can I save more?",
    prompt: "How can I save more money this month?",
  },
  {
    icon: Wallet,
    label: "Check my budget",
    prompt: "How am I doing with my monthly budget?",
  },
  {
    icon: Lightbulb,
    label: "Give me a tip",
    prompt: "Give me a useful financial tip.",
  },
];

function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hello! I'm Finova AI. I can help you understand your spending, budgets, savings and financial goals.",
      time: "Just now",
    },
    {
      id: 2,
      role: "ai",
      text: "What would you like to explore today?",
      time: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (prompt) => {
    const lower = prompt.toLowerCase();

    if (lower.includes("spending")) {
      return "Your tracked spending is ₹21,640. Food & Dining is currently your largest category at ₹7,240, followed by Shopping at ₹4,850. Keeping an eye on these two categories could have the biggest impact.";
    }

    if (lower.includes("save") || lower.includes("saving")) {
      return "You currently have a strong savings opportunity. Try setting aside a fixed amount immediately after receiving income, then use the remaining amount for monthly expenses.";
    }

    if (lower.includes("budget")) {
      return "Your current category budgets total ₹24,000, while tracked spending is ₹21,640. That leaves approximately ₹2,360 across the tracked categories.";
    }

    if (lower.includes("tip")) {
      return "A simple habit that can make a big difference: review small recurring purchases once a week. Small expenses become significant when they repeat every month.";
    }

    if (lower.includes("goal")) {
      return "You are currently tracking four active goals. Your New Laptop goal is at 62%, while your Emergency Fund is at 57%. Consistent monthly contributions will keep these goals moving forward.";
    }

    return "Based on your current Finova data, your finances show a healthy balance between income, spending and savings. I recommend reviewing your top spending categories and keeping your savings goals consistent.";
  };

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();

    if (!trimmed || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await aiApi.chat(trimmed, messages).catch(() => null);
      const replyText = res && res.reply ? res.reply : generateResponse(trimmed);

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: replyText,
        time: "Just now",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: generateResponse(trimmed),
        time: "Just now",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-5 pb-8 sm:space-y-6">
      {/* Header */}
      <section className="glass glass-glow relative overflow-hidden rounded-3xl p-5 sm:p-7">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-500/[0.07] blur-[100px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,211,238,0.15)",
                  "0 0 40px rgba(34,211,238,0.3)",
                  "0 0 20px rgba(34,211,238,0.15)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10"
            >
              <Bot className="h-7 w-7 text-cyan-300" />
            </motion.div>

            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Finova AI Assistant
                </h1>

                <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  Online
                </span>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Your personal financial intelligence layer for spending,
                budgets, savings and goals.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 lg:flex">
            <Sparkles className="h-4 w-4 text-violet-300" />
            <span className="text-xs text-slate-300">
              Powered by your Finova data
            </span>
          </div>
        </div>
      </section>

      {/* Main AI Workspace */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        {/* Chat */}
        <div className="glass relative flex min-h-[650px] flex-col overflow-hidden rounded-3xl">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 ring-1 ring-white/10">
                  <Bot className="h-5 w-5 text-cyan-300" />
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#10253c] bg-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Finova Intelligence
                </p>
                <p className="text-[11px] text-slate-400">
                  Financial assistant
                </p>
              </div>
            </div>

            <div className="hidden rounded-full border border-cyan-300/10 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-medium text-cyan-200 sm:block">
              AI MODE
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.role === "ai" && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-400/10">
                      <Bot className="h-4 w-4 text-cyan-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[72%] ${
                      message.role === "user" ? "order-first" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "rounded-br-md border border-violet-300/20 bg-violet-400/[0.13] text-slate-100"
                          : "rounded-bl-md border border-white/[0.09] bg-white/[0.055] text-slate-200"
                      }`}
                    >
                      {message.text}
                    </div>

                    <p
                      className={`mt-1.5 text-[10px] text-slate-500 ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10">
                      <User className="h-4 w-4 text-violet-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-400/10">
                    <Bot className="h-4 w-4 text-cyan-300" />
                  </div>

                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/[0.09] bg-white/[0.055] px-4 py-3">
                    {[0, 1, 2].map((item) => (
                      <motion.span
                        key={item}
                        animate={{
                          y: [0, -4, 0],
                          opacity: [0.35, 1, 0.35],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: item * 0.15,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.08] p-3 sm:p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-white/[0.10] bg-black/10 p-2 transition-all focus-within:border-cyan-300/25 focus-within:bg-white/[0.035]">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                placeholder="Ask Finova anything about your finances..."
                className="max-h-28 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-200 transition hover:bg-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>

            <p className="mt-2 px-1 text-[10px] text-slate-500">
              Press Enter to send · Shift + Enter for a new line
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <aside className="space-y-5">
          {/* Suggestions */}
          <div className="glass rounded-3xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-300" />
              <h2 className="text-sm font-semibold text-white">
                Suggested questions
              </h2>
            </div>

            <div className="space-y-2">
              {suggestions.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.label}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(item.prompt)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition hover:border-cyan-300/15 hover:bg-white/[0.055]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.08]">
                      <Icon className="h-4 w-4 text-cyan-300" />
                    </div>

                    <span className="flex-1 text-xs font-medium text-slate-300 group-hover:text-white">
                      {item.label}
                    </span>

                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-cyan-300" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Financial Snapshot */}
          <div className="glass rounded-3xl p-5">
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Financial snapshot
              </p>
              <h2 className="mt-1 text-sm font-semibold text-white">
                Your current picture
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.045] p-3">
                <p className="text-[10px] text-slate-500">Balance</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  ₹52,480
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
                  <p className="text-[10px] text-slate-500">Income</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">
                    ₹70,720
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
                  <p className="text-[10px] text-slate-500">Expenses</p>
                  <p className="mt-1 text-sm font-semibold text-rose-300">
                    ₹18,240
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Status */}
          <div className="relative overflow-hidden rounded-3xl border border-violet-300/10 bg-gradient-to-br from-violet-400/[0.08] to-cyan-400/[0.04] p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-400/10 blur-3xl" />

            <div className="relative flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10">
                <Sparkles className="h-4 w-4 text-violet-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Finova learns from your activity
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
                  Insights become more useful as your transactions, budgets
                  and goals grow.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default AIAssistantPage;