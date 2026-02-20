import type { Transaction } from "@/domain/transaction";

export function totalAmountCents(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.money.amountCents, 0);
}

export function filterByCategory(
  transactions: Transaction[],
  categoryId: string,
): Transaction[] {
  return transactions.filter((t) => t.categoryId === categoryId);
}
