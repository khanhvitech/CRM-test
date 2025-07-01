import { useState, useEffect } from 'react';

export type UserRole = 'admin' | 'ceo' | 'leader' | 'sale' | 'accountant';

export interface Permissions {
  // Dashboard permissions
  canViewAllDashboard: boolean;
  canViewTeamDashboard: boolean;
  canViewPersonalDashboard: boolean;
  
  // Leads permissions
  canViewAllLeads: boolean;
  canViewTeamLeads: boolean;
  canViewPersonalLeads: boolean;
  canAssignLeads: boolean;
  canImportExportLeads: boolean;
  canEditLeads: boolean;
  
  // Customers permissions
  canViewAllCustomers: boolean;
  canViewTeamCustomers: boolean;
  canViewPersonalCustomers: boolean;
  canImportExportCustomers: boolean;
  canEditCustomers: boolean;
  
  // Orders permissions
  canViewAllOrders: boolean;
  canViewTeamOrders: boolean;
  canViewPersonalOrders: boolean;
  canEditOrders: boolean;
  
  // Invoice permissions
  canViewAllInvoices: boolean;
  canViewTeamInvoices: boolean;
  canViewPersonalInvoices: boolean;
  canCreateInvoices: boolean;
  canEditInvoices: boolean;
  canDeleteInvoices: boolean;
  canRecordPayments: boolean;
  canSendInvoices: boolean;
  canExportInvoices: boolean;
  
  // Products permissions
  canViewAllProducts: boolean;
  canViewProductHistory: boolean;
  canImportExportProducts: boolean;
  canEditProducts: boolean;
  
  // Tasks permissions
  canViewAllTasks: boolean;
  canViewTeamTasks: boolean;
  canViewPersonalTasks: boolean;
  canEditTasks: boolean;
  
  // Calendar permissions
  canViewAllCalendar: boolean;
  canViewTeamCalendar: boolean;
  canViewPersonalCalendar: boolean;
  
  // Employees permissions
  canViewAllEmployees: boolean;
  canViewTeamEmployees: boolean;
  canEditEmployees: boolean;
  canManagePermissions: boolean;
  
  // KPIs permissions
  canViewAllKPIs: boolean;
  canViewTeamKPIs: boolean;
  canEditKPIs: boolean;
  
  // Marketing permissions
  canViewAllMarketing: boolean;
  canViewTeamMarketing: boolean;
  canEditMarketing: boolean;
  canManageAutomation: boolean;
  
  // Reports permissions
  canViewAllReports: boolean;
  canViewTeamReports: boolean;
  canViewPersonalReports: boolean;
  canCustomizeReports: boolean;
  canExportReports: boolean;
  
  // Settings permissions
  canViewAllSettings: boolean;
  canViewCompanySettings: boolean;
  canEditSettings: boolean;
  canManageIntegrations: boolean;
}

