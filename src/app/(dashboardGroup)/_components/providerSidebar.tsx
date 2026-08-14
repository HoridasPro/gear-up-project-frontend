import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function ProviderSidebar() {
  return (
    <Sidebar className="sticky top-16 h-[calc(100vh-4rem)] border-r border-b mb-8 border-slate-800/60 bg-[#0b0f19]/90 text-slate-100 backdrop-blur-2xl">
      {/* Header */}
      <SidebarHeader className="border-b border-slate-800/60 bg-[#0b0f19] px-5 ml-4 ">
        <h2 className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
          GearUp
        </h2>
        <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
          Provider Dashboard
        </p>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto bg-[#0b0f19] px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1.5">
            {/* Dashboard Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/provider-dashboard">
                  <LayoutDashboard className="h-5 w-5 text-blue-400" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* My Gears Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/provider-dashboard/my-gears">
                  <Package className="h-5 w-5 text-indigo-400" />
                  <span>My Gears</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Add Gear Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/provider-dashboard/gear/new">
                  <PlusCircle className="h-5 w-5 text-emerald-400" />
                  <span>Add Gear</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Inventory Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/provider-dashboard/inventory">
                  <PlusCircle className="h-5 w-5 text-purple-400" />
                  <span>Inventory</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Orders Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/provider-dashboard/orders">
                  <ShoppingCart className="h-5 w-5 text-amber-400" />
                  <span>Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Reviews Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/provider-dashboard/reviews">
                  <ShoppingCart className="h-5 w-5 text-rose-400" />
                  <span>Reviews</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
              >
                <Link href="/profile">
                  <ShoppingCart className="h-5 w-5 text-rose-400" />
                  <span>My Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
