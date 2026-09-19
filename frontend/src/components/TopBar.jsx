import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Bot,
  ChevronDown,
  LayoutDashboard,
  Receipt,
  Wallet,
  Target,
  BarChart3,
  Settings,
  X,
  ArrowUpRight,
  CheckCheck,
  Sparkles,
} from "lucide-react";

const searchItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Your financial overview",
    icon: LayoutDashboard,
  },
  {
    id: "expenses",
    title: "Expenses",
    description: "Track and analyze spending",
    icon: BarChart3,
  },
  {
    id: "income",
    title: "Income",
    description: "Manage your income sources",
    icon: Wallet,
  },
  {
    id: "budgets",
    title: "Budgets",
    description: "Manage spending limits",
    icon: BarChart3,
  },
  {
    id: "goals",
    title: "Goals",
    description: "Track your financial goals",
    icon: Target,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Explore financial patterns",
    icon: BarChart3,
  },
  {
    id: "ai",
    title: "AI Assistant",
    description: "Talk with Finova AI",
    icon: Bot,
  },
  {
    id: "receipts",
    title: "Receipts",
    description: "Manage your receipts",
    icon: Receipt,
  },
  {
    id: "settings",
    title: "Settings",
    description: "Customize Finova",
    icon: Settings,
  },
];

const notifications = [
  {
    id: 1,
    title: "Budget update",
    message: "Your Food & Dining budget is at 91%.",
    time: "12 min ago",
    type: "budget",
    unread: true,
  },
  {
    id: 2,
    title: "Savings progress",
    message: "Your New Laptop goal reached 62%.",
    time: "1 hour ago",
    type: "goal",
    unread: true,
  },
  {
    id: 3,
    title: "Finova AI insight",
    message: "You could reduce spending by reviewing small purchases.",
    time: "3 hours ago",
    type: "ai",
    unread: true,
  },
];

