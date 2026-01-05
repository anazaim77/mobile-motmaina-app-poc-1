 import { Pressable, View, StyleSheet } from "react-native";
 import { Text } from "@/shared/components/Text";
 import { Consultant } from "@/shared/api/mockServer";
 
 interface ConsultantCardProps {
   consultant: Consultant;
   onPress: () => void;
 }
 
 export const ConsultantCard = ({ consultant, onPress }: ConsultantCardProps) => {
   return (
     <Pressable style={styles.card} onPress={onPress}>
       <Text variant="h3" style={styles.name}>
         {consultant.name}
       </Text>
       <Text variant="caption" style={styles.title}>
         {consultant.title}
       </Text>
       <Text variant="body" style={styles.specialization}>
         {consultant.specialization}
       </Text>
       <View style={styles.meta}>
         <Text variant="body" style={styles.rating}>
           ⭐ {consultant.rating} ({consultant.reviewCount} reviews)
         </Text>
         <Text variant="label" style={styles.rate}>
           SAR {consultant.hourlyRate}/hr
         </Text>
       </View>
       <Text variant="caption" style={styles.location}>
         {consultant.location}
       </Text>
     </Pressable>
   );
 };
 
 const styles = StyleSheet.create({
   card: {
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
   name: {
     marginBottom: 4,
   },
   title: {
     marginBottom: 4,
   },
   specialization: {
     color: "#007AFF",
     marginBottom: 8,
   },
   meta: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginBottom: 4,
   },
   rating: {
     fontSize: 14,
   },
   rate: {
     fontSize: 14,
   },
   location: {
     fontSize: 12,
   },
 });
