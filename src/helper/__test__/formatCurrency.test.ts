import { describe, it, expect } from "vitest";
import { formatCurrency } from "../formatCurrency";

describe("formatCurrency", () => {
  it("deve formatar corretamente usando Intl", () => {
    const expected = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(10.5);

    expect(formatCurrency(10.5)).toBe(expected);
  });

  it("deve formatar número decimal corretamente", () => {
    const expected = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(10.5);

    expect(formatCurrency(10.5)).toBe(expected);
  });

  it("deve formatar zero corretamente", () => {
    const expected = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(0);

    expect(formatCurrency(0)).toBe(expected);
  });

  it("deve formatar número negativo corretamente", () => {
    const expected = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(-5);

    expect(formatCurrency(-5)).toBe(expected);
  });
});
