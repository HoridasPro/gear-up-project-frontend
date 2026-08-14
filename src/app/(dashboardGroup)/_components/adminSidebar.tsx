// import Link from "next/link";
// import {
//   LayoutDashboard,
//   Users,
//   Package,
//   ShoppingCart,
//   CreditCard,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// export default function AdminSidebar() {
//   return (
//     <Sidebar className="border-r border-slate-800/80 bg-slate-900/95 text-slate-100 backdrop-blur-xl">
//       {/* Header */}
//       <SidebarHeader className="mt-6 border-b border-slate-800/80 px-6 py-5">
//         <h2 className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
//           GearUp
//         </h2>
//         <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
//           Admin Dashboard
//         </p>
//       </SidebarHeader>

//       {/* Content */}
//       <SidebarContent className="px-3 py-4">
//         <SidebarGroup>
//           <SidebarMenu className="space-y-1.5">
//             {/* Dashboard Link */}
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/80 hover:text-white active:bg-slate-800"
//               >
//                 <Link href="/admin-dashboard">
//                   <LayoutDashboard className="h-5 w-5 text-blue-400" />
//                   <span>Dashboard</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>

//             {/* All Users Link */}
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/80 hover:text-white active:bg-slate-800"
//               >
//                 <Link href="/admin-dashboard/users">
//                   <Users className="h-5 w-5 text-indigo-400" />
//                   <span>All Users</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>

//             {/* User Management Link */}
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/80 hover:text-white active:bg-slate-800"
//               >
//                 <Link href="/admin-dashboard/user-management">
//                   <Package className="h-5 w-5 text-purple-400" />
//                   <span>User Management</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>

//             {/* Rental Orders Link */}
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/80 hover:text-white active:bg-slate-800"
//               >
//                 <Link href="/admin-dashboard/rental-orders">
//                   <ShoppingCart className="h-5 w-5 text-amber-400" />
//                   <span>Rental Orders</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>

//             {/* All Gears Link */}
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/80 hover:text-white active:bg-slate-800"
//               >
//                 <Link href="/admin-dashboard/all-gears">
//                   <CreditCard className="h-5 w-5 text-emerald-400" />
//                   <span>All Gears</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
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

export default function AdminSidebar() {
  return (
    <Sidebar className="sticky top-16 h-[calc(100vh-4rem)] border-r border-b mb-6 border-slate-800/60 bg-[#0b0f19]/90 text-slate-100 backdrop-blur-2xl">
      {/* Header */}
      <SidebarHeader className="border-b border-slate-800/60 px-5 ml-4">
        <h2 className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
          GearUp
        </h2>
        <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
          Admin Dashboard
        </p>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1.5">
            {/* Dashboard Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white active:bg-slate-800/80"
              >
                <Link href="/admin-dashboard">
                  <LayoutDashboard className="h-5 w-5 text-blue-400" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* All Users Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white active:bg-slate-800/80"
              >
                <Link href="/admin-dashboard/users">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <span>All Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* User Management Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white active:bg-slate-800/80"
              >
                <Link href="/admin-dashboard/user-management">
                  <Package className="h-5 w-5 text-purple-400" />
                  <span>User Management</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Rental Orders Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white active:bg-slate-800/80"
              >
                <Link href="/admin-dashboard/rental-orders">
                  <ShoppingCart className="h-5 w-5 text-amber-400" />
                  <span>Rental Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* All Gears Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white active:bg-slate-800/80"
              >
                <Link href="/admin-dashboard/all-gears">
                  <CreditCard className="h-5 w-5 text-emerald-400" />
                  <span>All Gears</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
