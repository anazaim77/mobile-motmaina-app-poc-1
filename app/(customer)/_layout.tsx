 import { useEffect } from "react";
 import { Slot, useRouter, usePathname } from "expo-router";
 import { useCustomerAuthStore } from "@/customer/stores/authStore";
 
 export default function CustomerLayout() {
   const router = useRouter();
   const pathname = usePathname();
   const { status } = useCustomerAuthStore();
 
   useEffect(() => {
     // Wait for auth initialization
     if (status === "unknown") return;
 
     const isOnLoginPage = pathname === "/(customer)/login";
 
     // If unauthenticated and not on login, redirect to login
     if (status === "unauthenticated" && !isOnLoginPage) {
       router.replace("/(customer)/login");
     }
 
     // If authenticated and on login page, redirect to home
     if (status === "authenticated" && isOnLoginPage) {
       router.replace("/(customer)");
     }
   }, [status, pathname]);
 
   // Show nothing while initializing
   if (status === "unknown") {
     return null;
   }
 
   return <Slot />;
 }
