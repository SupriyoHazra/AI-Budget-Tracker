import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  PieChart,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { analyticsApi } from "../services/api";

const monthlyData = {
  "6M": [
    { month: "Apr", income: 42000, expense: 21000 },
    { month: "May", income: 48000, expense: 23500 },
    { month: "Jun", income: 45500, expense: 19800 },
    { month: "Jul", income: 56000, expense: 24800 },
    { month: "Aug", income: 65200, expense: 27600 },
    { month: "Sep", income: 70720, expense: 18240 },
  ],
  "3M": [
    { month: "Jul", income: 56000, expense: 24800 },
    { month: "Aug", income: 65200, expense: 27600 },
    { month: "Sep", income: 70720, expense: 18240 },
  ],
  "1M": [
    { month: "Week 1", income: 18500, expense: 5200 },
    { month: "Week 2", income: 14200, expense: 4800 },
    { month: "Week 3", income: 17000, expense: 4100 },
    { month: "Week 4", income: 11800, expense: 4140 },
  ],
};

const categories = [
  {
    name: "Food & Dining",
    amount: 7240,
    percentage: 39.7,
    accent: "orange",
  },
  {
    name: "Shopping",
    amount: 4850,
    percentage: 26.6,
    accent: "violet",
  },
  {
    name: "Education",
    amount: 4500,
    percentage: 24.7,
    accent: "cyan",
  },
  {
    name: "Housing",
    amount: 3200,
    percentage: 17.5,
    accent: "emerald",
  },
  {
    name: "Entertainment",
    amount: 649,
    percentage: 3.6,
    accent: "rose",
  },
];

