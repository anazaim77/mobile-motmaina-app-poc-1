 import { create } from "zustand";
 import { secureStore } from "@/shared/utils/secureStore.util";
 import { apiClient } from "@/shared/api/apiClient";
 import { User, LoginResponse } from "@/shared/api/mockServer";
 
 const TOKEN_KEY = "consultant_access_token";
 
 type AuthStatus = "unknown" | "authenticated" | "unauthenticated";
 
 interface AuthState {
   status: AuthStatus;
   user: User | null;
   accessToken: string | null;
 }
 
 interface AuthActions {
   init: () => Promise<void>;
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   getAccessToken: () => Promise<string | null>;
 }
 
 type AuthStore = AuthState & AuthActions;
 
 export const useConsultantAuthStore = create<AuthStore>((set, get) => ({
   status: "unknown",
   user: null,
   accessToken: null,
 
   init: async () => {
     try {
       const token = await secureStore.get(TOKEN_KEY);
       if (token) {
         set({ status: "authenticated", accessToken: token });
       } else {
         set({ status: "unauthenticated" });
       }
     } catch (error) {
       console.error("Error initializing consultant auth:", error);
       set({ status: "unauthenticated" });
     }
   },
 
   login: async (email: string, password: string) => {
     try {
       const response = await apiClient.post<LoginResponse>("/auth/login", {
         email,
         password,
       });
 
       await secureStore.set(TOKEN_KEY, response.accessToken);
 
       set({
         status: "authenticated",
         accessToken: response.accessToken,
         user: response.user,
       });
     } catch (error) {
       console.error("Login error:", error);
       throw error;
     }
   },
 
   logout: async () => {
     try {
       await secureStore.delete(TOKEN_KEY);
       set({
         status: "unauthenticated",
         accessToken: null,
         user: null,
       });
     } catch (error) {
       console.error("Logout error:", error);
     }
   },
 
   getAccessToken: async () => {
     return get().accessToken;
   },
 }));
