import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BackgroundAtmosphere from "./components/BackgroundAtmosphere";

import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import BudgetsPage from "./pages/BudgetsPage";
import GoalsPage from "./pages/GoalsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import PlaceholderPage from "./pages/PlaceholderPage";

import {
  BarChart3,
  Bot,
  FileText,
  Goal,
  Wallet,
  Settings,
} from "lucide-react";

const pages = {
  dashboard: {
    title: "Dashboard",
  },

  expenses: {
    title: "Expenses",
    description:
      "Track your spending, understand your habits and stay in control of every expense.",
    icon: Wallet,
  },

  income: {
    title: "Income",
    description:
      "Keep your income sources organized and monitor your cash flow.",
    icon: Wallet,
  },

  budgets: {
    title: "Budgets",
    description:
      "Create spending limits and keep every category under control.",
    icon: BarChart3,
  },

  goals: {
    title: "Goals",
    description:
      "Build meaningful financial goals and track your progress.",
    icon: Goal,
  },

  analytics: {
    title: "Analytics",
    description:
      "Explore deeper patterns across your income, expenses and savings.",
    icon: BarChart3,
  },

  ai: {
    title: "AI Assistant",
    description:
      "Talk with Finova AI and turn your financial activity into useful decisions.",
    icon: Bot,
  },

  receipts: {
    title: "Receipts",
    description:
      "Keep your financial receipts organized and searchable.",
    icon: FileText,
  },

  settings: {
    title: "Settings",
    description:
      "Customize your Finova experience, notifications, AI features and account preferences.",
    icon: Settings,
  },
};

const implementedPages = [
  "dashboard",
  "expenses",
  "income",
  "budgets",
  "goals",
  "analytics",
  "ai",
  "receipts",
  "settings",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handleNavigate = (page) => {
    if (!pages[page]) return;

    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActivePage("dashboard");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  if (!isLoggedIn) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen"
        >
          <LoginPage onLogin={handleLogin} />
        </motion.div>
      </AnimatePresence>
    );
  }

  const currentPage = pages[activePage] || pages.dashboard;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      {/* Global cinematic background */}
      <BackgroundAtmosphere />

      {/* Application shell */}
      <div className="relative z-10 min-h-screen">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activePage={activePage}
          onNavigate={handleNavigate}
        />

        <div
          className={`min-h-screen transition-[margin] duration-300 ${
            isDesktop
              ? collapsed
                ? "ml-[88px]"
                : "ml-[270px]"
              : "ml-0"
          }`}
        >
          <TopBar onNavigate={handleNavigate} />

          <main className="px-4 pb-10 pt-20 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.28,
                  ease: "easeOut",
                }}
              >
                {activePage === "dashboard" && <DashboardPage />}

                {activePage === "expenses" && <ExpensesPage />}

                {activePage === "income" && <IncomePage />}

                {activePage === "budgets" && <BudgetsPage />}

                {activePage === "goals" && <GoalsPage />}

                {activePage === "analytics" && <AnalyticsPage />}

                {activePage === "ai" && <AIAssistantPage />}

                {activePage === "receipts" && <ReceiptsPage />}

                {activePage === "settings" && <SettingsPage />}

                {!implementedPages.includes(activePage) && (
                  <PlaceholderPage
                    title={currentPage.title}
                    description={currentPage.description}
                    icon={currentPage.icon}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;