import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Coffee,
  CreditCard,
  Filter,
  GraduationCap,
  Home,
  Search,
  ShoppingBag,
  Utensils,
  WalletCards,
} from "lucide-react";

const expenses = [
  {
    id: 1,
    title: "College Canteen",
    category: "Food & Dining",
    date: "Today · 6:42 PM",
    amount: 180,
    icon: Utensils,
    accent: "orange",
  },
  {
    id: 2,
    title: "Amazon",
    category: "Shopping",
    date: "Today · 2:18 PM",
    amount: 1299,
    icon: ShoppingBag,
    accent: "violet",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    date: "Yesterday · 10:12 AM",
    amount: 649,
    icon: Coffee,
    accent: "rose",
  },
  {
    id: 4,
    title: "College Fees",
    category: "Education",
    date: "18 Sep · 11:20 AM",
    amount: 4500,
    icon: GraduationCap,
    accent: "cyan",
  },
  {
    id: 5,
    title: "Cafe Coffee Day",
    category: "Food & Dining",
    date: "17 Sep · 5:46 PM",
    amount: 240,
    icon: Coffee,
    accent: "amber",
  },
  {
    id: 6,
    title: "PG Rent",
    category: "Housing",
    date: "16 Sep · 9:00 AM",
    amount: 7200,
    icon: Home,
    accent: "emerald",
  },
  {
    id: 7,
    title: "Swiggy",
    category: "Food & Dining",
    date: "15 Sep · 8:14 PM",
    amount: 420,
    icon: Utensils,
    accent: "orange",
  },
  {
    id: 8,
    title: "Udemy",
    category: "Education",
    date: "14 Sep · 7:35 PM",
    amount: 799,
    icon: GraduationCap,
    accent: "cyan",
  },
];

const categories = [
  {
    name: "Food & Dining",
    amount: 7240,
    percentage: 72,
    accent: "orange",
  },
  {
    name: "Housing",
    amount: 7200,
    percentage: 71,
    accent: "emerald",
  },
  {
    name: "Education",
    amount: 5299,
    percentage: 52,
    accent: "cyan",
  },
  {
    name: "Shopping",
    amount: 4850,
    percentage: 48,
    accent: "violet",
  },
  {
    name: "Entertainment",
    amount: 649,
    percentage: 6,
    accent: "rose",
  },
];

