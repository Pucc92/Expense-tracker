import { getCategoryName } from "@/features/categories/category.utils";
import { formatMoney } from "@/domain/money";
import { listTransactions } from "@/features/transactions/transactions.repository";

export default function TransactionsPage() {
  const transactions = listTransactions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-600">
            <tr className="text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3">{getCategoryName(t.categoryId)}</td>
                <td className="p-3 text-right">{formatMoney(t.money)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
}
