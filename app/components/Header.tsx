'use client'

import { useState } from 'react'
import { Search, Bell, Plus, User, Settings, LogOut, Shield, HelpCircle, Moon, Sun, Crown, Mail, Phone } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

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
  {
    id: 4,
    type: "urgent",
    message: "Khách hàng VIP yêu cầu gọi lại ngay",
    time: "5 phút trước", 
    read: false,
  },
  {
    id: 5,
    type: "important",
    message: "Báo cáo tuần cần phê duyệt",
    time: "2 giờ trước",
    read: false,
  },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const unreadCount = notifications.filter(n => !n.read).length

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search and Date */}
        <div className="flex items-center space-x-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm leads, đơn hàng, khách hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Add Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span className="font-semibold">✨ Tạo mới</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">🚀 Tạo mới</h3>
                <p className="text-sm text-gray-600">Chọn loại dữ liệu bạn muốn tạo</p>
              </div>
              
              {/* Quick Actions */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  🔥 Thao tác nhanh
                </DropdownMenuLabel>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <DropdownMenuItem className="cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="font-medium text-sm">Lead mới</div>
                      <div className="text-xs text-gray-500">Khách hàng tiềm năng</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <Plus className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="font-medium text-sm">Đơn hàng</div>
                      <div className="text-xs text-gray-500">Đơn bán mới</div>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Sales & Marketing */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                  📈 Bán hàng & Marketing
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-blue-50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">👤 Lead từ Form</div>
                    <div className="text-xs text-gray-500">Thêm lead từ website/landing page</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-blue-50 rounded-md">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">📞 Lead từ Cuộc gọi</div>
                    <div className="text-xs text-gray-500">Nhập lead từ telesales</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-blue-50 rounded-md">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">📧 Campaign Email</div>
                    <div className="text-xs text-gray-500">Tạo chiến dịch email marketing</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Customer Management */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-green-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                  👥 Quản lý khách hàng
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-green-50 rounded-md">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">🏢 Khách hàng doanh nghiệp</div>
                    <div className="text-xs text-gray-500">Thêm khách hàng B2B</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-green-50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">👤 Khách hàng cá nhân</div>
                    <div className="text-xs text-gray-500">Thêm khách hàng B2C</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Task & Project */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                  📋 Công việc & Dự án
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-purple-50 rounded-md">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Plus className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">✅ Task/Nhiệm vụ</div>
                    <div className="text-xs text-gray-500">Tạo công việc cần làm</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-purple-50 rounded-md">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Plus className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">📅 Cuộc hẹn</div>
                    <div className="text-xs text-gray-500">Lên lịch gặp khách hàng</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center p-2 hover:bg-purple-50 rounded-md">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <Plus className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">📊 Báo cáo</div>
                    <div className="text-xs text-gray-500">Tạo báo cáo sales</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Quick Templates */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-gray-800">🎯 Template nhanh</h4>
                  <Badge variant="secondary" className="text-xs">HOT</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    📝 Lead B2B
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    🛒 E-commerce
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
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
                  <h3 className="font-semibold text-lg text-gray-800">🔔 Thông báo</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-100">
                      🔽 Lọc
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-100">
                      ✅ Đánh dấu đã đọc
                    </Button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs bg-white shadow-sm rounded-md">
                    Tất cả ({notifications.length})
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs hover:bg-gray-200 rounded-md">
                    🔴 Khẩn cấp ({notifications.filter(n => n.type === 'urgent').length})
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs hover:bg-gray-200 rounded-md">
                    🟡 Quan trọng ({notifications.filter(n => n.type === 'important').length})
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {/* Urgent Notifications */}
                  {notifications.filter(n => n.type === 'urgent').length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                        🚨 Khẩn cấp - Cần xử lý ngay
                      </h4>
                      {notifications.filter(n => n.type === 'urgent').map((notification) => (
                        <div key={notification.id} className="p-3 rounded-lg border-l-4 border-l-red-500 bg-red-50 mb-2 hover:bg-red-100 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                🕐 {notification.time}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-2 text-xs border-red-200 text-red-600 hover:bg-red-100">
                              👁️ Xem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Important Notifications */}
                  {notifications.filter(n => n.type === 'important').length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                        ⚠️ Quan trọng - Cần chú ý
                      </h4>
                      {notifications.filter(n => n.type === 'important').map((notification) => (
                        <div key={notification.id} className="p-3 rounded-lg border-l-4 border-l-yellow-500 bg-yellow-50 mb-2 hover:bg-yellow-100 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                🕐 {notification.time}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-2 text-xs border-yellow-200 text-yellow-600 hover:bg-yellow-100">
                              👁️ Xem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Normal Notifications */}
                  {notifications.filter(n => n.type === 'normal').length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-600 mb-3 flex items-center gap-2">
                        ℹ️ Thông thường
                      </h4>
                      {notifications.filter(n => n.type === 'normal').map((notification) => (
                        <div key={notification.id} className="p-3 rounded-lg border-l-4 border-l-blue-500 bg-blue-50 mb-2 hover:bg-blue-100 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                🕐 {notification.time}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-2 text-xs border-blue-200 text-blue-600 hover:bg-blue-100">
                              👁️ Xem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-3">
                  <Button variant="ghost" size="sm" className="w-full text-sm text-blue-600 hover:bg-blue-50 font-medium">
                    📋 Xem tất cả thông báo →
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 flex items-center space-x-2 p-2" type="button">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">Nguyễn Văn Anh</p>
                  <p className="text-xs text-gray-500">Sales Manager</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4">
              {/* User Info Section */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatars/user-avatar.jpg" alt="Nguyễn Văn Anh" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      NVA
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1">
                    <div className="w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Nguyễn Văn Anh</h3>
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Sales Manager</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Mail className="w-3 h-3 mr-1" />
                    nguyenvananh@company.com
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">45</div>
                  <div className="text-xs text-gray-600">Leads</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">12</div>
                  <div className="text-xs text-gray-600">Deals</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">89%</div>
                  <div className="text-xs text-gray-600">Target</div>
                </div>
              </div>

              <DropdownMenuSeparator className="my-3" />

              {/* Account Menu */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tài khoản
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Hồ sơ cá nhân</div>
                    <div className="text-xs text-gray-500">Xem và chỉnh sửa thông tin</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Cài đặt</div>
                    <div className="text-xs text-gray-500">Tuỳ chỉnh ứng dụng</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Shield className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Bảo mật</div>
                    <div className="text-xs text-gray-500">Mật khẩu và xác thực</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Preferences */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tùy chọn
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <Moon className="w-4 h-4 mr-3 text-gray-500" />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="font-medium">Chế độ tối</div>
                      <div className="text-xs text-gray-500">Bật/tắt giao diện tối</div>
                    </div>
                    <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Thông báo</div>
                    <div className="text-xs text-gray-500">Quản lý thông báo</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Support */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Trợ giúp & Hỗ trợ</div>
                    <div className="text-xs text-gray-500">Tài liệu và liên hệ</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />

              {/* Logout */}
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="w-4 h-4 mr-3" />
                <div>
                  <div className="font-medium">Đăng xuất</div>
                  <div className="text-xs opacity-75">Thoát khỏi tài khoản</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}