import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <Button asChild className="md:hidden" variant="ghost" size="icon" aria-label="Open navigation">
          <Link href="/dashboard">
            <Menu />
          </Link>
        </Button>
        <div className="relative hidden w-80 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search sponsors, contacts, activity..." />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/discover">Find sponsors</Link>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link href="/ai">Generate outreach</Link>
        </Button>
        <ThemeToggle />
        <form action={signOut}>
          <Button variant="ghost" size="sm" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
