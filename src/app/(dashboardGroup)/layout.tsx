import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProviderSidebar from "./_components/providerSidebar";
import { getMe } from "@/server/getMe";
import CustomerSidebar from "./_components/customerSidebar";
import AdminSidebar from "./_components/adminSidebar";
import { IUser } from "@/type/type-gear";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser = await getMe();
  return (
    <div className={cn("min-h-screen bg-slate-100 antialiased")}>
      <SidebarProvider>
        {user?.data?.role === "CUSTOMER" && <CustomerSidebar />}

        {user?.data?.role === "PROVIDER" && <ProviderSidebar />}

        {user?.data?.role === "ADMIN" && <AdminSidebar />}

        <main className="flex-1">
          <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-6 shadow-sm">
            <SidebarTrigger />

            <h1 className="ml-4 text-xl font-bold text-slate-800">Dashboard</h1>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
