import {
  Bell,
  ChevronRight,
  Lock,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your account preferences and security settings.
          </p>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131f33] shadow-xl shadow-black/40">
            <div className="border-b border-slate-800/80 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-white">Account</h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage your personal account information.
              </p>
            </div>

            <div className="divide-y divide-slate-800/60">
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-800/40 sm:px-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">
                    <User className="h-5 w-5 text-sky-400" />
                  </div>

                  <div>
                    <p className="font-medium text-slate-200">
                      Profile Information
                    </p>

                    <p className="text-sm text-slate-400">
                      Update your name, address and profile photo
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-slate-500" />
              </Link>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131f33] shadow-xl shadow-black/40">
            <div className="border-b border-slate-800/80 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-white">Security</h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage your password and account security.
              </p>
            </div>

            <div className="divide-y divide-slate-800/60">
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-800/40 sm:px-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                    <Lock className="h-5 w-5 text-violet-400" />
                  </div>

                  <div>
                    <p className="font-medium text-slate-200">
                      Change Password
                    </p>

                    <p className="text-sm text-slate-400">
                      Update your account password
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-slate-500" />
              </Link>

              <div className="flex items-center justify-between px-5 py-4 sm:px-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="font-medium text-slate-200">
                      Account Security
                    </p>

                    <p className="text-sm text-slate-400">
                      Your account is protected with authentication
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Protected
                </span>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131f33] shadow-xl shadow-black/40">
            <div className="border-b border-slate-800/80 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-white">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Choose which notifications you want to receive.
              </p>
            </div>

            <div className="divide-y divide-slate-800/60">
              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                    <Bell className="h-5 w-5 text-amber-400" />
                  </div>

                  <div>
                    <p className="font-medium text-slate-200">
                      Rental Notifications
                    </p>

                    <p className="text-sm text-slate-400">
                      Receive updates about your rental orders
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 cursor-pointer rounded accent-blue-600"
                />
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div>
                  <p className="font-medium text-slate-200">
                    Payment Notifications
                  </p>

                  <p className="text-sm text-slate-400">
                    Receive notifications about payments
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 cursor-pointer rounded accent-blue-600"
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-red-900/40 bg-[#131f33] shadow-xl shadow-black/40">
            <div className="border-b border-red-900/30 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-red-400">
                Danger Zone
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                These actions can permanently affect your account.
              </p>
            </div>

            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-medium text-slate-200">Delete Account</p>

                <p className="text-sm text-slate-400">
                  Permanently delete your GearUp account and data.
                </p>
              </div>

              <Link
                href="/"
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
