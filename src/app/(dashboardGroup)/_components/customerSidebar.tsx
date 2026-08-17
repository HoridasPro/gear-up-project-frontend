"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, CreditCard, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function CustomerSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "text-blue-400",
      exact: true,
    },
    {
      title: "My Rentals",
      href: "/dashboard/my-rentals",
      icon: Package,
      color: "text-indigo-400",
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
      color: "text-emerald-400",
    },
    {
      title: "My Profile",
      href: "/profile",
      icon: User,  
      color: "text-sky-400",
    },
  ];

  return (
    <Sidebar className="sticky top-16 h-[calc(100vh-4rem)] border-r border-b mb-14 border-slate-800/60 bg-[#0b0f19]/90 text-slate-100 backdrop-blur-2xl">
      {/* Header */}
      <SidebarHeader className="border-b border-slate-800 bg-[#131f33] px-5 ml-4">
        <h2 className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
          GearUp
        </h2>
        <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
          Customer Dashboard
        </p>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto bg-[#0b0f19] px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-slate-800/90 text-white font-semibold border-l-4 border-blue-500 shadow-lg shadow-blue-500/10"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white active:bg-slate-800"
                    }`}
                  >
                    <Link href={item.href}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
