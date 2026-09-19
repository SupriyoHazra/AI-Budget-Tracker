import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Coffee,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Wallet,
} from "lucide-react";

const transactions = [
  {
    name: "College Canteen",
    category: "Food & Dining",
    date: "Today · 6:42 PM",
    amount: "-₹180",
    type: "expense",
    icon: Utensils,
    accent: "orange",
  },
  {
    name: "Amazon",
    category: "Shopping",
    date: "Today · 2:18 PM",
    amount: "-₹1,299",
    type: "expense",
    icon: ShoppingBag,
    accent: "violet",
  },
  {
    name: "Freelance Project",
    category: "Income",
    date: "Yesterday · 8:30 PM",
    amount: "+₹8,500",
    type: "income",
    icon: Wallet,
    accent: "cyan",
  },
  {
    name: "Netflix",
    category: "Entertainment",
    date: "Yesterday · 10:12 AM",
    amount: "-₹649",
    type: "expense",
    icon: Coffee,
    accent: "rose",
  },
  {
    name: "College Fees",
    category: "Education",
    date: "18 Sep · 11:20 AM",
    amount: "-₹4,500",
    type: "expense",
    icon: GraduationCap,
    accent: "emerald",
  },
  {
    name: "Cafe Coffee Day",
    category: "Food & Dining",
    date: "17 Sep · 5:46 PM",
    amount: "-₹240",
    type: "expense",
    icon: Coffee,
    accent: "amber",
  },
];

const iconStyles = {
  orange: {
    wrapper: "border-orange-200/15 bg-orange-300/10",
    icon: "text-orange-200",
    glow: "bg-orange-400/10",
  },
  violet: {
    wrapper: "border-violet-200/15 bg-violet-300/10",
    icon: "text-violet-200",
    glow: "bg-violet-400/10",
  },
  cyan: {
    wrapper: "border-cyan-200/15 bg-cyan-300/10",
    icon: "text-cyan-200",
    glow: "bg-cyan-400/10",
  },
  rose: {
    wrapper: "border-rose-200/15 bg-rose-300/10",
    icon: "text-rose-200",
    glow: "bg-rose-400/10",
  },
  emerald: {
    wrapper: "border-emerald-200/15 bg-emerald-300/10",
    icon: "text-emerald-200",
    glow: "bg-emerald-400/10",
  },
  amber: {
    wrapper: "border-amber-200/15 bg-amber-300/10",
    icon: "text-amber-200",
    glow: "bg-amber-400/10",
  },
};

function RecentTransactions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="group relative min-w-0 overflow-hidden rounded-[30px] border border-white/[0.12] bg-white/[0.055] p-4 shadow-[0_15px_60px_rgba(0,0,0,0.20)] backdrop-blur-2xl transition-all duration-500 hover:border-cyan-200/[0.20] hover:bg-white/[0.065] md:p-6"
    >
      {/* Atmospheric glows */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-20 h-52 w-52 rounded-full bg-cyan-400/[0.055] blur-[90px]"
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-violet-500/[0.055] blur-[100px]"
        animate={{
          x: [0, -20, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Reflection */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* =======================================================
          HEADER
      ======================================================= */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
            Activity
          </p>

          <h2 className="mt-1 truncate text-lg font-semibold text-white sm:text-xl">
            Recent Transactions
          </h2>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Your latest financial activity.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="shrink-0 rounded-xl border border-white/[0.10] bg-white/[0.045] px-3 py-2 text-[10px] font-medium text-slate-300 transition-all hover:border-cyan-200/[0.18] hover:bg-white/[0.08] hover:text-white sm:text-xs"
        >
          View all
        </motion.button>
      </div>

      {/* =======================================================
          TRANSACTIONS
      ======================================================= */}
      <div className="relative z-10 mt-5 space-y-2.5">
        {transactions.map((transaction, index) => {
          const Icon = transaction.icon;
          const styles = iconStyles[transaction.accent];

          return (
            <motion.div
              key={`${transaction.name}-${index}`}
              initial={{
                opacity: 0,
                x: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.06,
              }}
              whileHover={{
                x: 3,
              }}
              className="group/row relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055] sm:p-3.5"
            >
              {/* Row glow */}
              <div
                className={`pointer-events-none absolute -right-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full ${styles.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover/row:opacity-100`}
              />

              <div className="relative flex min-w-0 items-center gap-3">
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.wrapper} transition-transform duration-300 group-hover/row:scale-105 sm:h-11 sm:w-11`}
                >
                  <Icon className={`h-4 w-4 ${styles.icon} sm:h-5 sm:w-5`} />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-100 sm:text-sm">
                    {transaction.name}
                  </p>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-[9px] text-slate-500 sm:text-[10px]">
                      {transaction.category}
                    </span>

                    <span className="text-slate-700">•</span>

                    <span className="shrink-0 text-[9px] text-slate-600 sm:text-[10px]">
                      {transaction.date}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="shrink-0 text-right">
                  <p
                    className={`text-xs font-semibold sm:text-sm ${
                      transaction.type === "income"
                        ? "text-emerald-200"
                        : "text-slate-100"
                    }`}
                  >
                    {transaction.amount}
                  </p>

                  <div className="mt-1 flex items-center justify-end gap-1">
                    {transaction.type === "income" ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 text-emerald-300" />
                        <span className="hidden text-[9px] text-emerald-300/80 sm:inline">
                          Income
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 text-slate-500" />
                        <span className="hidden text-[9px] text-slate-500 sm:inline">
                          Expense
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =======================================================
          FINOVA INSIGHT
      ======================================================= */}
      <div className="relative z-10 mt-4 overflow-hidden rounded-2xl border border-cyan-200/[0.08] bg-cyan-300/[0.025] p-3.5 sm:mt-5 sm:p-4">
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/[0.07] blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-200/[0.12] bg-cyan-300/[0.07]">
            <Wallet className="h-4 w-4 text-cyan-200" />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
              Finova insight
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-400 sm:text-xs">
              Your largest recent expense is education. Your current
              income-to-expense ratio remains healthy.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default RecentTransactions;