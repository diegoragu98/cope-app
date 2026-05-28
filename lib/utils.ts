import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstName(fullName: string): string {
  if (!fullName) return ''
  return fullName.split(' ')[0].trim()
}
