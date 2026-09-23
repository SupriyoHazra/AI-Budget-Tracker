import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Upload,
  Receipt,
  ShoppingBag,
  Utensils,
  GraduationCap,
  Home,
  Coffee,
  FileText,
  CalendarDays,
  ArrowUpRight,
  X,
} from "lucide-react";
import { receiptsApi } from "../services/api";

const receipts = [
  {
    id: 1,
    merchant: "Amazon",
    category: "Shopping",
    amount: 1299,
    date: "19 Sep 2026",
    time: "2:18 PM",
    icon: ShoppingBag,
    iconClass: "text-violet-300",
    iconBg: "bg-violet-400/10",
  },
  {
    id: 2,
    merchant: "College Canteen",
    category: "Food & Dining",
    amount: 180,
    date: "19 Sep 2026",
    time: "6:42 PM",
    icon: Utensils,
    iconClass: "text-orange-300",
    iconBg: "bg-orange-400/10",
  },
  {
    id: 3,
    merchant: "College Fees",
    category: "Education",
    amount: 4500,
    date: "18 Sep 2026",
    time: "11:20 AM",
    icon: GraduationCap,
    iconClass: "text-cyan-300",
    iconBg: "bg-cyan-400/10",
  },
  {
    id: 4,
    merchant: "PG Rent",
    category: "Housing",
    amount: 7200,
    date: "18 Sep 2026",
    time: "9:00 AM",
    icon: Home,
    iconClass: "text-emerald-300",
    iconBg: "bg-emerald-400/10",
  },
  {
    id: 5,
    merchant: "Cafe Coffee Day",
    category: "Coffee",
    amount: 240,
    date: "17 Sep 2026",
    time: "5:46 PM",
    icon: Coffee,
    iconClass: "text-amber-300",
    iconBg: "bg-amber-400/10",
  },
  {
    id: 6,
    merchant: "Netflix",
    category: "Entertainment",
    amount: 649,
    date: "17 Sep 2026",
    time: "10:12 AM",
    icon: FileText,
    iconClass: "text-rose-300",
    iconBg: "bg-rose-400/10",
  },
];

const formatCurrency = (value) =>
  `₹${value.toLocaleString("en-IN")}`;

