import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../db";
import { usersTable, insertUserSchema, deleteUserSchema } from "./users.schema";

export async function getAllUsers() {
  return await db.select().from(usersTable);
}

export async function createNewUser(data: z.infer<typeof insertUserSchema>) {
  const validated = insertUserSchema.parse(data);
  return await db.insert(usersTable).values(validated).returning();
}

export async function deleteUser(data: z.infer<typeof deleteUserSchema>) {
  return await db.delete(usersTable).where(eq(usersTable.id, data.id));
}
