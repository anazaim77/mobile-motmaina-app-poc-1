 import { useState, useEffect } from "react";
 import {
   View,
   Text,
   ScrollView,
   StyleSheet,
   ActivityIndicator,
   Pressable,
 } from "react-native";
 import { useLocalSearchParams, useRouter } from "expo-router";
 import { apiClient } from "@/shared/api/apiClient";
 import { Consultant } from "@/shared/api/mockServer";
 
 export default function ConsultantDetail() {
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
         <Text style={styles.errorText}>Consultant not found</Text>
       </View>
     );
   }
 
   return (
     <ScrollView style={styles.container}>
       <View style={styles.header}>
         <Pressable style={styles.backButton} onPress={() => router.back()}>
           <Text style={styles.backButtonText}>← Back</Text>
         </Pressable>
       </View>
 
       <View style={styles.content}>
         <Text style={styles.name}>{consultant.name}</Text>
         <Text style={styles.title}>{consultant.title}</Text>
         <Text style={styles.specialization}>{consultant.specialization}</Text>
 
         <View style={styles.metaRow}>
           <Text style={styles.rating}>
             ⭐ {consultant.rating} ({consultant.reviewCount} reviews)
           </Text>
           <Text style={styles.rate}>SAR {consultant.hourlyRate}/hr</Text>
         </View>
 
         <Text style={styles.location}>📍 {consultant.location}</Text>
 
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>About</Text>
           <Text style={styles.bio}>{consultant.bio}</Text>
         </View>
 
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Languages</Text>
           <View style={styles.languagesContainer}>
             {consultant.languages.map((lang) => (
               <View key={lang} style={styles.languageTag}>
                 <Text style={styles.languageText}>{lang}</Text>
               </View>
             ))}
           </View>
         </View>
 
         <Pressable style={styles.bookButton}>
           <Text style={styles.bookButtonText}>Book Appointment</Text>
         </Pressable>
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
   backButton: {
     alignSelf: "flex-start",
   },
   backButtonText: {
     color: "#fff",
     fontSize: 16,
   },
   content: {
     padding: 20,
   },
   name: {
     fontSize: 28,
     fontWeight: "bold",
     marginBottom: 4,
   },
   title: {
     fontSize: 16,
     color: "#666",
     marginBottom: 4,
   },
   specialization: {
     fontSize: 16,
     color: "#007AFF",
     marginBottom: 16,
   },
   metaRow: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginBottom: 8,
   },
   rating: {
     fontSize: 16,
     color: "#333",
   },
   rate: {
     fontSize: 16,
     fontWeight: "600",
     color: "#333",
   },
   location: {
     fontSize: 14,
     color: "#666",
     marginBottom: 24,
   },
   section: {
     marginBottom: 24,
   },
   sectionTitle: {
     fontSize: 18,
     fontWeight: "bold",
     marginBottom: 8,
   },
   bio: {
     fontSize: 16,
     color: "#333",
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
     fontSize: 14,
   },
   bookButton: {
     backgroundColor: "#007AFF",
     padding: 16,
     borderRadius: 8,
     alignItems: "center",
     marginTop: 16,
   },
   bookButtonText: {
     color: "#fff",
     fontSize: 18,
     fontWeight: "600",
   },
   loader: {
     marginTop: 100,
   },
   errorText: {
     fontSize: 18,
     color: "#666",
     textAlign: "center",
     marginTop: 100,
   },
 });