const categoryStyles = {
  orange: {
    bar: "bg-orange-300",
    text: "text-orange-200",
  },
  violet: {
    bar: "bg-violet-300",
    text: "text-violet-200",
  },
  cyan: {
    bar: "bg-cyan-300",
    text: "text-cyan-200",
  },
  emerald: {
    bar: "bg-emerald-300",
    text: "text-emerald-200",
  },
  rose: {
    bar: "bg-rose-300",
    text: "text-rose-200",
  },
};

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function AnalyticsPage() {
  const [period, setPeriod] = useState("6M");
  const [chartData, setChartData] = useState(monthlyData);

  useEffect(() => {
    let isMounted = true;
    analyticsApi
      .getTrends()
      .then((res) => {
        if (isMounted && res && res.trends && res.trends.length > 0) {
          setChartData((prev) => ({
            ...prev,
            "6M": res.trends,
          }));
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live analytics trends, using fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const data = chartData[period] || monthlyData[period];

  const maxValue = Math.max(
    ...data.flatMap((item) => [item.income, item.expense])
  );

  const totalIncome = data.reduce(
    (sum, item) => sum + item.income,
    0
  );

  const totalExpense = data.reduce(
    (sum, item) => sum + item.expense,
    0
  );

  const totalSavings = totalIncome - totalExpense;

  const savingsRate = Math.round(
    (totalSavings / totalIncome) * 100
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-400/[0.06] blur-[100px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/60">
                Financial Intelligence
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Understand your financial patterns through trends, spending
              behaviour and cash-flow insights.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            {["1M", "3M", "6M"].map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
                  period === item
                    ? "bg-cyan-300/[0.12] text-cyan-100 shadow-[0_0_20px_rgba(56,189,248,0.06)]"
                    : "text-white/35 hover:bg-white/[0.05] hover:text-white/70"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Metric Cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <MetricCard
          label="Total Income"
          value={formatCurrency(totalIncome)}
          change="+8.4%"
          icon={CircleDollarSign}
          accent="cyan"
        />

        <MetricCard
          label="Total Expenses"
          value={formatCurrency(totalExpense)}
          change="-5.2%"
          icon={ArrowDownRight}
          accent="violet"
        />

        <MetricCard
          label="Net Savings"
          value={formatCurrency(totalSavings)}
          change={`${savingsRate}% rate`}
          icon={Wallet}
          accent="emerald"
        />

        <MetricCard
          label="Savings Rate"
          value={`${savingsRate}%`}
          change="+4.7% improvement"
          icon={TrendingUp}
          accent="amber"
        />
      </section>

      {/* Income vs Expenses */}
      <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-cyan-400/[0.05] blur-[100px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 size={17} className="text-cyan-200" />

              <p className="text-sm font-semibold text-white">
                Income vs expenses
              </p>
            </div>

            <p className="mt-1 text-xs text-white/40">
              Compare your money coming in against money going out
            </p>
          </div>

          <div className="flex gap-4">
            <Legend label="Income" accent="cyan" />
            <Legend label="Expenses" accent="violet" />
          </div>
        </div>

        <div className="relative mt-8">
          <div className="flex h-64 gap-3 sm:h-72">
            {/* Y axis */}
            <div className="flex w-10 flex-col justify-between pb-7 text-right text-[9px] text-white/25">
              {[4, 3, 2, 1, 0].map((value) => (
                <span key={value}>
                  ₹{Math.round((maxValue / 1000) * value).toLocaleString()}k
                </span>
              ))}
            </div>

            {/* Chart */}
            <div className="relative flex flex-1 flex-col">
              <div className="absolute inset-0 pb-7">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="absolute left-0 right-0 border-t border-white/[0.05]"
                    style={{
                      top: `${line * 25}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative flex h-full items-end justify-between gap-2 pb-7 sm:gap-4">
                {data.map((item, index) => {
                  const incomeHeight =
                    (item.income / maxValue) * 100;

                  const expenseHeight =
                    (item.expense / maxValue) * 100;

                  return (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 items-end justify-center gap-1.5 sm:gap-2"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: `${incomeHeight}%`,
                        }}
                        transition={{
                          duration: 0.65,
                          delay: index * 0.06,
                        }}
                        className="group relative w-3 rounded-t-lg bg-cyan-300/75 shadow-[0_0_18px_rgba(103,232,249,0.08)] sm:w-5"
                      >
                        <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/80 px-2 py-1 text-[9px] text-white/70 backdrop-blur-xl group-hover:block">
                          {formatCurrency(item.income)}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: `${expenseHeight}%`,
                        }}
                        transition={{
                          duration: 0.65,
                          delay: index * 0.08,
                        }}
                        className="group relative w-3 rounded-t-lg bg-violet-300/70 shadow-[0_0_18px_rgba(167,139,250,0.08)] sm:w-5"
                      >
                        <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/80 px-2 py-1 text-[9px] text-white/70 backdrop-blur-xl group-hover:block">
                          {formatCurrency(item.expense)}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-white/30 sm:text-[10px]">
                {data.map((item) => (
                  <span key={item.month} className="flex-1 text-center">
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Analytics */}
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        {/* Spending Categories */}
        <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-violet-400/[0.05] blur-[100px]" />

          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <PieChart size={17} className="text-violet-200" />

                <p className="text-sm font-semibold text-white">
                  Spending categories
                </p>
              </div>

              <p className="mt-1 text-xs text-white/40">
                Where your expenses are going
              </p>
            </div>
          </div>

          <div className="relative mt-7 space-y-5">
            {categories.map((category, index) => {
              const style = categoryStyles[category.accent];

              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-white/70">
                      {category.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/45">
                        {formatCurrency(category.amount)}
                      </span>

                      <span className={`text-[10px] ${style.text}`}>
                        {category.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(category.percentage * 2.1, 100)}%`,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.08,
                      }}
                      className={`h-full rounded-full ${style.bar}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Financial Health */}
        <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-10 h-52 w-52 rounded-full bg-cyan-400/[0.06] blur-[90px]" />

          <div className="relative">
            <p className="text-sm font-semibold text-white">
              Financial health
            </p>

            <p className="mt-1 text-xs text-white/40">
              Key indicators from your recent activity
            </p>

            <div className="mt-7 flex items-center gap-6">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-cyan-200/10 bg-cyan-300/[0.025]">
                <div className="absolute inset-2 rounded-full border border-cyan-200/10" />

                <div className="text-center">
                  <p className="text-2xl font-semibold text-cyan-100">
                    84
                  </p>

                  <p className="text-[9px] uppercase tracking-wider text-white/30">
                    score
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <HealthRow
                  label="Savings"
                  value="Good"
                  accent="text-emerald-200"
                />

                <HealthRow
                  label="Budget usage"
                  value="Stable"
                  accent="text-cyan-200"
                />

                <HealthRow
                  label="Spending"
                  value="Moderate"
                  accent="text-violet-200"
                />

                <HealthRow
                  label="Consistency"
                  value="Strong"
                  accent="text-amber-200"
                />
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-cyan-200/10 bg-cyan-300/[0.035] p-4">
              <div className="flex items-start gap-3">
                <TrendingUp
                  size={16}
                  className="mt-0.5 shrink-0 text-cyan-200"
                />

                <p className="text-xs leading-5 text-white/45">
                  Your savings rate has improved while monthly expenses have
                  remained relatively controlled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-200/10 bg-violet-300/[0.035] p-5 backdrop-blur-2xl sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-violet-400/[0.07] blur-[80px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-200/15 bg-violet-300/[0.07] text-violet-200">
            <BarChart3 size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Finova analytics insight
            </p>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/50">
              Your recent income is growing faster than your expenses. The
              strongest opportunity for optimization is concentrated in
              discretionary categories such as Food & Dining and Shopping.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
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
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl border ${theme.icon}`}
        >
          <Icon size={17} />
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

function Legend({ label, accent }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-2 w-2 rounded-full ${
          accent === "cyan" ? "bg-cyan-300" : "bg-violet-300"
        }`}
      />

      <span className="text-[10px] text-white/40">
        {label}
      </span>
    </div>
  );
}

function HealthRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-[11px] text-white/35">
        {label}
      </span>

      <span className={`text-[11px] font-medium ${accent}`}>
        {value}
      </span>
    </div>
  );
}

export default AnalyticsPage;