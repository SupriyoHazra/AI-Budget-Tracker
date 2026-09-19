import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Coffee,
  GraduationCap,
  Home,
  ShoppingBag,
  Utensils,
} from "lucide-react";

const categories = [
  {
    name: "Food & Dining",
    amount: 7240,
    percentage: 72,
    icon: Utensils,
    accent: "orange",
  },
  {
    name: "Shopping",
    amount: 4850,
    percentage: 48,
    icon: ShoppingBag,
    accent: "violet",
  },
  {
    name: "Education",
    amount: 4500,
    percentage: 45,
    icon: GraduationCap,
    accent: "cyan",
  },
  {
    name: "Housing",
    amount: 3200,
    percentage: 32,
    icon: Home,
    accent: "emerald",
  },
  {
    name: "Coffee",
    amount: 1850,
    percentage: 19,
    icon: Coffee,
    accent: "amber",
  },
];

const accentStyles = {
  orange: {
    icon: "border-orange-200/15 bg-orange-300/10 text-orange-200",
    glow: "bg-orange-400/10",
    bar: "from-orange-300/80 to-amber-300/60",
    text: "text-orange-200",
  },
  violet: {
    icon: "border-violet-200/15 bg-violet-300/10 text-violet-200",
    glow: "bg-violet-400/10",
    bar: "from-violet-300/80 to-fuchsia-300/60",
    text: "text-violet-200",
  },
  cyan: {
    icon: "border-cyan-200/15 bg-cyan-300/10 text-cyan-200",
    glow: "bg-cyan-400/10",
    bar: "from-cyan-300/80 to-sky-300/60",
    text: "text-cyan-200",
  },
  emerald: {
    icon: "border-emerald-200/15 bg-emerald-300/10 text-emerald-200",
    glow: "bg-emerald-400/10",
    bar: "from-emerald-300/80 to-teal-300/60",
    text: "text-emerald-200",
  },
  amber: {
    icon: "border-amber-200/15 bg-amber-300/10 text-amber-200",
    glow: "bg-amber-400/10",
    bar: "from-amber-300/80 to-yellow-300/60",
    text: "text-amber-200",
  },
};

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function CategorySpending() {
  const totalTracked = categories.reduce(
    (total, category) => total + category.amount,
    0
  );

  const highestCategory = categories.reduce((highest, category) =>
    category.amount > highest.amount ? category : highest
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12 }}
      className="group relative min-w-0 overflow-hidden rounded-[30px] border border-white/[0.12] bg-white/[0.055] p-4 shadow-[0_15px_60px_rgba(0,0,0,0.20)] backdrop-blur-2xl transition-all duration-500 hover:border-cyan-200/[0.20] hover:bg-white/[0.065] md:p-6"
    >
      {/* =======================================================
          ATMOSPHERIC GLOWS
      ======================================================= */}
      <motion.div
        className="pointer-events-none absolute -right-20 -top-10 h-56 w-56 rounded-full bg-violet-500/[0.065] blur-[100px]"
        animate={{
          x: [0, -18, 0],
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -left-16 bottom-10 h-44 w-44 rounded-full bg-cyan-400/[0.055] blur-[90px]"
        animate={{
          x: [0, 18, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 13,
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
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-200/15 bg-violet-300/10">
              <BarChart3 className="h-4 w-4 text-violet-200" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/70">
                Spending intelligence
              </p>

              <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
                Category Spending
              </h2>
            </div>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
            Where your money is going this month.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="shrink-0 rounded-xl border border-white/[0.10] bg-white/[0.045] px-3 py-2 text-[10px] font-medium text-slate-300 transition-all hover:border-violet-200/[0.18] hover:bg-white/[0.08] hover:text-white sm:text-xs"
        >
          <span className="hidden sm:inline">View analytics</span>
          <span className="sm:hidden">View</span>
        </motion.button>
      </div>

      {/* =======================================================
          CATEGORY LIST
      ======================================================= */}
      <div className="relative z-10 mt-5 space-y-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const styles = accentStyles[category.accent];

          return (
            <motion.div
              key={category.name}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.06,
              }}
              whileHover={{
                y: -2,
              }}
              className="group/category relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055] sm:p-3.5"
            >
              {/* Category glow */}
              <div
                className={`pointer-events-none absolute -right-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full ${styles.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover/category:opacity-100`}
              />

              <div className="relative">
                {/* Top row */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-100 sm:text-sm">
                      {category.name}
                    </p>

                    <p className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                      Monthly spending
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold text-white sm:text-sm">
                      {formatCurrency(category.amount)}
                    </p>

                    <p className={`mt-0.5 text-[9px] font-medium ${styles.text}`}>
                      {category.percentage}%
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${category.percentage}%`,
                      }}
                      transition={{
                        duration: 0.9,
                        delay: 0.25 + index * 0.07,
                        ease: "easeOut",
                      }}
                      className={`relative h-full rounded-full bg-gradient-to-r ${styles.bar}`}
                    >
                      <div className="absolute inset-0 bg-white/15" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =======================================================
          SUMMARY
      ======================================================= */}
      <div className="relative z-10 mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Total tracked
          </p>

          <p className="mt-1.5 text-base font-semibold text-white sm:text-lg">
            {formatCurrency(totalTracked)}
          </p>

          <div className="mt-1 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3 text-cyan-200" />

            <span className="text-[9px] text-slate-500">
              Across 5 categories
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-200/[0.08] bg-orange-300/[0.025] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Highest category
          </p>

          <p className="mt-1.5 truncate text-base font-semibold text-white sm:text-lg">
            {highestCategory.name}
          </p>

          <p className="mt-1 text-[9px] text-orange-200/80">
            {formatCurrency(highestCategory.amount)} this month
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default CategorySpending;