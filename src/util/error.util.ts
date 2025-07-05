import { ErrorResponse } from "@/types";

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    (error as any).data !== null &&
    ("messages" in (error as any).data)
  );
}