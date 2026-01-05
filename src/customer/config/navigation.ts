import { navigate } from "@/shared/utils/navigation.util";
 
 /**
  * Customer app route paths
  */
 export const CustomerRoutes = {
   Login: "/(customer)/login",
   Home: "/(customer)",
   ConsultantDetail: (id: string) => `/(customer)/consultants/${id}` as const,
 } as const;
 
 /**
  * Type for customer route paths
  */
 export type CustomerRoutePath =
   | (typeof CustomerRoutes)[keyof Omit<typeof CustomerRoutes, "ConsultantDetail">]
   | ReturnType<typeof CustomerRoutes.ConsultantDetail>;
 
 /**
 * Customer-specific navigation helpers
  */
export const customerNavigate = {
  /**
   * Navigate to login screen
   */
  toLogin: () => navigate.replace(CustomerRoutes.Login),

  /**
   * Navigate to home screen
   */
  toHome: () => navigate.replace(CustomerRoutes.Home),

  /**
   * Navigate to consultant detail screen
   */
  toConsultantDetail: (consultantId: string) =>
    navigate.push(CustomerRoutes.ConsultantDetail(consultantId)),

  /**
   * Navigate back
   */
  back: () => navigate.back(),
};
