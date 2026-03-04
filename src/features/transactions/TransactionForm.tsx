"use client";

import { useState } from "react";
import { parseMoney } from "@/domain/money";
import { createId } from "@/domain/ids";
import type { Transaction } from "@/domain/transaction";
import { mockCategories } from "@/lib/mock/mockCategories";
import type { TransactionInput } from "@/features/transactions/transaction.input";
import { transactionInputSchema } from "@/features/transactions/transaction.schema";
type Props = {
  onCreate: (tx: Transaction) => void;
};

export function TransactionForm({ onCreate }: Props) {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>(
    mockCategories[0]?.id ?? "",
  );
  const [amount, setAmount] = useState<string>(""); // es: "12,34"
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const input: TransactionInput = {
      date,
      description,
      categoryId,
      amount,
    };

    const result = transactionInputSchema.safeParse(input);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      setError(firstIssue?.message ?? "Input non valido");
      return;
    }

    let money;
    try {
      money = parseMoney(result.data.amount);
    } catch {
      setError("Importo non valido (es: 12,34)");
      return;
    }

    const tx: Transaction = {
      id: createId("tx"),
      date: result.data.date,
      description: result.data.description,
      categoryId: result.data.categoryId,
      money,
    };

    onCreate(tx);

    // reset form
    setCategoryId(mockCategories[0]?.id ?? "");
    setDate("");
    setDescription("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border p-4">
      <h2 className="font-semibold">Add transaction</h2>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-2 text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-4">
        <label className="text-sm">
          Date
          <input
            type="date"
            className="mt-1 w-full rounded border px-2 py-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="text-sm sm:col-span-2">
          Description
          <input
            type="text"
            className="mt-1 w-full rounded border px-2 py-1"
            placeholder="Es: Spesa supermercato"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="text-sm">
          Amount
          <input
            type="text"
            className="mt-1 w-full rounded border px-2 py-1"
            placeholder="Es: 12,34"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label className="text-sm sm:col-span-2">
          Category
          <select
            className="mt-1 w-full rounded border px-2 py-1"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {mockCategories.map((c) => (
              <option className="text-black" key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2 flex items-end">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
