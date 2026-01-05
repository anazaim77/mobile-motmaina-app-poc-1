 export interface ApiError {
   message: string;
   statusCode?: number;
   originalError?: unknown;
 }
 
 export const normalizeError = (error: unknown): ApiError => {
   if (typeof error === "object" && error !== null && "response" in error) {
     const axiosError = error as {
       response?: { status: number; data?: { message?: string } };
       message: string;
     };
 
     return {
       message:
         axiosError.response?.data?.message ||
         axiosError.message ||
         "An error occurred",
       statusCode: axiosError.response?.status,
       originalError: error,
     };
   }
 
   if (error instanceof Error) {
     return {
       message: error.message,
       originalError: error,
     };
   }
 
   return {
     message: "Unknown error occurred",
     originalError: error,
   };
 };
