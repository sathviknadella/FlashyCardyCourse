import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDecksByUser } from "@/db/queries/decks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userDecks = await getDecksByUser(userId);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your flashcard decks</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/decks/new">
              <Plus className="w-4 h-4 mr-2" />
              New Deck
            </Link>
          </Button>
        </div>

        {userDecks.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-16 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-foreground">No decks yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first flashcard deck to get started.
              </p>
              <Button asChild>
                <Link href="/dashboard/decks/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Deck
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDecks.map((deck) => (
              <Link key={deck.id} href={`/decks/${deck.id}`}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="truncate">{deck.name}</CardTitle>
                    {deck.description && (
                      <CardDescription className="line-clamp-2">
                        {deck.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">
                      Updated {new Date(deck.updatedAt).toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
