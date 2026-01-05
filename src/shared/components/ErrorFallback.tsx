import React from "react";
import { View, StyleSheet } from "react-native";
import { FallbackProps } from "react-error-boundary";
import { captureException } from "@/shared/monitoring/sentry";
import { Text } from "./Text";
import { Button } from "./Button";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  // Capture error to Sentry
  React.useEffect(() => {
    if (error) {
      captureException(error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text variant="h2" style={styles.title}>
        Something went wrong
      </Text>
      <Text variant="body" style={styles.message}>
        {error?.message || "An unexpected error occurred"}
      </Text>
      <Button variant="primary" size="medium" onPress={resetErrorBoundary}>
        Try Again
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 12,
  },
  message: {
    textAlign: "center",
    marginBottom: 24,
  },
});
