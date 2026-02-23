import { mockTransactions } from "@/lib/mock/mockTransactions";
import { mockCategories } from "@/lib/mock/mockCategories";
import { formatMoney } from "@/domain/money";

function getCategoryName(categoryId: string): string {
  return mockCategories.find((c) => c.id === categoryId)?.name ?? "—";
}

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((t) => (
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
      {mockTransactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
}
