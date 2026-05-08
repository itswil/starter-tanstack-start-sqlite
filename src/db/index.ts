import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

export const db = drizzle(new Database(process.env.DB_FILE_NAME));
