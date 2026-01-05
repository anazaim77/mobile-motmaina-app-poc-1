import * as Sentry from "@sentry/react-native";
import { SENTRY_DSN, APP_ENV, APP_VARIANT } from "@/shared/config/env";

export const initializeSentry = (): void => {
  if (!SENTRY_DSN || SENTRY_DSN.includes("xxxxx")) {
    console.log("Sentry DSN not configured, skipping initialization");
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: APP_ENV,
    debug: __DEV__,
    tracesSampleRate: APP_ENV === "production" ? 0.2 : 1.0,
  });

  // Set environment tags
  Sentry.setTag("app_variant", APP_VARIANT);
  Sentry.setTag("app_env", APP_ENV);

  console.log("✅ Sentry initialized");
};

export const captureException = (error: Error): void => {
  if (__DEV__) {
    console.error("Error captured:", error);
  }
  Sentry.captureException(error);
};
