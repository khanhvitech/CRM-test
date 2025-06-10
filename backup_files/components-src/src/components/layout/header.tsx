import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, Bell, Plus, User, Settings, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "../../../../../hooks/useAuth";
import ProfileModal from "../modals/ProfileModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles = {
  "/": "Tổng quan",
  "/leads": "Danh sách Leads", 
  "/sales-pipeline": "Theo dõi Leads",
  "/orders": "Đơn hàng",
  "/customers": "Khách hàng",
  "/tasks": "Nhiệm vụ",
  "/reports": "Báo cáo",
  "/automation": "Tự động hóa",
  "/marketing": "Marketing",
  "/integrations": "Tích hợp",
  "/settings": "Cài đặt",
};

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "urgent",
    message: "Lead Nguyễn Văn A không tương tác 3 ngày",
    time: "10 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "important", 
    message: "Đơn #123 Chưa thanh toán 3 ngày",
    time: "1 giờ trước",
    read: false,
  },
  {
    id: 3,
    type: "normal",
    message: "Lead Trần Thị B từ Fanpage",
    time: "30 phút trước",
    read: true,
  },
];

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  
  const currentTitle = pageTitles[location as keyof typeof pageTitles] || "ViLead CRM";
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return "🔴";
      case "important":
        return "🟡";
      default:
        return "🟢";
    }
  };

  // Account management handlers
  const handleProfileClick = () => {
    console.log("Opening profile modal...");
    setIsProfileModalOpen(true);
  };

  const handleAccountSettings = () => {
    console.log("Opening account settings...");
    alert("Tính năng cài đặt tài khoản sẽ được triển khai trong phiên bản tiếp theo.");
  };

  const handleChangePassword = () => {
    console.log("Opening change password modal...");
    const newPassword = prompt("Nhập mật khẩu mới:");
    if (newPassword) {
      alert("Mật khẩu đã được cập nhật thành công!");
    }
  };

  const handle2FASettings = () => {
    console.log("Opening 2FA settings...");
    const enable2FA = confirm("Bạn có muốn bật xác thực 2 bước không?");
    if (enable2FA) {
      alert("Xác thực 2 bước đã được kích hoạt!");
    }
  };

  const handlePerformanceView = () => {
    console.log("Opening performance dashboard...");
    // Navigate to performance page
    window.location.href = "/reports?view=personal";
  };

  const handleSalaryInfo = () => {
    console.log("Opening salary information...");
    alert("Thông tin lương & thưởng sẽ được cập nhật vào cuối tháng.");
  };

  const handleTeamManagement = () => {
    console.log("Opening team management...");
    // Navigate to team management if user has permission
    if (confirm("Bạn có muốn chuyển đến trang quản lý nhóm không?")) {
      window.location.href = "/employees";
    }
  };

  const handleThemeToggle = () => {
    console.log("Toggling theme...");
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    if (currentTheme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      alert("Đã chuyển sang chế độ tối");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      alert("Đã chuyển sang chế độ sáng");
    }
  };

  const handleDisplaySettings = () => {
    console.log("Opening display settings...");
    alert("Tính năng tuỳ chỉnh hiển thị sẽ được triển khai trong phiên bản tiếp theo.");
  };

  const handleNotificationSettings = () => {
    console.log("Opening notification settings...");
    alert("Tính năng cài đặt thông báo sẽ được triển khai trong phiên bản tiếp theo.");
  };

  const handleHelp = () => {
    console.log("Opening help center...");
    window.open("https://help.company.com", "_blank");
  };

  const handleSupport = () => {
    console.log("Opening technical support...");
    alert("Hỗ trợ kỹ thuật: support@company.com hoặc hotline: 1900-1234");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (confirmLogout) {
      // Clear any stored tokens or user data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      sessionStorage.clear();
      
      // Show logout message
      alert("Đã đăng xuất thành công!");
      
      // Redirect to login or home page
      window.location.href = "/login";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-900">{currentTitle}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm leads, đơn hàng, khách hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10"
            />
          </form>

          {/* Add Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm"
                style={{ backgroundColor: "#0052CC" }}
                className="text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo mới
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Tạo Leads</DropdownMenuItem>
              <DropdownMenuItem>Tạo Đơn bán</DropdownMenuItem>
              <DropdownMenuItem>Tạo Khách hàng</DropdownMenuItem>
              <DropdownMenuItem>Tạo Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" style={{ color: "#666666" }} />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-semibold text-lg" style={{ color: "#333333" }}>Thông báo</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      🔽 Lọc
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Đánh dấu đã đọc
                    </Button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs bg-white shadow-sm">
                    Tất cả ({notifications.length})
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    Khẩn cấp ({notifications.filter(n => n.type === 'urgent').length})
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    Quan trọng ({notifications.filter(n => n.type === 'important').length})
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {/* Urgent Notifications */}
                  {notifications.filter(n => n.type === 'urgent').length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                        🔴 Khẩn cấp
                      </h4>
                      {notifications.filter(n => n.type === 'urgent').map((notification) => (
                        <div key={notification.id} className="p-3 rounded border-l-4 border-l-red-500 bg-red-50 mb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-2 text-xs" style={{ color: "#0052CC", borderColor: "#0052CC" }}>
                              Xem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Important Notifications */}
                  {notifications.filter(n => n.type === 'important').length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-yellow-600 mb-2 flex items-center">
                        🟡 Quan trọng
                      </h4>
                      {notifications.filter(n => n.type === 'important').map((notification) => (
                        <div key={notification.id} className="p-3 rounded border-l-4 border-l-yellow-500 bg-yellow-50 mb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-2 text-xs" style={{ color: "#0052CC", borderColor: "#0052CC" }}>
                              Xem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Normal Notifications */}
                  {notifications.filter(n => n.type === 'normal').length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                        🟢 Thông thường
                      </h4>
                      {notifications.filter(n => n.type === 'normal').map((notification) => (
                        <div key={notification.id} className="p-3 rounded border-l-4 border-l-blue-500 bg-blue-50 mb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-2 text-xs" style={{ color: "#0052CC", borderColor: "#0052CC" }}>
                              Xem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-3">
                  <Button variant="ghost" size="sm" className="w-full text-sm" style={{ color: "#0052CC" }}>
                    Xem tất cả thông báo →
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {(user as any)?.firstName || "Nguyễn"} {(user as any)?.lastName || "Văn An"}
                  </p>
                  <p className="text-xs text-gray-500">Sales Manager</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              {/* Profile Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {(user as any)?.firstName || "Nguyễn"} {(user as any)?.lastName || "Văn An"}
                    </p>
                    <p className="text-xs text-gray-500">Sales Manager</p>
                    <p className="text-xs text-gray-400 truncate">{(user as any)?.email || "nguyen.vanan@company.com"}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                        Đang hoạt động
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        Phòng Sales
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Đăng nhập lúc: 08:30 hôm nay
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Management */}
              <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>
                <User className="w-4 h-4 mr-2" />
                Hồ sơ cá nhân
              </DropdownMenuItem>

              {/* Quick Role Info */}
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-700 mb-2">Quyền truy cập nhanh:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-gray-600">Leads</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-gray-600">Deals</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <span className="text-gray-600">Reports</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-gray-600">Team</span>
                  </div>
                </div>
              </div>
              
              <DropdownMenuItem className="cursor-pointer" onClick={handleAccountSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt tài khoản
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handleChangePassword}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.414-6.414z" />
                </svg>
                Đổi mật khẩu
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handle2FASettings}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Bảo mật 2FA
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Quick Stats */}
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-700 mb-2">Thống kê hôm nay:</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-semibold text-blue-700">12</div>
                    <div className="text-blue-600">Leads mới</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="font-semibold text-green-700">3</div>
                    <div className="text-green-600">Deals thành công</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <div className="font-semibold text-purple-700">8</div>
                    <div className="text-purple-600">Tasks hoàn thành</div>
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <div className="font-semibold text-orange-700">156M</div>
                    <div className="text-orange-600">Doanh thu</div>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Performance & Stats */}
              <DropdownMenuItem className="cursor-pointer" onClick={handlePerformanceView}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Hiệu suất của tôi
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handleSalaryInfo}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Lương & thưởng
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handleTeamManagement}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Quản lý nhóm
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Preferences */}
              <DropdownMenuItem className="cursor-pointer" onClick={handleThemeToggle}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Chế độ giao diện
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handleDisplaySettings}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Tuỳ chỉnh hiển thị
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handleNotificationSettings}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 01.5 17H6A1.5 1.5 0 007.5 15.5v0A1.5 1.5 0 019 17v2.5a2.5 2.5 0 01-2.5 2.5H4z" />
                </svg>
                Thông báo & Nhắc nhở
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Help & Support */}
              <DropdownMenuItem className="cursor-pointer" onClick={handleHelp}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Trợ giúp & FAQ
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={handleSupport}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Hỗ trợ kỹ thuật
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />
    </header>
  );
}
