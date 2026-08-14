import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProviderSidebar from "./_components/providerSidebar";
import { getMe } from "@/server/getMe";
import CustomerSidebar from "./_components/customerSidebar";
import AdminSidebar from "./_components/adminSidebar";
import { IUser } from "@/type/type-gear";
import "@/app/globals.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser = await getMe();
  const dashboardTitle =
    user?.data?.role === "CUSTOMER"
      ? "Customer Dashboard"
      : user?.data?.role === "PROVIDER"
        ? "Provider Dashboard"
        : user?.data?.role === "ADMIN"
          ? "Admin Dashboard"
          : "Dashboard";
  return (
    <div className={cn("min-h-screen antialiased")}>
      <SidebarProvider>
        {user?.data?.role === "CUSTOMER" && <CustomerSidebar />}

        {user?.data?.role === "PROVIDER" && <ProviderSidebar />}

        {user?.data?.role === "ADMIN" && <AdminSidebar />}

        <main className="flex-1">
          <div className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-800/80 bg-[#0b0f19]/80 px-6 shadow-sm">
            <SidebarTrigger />

            <h1 className="ml-4 text-xl font-bold text-white">
              {dashboardTitle}
            </h1>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
