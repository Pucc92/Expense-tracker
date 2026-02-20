// src/domain/money.ts
export type Currency = "EUR";

export type Money = Readonly<{
  amountCents: number; // es: 1234 = 12,34€
  currency: Currency;
}>;

export function money(amountCents: number, currency: Currency = "EUR"): Money {
  if (!Number.isInteger(amountCents)) {
    throw new Error("amountCents must be an integer");
  }
  return { amountCents, currency };
}

export function formatMoney(m: Money): string {
  const value = m.amountCents / 100;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: m.currency,
  }).format(value);
}

/**
 * Accetta "12,34" o "12.34" o "12" e ritorna Money in centesimi.
 * Nota: non è perfetto per ogni caso del mondo, ma va benissimo per iniziare.
 */
export function parseMoney(input: string, currency: Currency = "EUR"): Money {
  const normalized = input.trim().replace(/\s+/g, "").replace(",", ".");
  if (normalized.length === 0) throw new Error("Empty money input");

  // solo numeri e un punto
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new Error(`Invalid money format: "${input}"`);
  }

  const [intPart, decPart = ""] = normalized.split(".");
  const cents = Number(intPart) * 100 + Number((decPart + "00").slice(0, 2));

  return money(cents, currency);
}
