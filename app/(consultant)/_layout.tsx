 import { useEffect } from "react";
 import { Slot, useRouter, usePathname } from "expo-router";
 import { useConsultantAuthStore } from "@/consultant/stores/authStore";
 
 export default function ConsultantLayout() {
   const router = useRouter();
   const pathname = usePathname();
   const { status } = useConsultantAuthStore();
 
   useEffect(() => {
     // Wait for auth initialization
     if (status === "unknown") return;
 
     const isOnLoginPage = pathname === "/(consultant)/login";
 
     // If unauthenticated and not on login, redirect to login
     if (status === "unauthenticated" && !isOnLoginPage) {
       router.replace("/(consultant)/login");
     }
 
     // If authenticated and on login page, redirect to home
     if (status === "authenticated" && isOnLoginPage) {
       router.replace("/(consultant)");
     }
   }, [status, pathname]);
 
   // Show nothing while initializing
   if (status === "unknown") {
     return null;
   }
 
   return <Slot />;
 }
