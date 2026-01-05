import { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Text, Button } from "@/shared/components";
import { useConsultantAuthStore } from "@/consultant/stores/authStore";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useConsultantAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/(consultant)");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h1" style={styles.title}>
        Consultant Login
      </Text>
      <Text variant="body" style={styles.subtitle}>
        Sign in to manage your practice
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        variant="primary"
        size="large"
        loading={isLoading}
        onPress={handleLogin}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <Text variant="caption" style={styles.hint}>
        Hint: Use any email/password to login (mock)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  hint: {
    marginTop: 24,
    textAlign: "center",
  },
});
