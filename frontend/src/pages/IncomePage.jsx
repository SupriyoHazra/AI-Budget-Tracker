import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  CircleDollarSign,
  Filter,
  Landmark,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";

const incomeTransactions = [
  {
    id: 1,
    source: "Freelance Project",
    category: "Freelance",
    date: "Yesterday · 8:30 PM",
    amount: 8500,
    type: "One-time",
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
  {
    id: 2,
    source: "Monthly Allowance",
    category: "Allowance",
    date: "18 Sep · 9:00 AM",
    amount: 12000,
    type: "Recurring",
    icon: Wallet,
    accent: "violet",
  },
  {
    id: 3,
    source: "Scholarship",
    category: "Education",
    date: "15 Sep · 11:15 AM",
    amount: 5000,
    type: "Recurring",
    icon: Landmark,
    accent: "emerald",
  },
  {
    id: 4,
    source: "Freelance Website",
    category: "Freelance",
    date: "12 Sep · 6:20 PM",
    amount: 6800,
    type: "One-time",
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
  {
    id: 5,
    source: "Monthly Allowance",
    category: "Allowance",
    date: "01 Sep · 9:00 AM",
    amount: 12000,
    type: "Recurring",
    icon: Wallet,
    accent: "violet",
  },
  {
    id: 6,
    source: "Design Gig",
    category: "Freelance",
    date: "28 Aug · 7:45 PM",
    amount: 4200,
    type: "One-time",
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
];

const sourceStats = [
  {
    name: "Freelance",
    amount: 19500,
    percentage: 27.6,
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
  {
    name: "Allowance",
    amount: 24000,
    percentage: 33.9,
    icon: Wallet,
    accent: "violet",
  },
  {
    name: "Scholarship",
    amount: 5000,
    percentage: 7.1,
    icon: Landmark,
    accent: "emerald",
  },
];

const accentClasses = {
  cyan: {
    icon: "bg-cyan-400/10 text-cyan-200 border-cyan-300/15",
    glow: "bg-cyan-400/10",
    text: "text-cyan-200",
    bar: "bg-cyan-300",
  },
  violet: {
    icon: "bg-violet-400/10 text-violet-200 border-violet-300/15",
    glow: "bg-violet-400/10",
    text: "text-violet-200",
    bar: "bg-violet-300",
  },
  emerald: {
    icon: "bg-emerald-400/10 text-emerald-200 border-emerald-300/15",
    glow: "bg-emerald-400/10",
    text: "text-emerald-200",
    bar: "bg-emerald-300",
  },
};

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function IncomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    return incomeTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.source
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilter =
        filter === "All" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-violet-400/[0.06] blur-[100px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/60">
                Cash Flow
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Income
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Track every income source and understand how money flows into
              your financial life.
            </p>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.08] px-4 py-3 text-sm font-medium text-cyan-100 shadow-[0_0_30px_rgba(56,189,248,0.06)] transition hover:border-cyan-200/25 hover:bg-cyan-300/[0.12] sm:w-auto">
            <Plus size={17} />
            Add income
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <SummaryCard
          label="Total Income"
          value="₹70,720"
          change="+8.4%"
          description="vs last month"
          icon={CircleDollarSign}
          accent="cyan"
          positive
        />

        <SummaryCard
          label="This Month"
          value="₹51,500"
          change="+12.1%"
          description="September"
          icon={TrendingUp}
          accent="violet"
          positive
        />

        <SummaryCard
          label="Recurring"
          value="₹29,000"
          change="41.0%"
          description="of total income"
          icon={Wallet}
          accent="emerald"
        />

        <SummaryCard
          label="Average / Month"
          value="₹35,360"
          change="+6.8%"
          description="last 2 months"
          icon={ArrowUpRight}
          accent="amber"
          positive
        />
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        {/* Income Sources */}
        <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-cyan-400/[0.05] blur-[90px]" />

          <div className="relative mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Income sources
              </p>
              <p className="mt-1 text-xs text-white/40">
                Where your money is coming from
              </p>
            </div>

            <button className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/50 transition hover:bg-white/[0.08] hover:text-white">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="space-y-5">
            {sourceStats.map((source, index) => {
              const Icon = source.icon;
              const accent = accentClasses[source.accent];

              return (
                <motion.div
                  key={source.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                  className="group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${accent.icon}`}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white/85">
                            {source.name}
                          </p>
                          <p className="mt-0.5 text-xs text-white/35">
                            {source.percentage}% of tracked income
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-white">
                          {formatCurrency(source.amount)}
                        </p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(source.percentage * 2, 100)}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full ${accent.bar} shadow-[0_0_16px_rgba(125,211,252,0.18)]`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                Tracked
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                ₹48,500
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                Sources
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                3 active
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
          <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-violet-400/[0.07] blur-[90px]" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Monthly overview
              </p>
              <p className="mt-1 text-xs text-white/40">
                Income performance
              </p>
            </div>

            <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
              2026
            </span>
          </div>

          <div className="relative mt-7 flex h-52 items-end gap-3">
            {[42, 55, 48, 67, 58, 78, 92, 72, 84].map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 items-end"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="group relative w-full overflow-hidden rounded-t-xl border border-cyan-200/10 bg-gradient-to-t from-cyan-400/[0.12] to-white/[0.08]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-cyan-200/30" />

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-400/[0.06] to-transparent opacity-0 transition group-hover:opacity-100" />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-9 text-center text-[9px] text-white/30 sm:text-[10px]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map(
              (month) => (
                <span key={month}>{month}</span>
              )
            )}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-200/10 bg-cyan-300/[0.035] px-4 py-3">
            <div>
              <p className="text-[11px] text-white/35">September income</p>
              <p className="mt-1 text-lg font-semibold text-white">
                ₹51,500
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-200">
              <ArrowUpRight size={15} />
              12.1%
            </div>
          </div>
        </div>
      </section>

      {/* Transactions */}
      <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-400/[0.045] blur-[100px]" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Income history
            </p>
            <p className="mt-1 text-xs text-white/40">
              Recent money received
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
                placeholder="Search income..."
                className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-cyan-200/20 focus:bg-white/[0.06] sm:w-56"
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
                className="h-10 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-9 text-xs text-white/65 outline-none transition focus:border-cyan-200/20 sm:w-36"
              >
                <option value="All" className="bg-slate-900">
                  All income
                </option>
                <option value="Recurring" className="bg-slate-900">
                  Recurring
                </option>
                <option value="One-time" className="bg-slate-900">
                  One-time
                </option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-6 space-y-2">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => {
              const Icon = transaction.icon;
              const accent = accentClasses[transaction.accent];

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                  className="group flex items-center gap-3 rounded-2xl border border-transparent px-2 py-3 transition hover:border-white/8 hover:bg-white/[0.035] sm:px-3"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent.icon}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white/85">
                        {transaction.source}
                      </p>

                      <span className="hidden rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[9px] text-white/35 sm:inline">
                        {transaction.type}
                      </span>
                    </div>

                    <p className="mt-0.5 truncate text-[11px] text-white/35">
                      {transaction.category} · {transaction.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className={`text-sm font-semibold ${accent.text}`}>
                      +{formatCurrency(transaction.amount)}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/25">
                      Received
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
              <p className="text-sm text-white/55">No income found</p>
              <p className="mt-1 text-xs text-white/30">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Insight */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-200/10 bg-cyan-300/[0.035] p-5 backdrop-blur-2xl sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-cyan-400/[0.07] blur-[80px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.07] text-cyan-200">
            <TrendingUp size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Finova insight
            </p>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/50">
              Your income has increased compared with the previous month.
              Freelance work is currently contributing a meaningful part of
              your variable income, while recurring sources provide a more
              predictable baseline.
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
  description,
  icon: Icon,
  accent,
  positive = false,
}) {
  const accentMap = {
    cyan: {
      icon: "text-cyan-200 bg-cyan-300/[0.08] border-cyan-200/10",
      glow: "bg-cyan-400/[0.07]",
      change: "text-cyan-100",
    },
    violet: {
      icon: "text-violet-200 bg-violet-300/[0.08] border-violet-200/10",
      glow: "bg-violet-400/[0.07]",
      change: "text-violet-100",
    },
    emerald: {
      icon: "text-emerald-200 bg-emerald-300/[0.08] border-emerald-200/10",
      glow: "bg-emerald-400/[0.06]",
      change: "text-emerald-100",
    },
    amber: {
      icon: "text-amber-200 bg-amber-300/[0.08] border-amber-200/10",
      glow: "bg-amber-400/[0.05]",
      change: "text-amber-100",
    },
  };

  const theme = accentMap[accent];

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
        <div className="flex items-start justify-between gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${theme.icon}`}
          >
            <Icon size={17} />
          </div>

          <div
            className={`flex items-center gap-1 text-[10px] font-medium ${theme.change}`}
          >
            {positive && <ArrowUpRight size={13} />}
            {change}
          </div>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.13em] text-white/35 sm:text-[11px]">
          {label}
        </p>

        <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-white/30 sm:text-xs">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default IncomePage;