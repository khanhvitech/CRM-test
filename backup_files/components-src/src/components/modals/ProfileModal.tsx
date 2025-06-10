import { useState } from 'react';
import './ProfileModal.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Shield, Users, Activity, Clock, CheckCircle, XCircle, AlertCircle, Monitor, Smartphone, Download, Printer } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "Nguyễn",
    lastName: user?.lastName || "Văn Anh",
    email: user?.email || "nguyen.vananh@company.com",
    phone: user?.phone || "0901234567",
    address: user?.address || "123 Đường ABC, Quận 1, TP.HCM",
    birthDate: user?.birthDate || "1990-01-15",
    department: user?.department || "Sales",
    position: user?.position || "Sales Manager",
    joinDate: user?.joinDate || "2023-01-01"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
    setIsEditing(false);
    alert("Thông tin đã được lưu thành công!");
    // TODO: Implement actual save functionality
  };

  const handleExportProfile = () => {
    const profileData = {
      personalInfo: formData,
      role: roleData,
      lastActivity: activityData[0],
      exportTime: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintProfile = () => {
    window.print();
  };

  const performanceData = {
    thisMonth: {
      leads: 45,
      deals: 12,
      revenue: "1.8 tỷ",
      conversion: "26.7%"
    },
    thisQuarter: {
      leads: 128,
      deals: 35,
      revenue: "5.2 tỷ",
      conversion: "27.3%"
    }
  };

  // Role and permissions data
  const roleData = {
    role: "Sales Manager",
    department: "Sales",
    level: "Manager",
    permissions: [
      { module: "Leads", read: true, write: true, delete: true, admin: false },
      { module: "Deals", read: true, write: true, delete: true, admin: false },
      { module: "Customers", read: true, write: true, delete: false, admin: false },
      { module: "Reports", read: true, write: false, delete: false, admin: false },
      { module: "Team Management", read: true, write: true, delete: false, admin: true },
      { module: "Settings", read: true, write: false, delete: false, admin: false }
    ],
    supervisor: "Trần Văn B - Sales Director",
    teamMembers: ["Nguyễn Thị C", "Lê Văn D", "Phạm Thị E"]
  };

  // Activity log data
  const activityData = [
    { id: 1, action: "Đăng nhập hệ thống", timestamp: "2024-06-07 08:30:15", ip: "192.168.1.100", status: "success" },
    { id: 2, action: "Tạo lead mới: Công ty ABC", timestamp: "2024-06-07 09:15:22", ip: "192.168.1.100", status: "success" },
    { id: 3, action: "Cập nhật deal: Deal XYZ", timestamp: "2024-06-07 10:45:30", ip: "192.168.1.100", status: "success" },
    { id: 4, action: "Xem báo cáo doanh thu", timestamp: "2024-06-07 11:20:45", ip: "192.168.1.100", status: "success" },
    { id: 5, action: "Thay đổi mật khẩu", timestamp: "2024-06-06 16:30:12", ip: "192.168.1.100", status: "success" },
    { id: 6, action: "Đăng xuất hệ thống", timestamp: "2024-06-06 18:00:00", ip: "192.168.1.100", status: "success" }
  ];

  // Login history data
  const loginHistory = [
    { id: 1, loginTime: "2024-06-07 08:30:15", logoutTime: "18:00:00", ip: "192.168.1.100", device: "Chrome - Windows", location: "TP.HCM", status: "active" },
    { id: 2, loginTime: "2024-06-06 08:45:20", logoutTime: "17:30:15", ip: "192.168.1.100", device: "Chrome - Windows", location: "TP.HCM", status: "completed" },
    { id: 3, loginTime: "2024-06-05 09:00:10", logoutTime: "18:15:30", ip: "192.168.1.101", device: "Edge - Windows", location: "TP.HCM", status: "completed" },
    { id: 4, loginTime: "2024-06-04 08:30:45", logoutTime: "17:45:00", ip: "192.168.1.100", device: "Chrome - Windows", location: "TP.HCM", status: "completed" },
    { id: 5, loginTime: "2024-06-03 14:20:30", logoutTime: "16:30:15", ip: "10.0.0.50", device: "Safari - Mobile", location: "Hà Nội", status: "completed" }
  ];

  // Profile change history
  const profileChanges = [
    { id: 1, field: "Số điện thoại", oldValue: "0901234566", newValue: "0901234567", changedBy: "Nguyễn Văn Anh", timestamp: "2024-06-06 14:30:00", reason: "Cập nhật thông tin liên hệ" },
    { id: 2, field: "Địa chỉ", oldValue: "122 Đường ABC", newValue: "123 Đường ABC, Quận 1, TP.HCM", changedBy: "Nguyễn Văn Anh", timestamp: "2024-06-05 16:45:00", reason: "Sửa địa chỉ chi tiết" },
    { id: 3, field: "Chức vụ", oldValue: "Sales Executive", newValue: "Sales Manager", changedBy: "Trần Văn B - HR", timestamp: "2024-05-15 10:00:00", reason: "Thăng chức" },
    { id: 4, field: "Phòng ban", oldValue: "Sales Team A", newValue: "Sales", changedBy: "Trần Văn B - HR", timestamp: "2024-05-15 10:00:00", reason: "Tổ chức lại phòng ban" }
  ];

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h2>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button size="sm" variant="outline" onClick={handleExportProfile} title="Xuất dữ liệu">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất
                </Button>
                <Button size="sm" variant="outline" onClick={handlePrintProfile} title="In hồ sơ">
                  <Printer className="w-4 h-4 mr-2" />
                  In
                </Button>
              </>
            )}
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Hủy
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-6 m-6 mb-0 text-xs">
              <TabsTrigger value="personal">Thông tin</TabsTrigger>
              <TabsTrigger value="role">Vai trò</TabsTrigger>
              <TabsTrigger value="activity">Hoạt động</TabsTrigger>
              <TabsTrigger value="login-history">Đăng nhập</TabsTrigger>
              <TabsTrigger value="changes">Thay đổi</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="p-6 pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture & Basic Info */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src="/api/placeholder/100/100" />
                        <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                          {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <Badge className="mb-2">{formData.position}</Badge>
                      <p className="text-sm text-gray-600 mb-4">{formData.department}</p>
                      
                      {isEditing && (
                        <Button size="sm" variant="outline" className="w-full">
                          Thay đổi ảnh
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Information */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chi tiết thông tin</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Họ</Label>
                          {isEditing ? (
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <User className="w-4 h-4 mr-2 text-gray-400" />
                              {formData.firstName}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="lastName">Tên</Label>
                          {isEditing ? (
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <User className="w-4 h-4 mr-2 text-gray-400" />
                              {formData.lastName}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <Mail className="w-4 h-4 mr-2 text-gray-400" />
                              {formData.email}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <Phone className="w-4 h-4 mr-2 text-gray-400" />
                              {formData.phone}
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="address">Địa chỉ</Label>
                          {isEditing ? (
                            <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              {formData.address}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="birthDate">Ngày sinh</Label>
                          {isEditing ? (
                            <Input
                              id="birthDate"
                              type="date"
                              value={formData.birthDate}
                              onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {new Date(formData.birthDate).toLocaleDateString('vi-VN')}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="joinDate">Ngày vào công ty</Label>
                          <div className="flex items-center p-2 bg-gray-50 rounded">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(formData.joinDate).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Role & Permissions Tab */}
            <TabsContent value="role" className="p-6 pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Thông tin vai trò
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vai trò:</span>
                      <Badge className="bg-blue-100 text-blue-800">{roleData.role}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phòng ban:</span>
                      <span className="font-medium">{roleData.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cấp độ:</span>
                      <Badge className="bg-green-100 text-green-800">{roleData.level}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quản lý trực tiếp:</span>
                      <span className="font-medium text-sm">{roleData.supervisor}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Thành viên nhóm
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {roleData.teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{member}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Permissions Table */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Ma trận quyền truy cập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Module</th>
                          <th className="text-center p-2">Xem</th>
                          <th className="text-center p-2">Chỉnh sửa</th>
                          <th className="text-center p-2">Xóa</th>
                          <th className="text-center p-2">Quản trị</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roleData.permissions.map((perm, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">{perm.module}</td>
                            <td className="text-center p-2">
                              {perm.read ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-red-600 mx-auto" />}
                            </td>
                            <td className="text-center p-2">
                              {perm.write ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-red-600 mx-auto" />}
                            </td>
                            <td className="text-center p-2">
                              {perm.delete ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-red-600 mx-auto" />}
                            </td>
                            <td className="text-center p-2">
                              {perm.admin ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-red-600 mx-auto" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Log Tab */}
            <TabsContent value="activity" className="p-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Nhật ký hoạt động gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityData.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          {activity.status === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : activity.status === 'failed' ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {activity.timestamp}
                            </span>
                            <span>IP: {activity.ip}</span>
                            <Badge 
                              className={`${
                                activity.status === 'success' 
                                  ? 'bg-green-100 text-green-800' 
                                  : activity.status === 'failed'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      Xem thêm hoạt động
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Login History Tab */}
            <TabsContent value="login-history" className="p-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Lịch sử đăng nhập
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Thời gian đăng nhập</th>
                          <th className="text-left p-3">Thời gian đăng xuất</th>
                          <th className="text-left p-3">Thiết bị</th>
                          <th className="text-left p-3">IP Address</th>
                          <th className="text-left p-3">Vị trí</th>
                          <th className="text-center p-3">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginHistory.map((session) => (
                          <tr key={session.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                {session.loginTime}
                              </div>
                            </td>
                            <td className="p-3">{session.logoutTime}</td>
                            <td className="p-3">
                              <div className="flex items-center">
                                {session.device.includes('Mobile') ? (
                                  <Smartphone className="w-4 h-4 mr-2 text-gray-400" />
                                ) : (
                                  <Monitor className="w-4 h-4 mr-2 text-gray-400" />
                                )}
                                {session.device}
                              </div>
                            </td>
                            <td className="p-3 font-mono text-xs">{session.ip}</td>
                            <td className="p-3">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                {session.location}
                              </div>
                            </td>
                            <td className="text-center p-3">
                              <Badge 
                                className={`${
                                  session.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {session.status === 'active' ? 'Đang hoạt động' : 'Đã kết thúc'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Hiển thị 5 phiên gần nhất
                    </span>
                    <Button variant="outline" size="sm">
                      Xem tất cả lịch sử
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Alert */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Cảnh báo bảo mật
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Lưu ý:</strong> Nếu bạn phát hiện các phiên đăng nhập không rõ nguồn gốc, 
                      vui lòng thay đổi mật khẩu ngay lập tức và liên hệ bộ phận IT.
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline" className="text-orange-600 border-orange-600">
                        Đổi mật khẩu
                      </Button>
                      <Button size="sm" variant="outline" className="text-orange-600 border-orange-600">
                        Báo cáo sự cố
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Changes Tab */}
            <TabsContent value="changes" className="p-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit2 className="w-5 h-5 mr-2" />
                    Lịch sử thay đổi hồ sơ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileChanges.map((change) => (
                      <div key={change.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className="bg-blue-100 text-blue-800">{change.field}</Badge>
                              <span className="text-xs text-gray-500">{change.timestamp}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-xs font-medium text-gray-600 mb-1">Giá trị cũ:</p>
                                <p className="text-sm bg-red-50 text-red-800 p-2 rounded border-l-4 border-red-300">
                                  {change.oldValue}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-600 mb-1">Giá trị mới:</p>
                                <p className="text-sm bg-green-50 text-green-800 p-2 rounded border-l-4 border-green-300">
                                  {change.newValue}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>
                                <strong>Thay đổi bởi:</strong> {change.changedBy}
                              </span>
                              <span>
                                <strong>Lý do:</strong> {change.reason}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      Xem tất cả thay đổi
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Compliance */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Shield className="w-5 h-5 mr-2" />
                    Tuân thủ dữ liệu cá nhân
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 mb-2">
                          Dữ liệu được bảo vệ theo GDPR và quy định bảo mật dữ liệu cá nhân
                        </p>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Mọi thay đổi đều được ghi lại và có thể kiểm tra</li>
                          <li>• Chỉ người có quyền mới có thể chỉnh sửa thông tin</li>
                          <li>• Dữ liệu được mã hóa và lưu trữ an toàn</li>
                          <li>• Có thể yêu cầu xóa dữ liệu cá nhân theo quy định</li>
                        </ul>
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                            Yêu cầu dữ liệu
                          </Button>
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                            Chính sách bảo mật
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="p-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bảo mật</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Đổi mật khẩu
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Cài đặt 2FA
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Lịch sử đăng nhập
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Thông báo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Email thông báo</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thông báo desktop</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Nhắc nhở nhiệm vụ</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
