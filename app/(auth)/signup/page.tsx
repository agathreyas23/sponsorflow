import { AuthCard } from "../auth-card";

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="soft-grid flex min-h-screen items-center justify-center p-6">
      <AuthCard mode="signup" error={params.error} />
    </main>
  );
}
