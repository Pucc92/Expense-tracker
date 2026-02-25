import { describe, expect, it } from "vitest";
import { getCategoryName } from "./category.utils";

describe("getCategoryName", () => {
  it("returns fallback for unknown id", () => {
    expect(getCategoryName("unknown")).toBe("—");
  });
});