function ReceiptsPage() {
  const [receiptList, setReceiptList] = useState(receipts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    let isMounted = true;
    receiptsApi
      .getReceipts()
      .then((res) => {
        if (isMounted && res && res.receipts && res.receipts.length > 0) {
          const iconMap = {
            Shopping: ShoppingBag,
            "Food & Dining": Utensils,
            Education: GraduationCap,
            Housing: Home,
            Coffee: Coffee,
            Entertainment: FileText,
          };
          const styleMap = {
            Shopping: { iconClass: "text-violet-300", iconBg: "bg-violet-400/10" },
            "Food & Dining": { iconClass: "text-orange-300", iconBg: "bg-orange-400/10" },
            Education: { iconClass: "text-cyan-300", iconBg: "bg-cyan-400/10" },
            Housing: { iconClass: "text-emerald-300", iconBg: "bg-emerald-400/10" },
            Coffee: { iconClass: "text-amber-300", iconBg: "bg-amber-400/10" },
          };

          const formatted = res.receipts.map((r) => ({
            id: r.id,
            merchant: r.merchant,
            category: r.category,
            amount: Number(r.amount),
            date: r.date,
            time: r.time,
            icon: iconMap[r.category] || Receipt,
            iconClass: styleMap[r.category]?.iconClass || "text-cyan-300",
            iconBg: styleMap[r.category]?.iconBg || "bg-cyan-400/10",
          }));
          setReceiptList(formatted);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live receipts, using fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(receiptList.map((receipt) => receipt.category))];
  }, [receiptList]);

  const filteredReceipts = useMemo(() => {
    return receiptList.filter((receipt) => {
      const matchesSearch =
        receipt.merchant.toLowerCase().includes(search.toLowerCase()) ||
        receipt.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || receipt.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [receiptList, search, category]);

  const totalAmount = useMemo(() => {
    return receiptList.reduce((sum, receipt) => sum + receipt.amount, 0);
  }, [receiptList]);

  return (
    <div className="space-y-5 pb-8 sm:space-y-6">

      {/* Header */}
      <section className="glass glass-glow relative overflow-hidden rounded-3xl p-5 sm:p-7">
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[110px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10"
            >
              <Receipt className="h-7 w-7 text-cyan-300" />
            </motion.div>

            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Receipts
                </h1>

                <span className="rounded-full border border-cyan-300/15 bg-cyan-400/[0.07] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                  {receipts.length} stored
                </span>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Keep your purchase receipts organized and connected to your
                financial activity.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/35 hover:bg-cyan-400/15"
          >
            <Upload className="h-4 w-4" />
            Upload Receipt
          </button>
        </div>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <SummaryCard
          label="Total receipts"
          value={receipts.length}
          icon={Receipt}
          iconClass="text-cyan-300"
        />

        <SummaryCard
          label="Tracked amount"
          value={formatCurrency(totalAmount)}
          icon={FileText}
          iconClass="text-violet-300"
        />

        <SummaryCard
          label="This month"
          value="₹14,068"
          icon={CalendarDays}
          iconClass="text-emerald-300"
        />

        <SummaryCard
          label="Average receipt"
          value={formatCurrency(Math.round(totalAmount / receipts.length))}
          icon={ArrowUpRight}
          iconClass="text-amber-300"
        />
      </section>

      {/* Search + Filter */}
      <section className="glass rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search receipts..."
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/25 focus:bg-white/[0.05]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-medium transition ${
                  category === item
                    ? "border-cyan-300/25 bg-cyan-400/10 text-cyan-200"
                    : "border-white/[0.07] bg-white/[0.025] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Receipt List */}
      <section className="glass rounded-3xl p-4 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Receipt library
            </p>

            <h2 className="mt-1 text-base font-semibold text-white">
              Recent receipts
            </h2>
          </div>

          <span className="text-xs text-slate-500">
            {filteredReceipts.length} result
            {filteredReceipts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filteredReceipts.length > 0 ? (
          <div className="space-y-2">
            {filteredReceipts.map((receipt, index) => {
              const Icon = receipt.icon;

              return (
                <motion.div
                  key={receipt.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 transition hover:border-cyan-300/15 hover:bg-white/[0.05] sm:p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${receipt.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${receipt.iconClass}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {receipt.merchant}
                      </p>

                      <span className="hidden rounded-full border border-white/[0.07] bg-white/[0.025] px-2 py-0.5 text-[9px] text-slate-500 sm:inline">
                        {receipt.category}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-500">
                      {receipt.date} · {receipt.time}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {formatCurrency(receipt.amount)}
                    </p>

                    <button className="mt-1 text-[10px] font-medium text-cyan-300 opacity-0 transition group-hover:opacity-100">
                      View
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.02] px-5 text-center">
            <Search className="h-7 w-7 text-slate-600" />

            <p className="mt-3 text-sm font-medium text-slate-300">
              No receipts found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try another search term or category.
            </p>
          </div>
        )}
      </section>

      {/* Insight */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-300/10 bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.025] to-violet-400/[0.05] p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            <Receipt className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Finova receipt insight
            </p>

            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-slate-400 sm:text-sm">
              Your stored receipts currently cover major purchases such as
              education, housing, shopping and food. Keeping receipts
              organized will make future expense analysis easier.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass glass-glow relative w-full max-w-lg rounded-3xl p-5 sm:p-7"
          >
            <button
              onClick={() => setShowUpload(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
              <Upload className="h-5 w-5 text-cyan-300" />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">
              Upload a receipt
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Receipt upload and automatic OCR processing will be connected
              to the Finova backend in a later step.
            </p>

            <div className="mt-5 flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/15 bg-cyan-400/[0.025]">
              <FileText className="h-8 w-8 text-cyan-300/60" />

              <p className="mt-3 text-sm font-medium text-slate-300">
                Drop your receipt here
              </p>

              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG or PDF
              </p>

              <button
                onClick={() => setShowUpload(false)}
                className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
              >
                Choose file
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, iconClass }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-4 transition sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.035]">
          <Icon className={`h-4 w-4 ${iconClass}`} />
        </div>
      </div>

      <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
        {value}
      </p>
    </motion.div>
  );
}

export default ReceiptsPage;