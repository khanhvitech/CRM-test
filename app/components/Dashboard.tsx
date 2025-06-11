'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Target, 
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Brain,
  BarChart3,
  Plus,
  Minus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import EnhancedDashboardFilters from './EnhancedDashboardFilters'
// import VileadRevenueChart from './VileadRevenueChart'

export default function Dashboard() {
  // State for collapsible sections
  const [showComparison, setShowComparison] = useState(false)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  
  // Sample data
  const revenueData = [
    { month: 'T1', revenue: 2.8, target: 3.0 },
    { month: 'T2', revenue: 3.2, target: 3.5 },
    { month: 'T3', revenue: 2.9, target: 3.2 },
    { month: 'T4', revenue: 3.8, target: 4.0 },
    { month: 'T5', revenue: 4.2, target: 4.2 },
    { month: 'T6', revenue: 3.9, target: 4.1 },
  ]

  const leadSourceData = [
    { name: 'Facebook', value: 24.5, leads: 245, color: '#3B82F6' },
    { name: 'Google', value: 18.2, leads: 182, color: '#10B981' },
    { name: 'Zalo', value: 15.3, leads: 153, color: '#F59E0B' },
    { name: 'Khác', value: 8.7, leads: 87, color: '#6B7280' },
  ]

  const conversionData = [
    { stage: 'Tiềm năng', count: 254, percentage: 100 },
    { stage: 'Liên hệ', count: 186, percentage: 73.2 },
    { stage: 'Đàm phán', count: 124, percentage: 48.8 },
    { stage: 'Đã xuất', count: 89, percentage: 35.0 },
    { stage: 'Chốt', count: 42, percentage: 16.5 },
  ]

  const activityData = [
    { type: 'Thêm mới lead từ Facebook Ads', name: 'Nguyễn Thanh', time: '2 phút trước', status: 'new' },
    { type: 'Gọi báo giá cho khách hàng', name: 'XYZ Corp', time: '15 phút trước', status: 'progress' },
    { type: 'Lịch hẹn Demo sản phẩm cho ABC Corp', name: 'ABC Corp', time: '30 phút trước', status: 'scheduled' },
    { type: 'Deal #123 đã chuyển sang giai đoạn Đàm phán', name: 'DEF Ltd', time: '1 giờ trước', status: 'updated' },
  ]

  const topPerformers = [
    { name: 'Nguyễn Văn A', revenue: '1.250.000.000 đ', deals: 12, conversion: '65%' },
    { name: 'Trần Thị B', revenue: '980.000.000 đ', deals: 9, conversion: '48%' },
    { name: 'Lê Văn C', revenue: '850.000.000 đ', deals: 8, conversion: '42%' },
    { name: 'Phạm Thị D', revenue: '720.000.000 đ', deals: 7, conversion: '35%' },
    { name: 'Hoàng Văn E', revenue: '580.000.000 đ', deals: 5, conversion: '28%' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
          <p className="text-gray-600">Theo dõi hiệu suất kinh doanh của bạn</p>
        </div>
      </div>

      {/* Dashboard Filters */}
      <EnhancedDashboardFilters onFilterChange={(filters) => console.log('Filters changed:', filters)} />

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <i className="fas fa-dollar-sign text-blue-600"></i>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Doanh thu</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">2.8 tỷ</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <i className="fas fa-arrow-up text-xs mr-1"></i>12.0%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">2.5 tỷ</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">2.8 tỷ</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">2.5 tỷ</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">KPI</span>
                <span className="text-gray-900 font-semibold">85%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <i className="fas fa-users text-purple-600"></i>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Khách hàng</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">145</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <i className="fas fa-arrow-up text-xs mr-1"></i>13.3%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">128</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">145</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">128</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">KPI</span>
                <span className="text-gray-900 font-semibold">97%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-purple-600 rounded-full transition-all duration-300" style={{width: '97%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <i className="fas fa-handshake text-green-600"></i>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Deals</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">18</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-red-600">
                    <i className="fas fa-arrow-down text-xs mr-1"></i>12.5%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">16</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">16</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">KPI</span>
                <span className="text-gray-900 font-semibold">82%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-green-600 rounded-full transition-all duration-300" style={{width: '82%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <i className="fas fa-chart-line text-orange-600"></i>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Tỷ lệ chuyển đổi</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">14.8%</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <i className="fas fa-arrow-up text-xs mr-1"></i>9.6%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">13.5%</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">14.8%</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">13.5%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">KPI</span>
                <span className="text-gray-900 font-semibold">95%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-orange-600 rounded-full transition-all duration-300" style={{width: '95%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Sales Funnel and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sales Funnel - Takes 3 columns */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Phễu bán hàng</h3>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 w-10 text-gray-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Nguồn Leads</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <i className="fab fa-facebook text-white text-sm"></i>
                    </div>
                    <span className="font-medium text-gray-900">Facebook</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">24.5%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phản hồi 24h</span>
                    <span className="font-medium text-blue-600">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá trị TB</span>
                    <span className="font-medium text-green-600">3.2tr</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="fab fa-google text-white text-sm"></i>
                    </div>
                    <span className="font-medium text-gray-900">Google</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">18.2%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phản hồi 24h</span>
                    <span className="font-medium text-blue-600">88%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá trị TB</span>
                    <span className="font-medium text-green-600">4.1tr</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-comment-alt text-white text-sm"></i>
                    </div>
                    <span className="font-medium text-gray-900">Zalo</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">15.3%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phản hồi 24h</span>
                    <span className="font-medium text-blue-600">95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá trị TB</span>
                    <span className="font-medium text-green-600">2.8tr</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-globe text-white text-sm"></i>
                    </div>
                    <span className="font-medium text-gray-900">Khác</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">8.7%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phản hồi 24h</span>
                    <span className="font-medium text-blue-600">75%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá trị TB</span>
                    <span className="font-medium text-green-600">1.9tr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Phễu chuyển đổi</h4>
            <div className="relative flex flex-col items-center space-y-4">
              <div className="relative w-full group">
                <div className="relative h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg mx-auto transition-all hover:scale-102 hover:shadow-lg cursor-pointer" style={{width: '100%'}}>
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <span className="font-medium">Tiềm năng</span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">254</span>
                      <span className="text-sm">100%</span>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-3 z-10">
                    <div className="flex flex-col">
                      <span className="font-bold">254 leads</span>
                      <span>Giai đoạn: Tiềm năng</span>
                      <span>Tỉ lệ chuyển đổi: 100%</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-gray-400 z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative w-full group">
                <div className="relative h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg mx-auto transition-all hover:scale-102 hover:shadow-lg cursor-pointer" style={{width: '85%'}}>
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <span className="font-medium">Liên hệ</span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">186</span>
                      <span className="text-sm">73.2%</span>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-3 z-10">
                    <div className="flex flex-col">
                      <span className="font-bold">186 leads</span>
                      <span>Giai đoạn: Liên hệ</span>
                      <span>Tỉ lệ chuyển đổi: 73.2%</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-gray-400 z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative w-full group">
                <div className="relative h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg mx-auto transition-all hover:scale-102 hover:shadow-lg cursor-pointer" style={{width: '70%'}}>
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <span className="font-medium">Đàm phán</span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">124</span>
                      <span className="text-sm">48.8%</span>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-3 z-10">
                    <div className="flex flex-col">
                      <span className="font-bold">124 leads</span>
                      <span>Giai đoạn: Đàm phán</span>
                      <span>Tỉ lệ chuyển đổi: 48.8%</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-gray-400 z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative w-full group">
                <div className="relative h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg mx-auto transition-all hover:scale-102 hover:shadow-lg cursor-pointer" style={{width: '55%'}}>
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <span className="font-medium">Đề xuất</span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">89</span>
                      <span className="text-sm">35.0%</span>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-3 z-10">
                    <div className="flex flex-col">
                      <span className="font-bold">89 leads</span>
                      <span>Giai đoạn: Đề xuất</span>
                      <span>Tỉ lệ chuyển đổi: 35.0%</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-gray-400 z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative w-full group">
                <div className="relative h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg mx-auto transition-all hover:scale-102 hover:shadow-lg cursor-pointer" style={{width: '40%'}}>
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <span className="font-medium">Chốt</span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">42</span>
                      <span className="text-sm">16.5%</span>
                    </div>
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-3 z-10">
                    <div className="flex flex-col">
                      <span className="font-bold">42 leads</span>
                      <span>Giai đoạn: Chốt</span>
                      <span>Tỉ lệ chuyển đổi: 16.5%</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-blue-800">Tỷ lệ chuyển đổi tổng</h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm mr-3">
                      <span className="text-xl font-bold text-blue-600">16.5%</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">42/254 leads thành công</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      <span className="text-sm font-medium">+2.3%</span>
                    </div>
                    <p className="text-xs text-blue-600">so với tháng trước</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notifications Sidebar - Takes 1 column */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Thông báo quan trọng</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-4">
            <div className="bg-red-50 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-100 hover:shadow-md hover:transform hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <i className="fas fa-file-contract text-red-600"></i>
                <div>
                  <p className="text-sm font-medium text-red-900">Gia hạn hợp đồng</p>
                  <p className="text-xs text-red-700">5 hợp đồng</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-yellow-100 hover:shadow-md hover:transform hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <i className="fas fa-file-alt text-yellow-600"></i>
                <div>
                  <p className="text-sm font-medium text-yellow-900">Duyệt báo cáo</p>
                  <p className="text-xs text-yellow-700">3 báo cáo</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-100 hover:shadow-md hover:transform hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <i className="fas fa-users text-blue-600"></i>
                <div>
                  <p className="text-sm font-medium text-blue-900">Họp team</p>
                  <p className="text-xs text-blue-700">2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-green-100 hover:shadow-md hover:transform hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <i className="fas fa-user-plus text-green-600"></i>
                <div>
                  <p className="text-sm font-medium text-green-900">Phân lead</p>
                  <p className="text-xs text-green-700">12 lead mới</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Nhiệm vụ ưu tiên</h4>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Gọi điện cho khách hàng ABC</p>
                  <p className="text-xs text-gray-500">Nguyễn Thanh • 06/06/2025</p>
                </div>
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">Cấp</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Gửi báo giá cho khách hàng XYZ</p>
                  <p className="text-xs text-gray-500">Trần Minh • 05/06/2025</p>
                </div>
              </div>
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Trung bình</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Chuẩn bị tài liệu cho cuộc họp</p>
                  <p className="text-xs text-gray-500">Lê Hương • 06/06/2025</p>
                </div>
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">Cấp</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700">Thông báo từ AI</h4>
              <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">Xem tất cả</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-user-plus text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Lead mới từ Facebook Ads - Ngành giáo dục</p>
                  <p className="text-xs text-gray-500">2 phút trước</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <i className="fas fa-tasks text-red-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Task quá hạn: Follow up KH Công ty XYZ</p>
                  <p className="text-xs text-gray-500">15 phút trước</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-calendar text-purple-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Lịch họp: Demo sản phẩm cho ABC Corp</p>
                  <p className="text-xs text-gray-500">30 phút trước</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-exchange-alt text-green-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Deal #123 đã chuyển sang giai đoạn Đàm phán</p>
                  <p className="text-xs text-gray-500">1 giờ trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section - Collapsible */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowComparison(!showComparison)}
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">So sánh thời gian</h3>
                <p className="text-sm text-gray-600">So sánh hiệu suất giữa các kỳ</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {showComparison ? 'Thu gọn' : 'Mở rộng'}
              </span>
              {showComparison ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          
          {showComparison && (
            <div className="mt-6 space-y-6">
              {/* Comparison Period Selector */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Kỳ 1:</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option value="this_month">Tháng này</option>
                    <option value="last_month">Tháng trước</option>
                    <option value="this_quarter">Quý này</option>
                    <option value="last_quarter">Quý trước</option>
                  </select>
                </div>
                <div className="text-gray-400">vs</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Kỳ 2:</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option value="last_month">Tháng trước</option>
                    <option value="this_month">Tháng này</option>
                    <option value="last_quarter">Quý trước</option>
                    <option value="this_quarter">Quý này</option>
                  </select>
                </div>
              </div>

              {/* Comparison Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Doanh thu</p>
                      <p className="text-xl font-bold text-gray-900">4.2 tỷ</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +15.3%
                      </p>
                      <p className="text-xs text-gray-500">vs tháng trước</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Leads mới</p>
                      <p className="text-xl font-bold text-gray-900">254</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600 flex items-center">
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                        -8.2%
                      </p>
                      <p className="text-xs text-gray-500">vs tháng trước</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tỷ lệ chuyển đổi</p>
                      <p className="text-xl font-bold text-gray-900">16.5%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +2.1%
                      </p>
                      <p className="text-xs text-gray-500">vs tháng trước</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis Section - Collapsible */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowAIAnalysis(!showAIAnalysis)}
          >
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Phân tích thông minh</h3>
                <p className="text-sm text-gray-600">Insights và khuyến nghị từ AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {showAIAnalysis ? 'Thu gọn' : 'Mở rộng'}
              </span>
              {showAIAnalysis ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          
          {showAIAnalysis && (
            <div className="mt-6 space-y-6">
              {/* AI Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">📊 Insights quan trọng</h4>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-green-900">Hiệu suất tốt</p>
                        <p className="text-sm text-green-700">Tỷ lệ chuyển đổi tăng 12% so với tháng trước, đặc biệt từ nguồn Facebook Ads.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Cảnh báo</p>
                        <p className="text-sm text-yellow-700">Thời gian phản hồi lead tăng 25%, có thể ảnh hưởng đến tỷ lệ chuyển đổi.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Cơ hội</p>
                        <p className="text-sm text-blue-700">Khách hàng từ Zalo có giá trị trung bình cao hơn 30% so với các kênh khác.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">💡 Khuyến nghị</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                          <span className="text-purple-600 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tối ưu hóa thời gian phản hồi</p>
                          <p className="text-sm text-gray-600">Thiết lập tự động phân phối lead để giảm thời gian phản hồi xuống dưới 2 giờ.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                          <span className="text-purple-600 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tăng ngân sách Zalo Ads</p>
                          <p className="text-sm text-gray-600">Xem xét tăng 20% ngân sách cho Zalo để tận dụng ROI cao hơn.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                          <span className="text-purple-600 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Training team sales</p>
                          <p className="text-sm text-gray-600">Đào tạo kỹ năng closing cho team để cải thiện tỷ lệ chốt deal giai đoạn cuối.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">AI Tổng quan</span>
                </div>
                <p className="text-sm text-purple-800">
                  Dựa trên dữ liệu 30 ngày qua, doanh nghiệp đang có xu hướng tích cực với doanh thu tăng trưởng mạnh. 
                  Tuy nhiên, cần chú ý tối ưu hóa quy trình phản hồi và tận dụng hiệu quả các kênh có ROI cao như Zalo. 
                  Dự báo tháng tới có thể đạt 4.8 tỷ doanh thu nếu thực hiện các khuyến nghị trên.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}