export default function toDateInputValue(date?: string | Date | null) {
  if (!date) return undefined;

  if (typeof date === "string") {
    return date.slice(0, 10); // já vem certo
  }

  return date.toISOString().slice(0, 10);
}
