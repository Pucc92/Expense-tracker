import type { Transaction } from "@/domain/transaction";
import { mockTransactions } from "@/lib/mock/mockTransactions";

let data: Transaction[] = [...mockTransactions];

export function listTransactions(): Transaction[] {
  return data;
}

export function addTransaction(tx: Transaction): void {
  data = [tx, ...data];
}
