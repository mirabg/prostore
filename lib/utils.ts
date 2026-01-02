import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//convert prisma object into a regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatErrors(error: any) {
  if (error.name === "ZodError") {
    //handle zod error
    const fieldErrors = error.issues.map((issue: any) => issue.message);
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //handle prisma error
    const field =
      error.meta?.driverAdapterError?.cause?.constraint?.fields?.[0] ||
      error.meta?.target?.[0] ||
      "Field";
    const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
    return `${fieldName} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
