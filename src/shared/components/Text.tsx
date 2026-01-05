 import React from "react";
 import {
   Text as RNText,
   TextProps as RNTextProps,
   StyleSheet,
 } from "react-native";
 
 type TextVariant = "h1" | "h2" | "h3" | "body" | "caption" | "label";
 
 interface CustomTextProps extends RNTextProps {
   variant?: TextVariant;
 }
 
 export const Text: React.FC<CustomTextProps> = ({
   variant = "body",
   style,
   children,
   ...props
 }) => {
   return (
     <RNText style={[styles[variant], style]} {...props}>
       {children}
     </RNText>
   );
 };
 
 const styles = StyleSheet.create({
   h1: {
     fontFamily: "Inter_700Bold",
     fontSize: 32,
     lineHeight: 40,
     color: "#000",
   },
   h2: {
     fontFamily: "Inter_600SemiBold",
     fontSize: 24,
     lineHeight: 32,
     color: "#000",
   },
   h3: {
     fontFamily: "Inter_600SemiBold",
     fontSize: 18,
     lineHeight: 24,
     color: "#000",
   },
   body: {
     fontFamily: "Inter_400Regular",
     fontSize: 16,
     lineHeight: 24,
     color: "#333",
   },
   caption: {
     fontFamily: "Inter_400Regular",
     fontSize: 14,
     lineHeight: 20,
     color: "#666",
   },
   label: {
     fontFamily: "Inter_500Medium",
     fontSize: 14,
     lineHeight: 20,
     color: "#333",
   },
 });
