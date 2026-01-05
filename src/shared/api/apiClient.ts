 import { axiosInstance } from "./axios";
 import { ApiError } from "./apiError";
 
 export const apiClient = {
   async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
     try {
       const response = await axiosInstance.get<T>(url, { params });
       return response.data;
     } catch (error) {
       throw error as ApiError;
     }
   },
 
   async post<T>(
     url: string,
     data?: Record<string, unknown>
   ): Promise<T> {
     try {
       const response = await axiosInstance.post<T>(url, data);
       return response.data;
     } catch (error) {
       throw error as ApiError;
     }
   },
 
   async put<T>(
     url: string,
     data?: Record<string, unknown>
   ): Promise<T> {
     try {
       const response = await axiosInstance.put<T>(url, data);
       return response.data;
     } catch (error) {
       throw error as ApiError;
     }
   },
 
   async delete<T>(url: string): Promise<T> {
     try {
       const response = await axiosInstance.delete<T>(url);
       return response.data;
     } catch (error) {
       throw error as ApiError;
     }
   },
 };
