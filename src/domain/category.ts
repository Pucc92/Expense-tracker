// src/domain/category.ts
export type CategoryId = string;

export type Category = Readonly<{
  id: CategoryId;
  name: string; // es: "Spesa", "Affitto"
  color?: string; // opzionale, per UI
}>;
