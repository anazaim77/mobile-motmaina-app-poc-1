 import { apiClient } from "@/shared/api/apiClient";
 import { Consultant } from "@/shared/api/mockServer";
 
 interface GetConsultantsResponse {
   items: Consultant[];
 }
 
 export const consultantsApi = {
   async getConsultants(query?: string): Promise<Consultant[]> {
     const response = await apiClient.get<GetConsultantsResponse>(
       "/consultants",
       query ? { q: query } : undefined
     );
     return response.items;
   },
 
   async getConsultantById(id: string): Promise<Consultant> {
     return await apiClient.get<Consultant>(`/consultants/${id}`);
   },
 };