const getPermissionsByRole = (role: UserRole): Permissions => {
  switch (role) {
    case 'admin':
      return {
        // Dashboard - Admin: toàn quyền
        canViewAllDashboard: true,
        canViewTeamDashboard: true,
        canViewPersonalDashboard: true,
        
        // Leads - Admin: toàn quyền
        canViewAllLeads: true,
        canViewTeamLeads: true,
        canViewPersonalLeads: true,
        canAssignLeads: true,
        canImportExportLeads: true,
        canEditLeads: true,
        
        // Customers - Admin: toàn quyền
        canViewAllCustomers: true,
        canViewTeamCustomers: true,
        canViewPersonalCustomers: true,
        canImportExportCustomers: true,
        canEditCustomers: true,
        
        // Orders - Admin: toàn quyền
        canViewAllOrders: true,
        canViewTeamOrders: true,
        canViewPersonalOrders: true,
        canEditOrders: true,
        
        // Invoice - Admin: toàn quyền
        canViewAllInvoices: true,
        canViewTeamInvoices: true,
        canViewPersonalInvoices: true,
        canCreateInvoices: true,
        canEditInvoices: true,
        canDeleteInvoices: true,
        canRecordPayments: true,
        canSendInvoices: true,
        canExportInvoices: true,
        
        // Products - Admin: toàn quyền
        canViewAllProducts: true,
        canViewProductHistory: true,
        canImportExportProducts: true,
        canEditProducts: true,
        
        // Tasks - Admin: toàn quyền
        canViewAllTasks: true,
        canViewTeamTasks: true,
        canViewPersonalTasks: true,
        canEditTasks: true,
        
        // Calendar - Admin: toàn quyền
        canViewAllCalendar: true,
        canViewTeamCalendar: true,
        canViewPersonalCalendar: true,
        
        // Employees - Admin: toàn quyền
        canViewAllEmployees: true,
        canViewTeamEmployees: true,
        canEditEmployees: true,
        canManagePermissions: true,
        
        // KPIs - Admin: toàn quyền
        canViewAllKPIs: true,
        canViewTeamKPIs: true,
        canEditKPIs: true,
        
        // Marketing - Admin: toàn quyền
        canViewAllMarketing: true,
        canViewTeamMarketing: true,
        canEditMarketing: true,
        canManageAutomation: true,
        
        // Reports - Admin: toàn quyền
        canViewAllReports: true,
        canViewTeamReports: true,
        canViewPersonalReports: true,
        canCustomizeReports: true,
        canExportReports: true,
        
        // Settings - Admin: toàn quyền
        canViewAllSettings: true,
        canViewCompanySettings: true,
        canEditSettings: true,
        canManageIntegrations: true,
      };

    case 'ceo':
      return {
        // Dashboard - CEO: KHÔNG truy cập (loại bỏ Tổng quan)
        canViewAllDashboard: false,
        canViewTeamDashboard: false,
        canViewPersonalDashboard: false,
        
        // Leads - CEO: xem toàn bộ, không phân bổ/nhập xuất
        canViewAllLeads: true,
        canViewTeamLeads: true,
        canViewPersonalLeads: true,
        canAssignLeads: false,
        canImportExportLeads: false,
        canEditLeads: true,
        
        // Customers - CEO: xem toàn bộ, không nhập xuất
        canViewAllCustomers: true,
        canViewTeamCustomers: true,
        canViewPersonalCustomers: true,
        canImportExportCustomers: false,
        canEditCustomers: true,
        
        // Orders - CEO: xem toàn bộ, không chỉnh sửa
        canViewAllOrders: true,
        canViewTeamOrders: true,
        canViewPersonalOrders: true,
        canEditOrders: false,
        
        // Invoice - CEO: xem toàn bộ, có thể xuất
        canViewAllInvoices: true,
        canViewTeamInvoices: true,
        canViewPersonalInvoices: true,
        canCreateInvoices: false,
        canEditInvoices: false,
        canDeleteInvoices: false,
        canRecordPayments: false,
        canSendInvoices: false,
        canExportInvoices: true,
        
        // Products - CEO: xem toàn bộ, không nhập xuất
        canViewAllProducts: true,
        canViewProductHistory: true,
        canImportExportProducts: false,
        canEditProducts: false,
        
        // Tasks - CEO: xem toàn bộ
        canViewAllTasks: true,
        canViewTeamTasks: true,
        canViewPersonalTasks: true,
        canEditTasks: true,
        
        // Calendar - CEO: xem toàn bộ
        canViewAllCalendar: true,
        canViewTeamCalendar: true,
        canViewPersonalCalendar: true,
        
        // Employees - CEO: xem toàn bộ, không chỉnh sửa/phân quyền
        canViewAllEmployees: true,
        canViewTeamEmployees: true,
        canEditEmployees: false,
        canManagePermissions: false,
        
        // KPIs - CEO: xem toàn bộ, không chỉnh sửa
        canViewAllKPIs: true,
        canViewTeamKPIs: true,
        canEditKPIs: false,
        
        // Marketing - CEO: xem toàn bộ, không quản lý automation
        canViewAllMarketing: true,
        canViewTeamMarketing: true,
        canEditMarketing: false,
        canManageAutomation: false,
        
        // Reports - CEO: xem toàn bộ, không xuất
        canViewAllReports: true,
        canViewTeamReports: true,
        canViewPersonalReports: true,
        canCustomizeReports: true,
        canExportReports: false,
        
        // Settings - CEO: KHÔNG truy cập (loại bỏ Cài đặt)
        canViewAllSettings: false,
        canViewCompanySettings: false,
        canEditSettings: false,
        canManageIntegrations: false,
      };

    case 'leader':
      return {
        // Dashboard - Leader: KHÔNG truy cập (loại bỏ Tổng quan)
        canViewAllDashboard: false,
        canViewTeamDashboard: false,
        canViewPersonalDashboard: false,
        
        // Leads - Leader: quản lý đội
        canViewAllLeads: false,
        canViewTeamLeads: true,
        canViewPersonalLeads: true,
        canAssignLeads: true,
        canImportExportLeads: false,
        canEditLeads: true,
        
        // Customers - Leader: quản lý đội
        canViewAllCustomers: false,
        canViewTeamCustomers: true,
        canViewPersonalCustomers: true,
        canImportExportCustomers: false,
        canEditCustomers: true,
        // Orders - Leader: có thể xem và quản lý đơn hàng team
        canViewAllOrders: false,
        canViewTeamOrders: true,
        canViewPersonalOrders: true,
        canEditOrders: true,
        
        // Invoice - Leader: có thể tạo và chỉnh sửa invoice team
        canViewAllInvoices: false,
        canViewTeamInvoices: true,
        canViewPersonalInvoices: true,
        canCreateInvoices: true,
        canEditInvoices: true,
        canDeleteInvoices: false,
        canRecordPayments: true,
        canSendInvoices: true,
        canExportInvoices: true,
        
        // Products - Leader: chỉ xem, không chỉnh sửa/lịch sử
        canViewAllProducts: true,
        canViewProductHistory: false,
        canImportExportProducts: false,
        canEditProducts: false,
        
        // Tasks - Leader: quản lý đội
        canViewAllTasks: false,
        canViewTeamTasks: true,
        canViewPersonalTasks: true,
        canEditTasks: true,
        
        // Calendar - Leader: quản lý đội
        canViewAllCalendar: false,
        canViewTeamCalendar: true,
        canViewPersonalCalendar: true,
        
        // Employees - Leader: xem đội, không chỉnh sửa/nhật ký
        canViewAllEmployees: false,
        canViewTeamEmployees: true,
        canEditEmployees: false,
        canManagePermissions: false,
        
        // KPIs - Leader: xem đội, không chỉnh sửa
        canViewAllKPIs: false,
        canViewTeamKPIs: true,
        canEditKPIs: false,
        
        // Marketing - Leader: xem đội, không chỉnh sửa automation
        canViewAllMarketing: false,
        canViewTeamMarketing: true,
        canEditMarketing: false,
        canManageAutomation: false,
        
        // Reports - Leader: xem đội, không xuất/tùy chỉnh
        canViewAllReports: false,
        canViewTeamReports: true,
        canViewPersonalReports: true,
        canCustomizeReports: false,
        canExportReports: false,
        
        // Settings - Leader: không truy cập
        canViewAllSettings: false,
        canViewCompanySettings: false,
        canEditSettings: false,
        canManageIntegrations: false,
      };

    case 'sale':
      return {
        // Dashboard - Sale: KHÔNG truy cập (loại bỏ Tổng quan)
        canViewAllDashboard: false,
        canViewTeamDashboard: false,
        canViewPersonalDashboard: false,
        
        // Leads - Sale: chỉ cá nhân
        canViewAllLeads: false,
        canViewTeamLeads: false,
        canViewPersonalLeads: true,
        canAssignLeads: false,
        canImportExportLeads: false,
        canEditLeads: true,
        
        // Customers - Sale: chỉ cá nhân
        canViewAllCustomers: false,
        canViewTeamCustomers: false,
        canViewPersonalCustomers: true,
        canImportExportCustomers: false,
        canEditCustomers: true,
        // Orders - Sale: có thể xem và tạo đơn hàng cá nhân
        canViewAllOrders: false,
        canViewTeamOrders: false,
        canViewPersonalOrders: true,
        canEditOrders: true,
        
        // Invoice - Sale: có thể tạo và chỉnh sửa invoice cá nhân
        canViewAllInvoices: false,
        canViewTeamInvoices: false,
        canViewPersonalInvoices: true,
        canCreateInvoices: true,
        canEditInvoices: true,
        canDeleteInvoices: false,
        canRecordPayments: true,
        canSendInvoices: true,
        canExportInvoices: true,
        
        // Products - Sale: chỉ xem, không chỉnh sửa/lịch sử
        canViewAllProducts: true,
        canViewProductHistory: false,
        canImportExportProducts: false,
        canEditProducts: false,
        
        // Tasks - Sale: chỉ cá nhân
        canViewAllTasks: false,
        canViewTeamTasks: false,
        canViewPersonalTasks: true,
        canEditTasks: true,
        
        // Calendar - Sale: chỉ cá nhân
        canViewAllCalendar: false,
        canViewTeamCalendar: false,
        canViewPersonalCalendar: true,
        
        // Employees - Sale: không truy cập
        canViewAllEmployees: false,
        canViewTeamEmployees: false,
        canEditEmployees: false,
        canManagePermissions: false,
        
        // KPIs - Sale: không truy cập
        canViewAllKPIs: false,
        canViewTeamKPIs: false,
        canEditKPIs: false,
        
        // Marketing - Sale: không truy cập
        canViewAllMarketing: false,
        canViewTeamMarketing: false,
        canEditMarketing: false,
        canManageAutomation: false,
        
        // Reports - Sale: KHÔNG truy cập (loại bỏ Báo cáo)
        canViewAllReports: false,
        canViewTeamReports: false,
        canViewPersonalReports: false,
        canCustomizeReports: false,
        canExportReports: false,
        
        // Settings - Sale: không truy cập
        canViewAllSettings: false,
        canViewCompanySettings: false,
        canEditSettings: false,
        canManageIntegrations: false,
      };

    case 'accountant':
      return {
        // Dashboard - Accountant: có thể xem dashboard riêng
        canViewAllDashboard: false,
        canViewTeamDashboard: false,
        canViewPersonalDashboard: true,
        
        // Leads - Accountant: chỉ xem, không chỉnh sửa
        canViewAllLeads: false,
        canViewTeamLeads: false,
        canViewPersonalLeads: false,
        canAssignLeads: false,
        canImportExportLeads: false,
        canEditLeads: false,
        
        // Customers - Accountant: xem toàn bộ để quản lý thanh toán
        canViewAllCustomers: true,
        canViewTeamCustomers: true,
        canViewPersonalCustomers: true,
        canImportExportCustomers: false,
        canEditCustomers: false,
        
        // Orders - Accountant: xem toàn bộ để quản lý hóa đơn
        canViewAllOrders: true,
        canViewTeamOrders: true,
        canViewPersonalOrders: true,
        canEditOrders: false,
        
        // Invoice - Accountant: toàn quyền quản lý hóa đơn và thanh toán
        canViewAllInvoices: true,
        canViewTeamInvoices: true,
        canViewPersonalInvoices: true,
        canCreateInvoices: true,
        canEditInvoices: true,
        canDeleteInvoices: true,
        canRecordPayments: true,
        canSendInvoices: true,
        canExportInvoices: true,
        
        // Products - Accountant: chỉ xem để tạo hóa đơn
        canViewAllProducts: true,
        canViewProductHistory: false,
        canImportExportProducts: false,
        canEditProducts: false,
        
        // Tasks - Accountant: chỉ cá nhân
        canViewAllTasks: false,
        canViewTeamTasks: false,
        canViewPersonalTasks: true,
        canEditTasks: true,
        
        // Calendar - Accountant: chỉ cá nhân
        canViewAllCalendar: false,
        canViewTeamCalendar: false,
        canViewPersonalCalendar: true,
        
        // Employees - Accountant: không truy cập
        canViewAllEmployees: false,
        canViewTeamEmployees: false,
        canEditEmployees: false,
        canManagePermissions: false,
        
        // KPIs - Accountant: chỉ xem tài chính
        canViewAllKPIs: false,
        canViewTeamKPIs: false,
        canEditKPIs: false,
        
        // Marketing - Accountant: không truy cập
        canViewAllMarketing: false,
        canViewTeamMarketing: false,
        canEditMarketing: false,
        canManageAutomation: false,
        
        // Reports - Accountant: xem báo cáo tài chính
        canViewAllReports: true,
        canViewTeamReports: true,
        canViewPersonalReports: true,
        canCustomizeReports: false,
        canExportReports: true,
        
        // Settings - Accountant: không truy cập
        canViewAllSettings: false,
        canViewCompanySettings: false,
        canEditSettings: false,
        canManageIntegrations: false,
      };

    default:
      // Default to sale permissions for safety
      return getPermissionsByRole('sale');
  }
};

export function usePermissions() {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('userRole') as UserRole) || 'leader';
  });

  const permissions = getPermissionsByRole(userRole);

  const setRole = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    
    // Force refresh to update all data with new role
    window.location.reload();
  };

  return {
    userRole,
    permissions,
    setRole,
  };
}