import type { Transaction } from "@/domain/transaction";
import { mockTransactions } from "@/lib/mock/mockTransactions";

let data: Transaction[] = [...mockTransactions];

export function listTransactions(): Transaction[] {
  return data;
}

export function addTransaction(tx: Transaction): void {
  data = [tx, ...data];
}

export function deleteTransaction(id: string): void {
  data = data.filter((tx) => tx.id !== id);
}

export function togglePaid(id: string): void {
  data = data.map((t) =>
    t.id === id ? { ...t, isPaid: !(t.isPaid ?? false) } : t,
  );
}
