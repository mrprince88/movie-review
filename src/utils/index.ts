/* eslint-disable @typescript-eslint/no-unsafe-call */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const cn = (...args: ClassValue[]) => twMerge(clsx(...args));
