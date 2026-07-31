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

interface NavItem {
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
];

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    address: string;
    profilePhoto: string;
    createdAt: string;
    updatedAt: string;
  };
};
type NavbarProps = {
  user?: IUser | null;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User logged out successfully");
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            N
          </span>
          <span>NavUI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.to} variant="ghost" size="sm" asChild>
              <Link href={item.to}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Right side: user dropdown + mobile menu */}
        <div className="flex items-center gap-2">
          {/* <div className="flex items-center gap-2"> */}
          {user?.data ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-full px-2 md:px-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.data?.profilePhoto}
                        alt={user?.data?.name || "User avatar"}
                      />
                      <AvatarFallback className="text-xs">
                        {user?.data?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="hidden max-w-[8rem] truncate md:inline">
                      {user?.data?.name || "Account"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.data?.name || "Horidas Sarker"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.data?.email || "horidas123@gmail.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={async () => {
                      await handleLogout("logout");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>

              {/* <Button asChild>
                <Link href="/register">Register</Link>
              </Button> */}
            </div>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold tracking-tight"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    N
                  </span>
                  <span>NavUI</span>
                </Link>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <SheetClose key={item.to} asChild>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link href={item.to}>{item.label}</Link>
                      </Button>
                    </SheetClose>
                  ))}
                </nav>

                {!user && (
                  <div className="mt-4 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>

                    <SheetClose asChild>
                      <Button asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          {/* </div> */}
        </div>
      </div>
    </header>
  );
}
