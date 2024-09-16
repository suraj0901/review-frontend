import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const requireMsg = (field: string) => `${field} is required`;

export function file_to_base64_string(file: File | Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export function addSrNo<T>(list: T[], page = 1, limit = 10) {
  return list.map((item, index) => ({
    ...item,
    sr_no: (page - 1) * limit + index + 1,
  }));
}
