"use client";
import Link from "next/link";
import {
  Menu,
  User,
  Settings,
  CreditCard,
  LifeBuoy,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/server/logout";
import { IUser } from "@/type/type-gear";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Gears", to: "/gears" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
];

type NavbarProps = {
  user?: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleDashboard = () => {
    if (user?.data?.role === "ADMIN") {
      router.push("/admin-dashboard");
    } else if (user?.data?.role === "PROVIDER") {
      router.push("/provider-dashboard");
    } else if (user?.data?.role === "CUSTOMER") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const handleLogout = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User logged out successfully");
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-500/30 bg-[#0a0d14]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/40 text-sky-400 font-extrabold shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            N
          </span>
          <span className="font-extrabold text-white">
            Nav<span className="text-sky-400">UI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.to}
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-colors"
            >
              <Link href={item.to}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {user?.data ? (
            <>
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <button className="gap-2 rounded-full bg-[#111622]/60 px-2 md:px-3 text-slate-300 hover:bg-sky-500/10 hover:text-white transition-all shadow-[0_0_15px_rgba(2,132,199,0.15)]">
                          <Avatar className="h-8 w-8 border border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                            <AvatarImage
                              src={user?.data?.profilePhoto}
                              alt={user?.data?.name || "User avatar"}
                            />

                            <AvatarFallback className="bg-sky-500/10 text-sky-400 text-xs font-bold">
                              {user?.data?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>

                    <TooltipContent
                      side="bottom"
                      className="rounded-lg border border-sky-500/30 bg-[#111622] text-white shadow-[0_0_20px_rgba(2,132,199,0.2)]"
                    >
                      {user?.data?.name || "Account"}
                    </TooltipContent>
                  </Tooltip>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-2xl border border-sky-500/30 bg-[#111622]/95 p-1.5 text-slate-300 shadow-[0_0_35px_rgba(2,132,199,0.15)] backdrop-blur-xl"
                  >
                    <DropdownMenuLabel className="font-normal px-2 py-1.5">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none text-white">
                          {user?.data?.name || "Horidas Sarker"}
                        </p>

                        <p className="text-xs leading-none text-slate-400 truncate">
                          {user?.data?.email || "horidas123@gmail.com"}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-sky-500/20 my-1" />

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={handleDashboard}
                        className="cursor-pointer rounded-lg focus:bg-sky-500/15 focus:text-sky-400 transition-colors"
                      >
                        <User className="mr-2 h-4 w-4 text-sky-400" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-sky-500/15 focus:text-sky-400 transition-colors">
                        <User className="mr-2 h-4 w-4 text-sky-400" />
                        <span>Profile</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-sky-500/15 focus:text-sky-400 transition-colors">
                        <Settings className="mr-2 h-4 w-4 text-sky-400" />
                        <span>Settings</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-sky-500/15 focus:text-sky-400 transition-colors">
                        <CreditCard className="mr-2 h-4 w-4 text-sky-400" />
                        <span>Billing</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-sky-500/20 my-1" />

                    <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-sky-500/15 focus:text-sky-400 transition-colors">
                      <LifeBuoy className="mr-2 h-4 w-4 text-sky-400" />
                      <span>Support</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-sky-500/20 my-1" />

                    <DropdownMenuItem
                      onClick={async () => {
                        await handleLogout("logout");
                      }}
                      className="cursor-pointer rounded-lg text-rose-400 focus:bg-rose-500/15 focus:text-rose-300 transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <button className="btn-cyber">
                <Link href="/login">Login</Link>
              </button>
            </div>
          )}

          {/* Mobile Menu Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full border border-sky-500/30 bg-[#111622]/60 text-slate-300 hover:bg-sky-500/10 hover:text-sky-400"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 border-l border-sky-500/30 bg-[#0a0d14]/95 text-white backdrop-blur-2xl p-6"
            >
              <div className="flex flex-col gap-6 pt-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold tracking-tight"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/40 text-sky-400 font-extrabold shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                    N
                  </span>
                  <span>
                    Nav<span className="text-sky-400">UI</span>
                  </span>
                </Link>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <SheetClose key={item.to} asChild>
                      <Button
                        variant="ghost"
                        className="justify-start text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 rounded-xl"
                        asChild
                      >
                        <Link href={item.to}>{item.label}</Link>
                      </Button>
                    </SheetClose>
                  ))}
                </nav>

                {/* {!user && (
                  <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-sky-500/20">
                    <SheetClose asChild>
                      <Button variant="outline" className="btn-cyber" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>

                    <SheetClose asChild>
                      <Button className="btn-cyber" asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )} */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
