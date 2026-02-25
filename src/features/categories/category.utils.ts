import { mockCategories } from "@/lib/mock/mockCategories";

export function getCategoryName(categoryId: string): string {
  return mockCategories.find((c) => c.id === categoryId)?.name ?? "—";
}
