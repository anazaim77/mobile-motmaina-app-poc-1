 import * as SecureStore from "expo-secure-store";
 
 export const secureStore = {
   async get(key: string): Promise<string | null> {
     try {
       return await SecureStore.getItemAsync(key);
     } catch (error) {
       console.error(`Error getting ${key} from secure store:`, error);
       return null;
     }
   },
 
   async set(key: string, value: string): Promise<void> {
     try {
       await SecureStore.setItemAsync(key, value);
     } catch (error) {
       console.error(`Error setting ${key} in secure store:`, error);
       throw error;
     }
   },
 
   async delete(key: string): Promise<void> {
     try {
       await SecureStore.deleteItemAsync(key);
     } catch (error) {
       console.error(`Error deleting ${key} from secure store:`, error);
       throw error;
     }
   },
 };
