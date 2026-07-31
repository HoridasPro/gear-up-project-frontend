import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("h-full", "antialiased", "font-mono")}>{children}</div>
  );
}
