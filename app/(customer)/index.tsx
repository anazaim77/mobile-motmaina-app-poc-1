 import { useState, useEffect } from "react";
 import {
   View,
   Text,
   FlatList,
   TextInput,
   StyleSheet,
   Pressable,
   ActivityIndicator,
 } from "react-native";
 import { useRouter } from "expo-router";
 import { apiClient } from "@/shared/api/apiClient";
 import { Consultant } from "@/shared/api/mockServer";
 import { useCustomerAuthStore } from "@/customer/stores/authStore";
 
 export default function CustomerHome() {
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
         query ? { q: query } : undefined
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
         <Text style={styles.title}>Find Your Psychologist</Text>
         <Text style={styles.subtitle}>Welcome, {user?.name}</Text>
         <Pressable style={styles.logoutButton} onPress={handleLogout}>
           <Text style={styles.logoutText}>Logout</Text>
         </Pressable>
       </View>
 
       <View style={styles.searchContainer}>
         <TextInput
           style={styles.searchInput}
           placeholder="Search by name, specialization, or location"
           value={searchQuery}
           onChangeText={setSearchQuery}
           onSubmitEditing={handleSearch}
         />
         <Pressable style={styles.searchButton} onPress={handleSearch}>
           <Text style={styles.searchButtonText}>Search</Text>
         </Pressable>
       </View>
 
       {isLoading ? (
         <ActivityIndicator size="large" style={styles.loader} />
       ) : (
         <FlatList
           data={consultants}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => (
             <Pressable
               style={styles.consultantCard}
               onPress={() => router.push(`/(customer)/consultants/${item.id}`)}
             >
               <Text style={styles.consultantName}>{item.name}</Text>
               <Text style={styles.consultantTitle}>{item.title}</Text>
               <Text style={styles.consultantSpecialization}>
                 {item.specialization}
               </Text>
               <View style={styles.consultantMeta}>
                 <Text style={styles.consultantRating}>
                   ⭐ {item.rating} ({item.reviewCount} reviews)
                 </Text>
                 <Text style={styles.consultantRate}>
                   SAR {item.hourlyRate}/hr
                 </Text>
               </View>
               <Text style={styles.consultantLocation}>{item.location}</Text>
             </Pressable>
           )}
         />
       )}
     </View>
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
   title: {
     fontSize: 24,
     fontWeight: "bold",
     color: "#fff",
     marginBottom: 4,
   },
   subtitle: {
     fontSize: 16,
     color: "#fff",
     opacity: 0.9,
   },
   logoutButton: {
     position: "absolute",
     top: 60,
     right: 20,
   },
   logoutText: {
     color: "#fff",
     fontSize: 16,
   },
   searchContainer: {
     flexDirection: "row",
     padding: 16,
     backgroundColor: "#fff",
   },
   searchInput: {
     flex: 1,
     borderWidth: 1,
     borderColor: "#ddd",
     borderRadius: 8,
     padding: 12,
     marginRight: 8,
   },
   searchButton: {
     backgroundColor: "#007AFF",
     paddingHorizontal: 20,
     borderRadius: 8,
     justifyContent: "center",
   },
   searchButtonText: {
     color: "#fff",
     fontWeight: "600",
   },
   loader: {
     marginTop: 40,
   },
   consultantCard: {
     backgroundColor: "#fff",
     padding: 16,
     marginHorizontal: 16,
     marginBottom: 12,
     borderRadius: 12,
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3,
   },
   consultantName: {
     fontSize: 18,
     fontWeight: "bold",
     marginBottom: 4,
   },
   consultantTitle: {
     fontSize: 14,
     color: "#666",
     marginBottom: 4,
   },
   consultantSpecialization: {
     fontSize: 14,
     color: "#007AFF",
     marginBottom: 8,
   },
   consultantMeta: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginBottom: 4,
   },
   consultantRating: {
     fontSize: 14,
     color: "#333",
   },
   consultantRate: {
     fontSize: 14,
     fontWeight: "600",
     color: "#333",
   },
   consultantLocation: {
     fontSize: 12,
     color: "#999",
   },
 });
