import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Filter,
  Laptop,
  Plus,
  Search,
  Shield,
  Sparkles,
  GraduationCap,
  Bike,
  Target,
  MoreHorizontal,
} from "lucide-react";
import { goalsApi } from "../services/api";

const goals = [
  {
    id: 1,
    name: "New Laptop",
    saved: 62000,
    target: 100000,
    deadline: "Dec 2026",
    category: "Technology",
    icon: Laptop,
    accent: "cyan",
  },
  {
    id: 2,
    name: "Emergency Fund",
    saved: 28500,
    target: 50000,
    deadline: "Jan 2027",
    category: "Security",
    icon: Shield,
    accent: "violet",
  },
  {
    id: 3,
    name: "New Bicycle",
    saved: 9200,
    target: 20000,
    deadline: "Nov 2026",
    category: "Lifestyle",
    icon: Bike,
    accent: "emerald",
  },
  {
    id: 4,
    name: "Course & Certification",
    saved: 4800,
    target: 10000,
    deadline: "Oct 2026",
    category: "Education",
    icon: GraduationCap,
    accent: "amber",
  },
];

const accentStyles = {
  cyan: {
    icon: "border-cyan-300/15 bg-cyan-300/[0.08] text-cyan-200",
    bar: "bg-cyan-300",
    glow: "bg-cyan-400/[0.07]",
    text: "text-cyan-200",
  },
  violet: {
    icon: "border-violet-300/15 bg-violet-300/[0.08] text-violet-200",
    bar: "bg-violet-300",
    glow: "bg-violet-400/[0.07]",
    text: "text-violet-200",
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

function GoalsPage() {
  const [goalList, setGoalList] = useState(goals);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let isMounted = true;
    goalsApi
      .getGoals()
      .then((res) => {
        if (isMounted && res && res.goals && res.goals.length > 0) {
          const iconMap = {
            Technology: Laptop,
            Security: Shield,
            Lifestyle: Bike,
            Education: GraduationCap,
          };
          const accentMap = {
            Technology: "cyan",
            Security: "violet",
            Lifestyle: "emerald",
            Education: "amber",
          };

          const formatted = res.goals.map((g) => ({
            id: g.id,
            name: g.title,
            saved: Number(g.currentAmount || 0),
            target: Number(g.targetAmount || 0),
            deadline: g.deadline ? new Date(g.deadline).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Ongoing",
            category: g.category || "Savings",
            icon: iconMap[g.category] || Target,
            accent: accentMap[g.category] || "cyan",
          }));
          setGoalList(formatted);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live goals, using fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalSaved = useMemo(
    () => goalList.reduce((total, goal) => total + goal.saved, 0),
    [goalList]
  );

  const totalTarget = useMemo(
    () => goalList.reduce((total, goal) => total + goal.target, 0),
    [goalList]
  );

  const totalRemaining = Math.max(0, totalTarget - totalSaved);

  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const completedGoals = useMemo(
    () => goalList.filter((goal) => goal.saved >= goal.target).length,
    [goalList]
  );

  const filteredGoals = useMemo(() => {
    return goalList.filter((goal) => {
      const progress = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;

      const matchesSearch =
        goal.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        goal.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      let matchesFilter = true;

      if (filter === "On track") {
        matchesFilter = progress >= 50 && progress < 100;
      }

      if (filter === "Almost there") {
        matchesFilter = progress >= 75 && progress < 100;
      }

      if (filter === "Completed") {
        matchesFilter = progress >= 100;
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-400/[0.08] blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/60">
                Future Planning
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Goals
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Turn your plans into measurable financial goals and watch your
              progress grow over time.
            </p>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.08] px-4 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/25 hover:bg-cyan-300/[0.12] sm:w-auto">
            <Plus size={17} />
            Create goal
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <SummaryCard
          label="Total Saved"
          value={formatCurrency(totalSaved)}
          change={`${overallProgress}% overall`}
          icon={Target}
          accent="cyan"
        />

        <SummaryCard
          label="Target Amount"
          value={formatCurrency(totalTarget)}
          change="Across all goals"
          icon={Sparkles}
          accent="violet"
        />

        <SummaryCard
          label="Remaining"
          value={formatCurrency(totalRemaining)}
          change="To reach targets"
          icon={ArrowUpRight}
          accent="emerald"
        />

        <SummaryCard
          label="Active Goals"
          value={`${goals.length - completedGoals}`}
          change={`${completedGoals} completed`}
          icon={Target}
          accent="amber"
        />
      </section>

      {/* Overall Progress */}
      <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full bg-violet-400/[0.05] blur-[100px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Overall goal progress
            </p>

            <p className="mt-1 text-xs text-white/40">
              Combined progress across all financial goals
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xl font-semibold text-white">
              {formatCurrency(totalSaved)}
              <span className="text-sm font-normal text-white/30">
                {" "}
                / {formatCurrency(totalTarget)}
              </span>
            </p>

            <p className="mt-1 text-xs text-cyan-200/60">
              {overallProgress}% complete
            </p>
          </div>
        </div>

        <div className="relative mt-6 h-3 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-300 to-violet-300 shadow-[0_0_22px_rgba(103,232,249,0.18)]"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-white/30">
          <span>₹0</span>
          <span>{overallProgress}%</span>
          <span>{formatCurrency(totalTarget)}</span>
        </div>
      </section>

      {/* Goal List */}
      <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-cyan-400/[0.045] blur-[100px]" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Your financial goals
            </p>

            <p className="mt-1 text-xs text-white/40">
              Track progress and stay focused on what matters
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
                placeholder="Search goals..."
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
                  All goals
                </option>

                <option value="On track" className="bg-slate-900">
                  On track
                </option>

                <option value="Almost there" className="bg-slate-900">
                  Almost there
                </option>

                <option value="Completed" className="bg-slate-900">
                  Completed
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
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal, index) => {
              const Icon = goal.icon;
              const percentage = Math.round(
                (goal.saved / goal.target) * 100
              );

              const remaining = Math.max(
                goal.target - goal.saved,
                0
              );

              const accent = accentStyles[goal.accent];

              return (
                <motion.div
                  key={goal.id}
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
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-[65px] ${accent.glow}`}
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
                          <p className="text-sm font-medium text-white/90">
                            {goal.name}
                          </p>

                          <p className="mt-1 text-[11px] text-white/35">
                            {goal.category}
                          </p>
                        </div>

                        <button className="rounded-lg p-1.5 text-white/25 transition hover:bg-white/[0.06] hover:text-white/60">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/35">
                        {formatCurrency(goal.saved)} saved
                      </span>

                      <span className={`text-xs font-medium ${accent.text}`}>
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
                          duration: 0.75,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${accent.bar} shadow-[0_0_15px_rgba(103,232,249,0.12)]`}
                      />
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-col gap-3 border-t border-white/7 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={13} className="text-white/30" />

                      <span className="text-[10px] text-white/40">
                        Target: {goal.deadline}
                      </span>
                    </div>

                    <span className="text-[10px] text-white/30">
                      {remaining > 0
                        ? `${formatCurrency(remaining)} remaining`
                        : "Goal completed"}
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-dashed border-white/10 py-12 text-center">
              <p className="text-sm text-white/55">
                No goals found
              </p>

              <p className="mt-1 text-xs text-white/30">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Motivation */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-200/10 bg-cyan-300/[0.035] p-5 backdrop-blur-2xl sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-cyan-400/[0.07] blur-[80px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.07] text-cyan-200">
            <Sparkles size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Finova goal insight
            </p>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/50">
              Your laptop goal is currently the largest active target.
              Consistent monthly contributions can steadily move each goal
              closer to completion without putting unnecessary pressure on
              your everyday spending.
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

export default GoalsPage;