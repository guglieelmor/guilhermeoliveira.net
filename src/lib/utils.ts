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

export function groupByCompany<T extends { company: string }>(items: T[]) {
  return items.reduce<{ company: string; roles: T[] }[]>((groups, item) => {
    const group = groups.find((g) => g.company === item.company);
    if (group) {
      group.roles.push(item);
    } else {
      groups.push({ company: item.company, roles: [item] });
    }
    return groups;
  }, []);
}

function formatDuration(years: number, months: number) {
  return `${years > 0 ? `${years} ano${years > 1 ? "s" : ""} ` : ""}${months} ${months === 1 ? "mês" : "meses"}`;
}

export function formatPeriod(start: Date, end: Date | null) {
  const { years, months } = diffYearsAndMonths(start, end ?? new Date());
  const startLabel = `${MONTHS[start.getMonth()]} de ${start.getFullYear()}`;
  const endLabel = end
    ? `${MONTHS[end.getMonth()]} de ${end.getFullYear()}`
    : "o momento";
  return `${startLabel} – ${endLabel} · ${formatDuration(years, months)}`;
}

export function companyTenure<T extends { start: Date; end: Date | null }>(
  roles: T[],
) {
  const start = roles.reduce(
    (min, role) => (role.start < min ? role.start : min),
    roles[0].start,
  );
  const ongoing = roles.some((role) => role.end === null);
  const end = ongoing
    ? null
    : roles.reduce<Date>(
        (max, role) => (role.end && role.end > max ? role.end : max),
        roles[0].end as Date,
      );
  const { years, months } = diffYearsAndMonths(start, end ?? new Date());
  return formatDuration(years, months);
}

export function formatEducationPeriod(
  start: Date,
  end: Date | null,
  yearOnly = false,
) {
  if (yearOnly) {
    const endLabel = end ? `${end.getFullYear()}` : "o momento";
    return `${start.getFullYear()} – ${endLabel}`;
  }
  const startLabel = `${MONTHS[start.getMonth()]} de ${start.getFullYear()}`;
  const endLabel = end
    ? `${MONTHS[end.getMonth()]} de ${end.getFullYear()}`
    : "o momento";
  return `${startLabel} – ${endLabel}`;
}
