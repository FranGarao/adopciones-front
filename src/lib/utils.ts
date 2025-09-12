import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))

}

export function monthsToFriendly(months: number | undefined) {
  if (!months) return 'Unknown';
  if (months < 12) return `${months} meses`;
  return `${Math.floor(months / 12)} años`;
}
