import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names or class value arrays using clsx and tailwind-merge.
 * This utility combines the power of clsx for conditional classes with tailwind-merge
 * to properly handle Tailwind CSS class conflicts.
 *
 * @param inputs - Array of class values (strings, objects, arrays, etc.)
 * @returns A merged string of class names with Tailwind conflicts resolved
 * @example
 * cn('px-2 py-1', 'bg-red-500', { 'text-white': true })
 * // => 'px-2 py-1 bg-red-500 text-white'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
