 import { Redirect } from "expo-router";
 import { APP_VARIANT } from "@/shared/config/env";
 import { useCustomerAuthStore } from "@/customer/stores/authStore";
 import { useConsultantAuthStore } from "@/consultant/stores/authStore";
 
 export default function Index() {
   const customerAuth = useCustomerAuthStore();
   const consultantAuth = useConsultantAuthStore();
   
   const authStore = APP_VARIANT === "customer" ? customerAuth : consultantAuth;
   const { status } = authStore;
   
   // Wait for auth initialization
   if (status === "unknown") {
     return null;
   }
   
   // Determine target route based on variant and auth status
   const targetRoute = APP_VARIANT === "customer" 
     ? (status === "authenticated" ? "/(customer)" : "/(customer)/login")
     : (status === "authenticated" ? "/(consultant)" : "/(consultant)/login");
 
   return <Redirect href={targetRoute} />;
 }
