import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Laptop,
  Shield,
  Sparkles,
  Target,
  Trophy,
  WalletCards,
} from "lucide-react";

const goals = [
  {
    title: "New Laptop",
    saved: 62000,
    target: 100000,
    deadline: "Dec 2026",
    icon: Laptop,
    accent: "cyan",
  },
  {
    title: "Emergency Fund",
    saved: 28500,
    target: 50000,
    deadline: "Jan 2027",
    icon: Shield,
    accent: "violet",
  },
  {
    title: "New Bicycle",
    saved: 9200,
    target: 20000,
    deadline: "Nov 2026",
    icon: Target,
    accent: "emerald",
  },
  {
    title: "Course & Certification",
    saved: 4800,
    target: 10000,
    deadline: "Oct 2026",
    icon: Trophy,
    accent: "amber",
  },
];

const accentStyles = {
  cyan: {
    icon:
      "bg-cyan-400/10 text-cyan-300 ring-cyan-300/10",
    bar:
      "from-cyan-300 via-sky-400 to-blue-500",
    glow:
      "bg-cyan-400/10",
    text:
      "text-cyan-300",
  },
  violet: {
    icon:
      "bg-violet-400/10 text-violet-300 ring-violet-300/10",
    bar:
      "from-violet-300 via-purple-400 to-indigo-500",
    glow:
      "bg-violet-400/10",
    text:
      "text-violet-300",
  },
  emerald: {
    icon:
      "bg-emerald-400/10 text-emerald-300 ring-emerald-300/10",
    bar:
      "from-emerald-300 via-teal-400 to-cyan-500",
    glow:
      "bg-emerald-400/10",
    text:
      "text-emerald-300",
  },
  amber: {
    icon:
      "bg-amber-300/10 text-amber-200 ring-amber-300/10",
    bar:
      "from-amber-200 via-orange-300 to-rose-400",
    glow:
      "bg-amber-300/10",
    text:
      "text-amber-200",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function GoalsSection() {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const remaining = totalTarget - totalSaved;

  const completedGoals = goals.filter(
    (goal) => goal.saved >= goal.target
  ).length;

  const overallProgress = Math.round(
    (totalSaved / totalTarget) * 100
  );

  return (
    <section className="mt-5 sm:mt-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/10 text-cyan-200">
              <Target size={16} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
              Financial targets
            </span>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Your Goals
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
            Keep building toward the things that matter.
          </p>
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
          className="flex w-fit items-center gap-2 text-xs font-medium text-cyan-200 transition hover:text-white sm:text-sm"
        >
          View all goals
          <ArrowUpRight size={15} />
        </motion.button>
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          const progress = Math.min(
            Math.round((goal.saved / goal.target) * 100),
            100
          );

          const styles = accentStyles[goal.accent];

          return (
            <motion.article
              key={goal.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.055] p-4 backdrop-blur-2xl transition-colors duration-300 hover:border-white/[0.18] hover:bg-white/[0.075] sm:p-5"
            >
              {/* Ambient glow */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full ${styles.glow} blur-3xl opacity-0 transition duration-500 group-hover:opacity-100`}
              />

              {/* Top row */}
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${styles.icon}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white sm:text-[15px]">
                      {goal.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock3 size={12} />
                      <span>Target {goal.deadline}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`shrink-0 text-sm font-semibold ${styles.text}`}
                >
                  {progress}%
                </span>
              </div>

              {/* Amount */}
              <div className="relative mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    Saved
                  </p>

                  <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {formatCurrency(goal.saved)}
                  </p>
                </div>

                <p className="pb-0.5 text-right text-[11px] text-slate-400">
                  of{" "}
                  <span className="font-medium text-slate-300">
                    {formatCurrency(goal.target)}
                  </span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="relative mt-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.08,
                      ease: "easeOut",
                    }}
                    className={`relative h-full rounded-full bg-gradient-to-r ${styles.bar}`}
                  >
                    <div className="absolute inset-y-0 right-0 w-8 bg-white/30 blur-sm" />
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {formatCurrency(goal.target - goal.saved)} remaining
                </span>

                {progress >= 100 ? (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-300">
                    <CheckCircle2 size={13} />
                    Completed
                  </span>
                ) : (
                  <span
                    className={`text-[11px] font-medium ${styles.text}`}
                  >
                    On track
                  </span>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="relative mt-4 overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.045] p-4 backdrop-blur-2xl sm:p-5"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-400/[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Overall progress */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <WalletCards
                  size={16}
                  className="text-cyan-200"
                />

                <span className="text-xs font-medium text-slate-300">
                  Overall progress
                </span>
              </div>

              <span className="text-sm font-semibold text-white">
                {overallProgress}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{
                  duration: 1.1,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.08] lg:min-w-[390px]">
            <div className="px-3 first:pl-0 sm:px-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Total saved
              </p>

              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {formatCurrency(totalSaved)}
              </p>
            </div>

            <div className="px-3 sm:px-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Active
              </p>

              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {goals.length - completedGoals}
              </p>
            </div>

            <div className="px-3 last:pr-0 sm:px-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Remaining
              </p>

              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {formatCurrency(remaining)}
              </p>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="relative mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-4">
          <Sparkles
            size={14}
            className="shrink-0 text-cyan-200"
          />

          <p className="text-[11px] leading-5 text-slate-400 sm:text-xs">
            You're making steady progress. Small contributions compound into
            meaningful goals.
          </p>

          <CircleDollarSign
            size={15}
            className="ml-auto hidden shrink-0 text-white/20 sm:block"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default GoalsSection;