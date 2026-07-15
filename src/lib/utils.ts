import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function diffYearsAndMonths(startDate: Date, endDate: Date) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export function formatPeriod(start: Date, end: Date | null) {
  const { years, months } = diffYearsAndMonths(start, end ?? new Date());
  const startLabel = `${MONTHS[start.getMonth()]} de ${start.getFullYear()}`;
  const endLabel = end
    ? `${MONTHS[end.getMonth()]} de ${end.getFullYear()}`
    : "o momento";
  const duration = `${years > 0 ? `${years} ano${years > 1 ? "s" : ""} ` : ""}${months} ${months === 1 ? "mês" : "meses"}`;
  return `${startLabel} – ${endLabel} · ${duration}`;
}
