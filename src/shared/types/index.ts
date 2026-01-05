 // Re-export types from mockServer for easier imports
 export type { Consultant, User, LoginResponse } from "@/shared/api/mockServer";
 
 // Additional shared types can be added here
 export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";
