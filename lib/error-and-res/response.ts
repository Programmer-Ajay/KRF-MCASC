// import { ApiResponse } from "@/types/api-response";

// // success response
// export function success<T>(
//     message:string,
//     data?:T
// ):ApiResponse<T>{
//     return {
//         success:true,
//         message,
//         data,

//     };
// }


// /** Error response */
// export function failure(
//   message: string,
//   code?: string
// ): ApiResponse {
//   return {
//     success: false,
//     message,
//     code,
//   };
// }




import { ApiResponse } from "@/types/api-response";
import { AppError } from "./error";

// 1. Success is already generic, which is good
export function success<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: Date.now(),
  };
}

// 2. UDPATE: Make failure Generic <T = null>
export function failure<T = null>(
  message: string,
  code?: string
): ApiResponse<T> {
  return {
    success: false,
    message,
    code,
    timestamp: Date.now(),
  };
}

// 3. UPDATE: Make handleError Generic <T = null>
export function handleError<T = null>(error: unknown): ApiResponse<T> {
  console.error("Action Error:", error);

  if (error instanceof AppError) {
    // Pass the generic type T to failure
    return failure<T>(error.message, error.code);
  }

  if (error instanceof Error) {
    return failure<T>(error.message, "UNKNOWN_ERROR");
  }

  return failure<T>("An unexpected error occurred", "UNKNOWN_ERROR");
}