import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "./actions";

interface AuthCardProps {
  mode: "login" | "signup";
  error?: string;
}

export function AuthCard({ mode, error }: AuthCardProps) {
  const isSignup = mode === "signup";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isSignup ? "Create your workspace" : "Welcome back"}</CardTitle>
        <CardDescription>
          {isSignup
            ? "Start managing sponsors, contacts, and AI outreach in one place."
            : "Sign in to continue your sponsorship pipeline."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        <form action={isSignup ? signUp : signIn} className="space-y-4">
          {isSignup ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" name="fullName" autoComplete="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization</Label>
                <Input id="organizationName" name="organizationName" autoComplete="organization" required />
              </div>
            </>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} required />
          </div>
          <Button className="w-full" type="submit">
            {isSignup ? "Create account" : "Sign in"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "New to SponsorFlow?"}{" "}
          <Link className="font-medium text-foreground underline-offset-4 hover:underline" href={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
