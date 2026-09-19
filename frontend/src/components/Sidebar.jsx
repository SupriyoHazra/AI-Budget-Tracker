import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Goal,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200/15 bg-cyan-300/[0.08] shadow-[0_0_25px_rgba(56,189,248,0.08)]">
        <div className="absolute inset-1.5 rounded-lg border border-white/[0.08]" />

        <span className="relative text-sm font-bold tracking-tight text-cyan-100">
          F
        </span>

        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
      </div>

      <div className="min-w-0">
        <p className="text-[15px] font-semibold tracking-[0.12em] text-white">
          FINOVA
        </p>

        <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
          Financial Intelligence
        </p>
      </div>
    </div>
  );
}

const navigation = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: CreditCard,
  },
  {
    id: "income",
    label: "Income",
    icon: Wallet,
  },
  {
    id: "budgets",
    label: "Budgets",
    icon: BarChart3,
  },
  {
    id: "goals",
    label: "Goals",
    icon: Goal,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "ai",
    label: "AI Assistant",
    icon: Bot,
  },
  {
    id: "receipts",
    label: "Receipts",
    icon: FileText,
  },
];

function Sidebar({
  collapsed,
  setCollapsed,
  activePage = "dashboard",
  onNavigate = () => {},
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const navigationContent = (isMobile = false) => (
    <>
      {/* Navigation */}
      <nav className="mt-7 space-y-1.5">
        <p
          className={`mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 ${
            !isMobile && collapsed ? "hidden" : ""
          }`}
        >
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate(item.id)}
              title={!isMobile && collapsed ? item.label : undefined}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                active
                  ? "border border-cyan-200/10 bg-cyan-300/[0.09] text-cyan-100"
                  : "border border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.045] hover:text-slate-200"
              } ${!isMobile && collapsed ? "justify-center px-2" : ""}`}
            >
              {active && (
                <motion.div
                  layoutId={isMobile ? "mobileActiveIndicator" : "desktopActiveIndicator"}
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]"
                />
              )}

              <Icon
                size={17}
                strokeWidth={active ? 2 : 1.7}
                className={`shrink-0 transition ${
                  active
                    ? "text-cyan-200"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />

              <AnimatePresence initial={false}>
                {(isMobile || !collapsed) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {active && (isMobile || !collapsed) && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* AI card */}
      <div
        className={`mt-8 overflow-hidden rounded-2xl border border-violet-300/10 bg-violet-300/[0.045] p-3 ${
          !isMobile && collapsed ? "hidden" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-300/10 text-violet-200">
            <Sparkles size={14} />
          </div>

          <div>
            <p className="text-[11px] font-medium text-slate-200">
              Finova AI
            </p>

            <p className="text-[9px] text-slate-500">
              Intelligence active
            </p>
          </div>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            animate={{ width: ["45%", "78%", "58%", "82%"] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full rounded-full bg-gradient-to-r from-violet-300/70 to-cyan-300/70"
          />
        </div>
      </div>

      {/* Settings */}
      <div className="mt-auto pt-8">
        <button
          onClick={() => handleNavigate("settings")}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-slate-500 transition hover:border-white/[0.06] hover:bg-white/[0.045] hover:text-slate-300"
        >
          <Settings size={17} />

          {(isMobile || !collapsed) && (
            <span className="text-xs font-medium">
              Settings
            </span>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 hidden border-r border-white/[0.08] bg-[#061526]/45 backdrop-blur-3xl transition-[width] duration-400 lg:block ${
          collapsed ? "w-[88px]" : "w-[270px]"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            <Logo />

            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] text-slate-500 transition hover:bg-white/[0.07] hover:text-white"
                title="Collapse sidebar"
              >
                <ChevronLeft size={15} />
              </button>
            )}
          </div>

          {navigationContent(false)}

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="mt-auto flex h-9 w-full items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-slate-500 transition hover:bg-white/[0.07] hover:text-white"
              title="Expand sidebar"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="fixed left-0 right-0 top-0 z-[60] flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#061526]/65 px-4 backdrop-blur-3xl lg:hidden">
        <Logo />

        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.05] text-slate-300 transition hover:bg-white/[0.09] hover:text-white"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="fixed bottom-0 left-0 top-0 z-[80] flex w-[285px] flex-col border-r border-white/[0.10] bg-[#061526]/90 p-4 backdrop-blur-3xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />

                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                  aria-label="Close navigation"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                {navigationContent(true)}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;