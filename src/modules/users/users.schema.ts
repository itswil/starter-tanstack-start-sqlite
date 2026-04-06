import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const insertUserSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().int().positive(),
  email: z.email(),
});
