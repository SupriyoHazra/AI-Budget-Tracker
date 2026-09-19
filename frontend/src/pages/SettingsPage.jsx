import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Sparkles,
  ShieldCheck,
  Database,
  Palette,
  ChevronRight,
  Check,
  Moon,
  IndianRupee,
  Mail,
  Smartphone,
  Lock,
  Download,
  Trash2,
} from "lucide-react";

function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklySummary: true,
    aiInsights: true,
    smartRecommendations: true,
    twoFactor: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-5 pb-8 sm:space-y-6">

      {/* Header */}
      <section className="glass glass-glow relative overflow-hidden rounded-3xl p-5 sm:p-7">
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[110px]" />

        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[110px]" />

        <div className="relative flex items-start gap-4">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10"
          >
            <Settings className="h-7 w-7 text-cyan-300" />
          </motion.div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Settings
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
              Customize your Finova experience, notifications, AI features
              and account preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <SectionHeader
          icon={User}
          title="Profile"
          description="Your personal Finova profile"
        />

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-violet-400/20 text-xl font-bold text-white">
              SH
            </div>

            <div>
              <p className="font-semibold text-white">
                Supriyo Hazra
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Finova personal account
              </p>
            </div>
          </div>

          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Currency
              </p>

              <div className="mt-2 flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-cyan-300" />

                <span className="text-sm font-medium text-white">
                  Indian Rupee (₹)
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Account
              </p>

              <div className="mt-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />

                <span className="text-sm font-medium text-white">
                  Personal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <SectionHeader
          icon={Palette}
          title="Preferences"
          description="Control how Finova looks and behaves"
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          <PreferenceCard
            icon={Moon}
            title="Appearance"
            description="Cinematic dark interface"
            value="Dark"
          />

          <PreferenceCard
            icon={IndianRupee}
            title="Currency"
            description="Default display currency"
            value="INR ₹"
          />

        </div>
      </section>

      {/* Notifications */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <SectionHeader
          icon={Bell}
          title="Notifications"
          description="Choose which financial updates you receive"
        />

        <div className="mt-5 divide-y divide-white/[0.06]">
          <ToggleRow
            icon={Mail}
            title="Email notifications"
            description="Receive important account and finance updates"
            enabled={settings.emailNotifications}
            onToggle={() => toggleSetting("emailNotifications")}
          />

          <ToggleRow
            icon={Smartphone}
            title="Push notifications"
            description="Get alerts directly on your device"
            enabled={settings.pushNotifications}
            onToggle={() => toggleSetting("pushNotifications")}
          />

          <ToggleRow
            icon={Database}
            title="Weekly financial summary"
            description="Receive a weekly overview of your activity"
            enabled={settings.weeklySummary}
            onToggle={() => toggleSetting("weeklySummary")}
          />
        </div>
      </section>

      {/* AI */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <SectionHeader
          icon={Sparkles}
          title="Finova AI"
          description="Configure your personal financial intelligence"
        />

        <div className="mt-5 divide-y divide-white/[0.06]">
          <ToggleRow
            icon={Sparkles}
            title="AI insights"
            description="Allow Finova to generate financial insights"
            enabled={settings.aiInsights}
            onToggle={() => toggleSetting("aiInsights")}
          />

          <ToggleRow
            icon={ChevronRight}
            title="Smart recommendations"
            description="Receive personalized suggestions based on your activity"
            enabled={settings.smartRecommendations}
            onToggle={() => toggleSetting("smartRecommendations")}
          />
        </div>
      </section>

      {/* Security */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <SectionHeader
          icon={ShieldCheck}
          title="Security"
          description="Protect your Finova account"
        />

        <div className="mt-5 divide-y divide-white/[0.06]">
          <ToggleRow
            icon={Lock}
            title="Two-factor authentication"
            description="Add an additional layer of account protection"
            enabled={settings.twoFactor}
            onToggle={() => toggleSetting("twoFactor")}
          />

          <ActionRow
            icon={Lock}
            title="Change password"
            description="Update your account password"
            action="Change"
          />
        </div>
      </section>

      {/* Data */}
      <section className="glass rounded-3xl p-5 sm:p-6">
        <SectionHeader
          icon={Database}
          title="Data management"
          description="Manage your Finova financial data"
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <DataAction
            icon={Download}
            title="Export data"
            description="Download your financial data"
          />

          <DataAction
            icon={Trash2}
            title="Delete data"
            description="Permanently remove your Finova data"
            danger
          />
        </div>
      </section>

      {/* Save */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl transition ${
            saved
              ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-200"
              : "border-cyan-300/20 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/35 hover:bg-cyan-400/15"
          }`}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Changes Saved
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Changes
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.035]">
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white sm:text-base">
          {title}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function PreferenceCard({
  icon: Icon,
  title,
  description,
  value,
}) {
  return (
    <button className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition hover:border-cyan-300/15 hover:bg-white/[0.05]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.07]">
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-slate-500">
          {description}
        </p>
      </div>

      <span className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[10px] font-semibold text-slate-300">
        {value}
      </span>
    </button>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.025] sm:flex">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        onClick={onToggle}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
          enabled
            ? "border-cyan-300/25 bg-cyan-400/20"
            : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <motion.span
          animate={{
            x: enabled ? 20 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`absolute left-0 top-1 h-4 w-4 rounded-full ${
            enabled
              ? "bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.45)]"
              : "bg-slate-500"
          }`}
        />
      </button>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.025] sm:flex">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-slate-500">
          {description}
        </p>
      </div>

      <button className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-300/15 hover:text-white">
        {action}
      </button>
    </div>
  );
}

function DataAction({
  icon: Icon,
  title,
  description,
  danger = false,
}) {
  return (
    <button
      className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
        danger
          ? "border-rose-300/10 bg-rose-400/[0.025] hover:border-rose-300/20 hover:bg-rose-400/[0.05]"
          : "border-white/[0.07] bg-white/[0.025] hover:border-cyan-300/15 hover:bg-white/[0.05]"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          danger ? "bg-rose-400/[0.07]" : "bg-cyan-400/[0.07]"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${
            danger ? "text-rose-300" : "text-cyan-300"
          }`}
        />
      </div>

      <div>
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-slate-500">
          {description}
        </p>
      </div>
    </button>
  );
}

export default SettingsPage;