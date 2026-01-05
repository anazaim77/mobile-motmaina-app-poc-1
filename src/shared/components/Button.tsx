 import React from "react";
 import {
   Pressable,
   Text,
   StyleSheet,
   PressableProps,
   ActivityIndicator,
 } from "react-native";
 
 type ButtonVariant = "primary" | "secondary" | "outline";
 type ButtonSize = "small" | "medium" | "large";
 
 interface ButtonProps extends Omit<PressableProps, "style"> {
   variant?: ButtonVariant;
   size?: ButtonSize;
   loading?: boolean;
   children: string;
 }
 
 export const Button: React.FC<ButtonProps> = ({
   variant = "primary",
   size = "medium",
   loading = false,
   disabled,
   children,
   ...props
 }) => {
   const isDisabled = disabled || loading;
 
   return (
     <Pressable
       style={({ pressed }) => [
         styles.base,
         styles[variant],
         styles[`${size}Size`],
         isDisabled && styles.disabled,
         pressed && !isDisabled && styles.pressed,
       ]}
       disabled={isDisabled}
       {...props}
     >
       {loading ? (
         <ActivityIndicator
           color={variant === "primary" ? "#fff" : "#007AFF"}
         />
       ) : (
         <Text
           style={[
             styles.text,
             styles[`${variant}Text`],
             styles[`${size}Text`],
           ]}
         >
           {children}
         </Text>
       )}
     </Pressable>
   );
 };
 
 const styles = StyleSheet.create({
   base: {
     borderRadius: 8,
     alignItems: "center",
     justifyContent: "center",
   },
   primary: {
     backgroundColor: "#007AFF",
   },
   secondary: {
     backgroundColor: "#34C759",
   },
   outline: {
     backgroundColor: "transparent",
     borderWidth: 1,
     borderColor: "#007AFF",
   },
   disabled: {
     opacity: 0.5,
   },
   pressed: {
     opacity: 0.8,
   },
   smallSize: {
     paddingHorizontal: 12,
     paddingVertical: 8,
   },
   mediumSize: {
     paddingHorizontal: 20,
     paddingVertical: 12,
   },
   largeSize: {
     paddingHorizontal: 24,
     paddingVertical: 16,
   },
   text: {
     fontFamily: "Inter_600SemiBold",
   },
   primaryText: {
     color: "#fff",
   },
   secondaryText: {
     color: "#fff",
   },
   outlineText: {
     color: "#007AFF",
   },
   smallText: {
     fontSize: 14,
   },
   mediumText: {
     fontSize: 16,
   },
   largeText: {
     fontSize: 18,
   },
 });
