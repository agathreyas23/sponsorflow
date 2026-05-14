import Link from "next/link";
import { Bot, Building2, ContactRound, LayoutDashboard, Search, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Find Sponsors", icon: Search },
  { href: "/sponsors", label: "Sponsors", icon: Building2 },
  { href: "/contacts", label: "Contacts", icon: ContactRound },
  { href: "/ai", label: "AI Generator", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden border-r bg-card/90 shadow-sm md:flex md:w-64 md:flex-col", className)}>
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
          <Bot className="size-4" />
        </div>
        <span className="font-semibold">SponsorFlow</span>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
