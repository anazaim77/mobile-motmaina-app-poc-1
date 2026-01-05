import { View, StyleSheet } from "react-native";
import { Text, Button } from "@/shared/components";
import { useConsultantAuthStore } from "@/consultant/stores/authStore";

export const HomeScreen = () => {
  const { user, logout } = useConsultantAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>
          Consultant Portal
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Welcome, Dr. {user?.name}
        </Text>
        <View style={styles.logoutButton}>
          <Button variant="outline" size="small" onPress={handleLogout}>
            Logout
          </Button>
        </View>
      </View>

      <View style={styles.content}>
        <Text variant="body" style={styles.message}>
          This is a minimal home screen for the consultant app.
        </Text>
        <Text variant="body" style={styles.message}>
          In a full implementation, this would show appointments, messages, and
          practice management tools.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#34C759",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    color: "#fff",
    opacity: 0.9,
  },
  logoutButton: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  content: {
    padding: 20,
  },
  message: {
    marginBottom: 16,
    lineHeight: 24,
  },
});
