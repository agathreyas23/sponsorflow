import { AuthCard } from "../auth-card";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="soft-grid flex min-h-screen items-center justify-center p-6">
      <AuthCard mode="login" error={params.error} />
    </main>
  );
}