function TopBar({ onNavigate = () => {} }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notificationItems, setNotificationItems] =
    useState(notifications);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notificationItems.filter(
    (item) => item.unread
  ).length;

  const filteredSearch = search
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : searchItems;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const navigate = (page) => {
    onNavigate(page);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    setSearch("");
  };

  const openSearch = () => {
    setSearchOpen(true);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const openNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    setSearchOpen(false);
    setProfileOpen(false);
  };

  const openProfile = () => {
    setProfileOpen((prev) => !prev);
    setSearchOpen(false);
    setNotificationsOpen(false);
  };

  const markAllRead = () => {
    setNotificationItems((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const getNotificationIcon = (type) => {
    if (type === "budget") {
      return BarChart3;
    }

    if (type === "goal") {
      return Target;
    }

    return Sparkles;
  };

  return (
    <>
      {/* Top Bar */}
      <header className="relative z-50">
        <div className="glass glass-glow flex min-h-[64px] items-center gap-2 rounded-2xl px-3 py-2 sm:gap-3 sm:px-4">

          {/* Search */}
          <div
            ref={searchRef}
            className="relative min-w-0 flex-1"
          >
            <button
              onClick={openSearch}
              className="flex h-10 w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-left transition hover:border-cyan-300/15 hover:bg-white/[0.045]"
            >
              <Search className="h-4 w-4 shrink-0 text-slate-500" />

              <span className="flex-1 truncate text-xs text-slate-500 sm:text-sm">
                Search Finova...
              </span>

              <span className="hidden rounded-md border border-white/[0.08] bg-white/[0.035] px-1.5 py-0.5 text-[9px] text-slate-500 md:inline">
                Ctrl K
              </span>
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0a1c31]/95 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="border-b border-white/[0.07] p-2">
                    <div className="flex items-center gap-2 rounded-xl border border-cyan-300/10 bg-white/[0.025] px-3">
                      <Search className="h-4 w-4 text-cyan-300" />

                      <input
                        autoFocus
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                        placeholder="Search pages, modules..."
                        className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      />

                      <button
                        onClick={() => {
                          setSearch("");
                          setSearchOpen(false);
                        }}
                        className="text-slate-500 transition hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto p-2">
                    {filteredSearch.length > 0 ? (
                      <>
                        <p className="px-2 pb-2 pt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                          Finova modules
                        </p>

                        <div className="space-y-1">
                          {filteredSearch.map((item) => {
                            const Icon = item.icon;

                            return (
                              <button
                                key={item.id}
                                onClick={() =>
                                  navigate(item.id)
                                }
                                className="group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-white/[0.055]"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.07]">
                                  <Icon className="h-4 w-4 text-cyan-300" />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-medium text-slate-200 group-hover:text-white">
                                    {item.title}
                                  </p>

                                  <p className="mt-0.5 truncate text-[10px] text-slate-500">
                                    {item.description}
                                  </p>
                                </div>

                                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-cyan-300" />
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <Search className="mx-auto h-6 w-6 text-slate-600" />

                        <p className="mt-2 text-xs text-slate-400">
                          No Finova modules found
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date */}
          <div className="hidden shrink-0 text-right xl:block">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Today
            </p>

            <p className="mt-0.5 text-xs font-medium text-slate-300">
              19 September 2026
            </p>
          </div>

          {/* AI Button */}
          <button
            onClick={() => navigate("ai")}
            className="hidden h-10 shrink-0 items-center gap-2 rounded-xl border border-violet-300/15 bg-violet-400/[0.07] px-3 text-xs font-medium text-violet-200 transition hover:border-violet-300/25 hover:bg-violet-400/[0.12] sm:flex"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden md:inline">
              Ask Finova
            </span>
          </button>

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative shrink-0"
          >
            <button
              onClick={openNotifications}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-400 transition hover:border-cyan-300/15 hover:bg-white/[0.05] hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />

              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  className="absolute right-0 top-[calc(100%+10px)] w-[calc(100vw-32px)] max-w-[370px] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0a1c31]/95 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Notifications
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {unreadCount} unread
                      </p>
                    </div>

                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1.5 text-[10px] font-medium text-cyan-300 transition hover:text-cyan-200"
                      >
                        <CheckCheck className="h-3.5 w-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[360px] overflow-y-auto p-2">
                    {notificationItems.map((item) => {
                      const Icon = getNotificationIcon(
                        item.type
                      );

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setNotificationItems((prev) =>
                              prev.map((notification) =>
                                notification.id === item.id
                                  ? {
                                      ...notification,
                                      unread: false,
                                    }
                                  : notification
                              )
                            );
                          }}
                          className={`flex w-full gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.05] ${
                            item.unread
                              ? "bg-cyan-400/[0.025]"
                              : ""
                          }`}
                        >
                          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.07]">
                            <Icon className="h-4 w-4 text-cyan-300" />

                            {item.unread && (
                              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-slate-200">
                              {item.title}
                            </p>

                            <p className="mt-1 text-[10px] leading-4 text-slate-500">
                              {item.message}
                            </p>

                            <p className="mt-1.5 text-[9px] text-slate-600">
                              {item.time}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative shrink-0"
          >
            <button
              onClick={openProfile}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-1.5 pr-2 transition hover:border-cyan-300/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-400/20 text-[10px] font-bold text-white">
                SH
              </div>

              <span className="hidden max-w-[90px] truncate text-xs font-medium text-slate-300 sm:block">
                Supriyo
              </span>

              <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0a1c31]/95 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="border-b border-white/[0.07] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 text-sm font-bold text-white">
                        SH
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          Supriyo Hazra
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Personal account
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => navigate("dashboard")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <LayoutDashboard className="h-4 w-4 text-slate-500" />
                      Dashboard
                    </button>

                    <button
                      onClick={() => navigate("settings")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <Settings className="h-4 w-4 text-slate-500" />
                      Settings
                    </button>

                    <button
                      onClick={() => navigate("ai")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <Bot className="h-4 w-4 text-slate-500" />
                      Finova AI
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}

export default TopBar;