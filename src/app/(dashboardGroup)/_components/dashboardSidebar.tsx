// import Link from "next/link";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   User,
//   LogOut,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// export function DashboardSidebarPage() {
//   return (
//     <Sidebar>
//       <SidebarHeader className="border-b px-6 py-5">
//         <h2 className="text-2xl font-bold text-blue-600">GearUp</h2>
//         <p className="text-sm text-gray-500">Dashboard</p>
//       </SidebarHeader>

//       <SidebarContent className="px-3 py-4">
//         <SidebarGroup>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild>
//                 <Link href="/dashboard">
//                   <LayoutDashboard className="h-5 w-5" />
//                   <span>Dashboard</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild>
//                 <Link href="/dashboard/my-rentals">
//                   <LayoutDashboard className="h-5 w-5" />
//                   <span>My Rentals</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>

//             <SidebarMenuItem>
//               <SidebarMenuButton asChild>
//                 <Link href="/dashboard/customer-profile">
//                   <Package className="h-5 w-5" />
//                   <span>Customer Profile</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild>
//                 <Link href="/dashboard/payments">
//                   <Package className="h-5 w-5" />
//                   <span>Payments</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>

//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="border-t p-4">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton>
//               <LogOut className="h-5 w-5 text-red-500" />
//               <span className="text-red-500">Logout</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
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
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-5">
        <h2 className="text-2xl font-bold text-blue-600">GearUp</h2>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/users">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/gear">
                  <Package className="h-5 w-5" />
                  <span>Gear Management</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/rentals">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Rental Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/payments">
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-red-500">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}