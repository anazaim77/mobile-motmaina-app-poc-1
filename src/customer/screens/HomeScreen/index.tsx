import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Text, Button } from "@/shared/components";
import { apiClient } from "@/shared/api/apiClient";
import { Consultant } from "@/shared/api/mockServer";
import { useCustomerAuthStore } from "@/customer/stores/authStore";
import { ConsultantCard } from "@/customer/components/ConsultantCard";

export const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useCustomerAuthStore();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConsultants();
  }, []);

  const loadConsultants = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<{ items: Consultant[] }>(
        "/consultants",
        query ? { q: query } : undefined,
      );
      setConsultants(response.items);
    } catch (error) {
      console.error("Error loading consultants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    loadConsultants(searchQuery);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>
          Find Your Psychologist
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Welcome, {user?.name}
        </Text>
        <View style={styles.logoutButton}>
          <Button variant="outline" size="small" onPress={handleLogout}>
            Logout
          </Button>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, specialization, or location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <Button variant="primary" size="medium" onPress={handleSearch}>
          Search
        </Button>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={consultants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConsultantCard
              consultant={item}
              onPress={() => router.push(`/(customer)/consultants/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
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
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  loader: {
    marginTop: 40,
  },
});
