'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Calendar,
  Settings
} from 'lucide-react';

export default function VileadDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VileadCRM Dashboard</h1>
              <p className="text-gray-600">Quản lý tổng thể hệ thống CRM</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng Leads
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <p className="text-xs text-gray-600">
                +12% từ tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Doanh Thu
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12.5B đ</div>
              <p className="text-xs text-gray-600">
                +8% từ tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đơn Hàng
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">324</div>
              <p className="text-xs text-gray-600">
                +18% từ tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tỷ Lệ Chuyển Đổi
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">24.5%</div>
              <p className="text-xs text-gray-600">
                +3% từ tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="sales">Bán Hàng</TabsTrigger>
            <TabsTrigger value="customers">Khách Hàng</TabsTrigger>
            <TabsTrigger value="reports">Báo Cáo</TabsTrigger>
            <TabsTrigger value="settings">Cài Đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu Suất Bán Hàng</CardTitle>
                  <CardDescription>
                    Theo dõi doanh thu và mục tiêu hàng tháng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Biểu đồ doanh thu sẽ hiển thị ở đây</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phễu Bán Hàng</CardTitle>
                  <CardDescription>
                    Trạng thái của các cơ hội bán hàng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Leads mới</span>
                      <span className="text-sm text-gray-600">247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Đã liên hệ</span>
                      <span className="text-sm text-gray-600">186</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Báo giá</span>
                      <span className="text-sm text-gray-600">124</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Đàm phán</span>
                      <span className="text-sm text-gray-600">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-600">Đã chốt</span>
                      <span className="text-sm text-green-600 font-semibold">42</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Hoạt Động Gần Đây</CardTitle>
                <CardDescription>
                  Các hoạt động mới nhất trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lead mới từ Facebook Ads</p>
                      <p className="text-xs text-gray-600">Nguyễn Văn A - 2 phút trước</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Deal đã chốt thành công</p>
                      <p className="text-xs text-gray-600">ABC Corp - 15 phút trước</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Cuộc họp được lên lịch</p>
                      <p className="text-xs text-gray-600">XYZ Ltd - 30 phút trước</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Quản Lý Leads</CardTitle>
                <CardDescription>
                  Danh sách và trạng thái của tất cả leads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Component Leads Management từ VileadCRM sẽ được tích hợp ở đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Phễu Bán Hàng</CardTitle>
                <CardDescription>
                  Quản lý các cơ hội bán hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Component Sales Pipeline từ VileadCRM sẽ được tích hợp ở đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Quản Lý Khách Hàng</CardTitle>
                <CardDescription>
                  Danh sách và thông tin khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Component Customer Management từ VileadCRM sẽ được tích hợp ở đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Báo Cáo Và Phân Tích</CardTitle>
                <CardDescription>
                  Báo cáo chi tiết về hiệu suất bán hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Component Reports từ VileadCRM sẽ được tích hợp ở đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt Hệ Thống</CardTitle>
                <CardDescription>
                  Cấu hình và tùy chỉnh hệ thống CRM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Cài đặt hệ thống sẽ được hiển thị ở đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
