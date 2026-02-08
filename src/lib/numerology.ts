// Numerology calculations — pure functions

// Master numbers are preserved (11, 22, 33)
const MASTER_NUMBERS = [11, 22, 33];

/**
 * Calculate Life Path Number from a date string.
 * Reduces each component (month, day, year) individually first,
 * then sums and reduces again. Preserves master numbers.
 */
export function calculateLifePath(dateStr: string): number {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const reducedMonth = reduceToDigit(month);
  const reducedDay = reduceToDigit(day);
  const reducedYear = reduceToDigit(year);

  return reduceToDigit(reducedMonth + reducedDay + reducedYear);
}

/**
 * Calculate Gematria value of a name.
 * Simple English gematria: A=1, B=2, ... Z=26
 */
export function calculateGematria(name: string): number {
  return name
    .toUpperCase()
    .split("")
    .filter((c) => c >= "A" && c <= "Z")
    .reduce((sum, c) => sum + (c.charCodeAt(0) - 64), 0);
}

/**
 * Reduce a number to a single digit, preserving master numbers.
 */
function reduceToDigit(num: number): number {
  let sum = num;
  while (sum > 9 && !MASTER_NUMBERS.includes(sum)) {
    sum = sum
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return sum;
}
