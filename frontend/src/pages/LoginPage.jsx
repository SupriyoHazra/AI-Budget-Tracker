import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Eye,
  Fingerprint,
  LockKeyhole,
  Mail,
  Radar,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";
import Logo from "../components/Logo";
import { authApi } from "../services/api";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [entered, setEntered] = useState(false);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  /* ============================================================
     MOUSE LIGHT — ONLY LIGHT MOVES WITH MOUSE
  ============================================================ */

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /* ============================================================
     PARTICLES
  ============================================================ */

  const particles = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.7,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 8,
        drift: Math.random() * 25 - 12,
      })),
    []
  );

  /* ============================================================
     FEATURES
  ============================================================ */

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      text: "Understand your money automatically.",
    },
    {
      icon: Activity,
      title: "Live Financial Intelligence",
      text: "Track every movement in real time.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      text: "Your financial data stays protected.",
    },
  ];

  /* ============================================================
     LOGIN
  ============================================================ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);

    try {
      const response = await authApi.login({ email, password }).catch(() => null);
      if (response && response.token) {
        localStorage.setItem("finova_token", response.token);
        localStorage.setItem("finova_user", JSON.stringify(response.user));
      }
    } catch (err) {
      console.warn("Backend auth unavailable, continuing with demo mode:", err);
    }

    setTimeout(() => {
      setLoading(false);
      setEntered(true);

      setTimeout(() => {
        if (onLogin) {
          onLogin();
        }
      }, 700);
    }, 800);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020812] text-white">
      {/* ========================================================
          CINEMATIC MOUNTAIN
          AUTOMATIC MOVEMENT — NEVER MOUSE CONTROLLED
      ======================================================== */}

      <motion.img
        src="/images/finova-mountains.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
        initial={{
          scale: 1.03,
          x: 0,
        }}
        animate={{
          scale: [1.03, 1.065, 1.03],
          x: [0, -9, 0],
          y: [0, -2, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          CINEMATIC COLOR GRADING
      ======================================================== */}

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#061a29]/55 via-[#020812]/30 to-[#160c2c]/55"
        animate={{
          opacity: [0.65, 0.82, 0.65],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[#020812]/35" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-transparent to-[#020812]/35" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#020812]/75 via-transparent to-[#020812]/70" />

      {/* ========================================================
          AUTOMATIC CYAN ATMOSPHERE
      ======================================================== */}

      <motion.div
        className="absolute -left-[15%] top-[0%] h-[650px] w-[650px] rounded-full bg-cyan-400/[0.09] blur-[170px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 70, 0],
          scale: [1, 1.16, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          AUTOMATIC VIOLET ATMOSPHERE
      ======================================================== */}

      <motion.div
        className="absolute -right-[15%] top-[5%] h-[680px] w-[680px] rounded-full bg-violet-500/[0.09] blur-[180px]"
        animate={{
          x: [0, -100, 0],
          y: [0, 65, 0],
          scale: [1, 1.14, 1],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          MOUSE REACTIVE CYAN LIGHT
      ======================================================== */}

      <motion.div
        className="pointer-events-none absolute z-[2] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.12] blur-[125px]"
        animate={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 28,
          damping: 28,
          mass: 0.8,
        }}
      />

      {/* ========================================================
          MOUSE REACTIVE VIOLET LIGHT
      ======================================================== */}

      <motion.div
        className="pointer-events-none absolute z-[2] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.11] blur-[115px]"
        animate={{
          left: `${mouse.x + 6}%`,
          top: `${mouse.y - 5}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 22,
          damping: 32,
          mass: 0.9,
        }}
      />

      {/* ========================================================
          MOUSE CURSOR ENERGY
      ======================================================== */}

      <motion.div
        className="pointer-events-none fixed z-[80] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/30 bg-cyan-300/[0.08] shadow-[0_0_25px_rgba(34,211,238,0.25)]"
        animate={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.2,
        }}
      />

      {/* ========================================================
          PARTICLES
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-100/40"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -45, 0],
              x: [0, particle.drift, 0],
              opacity: [0, 0.55, 0],
              scale: [0.7, 1.5, 0.7],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ========================================================
          MOVING FOG LAYER
      ======================================================== */}

      <motion.div
        className="pointer-events-none absolute bottom-[5%] left-[-20%] z-[3] h-[180px] w-[140%] rounded-[50%] bg-cyan-200/[0.025] blur-[55px]"
        animate={{
          x: ["0%", "12%", "0%"],
          scaleX: [1, 1.08, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-[15%] left-[-20%] z-[3] h-[130px] w-[140%] rounded-[50%] bg-violet-300/[0.025] blur-[50px]"
        animate={{
          x: ["0%", "-10%", "0%"],
          scaleX: [1, 1.06, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          CINEMATIC SCAN LINES
      ======================================================== */}

      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-[25%] z-[4] h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
        animate={{
          opacity: [0, 0.8, 0],
          scaleX: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-[68%] z-[4] h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent"
        animate={{
          opacity: [0, 0.7, 0],
          scaleX: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 7,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          HORIZON ENERGY
      ======================================================== */}

      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-[61%] z-[4] h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        animate={{
          opacity: [0, 0.8, 0],
          scaleX: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div className="relative z-10 flex min-h-screen">
        {/* ======================================================
            LEFT HERO
        ====================================================== */}

        <section className="hidden w-[58%] flex-col justify-center px-12 py-12 lg:flex xl:px-20">
          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl"
          >
            {/* ==================================================
                LOGO
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.8,
              }}
              className="mb-8 flex items-center"
            >
              <Logo />
            </motion.div>

            {/* ==================================================
                BADGE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl"
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-cyan-300"
                animate={{
                  scale: [1, 1.7, 1],
                  opacity: [0.4, 1, 0.4],
                  boxShadow: [
                    "0 0 5px rgba(103,232,249,0.3)",
                    "0 0 20px rgba(103,232,249,0.9)",
                    "0 0 5px rgba(103,232,249,0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-200/90">
                Intelligent Personal Finance
              </span>

              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </motion.div>

            {/* ==================================================
                HERO HEADING
            ================================================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.4,
                duration: 1,
              }}
              className="text-5xl font-semibold leading-[1.02] tracking-tight xl:text-7xl"
            >
              Your money.
              <br />

              <motion.span
                className="bg-gradient-to-r from-cyan-200 via-white to-violet-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Your intelligence.
              </motion.span>
            </motion.h1>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.58,
                duration: 0.8,
              }}
              className="mt-7 max-w-xl text-base leading-7 text-slate-300/80 xl:text-lg"
            >
              Finova transforms everyday financial activity into clear,
              intelligent insights — helping you understand spending, build
              better habits, and take control of your financial future.
            </motion.p>

            {/* ==================================================
                FEATURES
            ================================================== */}

            <div className="mt-9 space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      x: -25,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.72 + index * 0.13,
                      duration: 0.7,
                    }}
                    className="group flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 3,
                      }}
                      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.08]"
                    >
                      <Icon className="h-5 w-5 text-cyan-200" />

                      <motion.div
                        className="absolute inset-0 rounded-xl bg-cyan-300/10 blur-md"
                        animate={{
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: index * 0.5,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        {feature.title}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ==================================================
                TELEMETRY
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.2,
                duration: 1,
              }}
              className="mt-10 flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-slate-400"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    boxShadow: [
                      "0 0 5px rgba(52,211,153,0.2)",
                      "0 0 15px rgba(52,211,153,0.9)",
                      "0 0 5px rgba(52,211,153,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                Systems Operational
              </div>

              <div className="hidden h-3 w-px bg-white/10 sm:block" />

              <div className="hidden items-center gap-2 sm:flex">
                <Fingerprint className="h-3.5 w-3.5 text-cyan-300" />
                Secure Environment
              </div>

              <div className="hidden items-center gap-2 xl:flex">
                <Radar className="h-3.5 w-3.5 text-violet-300" />
                AI Online
              </div>
            </motion.div>
          </motion.div>

          {/* ==================================================
              FLOATING FINANCIAL HUD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: [0, -7, 0],
              scale: 1,
            }}
            transition={{
              opacity: {
                delay: 1,
                duration: 1,
              },
              y: {
                delay: 2,
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute bottom-9 left-[45%] hidden xl:block"
          >
            <div className="relative h-36 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#07111f]/45 p-4 shadow-2xl backdrop-blur-2xl">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
                    Financial Flow
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    +18.42%
                  </p>
                </div>

                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <Activity className="h-4 w-4 text-cyan-300" />
                </motion.div>
              </div>

              <svg
                viewBox="0 0 240 70"
                className="relative mt-1 h-20 w-full overflow-visible"
              >
                <motion.path
                  d="M0 58 C25 52 28 45 50 48 S72 28 95 37 S120 55 140 35 S170 12 190 27 S215 22 240 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-cyan-300"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 1.4,
                    ease: "easeInOut",
                  }}
                />

                <motion.circle
                  cx="240"
                  cy="5"
                  r="3"
                  className="fill-cyan-300"
                  animate={{
                    r: [2, 4, 2],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </section>

        {/* ======================================================
            RIGHT LOGIN PANEL
        ====================================================== */}

        <section className="flex w-full items-center justify-center px-5 py-10 lg:w-[42%] lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              x: 55,
              scale: 0.94,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-[470px]"
          >
            {/* ==================================================
                CARD AURA
            ================================================== */}

            <motion.div
              className="absolute -inset-12 rounded-[55px] bg-gradient-to-r from-cyan-400/[0.07] via-transparent to-violet-500/[0.07] blur-[90px]"
              animate={{
                opacity: [0.35, 0.75, 0.35],
                scale: [0.94, 1.06, 0.94],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ==================================================
                LOGIN CARD
            ================================================== */}

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#07111f]/68 p-7 shadow-[0_35px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-9">
              {/* Animated border light */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[32px] border border-transparent"
                animate={{
                  boxShadow: [
                    "inset 0 0 20px rgba(34,211,238,0.02)",
                    "inset 0 0 45px rgba(34,211,238,0.08)",
                    "inset 0 0 20px rgba(34,211,238,0.02)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              {/* Top energy line */}
              <motion.div
                className="absolute left-1/2 top-0 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                animate={{
                  opacity: [0.25, 1, 0.25],
                  scaleX: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Moving card light */}
              <motion.div
                className="pointer-events-none absolute -left-1/2 top-0 h-full w-[25%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent"
                animate={{
                  left: ["-50%", "150%"],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />

              {/* ==================================================
                  AI CORE
              ================================================== */}

              <div className="relative mb-8 flex justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  {/* Outer glow */}
                  <motion.div
                    className="absolute inset-2 rounded-full bg-cyan-400/[0.07] blur-2xl"
                    animate={{
                      scale: [0.85, 1.15, 0.85],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-300/15"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,1)]" />
                  </motion.div>

                  {/* Second ring */}
                  <motion.div
                    className="absolute inset-3 rounded-full border border-violet-300/20 border-dashed"
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_15px_rgba(196,181,253,1)]" />
                  </motion.div>

                  {/* Third ring */}
                  <motion.div
                    className="absolute inset-6 rounded-full border border-cyan-200/20"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,1)]" />
                  </motion.div>

                  {/* Core */}
                  <motion.div
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[22px] border border-cyan-200/20 bg-gradient-to-br from-cyan-300/20 via-cyan-200/[0.06] to-violet-500/20 shadow-[0_0_45px_rgba(34,211,238,0.18)] backdrop-blur-xl"
                    animate={{
                      scale: [1, 1.035, 1],
                      boxShadow: [
                        "0 0 30px rgba(34,211,238,0.15)",
                        "0 0 65px rgba(34,211,238,0.35)",
                        "0 0 30px rgba(34,211,238,0.15)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <BrainCircuit className="h-8 w-8 text-cyan-100" />

                    <motion.div
                      className="absolute inset-0 rounded-[22px] border border-cyan-200/20"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.3, 1.5],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* ==================================================
                  TITLE
              ================================================== */}

              <div className="relative text-center">
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.65,
                  }}
                  className="text-[10px] font-medium uppercase tracking-[0.32em] text-cyan-300/70"
                >
                  Welcome to Finova
                </motion.p>

                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.75,
                  }}
                  className="mt-2 text-3xl font-semibold tracking-tight"
                >
                  Enter your{" "}
                  <span className="bg-gradient-to-r from-cyan-200 to-violet-300 bg-clip-text text-transparent">
                    financial world
                  </span>
                </motion.h2>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.9,
                  }}
                  className="mt-3 text-sm leading-6 text-slate-400"
                >
                  Sign in to continue your intelligent financial journey.
                </motion.p>
              </div>

              {/* ==================================================
                  FORM
              ================================================== */}

              <form onSubmit={handleSubmit} className="relative mt-8 space-y-5">
                {/* EMAIL */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.95,
                  }}
                >
                  <label className="mb-2 block text-xs font-medium text-slate-300">
                    Email address
                  </label>

                  <div
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                      focused === "email"
                        ? "border-cyan-300/40 bg-cyan-300/[0.05] shadow-[0_0_30px_rgba(34,211,238,0.09)]"
                        : "border-white/10 bg-white/[0.035]"
                    }`}
                  >
                    <Mail
                      className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
                        focused === "email"
                          ? "text-cyan-300"
                          : "text-slate-500"
                      }`}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      placeholder="you@example.com"
                      className="w-full bg-transparent py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600"
                    />

                    <AnimatePresence>
                      {focused === "email" && (
                        <motion.div
                          initial={{
                            scaleX: 0,
                            opacity: 0,
                          }}
                          animate={{
                            scaleX: 1,
                            opacity: 1,
                          }}
                          exit={{
                            scaleX: 0,
                            opacity: 0,
                          }}
                          className="absolute bottom-0 left-4 right-4 h-px origin-center bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* PASSWORD */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 1.05,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-300">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-[11px] text-cyan-300/70 transition-colors hover:text-cyan-200"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                      focused === "password"
                        ? "border-violet-300/40 bg-violet-300/[0.05] shadow-[0_0_30px_rgba(139,92,246,0.09)]"
                        : "border-white/10 bg-white/[0.035]"
                    }`}
                  >
                    <LockKeyhole
                      className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
                        focused === "password"
                          ? "text-violet-300"
                          : "text-slate-500"
                      }`}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused("")}
                      placeholder="Enter your password"
                      className="w-full bg-transparent py-4 pl-11 pr-12 text-sm text-white outline-none placeholder:text-slate-600"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {focused === "password" && (
                        <motion.div
                          initial={{
                            scaleX: 0,
                            opacity: 0,
                          }}
                          animate={{
                            scaleX: 1,
                            opacity: 1,
                          }}
                          exit={{
                            scaleX: 0,
                            opacity: 0,
                          }}
                          className="absolute bottom-0 left-4 right-4 h-px origin-center bg-gradient-to-r from-transparent via-violet-300 to-transparent"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* SECURITY */}
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1.15,
                  }}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-slate-500"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />

                  <span>Protected financial environment</span>

                  <span className="ml-auto flex items-center gap-1.5">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                      }}
                    />

                    Secure
                  </span>
                </motion.div>

                {/* ==================================================
                    LOGIN BUTTON
                ================================================== */}

                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 1.2,
                  }}
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className="group relative mt-2 w-full overflow-hidden rounded-2xl border border-cyan-200/20 bg-gradient-to-r from-cyan-400/90 via-cyan-300/90 to-violet-400/90 px-5 py-4 text-sm font-semibold text-[#031018] shadow-[0_0_35px_rgba(34,211,238,0.16)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(34,211,238,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {/* Shine */}
                  <motion.div
                    className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/35 blur-md"
                    animate={{
                      left: ["-50%", "140%"],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1.8,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Energy line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-white/60"
                    animate={{
                      width: ["0%", "100%", "0%"],
                      x: ["0%", "0%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.span
                          className="h-4 w-4 rounded-full border-2 border-[#031018]/30 border-t-[#031018]"
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 0.65,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        Authenticating...
                      </>
                    ) : (
                      <>
                        Enter Finova
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* ==================================================
                  SECURITY STATUS HUD
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.3,
                }}
                className="mt-7 grid grid-cols-3 gap-2"
              >
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 text-center">
                  <Zap className="mx-auto h-3.5 w-3.5 text-cyan-300/70" />

                  <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-slate-600">
                    AI
                  </p>

                  <p className="mt-0.5 text-[9px] text-emerald-300">
                    ONLINE
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 text-center">
                  <Waves className="mx-auto h-3.5 w-3.5 text-violet-300/70" />

                  <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-slate-600">
                    NETWORK
                  </p>

                  <p className="mt-0.5 text-[9px] text-emerald-300">
                    SECURE
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 text-center">
                  <Fingerprint className="mx-auto h-3.5 w-3.5 text-cyan-300/70" />

                  <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-slate-600">
                    DATA
                  </p>

                  <p className="mt-0.5 text-[9px] text-emerald-300">
                    PROTECTED
                  </p>
                </div>
              </motion.div>

              {/* ==================================================
                  FOOTER
              ================================================== */}

              <div className="mt-6 text-center">
                <p className="text-[11px] leading-5 text-slate-500">
                  By continuing, you agree to Finova's{" "}
                  <span className="text-slate-300">Terms</span> and{" "}
                  <span className="text-slate-300">Privacy Policy</span>.
                </p>
              </div>

              {/* Decorative footer */}
              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-300/20" />

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-3 w-3 text-cyan-300/40" />
                </motion.div>

                <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-300/20" />
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ========================================================
          LOGIN SUCCESS TRANSITION
      ======================================================== */}

      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020812]"
          >
            <motion.div
              initial={{
                scale: 0.3,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.05]"
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-300/20"
                animate={{
                  scale: [1, 1.8, 2.5],
                  opacity: [0.8, 0.25, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              <CheckCircle2 className="h-12 w-12 text-cyan-200" />

              <motion.div
                className="absolute inset-[-20px] rounded-full border border-violet-300/10"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MOBILE FOOTER
      ======================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.2,
        }}
        className="absolute bottom-5 left-0 right-0 z-20 text-center lg:hidden"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <span className="text-[9px] uppercase tracking-[0.22em] text-slate-400">
            Finova • Intelligent Finance
          </span>
        </div>
      </motion.div>
    </main>
  );
}