import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  PiggyBank,
  Target,
  Wallet,
} from "lucide-react";

import SpendingChart from "./SpendingChart";
import RecentTransactions from "./RecentTransactions";
import CategorySpending from "./CategorySpending";
import GoalsSection from "./GoalsSection";
import AIInsight from "./AIInsight";
import { dashboardApi } from "../services/api";

const stats = [
  {
    title: "Total Balance",
    value: "₹52,480",
    change: "+12.8%",
    positive: true,
    icon: Wallet,
    accent: "cyan",
    points: "0,38 18,34 36,37 54,28 72,30 90,20 108,23 126,12 144,16",
  },
  {
    title: "Expenses",
    value: "₹18,240",
    change: "-5.2%",
    positive: true,
    icon: ArrowDownRight,
    accent: "violet",
    points: "0,18 18,24 36,21 54,28 72,25 90,34 108,30 126,38 144,35",
  },
  {
    title: "Income",
    value: "₹70,720",
    change: "+8.4%",
    positive: true,
    icon: ArrowUpRight,
    accent: "emerald",
    points: "0,40 18,35 36,37 54,27 72,31 90,20 108,24 126,13 144,17",
  },
  {
    title: "Savings",
    value: "₹12,000",
    change: "+16.3%",
    positive: true,
    icon: PiggyBank,
    accent: "amber",
    points: "0,40 18,36 36,32 54,34 72,24 90,28 108,18 126,20 144,10",
  },
];

const accentStyles = {
  cyan: {
    icon: "border-cyan-200/15 bg-cyan-300/10 text-cyan-200",
    glow: "bg-cyan-400/10",
    line: "#67e8f9",
  },
  violet: {
    icon: "border-violet-200/15 bg-violet-300/10 text-violet-200",
    glow: "bg-violet-400/10",
    line: "#c4b5fd",
  },
  emerald: {
    icon: "border-emerald-200/15 bg-emerald-300/10 text-emerald-200",
    glow: "bg-emerald-400/10",
    line: "#6ee7b7",
  },
  amber: {
    icon: "border-amber-200/15 bg-amber-300/10 text-amber-200",
    glow: "bg-amber-400/10",
    line: "#fcd34d",
  },
};

function MiniChart({ points, color }) {
  return (
    <svg
      viewBox="0 0 144 48"
      className="h-10 w-28 shrink-0 sm:h-12 sm:w-32"
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`mini-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={`M ${points} L 144 48 L 0 48 Z`}
        fill={`url(#mini-${color})`}
      />

      <polyline
        points={points}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState(stats);

  useEffect(() => {
    let isMounted = true;
    dashboardApi
      .getStats()
      .then((res) => {
        if (isMounted && res && res.stats) {
          // Merge live values with static visual icons & chart curves
          const merged = stats.map((base, i) => {
            const live = res.stats[i];
            if (!live) return base;
            return {
              ...base,
              value: live.value || base.value,
              change: live.change || base.change,
              positive: live.positive !== undefined ? live.positive : base.positive,
            };
          });
          setDashboardStats(merged);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live dashboard stats, using fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      {/* =========================================================
          WELCOME SECTION
      ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mb-5 sm:mb-6 md:mb-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200/70">
              Financial overview
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Good evening, Supriyo
              <span className="ml-1">👋</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Here&apos;s what&apos;s happening with your money today.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.045] px-4 py-2.5 backdrop-blur-xl sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
            <span className="text-xs text-slate-300">
              Financial system active
            </span>
          </div>
        </div>
      </motion.section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          const styles = accentStyles[stat.accent];

          return (
            <motion.article
              key={stat.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              whileHover={{
                y: -4,
              }}
              className="group relative min-w-0 overflow-hidden rounded-3xl border border-white/[0.13] bg-white/[0.075] p-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-300 hover:border-cyan-200/[0.25] hover:bg-white/[0.09] hover:shadow-[0_14px_50px_rgba(56,189,248,0.10)] sm:p-5"
            >
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${styles.glow} opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="relative flex items-start justify-between gap-2">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${styles.icon} sm:h-10 sm:w-10`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="hidden sm:block">
                  <MiniChart
                    points={stat.points}
                    color={styles.line}
                  />
                </div>
              </div>

              <div className="relative mt-4 min-w-0">
                <p className="truncate text-[11px] font-medium text-slate-400 sm:text-xs">
                  {stat.title}
                </p>

                <p className="mt-1 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {stat.value}
                </p>

                <div className="mt-2 flex items-center gap-1">
                  <span
                    className={`text-[10px] font-medium sm:text-xs ${
                      stat.positive
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {stat.change}
                  </span>

                  <span className="hidden text-[10px] text-slate-500 sm:inline">
                    vs last month
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* =========================================================
          SAVINGS GOAL PREVIEW
      ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="group relative mt-5 overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.045] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:border-cyan-200/[0.25] hover:bg-white/[0.07] hover:shadow-[0_12px_45px_rgba(56,189,248,0.10)] sm:mt-6 sm:p-6"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-[90px]" />

        <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-violet-500/[0.06] blur-[80px]" />

        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-200/15 bg-cyan-300/10">
                <Target className="h-4 w-4 text-cyan-200" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                Savings goal
              </span>
            </div>

            <h2 className="text-lg font-semibold text-white sm:text-xl">
              New Laptop
            </h2>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Keep your momentum — you&apos;re already over halfway there.
            </p>
          </div>

          <div className="relative w-full shrink-0 sm:w-64">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">₹62,000 saved</span>
              <span className="font-semibold text-cyan-200">62%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "62%" }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeOut",
                }}
                className="relative h-full rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-300/80 to-violet-300/70"
              >
                <div className="absolute inset-0 animate-pulse bg-white/20" />
              </motion.div>
            </div>

            <p className="mt-2 text-right text-[10px] text-slate-500">
              Target ₹1,00,000
            </p>
          </div>
        </div>
      </motion.section>

      {/* =========================================================
          SPENDING CHART
      ========================================================= */}
      <SpendingChart />

      {/* =========================================================
          TRANSACTIONS + CATEGORY
      ========================================================= */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <RecentTransactions />
        <CategorySpending />
      </section>

      {/* =========================================================
          GOALS
      ========================================================= */}
      <GoalsSection />

      {/* =========================================================
          AI INSIGHT
      ========================================================= */}
      <AIInsight />
    </div>
  );
}

export default Dashboard;