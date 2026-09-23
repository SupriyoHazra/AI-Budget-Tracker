import { motion } from "framer-motion";

const data = [
  { day: "Mon", income: 8200, expenses: 3200 },
  { day: "Tue", income: 10500, expenses: 4100 },
  { day: "Wed", income: 9200, expenses: 5800 },
  { day: "Thu", income: 12800, expenses: 4600 },
  { day: "Fri", income: 11200, expenses: 7200 },
  { day: "Sat", income: 14800, expenses: 6200 },
  { day: "Sun", income: 13400, expenses: 3900 },
];

const maxValue = 16000;

function createPoints(key) {
  return data
    .map((item, index) => {
      const x = 50 + index * 125;

      const y =
        230 -
        (item[key] / maxValue) * 180;

      return `${x},${y}`;
    })
    .join(" ");
}

function SpendingChart() {
  const incomePoints = createPoints("income");
  const expensePoints = createPoints("expenses");

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.25,
        },
      }}
      className="group relative mt-6 overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.045] p-5 shadow-[0_10px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-all duration-500 hover:border-cyan-200/[0.22] hover:bg-white/[0.06] hover:shadow-[0_15px_60px_rgba(56,189,248,0.08)] md:p-7"
    >
      {/* Main atmospheric glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[120px] transition-transform duration-1000 group-hover:scale-125" />

      <div className="pointer-events-none absolute -left-32 bottom-[-100px] h-72 w-72 rounded-full bg-violet-500/[0.06] blur-[110px]" />

      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.055] via-transparent to-transparent" />

      {/* Top glass edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
              Cash flow
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">
              Spending Overview
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Income and expenses across the week
            </p>
          </div>

          {/* Period selector */}
          <div className="flex w-fit items-center rounded-xl border border-white/[0.08] bg-black/20 p-1 backdrop-blur-xl">
            {["Week", "Month", "Year"].map((period, index) => (
              <button
                key={period}
                className={`rounded-lg px-3 py-1.5 text-[10px] font-medium transition-all ${
                  index === 0
                    ? "bg-white/[0.10] text-white shadow-[0_0_15px_rgba(255,255,255,0.04)]"
                    : "text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />

            <span className="text-[10px] text-slate-400">
              Income
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.8)]" />

            <span className="text-[10px] text-slate-400">
              Expenses
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/[0.12] px-2 pb-3 pt-4">
          <svg
            viewBox="0 0 800 280"
            className="h-[250px] w-full overflow-visible md:h-[320px]"
            preserveAspectRatio="none"
          >
            <defs>

              {/* Income gradient */}
              <linearGradient
                id="incomeArea"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#67e8f9"
                  stopOpacity="0.16"
                />

                <stop
                  offset="100%"
                  stopColor="#67e8f9"
                  stopOpacity="0"
                />
              </linearGradient>

              {/* Expense gradient */}
              <linearGradient
                id="expenseArea"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#c4b5fd"
                  stopOpacity="0.12"
                />

                <stop
                  offset="100%"
                  stopColor="#c4b5fd"
                  stopOpacity="0"
                />
              </linearGradient>

              {/* Glow filters */}
              <filter
                id="cyanGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="violetGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizontal grid */}
            {[50, 95, 140, 185, 230].map((y) => (
              <line
                key={y}
                x1="30"
                x2="770"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.055)"
                strokeWidth="1"
              />
            ))}

            {/* Vertical grid */}
            {data.map((_, index) => {
              const x = 50 + index * 125;

              return (
                <line
                  key={index}
                  x1={x}
                  x2={x}
                  y1="45"
                  y2="230"
                  stroke="rgba(255,255,255,0.025)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Income area */}
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
              }}
              points={`${incomePoints} 800,230 50,230`}
              fill="url(#incomeArea)"
            />

            {/* Expense area */}
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
              }}
              points={`${expensePoints} 800,230 50,230`}
              fill="url(#expenseArea)"
            />

            {/* Income glow */}
            <motion.polyline
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 0.35,
              }}
              transition={{
                duration: 1.8,
                delay: 0.3,
                ease: "easeOut",
              }}
              points={incomePoints}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#cyanGlow)"
            />

            {/* Income main line */}
            <motion.polyline
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 1.8,
                delay: 0.3,
                ease: "easeOut",
              }}
              points={incomePoints}
              fill="none"
              stroke="#a5f3fc"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Expense glow */}
            <motion.polyline
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 0.3,
              }}
              transition={{
                duration: 1.8,
                delay: 0.45,
                ease: "easeOut",
              }}
              points={expensePoints}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#violetGlow)"
            />

            {/* Expense main line */}
            <motion.polyline
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 1.8,
                delay: 0.45,
                ease: "easeOut",
              }}
              points={expensePoints}
              fill="none"
              stroke="#c4b5fd"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Income points */}
            {data.map((item, index) => {
              const x = 50 + index * 125;
              const y = 230 - (item.income / maxValue) * 180;

              return (
                <motion.circle
                  key={`income-${item.day}`}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1.8 + index * 0.06,
                  }}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#cffafe"
                  stroke="#67e8f9"
                  strokeWidth="2"
                  style={{
                    filter:
                      "drop-shadow(0 0 7px rgba(103,232,249,0.9))",
                  }}
                />
              );
            })}

            {/* Expense points */}
            {data.map((item, index) => {
              const x = 50 + index * 125;
              const y = 230 - (item.expenses / maxValue) * 180;

              return (
                <motion.circle
                  key={`expense-${item.day}`}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1.9 + index * 0.06,
                  }}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#ede9fe"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  style={{
                    filter:
                      "drop-shadow(0 0 6px rgba(167,139,250,0.8))",
                  }}
                />
              );
            })}

            {/* Day labels */}
            {data.map((item, index) => {
              const x = 50 + index * 125;

              return (
                <text
                  key={item.day}
                  x={x}
                  y="260"
                  textAnchor="middle"
                  fill="rgba(148,163,184,0.65)"
                  fontSize="11"
                >
                  {item.day}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Bottom statistics */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">

          {/* Income */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.05]">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Income
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-lg font-semibold text-white">
                ₹70,100
              </p>

              <span className="text-[10px] font-medium text-emerald-300">
                +8.4%
              </span>
            </div>
          </div>

          {/* Expenses */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.05]">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Expenses
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-lg font-semibold text-white">
                ₹35,000
              </p>

              <span className="text-[10px] font-medium text-emerald-300">
                -5.2%
              </span>
            </div>
          </div>

          {/* Net savings */}
          <div className="rounded-2xl border border-cyan-300/[0.10] bg-cyan-400/[0.025] p-4 backdrop-blur-xl transition-all duration-300 hover:bg-cyan-400/[0.05]">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Weekly insight
            </p>

            <div className="mt-1 flex items-end justify-between gap-3">
              <p className="text-lg font-semibold text-cyan-100">
                +₹35,100
              </p>

              <span className="text-[10px] text-cyan-300/70">
                Net savings
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

export default SpendingChart;