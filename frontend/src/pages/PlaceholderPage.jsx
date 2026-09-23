import { motion } from "framer-motion";
import {
  ArrowLeft,
  Construction,
  Sparkles,
} from "lucide-react";

function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.055] p-6 backdrop-blur-2xl sm:p-8 lg:p-10"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/[0.06] blur-[100px]" />

      <div className="relative flex min-h-[420px] flex-col items-center justify-center text-center">
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-200/15 bg-cyan-300/[0.08] text-cyan-200 shadow-[0_0_50px_rgba(56,189,248,0.08)]"
        >
          <Icon size={34} />
        </motion.div>

        <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/60">
          <Sparkles size={13} />
          Finova Workspace
        </div>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
          {description}
        </p>

        <div className="mt-7 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
          Module ready for development
        </div>
      </div>
    </motion.section>
  );
}

export default PlaceholderPage;