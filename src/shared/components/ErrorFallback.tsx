import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FallbackProps } from "react-error-boundary";
import { captureException } from "@/shared/monitoring/sentry";

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
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        {error?.message || "An unexpected error occurred"}
      </Text>
      <Pressable style={styles.button} onPress={resetErrorBoundary}>
        <Text style={styles.buttonText}>Try Again</Text>
      </Pressable>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
