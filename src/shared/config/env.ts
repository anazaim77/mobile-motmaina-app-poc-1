 import Constants from "expo-constants";
 
 export type AppVariant = "customer" | "consultant";
 export type AppEnv = "staging" | "production";
 
 interface ExtraConfig {
   appVariant: AppVariant;
   appEnv: AppEnv;
   apiBaseUrl: string;
   sentryDsn: string;
 }
 
 const extra = Constants.expoConfig?.extra as ExtraConfig | undefined;
 
 if (!extra) {
   throw new Error("Missing expo config extra");
 }
 
 export const APP_VARIANT: AppVariant = extra.appVariant;
 export const APP_ENV: AppEnv = extra.appEnv;
 export const API_BASE_URL: string = extra.apiBaseUrl;
 export const SENTRY_DSN: string = extra.sentryDsn;
 
 export const config = {
   appVariant: APP_VARIANT,
   appEnv: APP_ENV,
   apiBaseUrl: API_BASE_URL,
   sentryDsn: SENTRY_DSN,
 };
