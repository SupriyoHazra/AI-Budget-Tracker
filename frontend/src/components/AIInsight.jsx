import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Lightbulb,
  MessageCircle,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

const insights = [
  {
    title: "Food spending improved",
    description:
      "Your food spending is 8.4% lower than your previous tracking period.",
    icon: TrendingDown,
    accent: "cyan",
  },
  {
    title: "Savings opportunity",
    description:
      "Reducing small discretionary purchases could free up around ₹1,800 this month.",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "Small habits matter",
    description:
      "Your regular savings pattern is helping you stay closer to your financial goals.",
    icon: TrendingUp,
    accent: "emerald",
  },
];

const accentStyles = {
  cyan: {
    icon: "bg-cyan-400/10 text-cyan-200 ring-cyan-300/10",
    glow: "bg-cyan-400/10",
  },
  violet: {
    icon: "bg-violet-400/10 text-violet-200 ring-violet-300/10",
    glow: "bg-violet-400/10",
  },
  emerald: {
    icon: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/10",
    glow: "bg-emerald-400/10",
  },
};

function AIInsight() {
  return (
    <section className="mt-5 sm:mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.055] p-4 backdrop-blur-2xl sm:p-5 lg:p-6"
      >
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[110px]" />

        {/* Header */}
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            {/* AI orb */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-cyan-300/15 via-blue-400/10 to-violet-400/15 shadow-[0_0_35px_rgba(56,189,248,0.10)] sm:h-14 sm:w-14"
            >
              <div className="absolute inset-2 rounded-xl border border-white/[0.08]" />

              <BrainCircuit
                size={23}
                className="relative text-cyan-100 sm:h-6 sm:w-6"
              />

              <motion.span
                animate={{
                  opacity: [0.25, 0.7, 0.25],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]"
              />
            </motion.div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
                  Intelligent finance
                </span>

                <span className="flex items-center gap-1 rounded-full border border-emerald-300/10 bg-emerald-300/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
                  Live
                </span>
              </div>

              <h2 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                Your financial AI assistant
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400 sm:text-sm">
                Finova continuously analyzes your spending patterns and turns
                them into useful financial insights.
              </p>
            </div>
          </div>

          {/* Ask AI button */}
          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-200/15 bg-cyan-300/[0.08] px-4 py-2.5 text-xs font-medium text-cyan-100 transition hover:border-cyan-200/25 hover:bg-cyan-300/[0.12] sm:w-fit sm:px-5 sm:text-sm"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <MessageCircle size={16} />
            Ask Finova AI
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>

        {/* Main recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-black/[0.10] p-4 sm:mt-6 sm:p-5"
        >
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-300/70 via-blue-400/40 to-transparent" />

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
              <Sparkles size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                Finova recommendation
              </p>

              <p className="mt-1.5 text-sm font-medium leading-6 text-slate-200 sm:text-[15px]">
                You're on track with your savings. Consider moving an
                additional ₹1,000 toward your laptop goal this month.
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                <Zap size={12} className="text-cyan-300" />
                Based on your recent spending pattern
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insight cards */}
        <div className="relative mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const styles = accentStyles[insight.accent];

            return (
              <motion.article
                key={insight.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + index * 0.08,
                }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full ${styles.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${styles.icon}`}
                  >
                    <Icon size={16} />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-white">
                    {insight.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-400">
                    {insight.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer */}
        <div className="relative mt-4 flex flex-col gap-2 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />

            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
              Finova AI is monitoring your financial patterns
            </span>
          </div>

          <span className="text-[10px] text-slate-600">
            Updated just now
          </span>
        </div>
      </motion.div>
    </section>
  );
}

export default AIInsight;