// src/domain/transaction.ts
import type { Money } from "@/domain/money";
import type { CategoryId } from "@/domain/category";

export type TransactionId = string;

export type Transaction = Readonly<{
  id: TransactionId;
  userId?: string; // per ora opzionale (DB + auth arriveranno dopo)
  date: string; // ISO date string: "2026-02-20"
  description: string;
  categoryId: CategoryId;
  money: Money;

  // Scadenzario (base, per dopo):
  dueDate?: string; // ISO date string
  isPaid?: boolean;
}>;
