 import { router } from "expo-router";
 import type { Href } from "expo-router";
import { CustomerRoutes, CustomerRoutePath } from "@/customer/config/navigation";
import { ConsultantRoutes, ConsultantRoutePath } from "@/consultant/config/navigation";

/**
 * All available routes in the app
 */
export const Routes = {
  Customer: CustomerRoutes,
  Consultant: ConsultantRoutes,
} as const;

/**
 * Type for all route paths
 */
export type RoutePath = CustomerRoutePath | ConsultantRoutePath;

// Re-export app-specific types
export type { CustomerRoutePath, ConsultantRoutePath };
 
 /**
 * Generic navigation utility functions
 * For app-specific navigation, use:
 * - src/customer/config/navigation.ts
 * - src/consultant/config/navigation.ts
  */
 
 /**
  * Navigation options for various operations
  */
 export interface NavigationOptions {
   /**
    * Additional parameters to pass with the navigation
    */
   params?: Record<string, string | number | boolean>;
 }
 
 /**
 * Generic navigation utility class
 * Provides low-level navigation operations
  */
 export class Navigation {
   /**
    * Navigate to a route, pushing it onto the navigation stack
    * @param path - The route path to navigate to
    * @param options - Optional navigation options
    */
  static push(path: string, options?: NavigationOptions): void {
     const href = this.buildHref(path, options?.params);
     router.push(href);
   }
 
   /**
    * Navigate to a route, replacing the current route in the stack
    * @param path - The route path to navigate to
    * @param options - Optional navigation options
    */
  static replace(path: string, options?: NavigationOptions): void {
     const href = this.buildHref(path, options?.params);
     router.replace(href);
   }
 
   /**
    * Navigate back in the navigation stack
    */
   static back(): void {
     if (router.canGoBack()) {
       router.back();
     }
   }
 
   /**
    * Navigate back to a specific route or dismiss to first screen
    */
   static dismiss(): void {
     router.dismiss();
   }
 
   /**
    * Check if navigation can go back
    */
   static canGoBack(): boolean {
     return router.canGoBack();
   }
 
   /**
    * Navigate to a route with parameters
    * @param path - The route path to navigate to
    * @param params - Parameters to pass to the route
    */
   static pushWithParams(
    path: string,
     params: Record<string, string | number | boolean>
   ): void {
     this.push(path, { params });
   }
 
   /**
    * Replace current route with a new route with parameters
    * @param path - The route path to navigate to
    * @param params - Parameters to pass to the route
    */
   static replaceWithParams(
    path: string,
     params: Record<string, string | number | boolean>
   ): void {
     this.replace(path, { params });
   }
 
   /**
    * Build href with query parameters
    * @param path - The base path
    * @param params - Optional query parameters
    */
  static buildHref(
     path: string,
     params?: Record<string, string | number | boolean>
   ): Href {
     if (!params || Object.keys(params).length === 0) {
       return path as Href;
     }
 
     const queryString = Object.entries(params)
       .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
       .join("&");
 
     return `${path}?${queryString}` as Href;
   }
 }
 
 /**
  * Convenience exports for common navigation operations
  */
 export const navigate = {
   /**
    * Push a new route onto the stack
    */
   push: Navigation.push.bind(Navigation),
 
   /**
    * Replace the current route
    */
   replace: Navigation.replace.bind(Navigation),
 
   /**
    * Go back in the navigation stack
    */
   back: Navigation.back.bind(Navigation),
 
   /**
    * Dismiss the current screen
    */
   dismiss: Navigation.dismiss.bind(Navigation),
 
   /**
    * Check if can go back
    */
   canGoBack: Navigation.canGoBack.bind(Navigation),
 
   /**
    * Push with query parameters
    */
   pushWithParams: Navigation.pushWithParams.bind(Navigation),
 
   /**
    * Replace with query parameters
    */
   replaceWithParams: Navigation.replaceWithParams.bind(Navigation),

  /**
   * Build href with query parameters
   */
  buildHref: Navigation.buildHref.bind(Navigation),
 };
