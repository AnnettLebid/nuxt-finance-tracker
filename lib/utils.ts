import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  console.log("inputs", ...inputs);
  console.log("clsx(inputs)", clsx(inputs));
  return twMerge(clsx(inputs));
}
