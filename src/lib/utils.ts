import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Every component uses this to merge Tailwind classes safely.
// cn("px-2", condition && "bg-red-500") works as expected.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
