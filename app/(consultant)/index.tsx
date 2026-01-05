 import { View, Text, StyleSheet, Pressable } from "react-native";
 import { useConsultantAuthStore } from "@/consultant/stores/authStore";
 
 export default function ConsultantHome() {
   const { user, logout } = useConsultantAuthStore();
 
   const handleLogout = async () => {
     await logout();
   };
 
   return (
     <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.title}>Consultant Portal</Text>
         <Text style={styles.subtitle}>Welcome, Dr. {user?.name}</Text>
         <Pressable style={styles.logoutButton} onPress={handleLogout}>
           <Text style={styles.logoutText}>Logout</Text>
         </Pressable>
       </View>
 
       <View style={styles.content}>
         <Text style={styles.message}>
           This is a minimal home screen for the consultant app.
         </Text>
         <Text style={styles.message}>
           In a full implementation, this would show appointments, messages, and
           practice management tools.
         </Text>
       </View>
     </View>
   );
 }
 
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
   content: {
     padding: 20,
   },
   message: {
     fontSize: 16,
     color: "#333",
     marginBottom: 16,
     lineHeight: 24,
   },
 });
