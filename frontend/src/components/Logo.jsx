import { motion } from "framer-motion";

function Logo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-3">
      {/* F-Flux Symbol */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative flex h-11 w-11 shrink-0 items-center justify-center"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-violet-600/30 blur-xl" />

        {/* Logo container */}
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-transparent backdrop-blur-xl">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* F */}
            <path
              d="M7 21V7H21"
              stroke="url(#logoGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M7 13H17"
              stroke="url(#logoGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Financial growth curve */}
            <path
              d="M8 20L12 16L15 18L21 11"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />

            {/* Rising point */}
            <circle
              cx="21"
              cy="11"
              r="2"
              fill="#A78BFA"
            />

            <defs>
              <linearGradient
                id="logoGradient"
                x1="7"
                y1="21"
                x2="22"
                y2="7"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6366F1" />
                <stop offset="0.5" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="leading-tight"
        >
          <h1 className="text-xl font-bold tracking-tight text-white">
            Finova
          </h1>

          <p className="text-[10px] font-medium tracking-[0.18em] text-slate-500">
            FINANCIAL INTELLIGENCE
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Logo;