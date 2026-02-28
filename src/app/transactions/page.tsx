"use client";
import { useState } from "react";
import { getCategoryName } from "@/features/categories/category.utils";
import { formatMoney } from "@/domain/money";
import type { Transaction } from "@/domain/transaction";
import { TransactionForm } from "@/features/transactions/TransactionForm";
import {
  addTransaction,
  deleteTransaction,
  listTransactions,
  togglePaid,
} from "@/features/transactions/transactions.repository";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    listTransactions(),
  );

  function handleCreate(tx: Transaction) {
    addTransaction(tx); // aggiorna “storage” in memory
    setTransactions(listTransactions()); // ricarica nello state
  }

  function handleDelete(id: string) {
    deleteTransaction(id);
    setTransactions(listTransactions());
  }
  function handleTogglePaid(id: string) {
    togglePaid(id);
    setTransactions(listTransactions());
    console.log("toggle paid");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <TransactionForm onCreate={handleCreate} />
        <table className="w-full text-sm">
          <thead className="bg-gray-600">
            <tr className="text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3">{getCategoryName(t.categoryId)}</td>
                <td className="p-3">{formatMoney(t.money)}</td>
                <td className="p-3">
                  <button
                    type="button"
                    className={`rounded px-3 py-1 text-white ${
                      t.isPaid
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-red-600 hover:bg-red-500"
                    }`}
                    onClick={() => handleTogglePaid(t.id)}
                  >
                    {t.isPaid ? "Paid" : "Unpaid"}
                  </button>
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-500"
                    onClick={() => {
                      if (confirm("Eliminare questa transazione?"))
                        handleDelete(t.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && (
        <p className="text-center text-gray-500">
          Nessuna transazione. Aggiungine una dal form.
        </p>
      )}
    </div>
  );
}
