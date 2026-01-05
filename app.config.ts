 import "dotenv/config";
 import { ExpoConfig, ConfigContext } from "expo/config";
 
 const APP_VARIANT = (process.env.APP_VARIANT || "customer") as
   | "customer"
   | "consultant";
 const APP_ENV = (process.env.APP_ENV || "staging") as "staging" | "production";
 
 // Load environment-specific variables
 const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || "";
 const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN || "";
 
 // Determine app name
 const baseAppName =
   APP_VARIANT === "customer" ? "Motmaina Customer" : "Motmaina Consultant";
 const appName = APP_ENV === "staging" ? `${baseAppName} (Staging)` : baseAppName;
 
 // Determine bundle identifiers
 const baseBundleId = "com.motmaina";
 const variantSuffix = APP_VARIANT === "customer" ? "customer" : "consultant";
 const envSuffix = APP_ENV === "staging" ? ".staging" : "";
 const bundleIdentifier = `${baseBundleId}.${variantSuffix}${envSuffix}`;
 const packageName = bundleIdentifier;
 
 // Determine icon and splash paths
 const iconPath = `./assets/icon-${APP_VARIANT}${
   APP_ENV === "staging" ? "-staging" : ""
 }.png`;
 const adaptiveIconPath = `./assets/adaptive-icon-${APP_VARIANT}${
   APP_ENV === "staging" ? "-staging" : ""
 }.png`;
 const splashPath = `./assets/splash-${APP_VARIANT}${
   APP_ENV === "staging" ? "-staging" : ""
 }.png`;
 
 export default ({ config }: ConfigContext): ExpoConfig => ({
   ...config,
   name: appName,
   slug: "mobile-motmaina-app-poc-1",
   version: "1.0.0",
   orientation: "portrait",
   icon: iconPath,
   userInterfaceStyle: "light",
   newArchEnabled: true,
  scheme: "motmaina",
  plugins: ["expo-router"],
   splash: {
     image: splashPath,
     resizeMode: "contain",
     backgroundColor: "#ffffff",
   },
   ios: {
     supportsTablet: true,
     bundleIdentifier,
   },
   android: {
     adaptiveIcon: {
       foregroundImage: adaptiveIconPath,
       backgroundColor: "#ffffff",
     },
     package: packageName,
     edgeToEdgeEnabled: true,
     predictiveBackGestureEnabled: false,
   },
   web: {
     favicon: "./assets/favicon.png",
   },
   extra: {
     appVariant: APP_VARIANT,
     appEnv: APP_ENV,
     apiBaseUrl,
     sentryDsn,
   },
 });
