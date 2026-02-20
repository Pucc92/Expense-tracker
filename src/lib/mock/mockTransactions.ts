import type { Transaction } from "@/domain/transaction";
import { money } from "@/domain/money";

export const mockTransactions: Transaction[] = [
  {
    id: "tx_1",
    date: "2026-02-18",
    description: "Spesa supermercato",
    categoryId: "cat_food",
    money: money(4530), // €45,30
  },
  {
    id: "tx_2",
    date: "2026-02-01",
    description: "Affitto",
    categoryId: "cat_rent",
    money: money(65000), // €650,00
    dueDate: "2026-02-05",
    isPaid: true,
  },
];
