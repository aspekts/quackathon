import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function calculateMatchScore(user, buddy) {
  return user.interests.filter(interest => 
    buddy.interests.includes(interest)
  ).length;
}