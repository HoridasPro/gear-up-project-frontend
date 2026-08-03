import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebarPage } from "./_components/dashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-h-screen bg-slate-100 antialiased")}>
      <SidebarProvider>
        <DashboardSidebarPage />

        <main className="flex-1">
          {/* Top Navbar */}
          <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-6 shadow-sm">
            <SidebarTrigger />

            <h1 className="ml-4 text-xl font-bold text-slate-800">Dashboard</h1>
          </div>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
