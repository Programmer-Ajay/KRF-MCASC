
// export type ApiResponse<T = null>= | 
//     {
//       success: true;
//       message: string;
//       data?: T;
//     }
//     |
//     {
//       success: false;
//       message: string;
//       code?: string; // for programmatic handling
//     };

export type ApiResponse<T = null> =
  | {
      success: true;
      message: string;
      data?: T;
      timestamp?: number; // Used to trigger useEffect in hooks
    }
  | {
      success: false;
      message: string;
      code?: string;
      errors?: Record<string, string[]>; // For form validation errors
      timestamp?: number;
    };