const accentStyles = {
  orange: {
    icon: "bg-orange-400/10 text-orange-200 ring-orange-300/10",
    bar: "from-orange-300 to-amber-400",
  },
  violet: {
    icon: "bg-violet-400/10 text-violet-200 ring-violet-300/10",
    bar: "from-violet-300 to-indigo-400",
  },
  rose: {
    icon: "bg-rose-400/10 text-rose-200 ring-rose-300/10",
    bar: "from-rose-300 to-pink-400",
  },
  cyan: {
    icon: "bg-cyan-400/10 text-cyan-200 ring-cyan-300/10",
    bar: "from-cyan-300 to-blue-400",
  },
  amber: {
    icon: "bg-amber-300/10 text-amber-200 ring-amber-300/10",
    bar: "from-amber-200 to-orange-400",
  },
  emerald: {
    icon: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/10",
    bar: "from-emerald-300 to-teal-400",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        expense.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const totalExpenses = 18240;
  const previousExpenses = 19240;

  const change = Math.round(
    ((totalExpenses - previousExpenses) / previousExpenses) * 100
  );

  const averageDaily = Math.round(totalExpenses / 30);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-5 sm:space-y-6"
    >
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/10 text-cyan-200">
              <CreditCard size={16} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
              Financial activity
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Expenses
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
            Understand where your money is going this month.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/15 bg-cyan-300/[0.09] px-4 py-2.5 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/[0.13] sm:w-fit sm:px-5 sm:text-sm"
        >
          <ArrowUpRight size={16} />
          Add Expense
        </motion.button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {/* Total */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.055] p-4 backdrop-blur-2xl sm:p-5"
        >
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/[0.07] blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                Total spent
              </p>

              <WalletCards size={15} className="text-cyan-200/60" />
            </div>

            <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              {formatCurrency(totalExpenses)}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              September 2026
            </p>
          </div>
        </motion.div>

        {/* Change */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.055] p-4 backdrop-blur-2xl sm:p-5"
        >
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-400/[0.06] blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                Monthly change
              </p>

              <ArrowDownRight size={15} className="text-emerald-200" />
            </div>

            <p className="mt-3 text-xl font-semibold text-emerald-200 sm:text-2xl">
              {change}%
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Compared with last month
            </p>
          </div>
        </motion.div>

        {/* Highest category */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.055] p-4 backdrop-blur-2xl sm:p-5"
        >
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-400/[0.06] blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                Highest category
              </p>

              <Utensils size={15} className="text-orange-200/70" />
            </div>

            <p className="mt-3 truncate text-base font-semibold text-white sm:text-lg">
              Food & Dining
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              {formatCurrency(7240)} tracked
            </p>
          </div>
        </motion.div>

        {/* Average */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.055] p-4 backdrop-blur-2xl sm:p-5"
        >
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-400/[0.06] blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                Daily average
              </p>

              <CalendarDays size={15} className="text-violet-200/70" />
            </div>

            <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              {formatCurrency(averageDaily)}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Average per day
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.45fr_0.85fr]">
        {/* Transactions */}
        <div className="min-w-0 overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.05] backdrop-blur-2xl">
          <div className="border-b border-white/[0.08] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white sm:text-lg">
                  Expense transactions
                </h2>

                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Your recent spending activity
                </p>
              </div>

              <button className="flex w-fit items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-[11px] text-slate-400 transition hover:bg-white/[0.07] hover:text-white">
                <Filter size={13} />
                Filter
              </button>
            </div>

            {/* Search */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/[0.10] px-3">
                <Search size={15} className="shrink-0 text-slate-500" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search expenses..."
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-xs text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-white/[0.08] bg-black/[0.10] py-2.5 pl-3 pr-9 text-xs text-slate-300 outline-none sm:w-44"
                >
                  <option value="All" className="bg-slate-900">
                    All categories
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.name}
                      value={category.name}
                      className="bg-slate-900"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Transaction list */}
          <div className="divide-y divide-white/[0.06]">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => {
                const Icon = expense.icon;
                const styles = accentStyles[expense.accent];

                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.035,
                    }}
                    className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-white/[0.035] sm:px-5"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${styles.icon}`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-white sm:text-sm">
                        {expense.title}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-[11px]">
                        {expense.category} · {expense.date}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold text-rose-200 sm:text-sm">
                        -{formatCurrency(expense.amount)}
                      </p>

                      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
                        Expense
                      </p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="px-5 py-16 text-center">
                <Search
                  size={24}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm font-medium text-slate-400">
                  No expenses found
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Try another search or category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.05] backdrop-blur-2xl">
          <div className="border-b border-white/[0.08] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white sm:text-lg">
                  Spending by category
                </h2>

                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Where your money is going
                </p>
              </div>

              <BarChartIcon />
            </div>
          </div>

          <div className="space-y-5 p-4 sm:p-5">
            {categories.map((category, index) => {
              const styles = accentStyles[category.accent];

              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-xs font-medium text-slate-300">
                      {category.name}
                    </span>

                    <span className="shrink-0 text-xs font-semibold text-white">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${category.percentage}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + index * 0.07,
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${styles.bar}`}
                    />
                  </div>

                  <div className="mt-1 flex justify-end">
                    <span className="text-[9px] text-slate-600">
                      {category.percentage}% of tracked spending
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Category insight */}
          <div className="mx-4 mb-4 rounded-2xl border border-cyan-200/10 bg-cyan-300/[0.04] p-4 sm:mx-5 sm:mb-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                <ArrowDownRight size={15} />
              </div>

              <div>
                <p className="text-xs font-medium text-white">
                  Spending insight
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Your food and housing categories currently make up the
                  largest portion of tracked expenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function BarChartIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-300/[0.06] text-violet-200">
      <div className="flex h-4 items-end gap-0.5">
        <span className="h-2 w-1 rounded-full bg-violet-300/50" />
        <span className="h-4 w-1 rounded-full bg-violet-300/80" />
        <span className="h-3 w-1 rounded-full bg-cyan-300/70" />
        <span className="h-5 w-1 rounded-full bg-cyan-300" />
      </div>
    </div>
  );
}

export default ExpensesPage;