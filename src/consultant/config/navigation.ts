import { navigate } from "@/shared/utils/navigation.util";
 
 /**
  * Consultant app route paths
  */
 export const ConsultantRoutes = {
   Login: "/(consultant)/login",
   Home: "/(consultant)",
 } as const;
 
 /**
  * Type for consultant route paths
  */
 export type ConsultantRoutePath =
   (typeof ConsultantRoutes)[keyof typeof ConsultantRoutes];
 
 /**
 * Consultant-specific navigation helpers
  */
export const consultantNavigate = {
  /**
   * Navigate to login screen
   */
  toLogin: () => navigate.replace(ConsultantRoutes.Login),

  /**
   * Navigate to home screen
   */
  toHome: () => navigate.replace(ConsultantRoutes.Home),

  /**
   * Navigate back
   */
  back: () => navigate.back(),
};
