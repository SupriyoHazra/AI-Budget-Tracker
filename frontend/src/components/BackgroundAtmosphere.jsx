import { motion } from "framer-motion";

function BackgroundAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* =========================================================
          CINEMATIC MOUNTAIN BACKGROUND
         ========================================================= */}

      <motion.img
        src="/images/finova-mountains.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ scale: 1.02 }}
        animate={{
          scale: [1.02, 1.055, 1.02],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          OCEAN BLUE ATMOSPHERE
         ========================================================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#061b34]/30 via-[#082a45]/10 to-[#03101f]/40" />

      {/* Subtle horizon tint */}
      <div className="absolute inset-x-0 top-[35%] h-[30%] bg-gradient-to-b from-cyan-300/[0.035] via-blue-300/[0.025] to-transparent blur-3xl" />

      {/* =========================================================
          MOVING CYAN LIGHT
         ========================================================= */}

      <motion.div
        className="absolute -left-[12%] top-[5%] h-[600px] w-[600px] rounded-full bg-cyan-400/[0.10] blur-[150px]"
        animate={{
          x: [0, 70, 0],
          y: [0, 40, 0],
          scale: [1, 1.12, 1],
          opacity: [0.65, 0.9, 0.65],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          MOVING VIOLET LIGHT
         ========================================================= */}

      <motion.div
        className="absolute -right-[12%] top-[8%] h-[650px] w-[650px] rounded-full bg-violet-500/[0.085] blur-[160px]"
        animate={{
          x: [0, -65, 0],
          y: [0, 55, 0],
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          SOFT SUNSET / HORIZON GLOW
         ========================================================= */}

      <motion.div
        className="absolute bottom-[18%] left-[15%] h-[260px] w-[70%] rounded-full bg-sky-300/[0.055] blur-[120px]"
        animate={{
          scaleX: [1, 1.08, 1],
          opacity: [0.55, 0.8, 0.55],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute bottom-[22%] left-1/2 h-32 w-[55%] -translate-x-1/2 rounded-full bg-amber-200/[0.025] blur-[100px]" />

      {/* =========================================================
          GLASS DEPTH / ATMOSPHERIC HAZE
         ========================================================= */}

      <motion.div
        className="absolute left-[35%] top-[18%] h-[420px] w-[420px] rounded-full bg-blue-400/[0.035] blur-[140px]"
        animate={{
          x: [0, 30, -15, 0],
          y: [0, -20, 25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          CINEMATIC VIGNETTE
         ========================================================= */}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(1,8,20,0.28)_100%)]" />

      {/* Very subtle top depth */}
      <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#020b18]/20 to-transparent" />

      {/* Very subtle bottom depth */}
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#020817]/45 to-transparent" />

      {/* =========================================================
          SOFT HORIZONTAL LIGHT
         ========================================================= */}

      <motion.div
        className="absolute left-1/2 top-[52%] h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/[0.10] to-transparent blur-sm"
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scaleX: [0.92, 1, 0.92],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default BackgroundAtmosphere;