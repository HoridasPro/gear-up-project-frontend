"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Mountain, User, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/browse" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type NavbarProps = {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
};

export function Navbar({
  isLoggedIn = false,
  userName = "Account",
  onLogout,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the user dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Mountain className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg tracking-tight">GearHub</span>
        </Link>

        {/* Center: Nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Open user menu"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="size-5" aria-hidden="true" />
                </span>
              </Button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
                >
                  <div className="border-b border-border px-3 py-2">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                  <Link
                    href="/profile"
                    role="customer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <UserCircle className="size-4" aria-hidden="true" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    role="customer"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout?.();
                    }}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-border px-4 py-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <User className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                </div>
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/profile" onClick={() => setOpen(false)}>
                    <UserCircle className="size-4" aria-hidden="true" />
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setOpen(false);
                    onLogout?.();
                  }}
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
