 import { useEffect } from "react";
 import { Slot, useRouter, useSegments } from "expo-router";
 import { ErrorBoundary } from "react-error-boundary";
 import * as SplashScreen from "expo-splash-screen";
 import { useFonts } from "@/shared/hooks/useFonts";
 import { ErrorFallback } from "@/shared/components/ErrorFallback";
 import { initializeSentry } from "@/shared/monitoring/sentry";
 import { setupMockServer } from "@/shared/api/mockServer";
 import { setTokenProvider } from "@/shared/api/tokenProvider";
 import { APP_VARIANT } from "@/shared/config/env";
 import { useCustomerAuthStore } from "@/customer/stores/authStore";
 import { useConsultantAuthStore } from "@/consultant/stores/authStore";
 
 // Keep splash screen visible
 SplashScreen.preventAutoHideAsync();
 
 // Initialize mock server in dev mode
 if (__DEV__) {
   setupMockServer();
 }
 
 // Initialize Sentry
 initializeSentry();
 
 export default function RootLayout() {
   const { fontsLoaded, fontError } = useFonts();
   const router = useRouter();
   const segments = useSegments();
 
   const customerAuth = useCustomerAuthStore();
   const consultantAuth = useConsultantAuthStore();
 
   // Initialize auth stores
   useEffect(() => {
     customerAuth.init();
     consultantAuth.init();
   }, []);
 
   // Wire token provider based on variant
   useEffect(() => {
     if (APP_VARIANT === "customer") {
       setTokenProvider({
         getAccessToken: customerAuth.getAccessToken,
         clearSession: customerAuth.logout,
       });
     } else {
       setTokenProvider({
         getAccessToken: consultantAuth.getAccessToken,
         clearSession: consultantAuth.logout,
       });
     }
   }, []);
 
   // Hide splash screen when fonts are loaded
   useEffect(() => {
     if (fontsLoaded || fontError) {
       SplashScreen.hideAsync();
     }
   }, [fontsLoaded, fontError]);
 
   // Variant routing guard - redirect to correct app
   useEffect(() => {
     if (!fontsLoaded && !fontError) return;
 
     const inCustomerApp = segments[0] === "(customer)";
     const inConsultantApp = segments[0] === "(consultant)";
 
     // If not in any app route, redirect to the correct one
     if (!inCustomerApp && !inConsultantApp) {
       if (APP_VARIANT === "customer") {
         router.replace("/(customer)");
       } else {
         router.replace("/(consultant)");
       }
       return;
     }
 
     // Prevent navigation into the other app's route group
     if (APP_VARIANT === "customer" && inConsultantApp) {
       router.replace("/(customer)");
     } else if (APP_VARIANT === "consultant" && inCustomerApp) {
       router.replace("/(consultant)");
     }
   }, [fontsLoaded, fontError, segments]);
 
   if (!fontsLoaded && !fontError) {
     return null;
   }
 
   return (
     <ErrorBoundary FallbackComponent={ErrorFallback}>
       <Slot />
     </ErrorBoundary>
   );
 }
