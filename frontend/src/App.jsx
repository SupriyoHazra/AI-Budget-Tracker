import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BackgroundAtmosphere from "./components/BackgroundAtmosphere";

import AIAssistantPage from "./pages/AIAssistantPage";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import BudgetsPage from "./pages/BudgetsPage";
import GoalsPage from "./pages/GoalsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import SettingsPage from "./pages/SettingsPage";

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

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const [isDesktop, setIsDesktop] = useState(() => {
    return window.innerWidth >= 1024;
  });

  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
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

  const currentPage = pages[activePage];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020817] text-white">
      <BackgroundAtmosphere />

      <div className="relative z-10">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activePage={activePage}
          onNavigate={handleNavigate}
        />

        <motion.section
          animate={{
            marginLeft: isDesktop
              ? collapsed
                ? 88
                : 270
              : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="min-h-screen"
        >
          <div className="px-4 pt-5 sm:px-6 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1700px]">
              <TopBar />
            </div>
          </div>

          <main className="px-4 pb-12 pt-1 sm:px-6 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1700px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
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

{![
  "dashboard",
  "expenses",
  "income",
  "budgets",
  "goals",
  "analytics",
  "ai",
  "receipts",
  "settings",
].includes(activePage) && (
                    <PlaceholderPage
                      title={currentPage.title}
                      description={currentPage.description}
                      icon={currentPage.icon}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </motion.section>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-[#020817]/20 to-transparent" />
    </main>
  );
}

export default App;