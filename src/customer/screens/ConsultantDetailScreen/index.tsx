import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { apiClient } from "@/shared/api/apiClient";
import { Consultant } from "@/shared/api/mockServer";
import { Text } from "@/shared/components/Text";
import { Button } from "@/shared/components/Button";

export function ConsultantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConsultant();
  }, [id]);

  const loadConsultant = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Consultant>(`/consultants/${id}`);
      setConsultant(response);
    } catch (error) {
      console.error("Error loading consultant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  if (!consultant) {
    return (
      <View style={styles.container}>
        <Text variant="body" style={styles.errorText}>
          Consultant not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button variant="outline" size="small" onPress={() => router.back()}>
          ← Back
        </Button>
      </View>

      <View style={styles.content}>
        <Text variant="h1" style={styles.name}>
          {consultant.name}
        </Text>
        <Text variant="body" style={styles.title}>
          {consultant.title}
        </Text>
        <Text variant="body" style={styles.specialization}>
          {consultant.specialization}
        </Text>

        <View style={styles.metaRow}>
          <Text variant="body" style={styles.rating}>
            ⭐ {consultant.rating} ({consultant.reviewCount} reviews)
          </Text>
          <Text variant="label" style={styles.rate}>
            SAR {consultant.hourlyRate}/hr
          </Text>
        </View>

        <Text variant="caption" style={styles.location}>
          📍 {consultant.location}
        </Text>

        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>
            About
          </Text>
          <Text variant="body" style={styles.bio}>
            {consultant.bio}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>
            Languages
          </Text>
          <View style={styles.languagesContainer}>
            {consultant.languages.map((lang) => (
              <View key={lang} style={styles.languageTag}>
                <Text variant="caption" style={styles.languageText}>
                  {lang}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Button variant="primary" size="large" onPress={() => {}}>
          Book Appointment
        </Button>
      </View>
    </ScrollView>
  );
}

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
  content: {
    padding: 20,
  },
  name: {
    marginBottom: 4,
  },
  title: {
    color: "#666",
    marginBottom: 4,
  },
  specialization: {
    color: "#007AFF",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rating: {
  },
  rate: {
  },
  location: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  bio: {
    lineHeight: 24,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageTag: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    color: "#fff",
  },
  loader: {
    marginTop: 100,
  },
  errorText: {
    textAlign: "center",
    marginTop: 100,
  },
});
