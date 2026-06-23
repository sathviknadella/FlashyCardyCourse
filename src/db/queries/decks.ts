import { db } from "@/db";
import { decks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getDecksByUser(userId: string) {
  return db.select().from(decks).where(eq(decks.userId, userId));
}
