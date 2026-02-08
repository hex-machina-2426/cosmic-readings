// Zodiac sign calculation — pure function, no API needed

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  start: [number, number]; // [month, day]
  end: [number, number];
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "Capricorn", symbol: "♑", element: "Earth", start: [12, 22], end: [1, 19] },
  { name: "Aquarius", symbol: "♒", element: "Air", start: [1, 20], end: [2, 18] },
  { name: "Pisces", symbol: "♓", element: "Water", start: [2, 19], end: [3, 20] },
  { name: "Aries", symbol: "♈", element: "Fire", start: [3, 21], end: [4, 19] },
  { name: "Taurus", symbol: "♉", element: "Earth", start: [4, 20], end: [5, 20] },
  { name: "Gemini", symbol: "♊", element: "Air", start: [5, 21], end: [6, 20] },
  { name: "Cancer", symbol: "♋", element: "Water", start: [6, 21], end: [7, 22] },
  { name: "Leo", symbol: "♌", element: "Fire", start: [7, 23], end: [8, 22] },
  { name: "Virgo", symbol: "♍", element: "Earth", start: [8, 23], end: [9, 22] },
  { name: "Libra", symbol: "♎", element: "Air", start: [9, 23], end: [10, 22] },
  { name: "Scorpio", symbol: "♏", element: "Water", start: [10, 23], end: [11, 21] },
  { name: "Sagittarius", symbol: "♐", element: "Fire", start: [11, 22], end: [12, 21] },
];

export function getZodiacSign(dateStr: string): ZodiacSign {
  const date = new Date(dateStr + "T00:00:00"); // Avoid timezone issues
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.start[0] && day >= sign.start[1]) ||
      (month === sign.end[0] && day <= sign.end[1])
    ) {
      return sign;
    }
  }

  // Default fallback (shouldn't happen with valid dates)
  return ZODIAC_SIGNS[0]; // Capricorn
}
