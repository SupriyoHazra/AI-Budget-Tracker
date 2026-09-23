import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Filter,
  Home,
  Plus,
  Search,
  ShoppingBag,
  Utensils,
  GraduationCap,
  Coffee,
  MoreHorizontal,
  PiggyBank,
} from "lucide-react";
import { budgetsApi } from "../services/api";

const budgets = [
  {
    id: 1,
    name: "Food & Dining",
    spent: 7240,
    budget: 8000,
    icon: Utensils,
    accent: "orange",
  },
  {
    id: 2,
    name: "Shopping",
    spent: 4850,
    budget: 5000,
    icon: ShoppingBag,
    accent: "violet",
  },
  {
    id: 3,
    name: "Education",
    spent: 4500,
    budget: 6000,
    icon: GraduationCap,
    accent: "cyan",
  },
  {
    id: 4,
    name: "Housing",
    spent: 3200,
    budget: 3500,
    icon: Home,
    accent: "emerald",
  },
  {
    id: 5,
    name: "Coffee",
    spent: 1850,
    budget: 1500,
    icon: Coffee,
    accent: "amber",
  },
];

const accentStyles = {
  orange: {
    icon: "border-orange-300/15 bg-orange-300/[0.08] text-orange-200",
    bar: "bg-orange-300",
    glow: "bg-orange-400/[0.06]",
    text: "text-orange-200",
  },
  violet: {
    icon: "border-violet-300/15 bg-violet-300/[0.08] text-violet-200",
    bar: "bg-violet-300",
    glow: "bg-violet-400/[0.06]",
    text: "text-violet-200",
  },
  cyan: {
    icon: "border-cyan-300/15 bg-cyan-300/[0.08] text-cyan-200",
    bar: "bg-cyan-300",
    glow: "bg-cyan-400/[0.06]",
    text: "text-cyan-200",
  },
  emerald: {
    icon: "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-200",
    bar: "bg-emerald-300",
    glow: "bg-emerald-400/[0.06]",
    text: "text-emerald-200",
  },
  amber: {
    icon: "border-amber-300/15 bg-amber-300/[0.08] text-amber-200",
    bar: "bg-amber-300",
    glow: "bg-amber-400/[0.06]",
    text: "text-amber-200",
  },
};

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function BudgetsPage() {
  const [budgetList, setBudgetList] = useState(budgets);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let isMounted = true;
    budgetsApi
      .getBudgets()
      .then((res) => {
        if (isMounted && res && res.budgets && res.budgets.length > 0) {
          const iconMap = {
            "Food & Dining": Utensils,
            Shopping: ShoppingBag,
            Education: GraduationCap,
            Housing: Home,
            Coffee: Coffee,
          };
          const accentMap = {
            "Food & Dining": "orange",
            Shopping: "violet",
            Education: "cyan",
            Housing: "emerald",
            Coffee: "amber",
          };

          const formatted = res.budgets.map((b) => ({
            id: b.id,
            name: b.category,
            spent: Number(b.spent || 0),
            budget: Number(b.limit || 0),
            icon: iconMap[b.category] || Utensils,
            accent: accentMap[b.category] || "cyan",
          }));
          setBudgetList(formatted);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live budgets, using fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalBudget = useMemo(
    () => budgetList.reduce((total, item) => total + item.budget, 0),
    [budgetList]
  );

  const totalSpent = useMemo(
    () => budgetList.reduce((total, item) => total + item.spent, 0),
    [budgetList]
  );

  const remaining = Math.max(0, totalBudget - totalSpent);

  const overallPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const filteredBudgets = useMemo(() => {
    return budgetList.filter((budget) => {
      const percentage = budget.budget > 0 ? (budget.spent / budget.budget) * 100 : 0;

      const matchesSearch = budget.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let matchesFilter = true;

      if (filter === "On track") {
        matchesFilter = percentage < 80;
      }

      if (filter === "Near limit") {
        matchesFilter = percentage >= 80 && percentage <= 100;
      }

      if (filter === "Over budget") {
        matchesFilter = percentage > 100;
      }

      return matchesSearch && matchesFilter;
    });
  }, [budgetList, searchQuery, filter]);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-400/[0.08] blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-400/[0.055] blur-[100px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(167,139,250,0.8)]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-100/60">
                Spending Control
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Budgets
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Set limits for your spending categories and keep your monthly
              finances under control.
            </p>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-200/15 bg-violet-300/[0.08] px-4 py-3 text-sm font-medium text-violet-100 transition hover:border-violet-200/25 hover:bg-violet-300/[0.12] sm:w-auto">
            <Plus size={17} />
            Create budget
          </button>
        </div>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <SummaryCard
          label="Monthly Budget"
          value={formatCurrency(totalBudget)}
          change="September"
          icon={PiggyBank}
          accent="cyan"
        />

        <SummaryCard
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          change={`${overallPercentage}% used`}
          icon={ArrowDownRight}
          accent="violet"
        />

        <SummaryCard
          label="Remaining"
          value={formatCurrency(remaining)}
          change="Available"
          icon={ArrowUpRight}
          accent="emerald"
        />

        <SummaryCard
          label="Budget Health"
          value={`${overallPercentage}%`}
          change="Overall usage"
          icon={PiggyBank}
          accent="amber"
        />
      </section>

      {/* Overall Budget */}
      <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full bg-cyan-400/[0.05] blur-[100px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              September budget
            </p>

            <p className="mt-1 text-xs text-white/40">
              Your overall monthly spending limit
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xl font-semibold text-white">
              {formatCurrency(totalSpent)}
              <span className="text-sm font-normal text-white/30">
                {" "}
                / {formatCurrency(totalBudget)}
              </span>
            </p>

            <p className="mt-1 text-xs text-white/35">
              {formatCurrency(remaining)} remaining
            </p>
          </div>
        </div>

        <div className="relative mt-6 h-3 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPercentage}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-300/70 via-cyan-300 to-violet-300 shadow-[0_0_22px_rgba(103,232,249,0.18)]"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-white/30">
          <span>₹0</span>
          <span>{overallPercentage}% used</span>
          <span>{formatCurrency(totalBudget)}</span>
        </div>
      </section>

      {/* Budgets */}
      <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-violet-400/[0.045] blur-[100px]" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Category budgets
            </p>

            <p className="mt-1 text-xs text-white/40">
              Monitor spending limits across your categories
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search budget..."
                className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-cyan-200/20 sm:w-52"
              />
            </div>

            <div className="relative">
              <Filter
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
              />

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-9 text-xs text-white/65 outline-none focus:border-cyan-200/20 sm:w-40"
              >
                <option value="All" className="bg-slate-900">
                  All budgets
                </option>

                <option value="On track" className="bg-slate-900">
                  On track
                </option>

                <option value="Near limit" className="bg-slate-900">
                  Near limit
                </option>

                <option value="Over budget" className="bg-slate-900">
                  Over budget
                </option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-2">
          {filteredBudgets.length > 0 ? (
            filteredBudgets.map((budget, index) => {
              const Icon = budget.icon;
              const percentage = Math.round(
                (budget.spent / budget.budget) * 100
              );

              const isOver = percentage > 100;
              const isNear = percentage >= 80 && percentage <= 100;

              const accent = accentStyles[budget.accent];

              const remainingAmount = budget.budget - budget.spent;

              return (
                <motion.div
                  key={budget.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -3 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition hover:border-white/14 hover:bg-white/[0.05] sm:p-5"
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[60px] ${accent.glow}`}
                  />

                  <div className="relative flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${accent.icon}`}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white/85">
                            {budget.name}
                          </p>

                          <p className="mt-1 text-[11px] text-white/35">
                            {formatCurrency(budget.spent)} spent
                          </p>
                        </div>

                        <button className="rounded-lg p-1.5 text-white/25 transition hover:bg-white/[0.06] hover:text-white/60">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/35">
                        {formatCurrency(budget.spent)} /{" "}
                        {formatCurrency(budget.budget)}
                      </span>

                      <span
                        className={
                          isOver
                            ? "text-rose-200"
                            : isNear
                              ? "text-amber-200"
                              : accent.text
                        }
                      >
                        {percentage}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(percentage, 100)}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${
                          isOver
                            ? "bg-rose-300"
                            : isNear
                              ? "bg-amber-300"
                              : accent.bar
                        }`}
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isOver ? (
                        <>
                          <AlertTriangle
                            size={13}
                            className="text-rose-200"
                          />
                          <span className="text-[10px] text-rose-200/80">
                            Over budget
                          </span>
                        </>
                      ) : isNear ? (
                        <>
                          <AlertTriangle
                            size={13}
                            className="text-amber-200"
                          />
                          <span className="text-[10px] text-amber-200/80">
                            Near limit
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.7)]" />
                          <span className="text-[10px] text-emerald-200/70">
                            On track
                          </span>
                        </>
                      )}
                    </div>

                    <span className="text-[10px] text-white/30">
                      {isOver
                        ? `${formatCurrency(Math.abs(remainingAmount))} over`
                        : `${formatCurrency(remainingAmount)} left`}
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-dashed border-white/10 py-12 text-center">
              <p className="text-sm text-white/55">
                No budgets found
              </p>

              <p className="mt-1 text-xs text-white/30">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Insight */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-200/10 bg-violet-300/[0.035] p-5 backdrop-blur-2xl sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-violet-400/[0.07] blur-[80px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-200/15 bg-violet-300/[0.07] text-violet-200">
            <PiggyBank size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Finova budget insight
            </p>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/50">
              Most categories are currently within their planned limits.
              Coffee has crossed its monthly budget, while Shopping is close
              to its limit. Keeping an eye on these categories can help
              protect the remaining monthly budget.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  change,
  icon: Icon,
  accent,
}) {
  const styles = {
    cyan: {
      icon: "border-cyan-200/10 bg-cyan-300/[0.08] text-cyan-200",
      glow: "bg-cyan-400/[0.06]",
      text: "text-cyan-100",
    },
    violet: {
      icon: "border-violet-200/10 bg-violet-300/[0.08] text-violet-200",
      glow: "bg-violet-400/[0.06]",
      text: "text-violet-100",
    },
    emerald: {
      icon: "border-emerald-200/10 bg-emerald-300/[0.08] text-emerald-200",
      glow: "bg-emerald-400/[0.06]",
      text: "text-emerald-100",
    },
    amber: {
      icon: "border-amber-200/10 bg-amber-300/[0.08] text-amber-200",
      glow: "bg-amber-400/[0.05]",
      text: "text-amber-100",
    },
  };

  const theme = styles[accent];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="glass relative overflow-hidden rounded-3xl p-4 sm:p-5"
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[60px] ${theme.glow}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${theme.icon}`}
          >
            <Icon size={17} />
          </div>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.13em] text-white/35 sm:text-[11px]">
          {label}
        </p>

        <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
          {value}
        </p>

        <p className={`mt-1 text-[10px] ${theme.text} sm:text-xs`}>
          {change}
        </p>
      </div>
    </motion.div>
  );
}

export default BudgetsPage;