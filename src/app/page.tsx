import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AuthButtons } from "@/components/auth-buttons";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">FlashyCardy</h1>
        <p className="text-xl text-muted-foreground">
          Your Personal Flashcard Platform
        </p>
        <div className="flex gap-4">
          <AuthButtons />
        </div>
      </div>
    </main>
  );
}
