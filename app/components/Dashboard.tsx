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
  BarChart3,
  Plus,
  Minus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import EnhancedDashboardFilters from './EnhancedDashboardFilters'
// import VileadRevenueChart from './VileadRevenueChart'

export default function Dashboard() {
  // State for time period selection
  const [selectedPeriod, setSelectedPeriod] = useState<'thismonth' | '6months' | '12months' | 'custom'>('thismonth')
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  
  // Sample data for different periods
  const revenueDataThisMonth = [
    { month: '01/07', revenue: 0.12, target: 0.15 },
    { month: '02/07', revenue: 0.18, target: 0.15 },
    { month: '03/07', revenue: 0.14, target: 0.15 },
    { month: '04/07', revenue: 0.16, target: 0.15 },
    { month: '05/07', revenue: 0.21, target: 0.15 },
    { month: '06/07', revenue: 0.19, target: 0.15 },
    { month: '07/07', revenue: 0.23, target: 0.15 },
    { month: '08/07', revenue: 0.17, target: 0.15 },
    { month: '09/07', revenue: 0.25, target: 0.15 },
    { month: '10/07', revenue: 0.22, target: 0.15 },
    { month: '11/07', revenue: 0.20, target: 0.15 },
    { month: '12/07', revenue: 0.24, target: 0.15 },
    { month: '13/07', revenue: 0.18, target: 0.15 },
    { month: '14/07', revenue: 0.26, target: 0.15 },
    { month: '15/07', revenue: 0.28, target: 0.15 },
    { month: '16/07', revenue: 0.22, target: 0.15 },
    { month: '17/07', revenue: 0.19, target: 0.15 },
    { month: '18/07', revenue: 0.31, target: 0.15 },
    { month: '19/07', revenue: 0.27, target: 0.15 },
    { month: '20/07', revenue: 0.24, target: 0.15 },
    { month: '21/07', revenue: 0.29, target: 0.15 },
    { month: '22/07', revenue: 0.25, target: 0.15 },
    { month: '23/07', revenue: 0.33, target: 0.15 },
    { month: '24/07', revenue: 0.28, target: 0.15 },
    { month: '25/07', revenue: 0.30, target: 0.15 },
    { month: '26/07', revenue: 0.27, target: 0.15 },
    { month: '27/07', revenue: 0.32, target: 0.15 },
    { month: '28/07', revenue: 0.29, target: 0.15 },
    { month: '29/07', revenue: 0.35, target: 0.15 },
    { month: '30/07', revenue: 0.31, target: 0.15 },
  ]

  const revenueData6Months = [
    { month: 'T1', revenue: 2.8, target: 3.0 },
    { month: 'T2', revenue: 3.2, target: 3.5 },
    { month: 'T3', revenue: 2.9, target: 3.2 },
    { month: 'T4', revenue: 3.8, target: 4.0 },
    { month: 'T5', revenue: 4.2, target: 4.2 },
    { month: 'T6', revenue: 3.9, target: 4.1 },
  ]

  const revenueData12Months = [
    { month: 'T1/2024', revenue: 2.1, target: 2.5 },
    { month: 'T2/2024', revenue: 2.3, target: 2.7 },
    { month: 'T3/2024', revenue: 2.6, target: 2.8 },
    { month: 'T4/2024', revenue: 2.4, target: 2.9 },
    { month: 'T5/2024', revenue: 2.7, target: 3.0 },
    { month: 'T6/2024', revenue: 2.9, target: 3.1 },
    { month: 'T7/2024', revenue: 2.8, target: 3.0 },
    { month: 'T8/2024', revenue: 3.2, target: 3.5 },
    { month: 'T9/2024', revenue: 2.9, target: 3.2 },
    { month: 'T10/2024', revenue: 3.8, target: 4.0 },
    { month: 'T11/2024', revenue: 4.2, target: 4.2 },
    { month: 'T12/2024', revenue: 3.9, target: 4.1 },
  ]

  // Get current data based on selected period
  const getCurrentRevenueData = () => {
    switch (selectedPeriod) {
      case 'thismonth':
        return revenueDataThisMonth
      case '6months':
        return revenueData6Months
      case '12months':
        return revenueData12Months
      case 'custom':
        // For custom, we'll use 6months data as fallback
        return revenueData6Months
      default:
        return revenueData6Months
    }
  }

  const revenueData = getCurrentRevenueData()

  // Calculate summary stats based on current data
  const calculateSummaryStats = () => {
    const currentRevenue = revenueData[revenueData.length - 1]?.revenue || 0
    const currentTarget = revenueData[revenueData.length - 1]?.target || 0
    const achievementRate = currentTarget > 0 ? (currentRevenue / currentTarget * 100).toFixed(1) : '0'
    
    const avgGrowth = revenueData.length > 1 
      ? ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100 / (revenueData.length - 1)).toFixed(1)
      : '0'
    
    const bestMonth = revenueData.reduce((best, current) => 
      current.revenue > best.revenue ? current : best, revenueData[0])
    
    const predictedNext = currentRevenue * (1 + parseFloat(avgGrowth) / 100)
    
    return {
      currentRevenue,
      currentTarget,
      achievementRate,
      avgGrowth,
      bestMonth,
      predictedNext: predictedNext.toFixed(1),
      predictedGrowth: ((predictedNext - currentRevenue) / currentRevenue * 100).toFixed(1)
    }
  }

  const summaryStats = calculateSummaryStats()

  // Handle custom date selection
  const handleCustomPeriod = () => {
    setShowCustomModal(true)
  }

  const applyCustomPeriod = () => {
    if (customStartDate && customEndDate) {
      setSelectedPeriod('custom')
      setShowCustomModal(false)
      // In a real app, you would fetch data for this custom period
      console.log('Custom period:', customStartDate, 'to', customEndDate)
    }
  }

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

  // Top products data
  const topProducts = [
    { 
      name: 'CRM Professional', 
      revenue: '2.850.000.000 đ', 
      units: 45, 
      growth: '+18%',
      category: 'Software'
    },
    { 
      name: 'Marketing Automation', 
      revenue: '1.920.000.000 đ', 
      units: 28, 
      growth: '+12%',
      category: 'Software'
    },
    { 
      name: 'Sales Analytics', 
      revenue: '1.480.000.000 đ', 
      units: 32, 
      growth: '+25%',
      category: 'Analytics'
    },
    { 
      name: 'Customer Support Plus', 
      revenue: '980.000.000 đ', 
      units: 18, 
      growth: '-5%',
      category: 'Service'
    },
    { 
      name: 'Integration Suite', 
      revenue: '720.000.000 đ', 
      units: 12, 
      growth: '+8%',
      category: 'Integration'
    },
  ]

  // Important tasks data (max 4)
  const importantTasks = [
    { 
      id: 1,
      title: 'Gọi lại khách hàng ABC Corp', 
      deadline: 'Hôm nay, 15:00', 
      priority: 'urgent',
      priorityText: 'Khẩn cấp',
      color: {
        border: 'border-red-500',
        bg: 'bg-red-50',
        dot: 'bg-red-500',
        text: 'text-red-900',
        subtext: 'text-red-700',
        badge: 'bg-red-100 text-red-800'
      }
    },
    { 
      id: 2,
      title: 'Hoàn thiện báo giá dự án XYZ', 
      deadline: 'Ngày mai, 09:00', 
      priority: 'high',
      priorityText: 'Cao',
      color: {
        border: 'border-orange-500',
        bg: 'bg-orange-50',
        dot: 'bg-orange-500',
        text: 'text-orange-900',
        subtext: 'text-orange-700',
        badge: 'bg-orange-100 text-orange-800'
      }
    },
    { 
      id: 3,
      title: 'Cập nhật thông tin lead mới', 
      deadline: '05/07/2025', 
      priority: 'medium',
      priorityText: 'Trung bình',
      color: {
        border: 'border-yellow-500',
        bg: 'bg-yellow-50',
        dot: 'bg-yellow-500',
        text: 'text-yellow-900',
        subtext: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800'
      }
    },
    { 
      id: 4,
      title: 'Tổng kết báo cáo tháng 6', 
      deadline: '04/07/2025', 
      priority: 'medium',
      priorityText: 'Trung bình',
      color: {
        border: 'border-blue-500',
        bg: 'bg-blue-50',
        dot: 'bg-blue-500',
        text: 'text-blue-900',
        subtext: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800'
      }
    }
  ]

  // Today's schedule data (max 4)
  const todaySchedule = [
    {
      id: 1,
      title: 'Họp báo cáo tuần với team',
      time: '10:00 - 11:00',
      location: 'Phòng họp A',
      type: 'meeting',
      color: {
        bg: 'bg-blue-50',
        iconBg: 'bg-blue-500',
        text: 'text-blue-900',
        subtext: 'text-blue-700'
      },
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Demo sản phẩm cho DEF Company',
      time: '14:30 - 15:30',
      location: 'Online Meeting',
      type: 'demo',
      color: {
        bg: 'bg-green-50',
        iconBg: 'bg-green-500',
        text: 'text-green-900',
        subtext: 'text-green-700'
      },
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Cuộc gọi tư vấn khách hàng mới',
      time: '16:00 - 16:30',
      location: 'Số điện thoại',
      type: 'call',
      color: {
        bg: 'bg-purple-50',
        iconBg: 'bg-purple-500',
        text: 'text-purple-900',
        subtext: 'text-purple-700'
      },
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Họp review dự án với khách hàng',
      time: '17:30 - 18:00',
      location: 'Zoom Meeting',
      type: 'review',
      color: {
        bg: 'bg-indigo-50',
        iconBg: 'bg-indigo-500',
        text: 'text-indigo-900',
        subtext: 'text-indigo-700'
      },
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

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
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Doanh thu</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">2.8 tỷ</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-1" />12.0%
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
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Số lượng leads</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">245</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-1" />18.5%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">207</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">245</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">207</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">KPI</span>
                <span className="text-gray-900 font-semibold">92%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-purple-600 rounded-full transition-all duration-300" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Percent className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Tỷ lệ chuyển đổi</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">18.5%</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-1" />2.3%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">16.2%</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">18.5%</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">16.2%</span>
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

        <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Số lượng công việc</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">68</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-red-600">
                    <ArrowDownRight className="w-3 h-3 mr-1" />5.2%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">72</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">68</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">72</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">KPI</span>
                <span className="text-gray-900 font-semibold">88%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-green-600 rounded-full transition-all duration-300" style={{width: '88%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Revenue Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 p-8 rounded-2xl shadow-xl border border-blue-100/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Doanh thu theo {selectedPeriod === 'thismonth' ? 'ngày' : selectedPeriod === '12months' ? 'tháng (năm)' : 'tháng'}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  Theo dõi xu hướng {selectedPeriod === 'thismonth' ? 'hàng ngày' : 'tăng trưởng'} • Cập nhật realtime
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSelectedPeriod('thismonth')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                  selectedPeriod === 'thismonth' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Tháng này
              </button>
              <button 
                onClick={() => setSelectedPeriod('6months')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                  selectedPeriod === '6months' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                6 tháng
              </button>
              <button 
                onClick={() => setSelectedPeriod('12months')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                  selectedPeriod === '12months' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                12 tháng
              </button>
              <button 
                onClick={handleCustomPeriod}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                  selectedPeriod === 'custom' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Tùy chỉnh
              </button>
            </div>
          </div>
          
          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-white to-blue-50/50 p-5 rounded-xl shadow-md border border-blue-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md"></div>
                  <span className="text-xs text-gray-600 font-bold tracking-wide uppercase">Doanh thu hiện tại</span>
                </div>
                <div className="p-1.5 bg-blue-100 rounded-full">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-gray-900">{summaryStats.currentRevenue}</span>
                <span className="text-lg font-semibold text-gray-600">tỷ</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-green-600" />
                <span className="text-sm font-semibold text-green-600">+{summaryStats.avgGrowth}%</span>
                <span className="text-xs text-gray-500">so với kỳ trước</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-green-50/50 p-5 rounded-xl shadow-md border border-green-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md"></div>
                  <span className="text-xs text-gray-600 font-bold tracking-wide uppercase">
                    Mục tiêu {
                      selectedPeriod === '12months' ? 'năm' : 
                      selectedPeriod === 'thismonth' ? 'tháng' : 
                      'kỳ'
                    }
                  </span>
                </div>
                <div className="p-1.5 bg-green-100 rounded-full">
                  <Target className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-gray-900">{summaryStats.currentTarget}</span>
                <span className="text-lg font-semibold text-gray-600">tỷ</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <div className={`w-3 h-3 rounded-full ${parseFloat(summaryStats.achievementRate) >= 100 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <span className={`text-sm font-semibold ${parseFloat(summaryStats.achievementRate) >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                  {summaryStats.achievementRate}% hoàn thành
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-purple-50/50 p-5 rounded-xl shadow-md border border-purple-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-md"></div>
                  <span className="text-xs text-gray-600 font-bold tracking-wide uppercase">Tăng trưởng TB</span>
                </div>
                <div className="p-1.5 bg-purple-100 rounded-full">
                  <BarChart3 className="w-3 h-3 text-purple-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-gray-900">+{summaryStats.avgGrowth}</span>
                <span className="text-lg font-semibold text-gray-600">%</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-gray-500">
                  {selectedPeriod === '12months' ? 'Trung bình 12 tháng' : 
                   selectedPeriod === 'thismonth' ? 'Trung bình hàng ngày' : 
                   'Trung bình 6 tháng'}
                </span>
              </div>
            </div>
          </div>

            <div className="relative">
            <div className="h-96 bg-gradient-to-br from-white via-blue-50/20 to-blue-100/30 rounded-xl p-6 border border-blue-100/40 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 25, right: 35, left: 25, bottom: selectedPeriod === 'thismonth' ? 70 : 35 }}>
                  <defs>
                    {/* Enhanced gradients for better visual appeal */}
                    <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="50%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.1} />
                    </linearGradient>
                    {/* Shadow filters for depth */}
                    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.2"/>
                    </filter>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="2 4" 
                    stroke="#cbd5e1" 
                    strokeOpacity={0.4}
                    strokeWidth={1}
                  />
                  <XAxis 
                    dataKey="month" 
                    stroke="#475569" 
                    fontSize={selectedPeriod === 'thismonth' ? 10 : 12}
                    fontWeight="500"
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                    interval={selectedPeriod === 'thismonth' ? Math.floor(revenueData.length / 10) : 'preserveStartEnd'}
                    angle={selectedPeriod === 'thismonth' ? -45 : 0}
                    textAnchor={selectedPeriod === 'thismonth' ? 'end' : 'middle'}
                    height={selectedPeriod === 'thismonth' ? 70 : 35}
                    tick={{ fill: '#475569' }}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={12}
                    fontWeight="500"
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                    tickFormatter={(value) => `${value} tỷ`}
                    domain={['dataMin - 0.02', 'dataMax + 0.02']}
                    tick={{ fill: '#475569' }}
                    width={50}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      padding: '16px',
                      backdropFilter: 'blur(10px)'
                    }}
                    labelStyle={{ 
                      color: '#1f2937', 
                      fontWeight: '700', 
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}
                    itemStyle={{
                      fontSize: '13px',
                      fontWeight: '600',
                      padding: '2px 0'
                    }}
                    formatter={(value, name) => [
                      <span key="value" className="font-bold text-lg">{`${value} tỷ VND`}</span>,
                      <span key="label" className={`font-semibold ${name === 'revenue' ? 'text-blue-600' : 'text-green-600'}`}>
                        {name === 'revenue' ? '💰 Doanh thu' : '🎯 Mục tiêu'}
                      </span>
                    ]}
                    labelFormatter={(label) => 
                      selectedPeriod === 'thismonth' ? `📅 Ngày ${label}` : `📊 ${label}`
                    }
                    cursor={{ 
                      stroke: '#3b82f6', 
                      strokeWidth: 2, 
                      strokeOpacity: 0.3,
                      strokeDasharray: '5 5'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="url(#revenueGradient)" 
                    strokeWidth={selectedPeriod === 'thismonth' ? 3 : 4}
                    dot={{ 
                      fill: '#ffffff', 
                      strokeWidth: 3, 
                      r: selectedPeriod === 'thismonth' ? 4 : 7,
                      stroke: '#3b82f6',
                      filter: 'url(#dropShadow)'
                    }}
                    activeDot={{ 
                      r: selectedPeriod === 'thismonth' ? 7 : 10, 
                      fill: '#3b82f6',
                      stroke: '#ffffff',
                      strokeWidth: 3,
                      filter: 'url(#dropShadow)',
                      style: { cursor: 'pointer' }
                    }}
                    name="revenue"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="url(#targetGradient)" 
                    strokeWidth={selectedPeriod === 'thismonth' ? 2.5 : 3.5}
                    strokeDasharray="6 3"
                    dot={{ 
                      fill: '#ffffff', 
                      strokeWidth: 2, 
                      r: selectedPeriod === 'thismonth' ? 3 : 5,
                      stroke: '#10b981'
                    }}
                    activeDot={{ 
                      r: selectedPeriod === 'thismonth' ? 5 : 7, 
                      fill: '#10b981',
                      stroke: '#ffffff',
                      strokeWidth: 2,
                      style: { cursor: 'pointer' }
                    }}
                    name="target"
                    opacity={0.8}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              {/* Chart Legend */}
              <div className="absolute bottom-4 left-6 flex items-center space-x-6 bg-white/90 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-700">Doanh thu thực tế</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-green-500 rounded" style={{borderStyle: 'dashed'}}></div>
                  <span className="text-xs font-semibold text-gray-700">Mục tiêu</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Achievement indicator */}
            <div className="absolute top-6 right-6 bg-white/95 px-4 py-3 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full animate-pulse shadow-md ${
                  parseFloat(summaryStats.achievementRate) >= 100 ? 'bg-green-500' : 
                  parseFloat(summaryStats.achievementRate) >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Hiệu suất</span>
                  <div className="text-sm font-black text-gray-900">{summaryStats.achievementRate}%</div>
                </div>
              </div>
            </div>
            
            {/* Performance Trend Indicator */}
            <div className="absolute top-20 right-6 bg-white/95 px-4 py-2 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                {parseFloat(summaryStats.avgGrowth) > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-xs font-bold ${parseFloat(summaryStats.avgGrowth) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(summaryStats.avgGrowth) > 0 ? '+' : ''}{summaryStats.avgGrowth}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Tasks & Schedule */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Công việc quan trọng</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem tất cả</button>
          </div>
          
          <div className="space-y-3">
            {/* Important Tasks - Display up to 4 */}
            {importantTasks.slice(0, 4).map((task) => (
              <div key={task.id} className={`border-l-4 ${task.color.border} ${task.color.bg} p-3 rounded-r-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 ${task.color.dot} rounded-full`}></div>
                    <div>
                      <p className={`text-sm font-medium ${task.color.text}`}>{task.title}</p>
                      <p className={`text-xs ${task.color.subtext}`}>Deadline: {task.deadline}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 ${task.color.badge} text-xs rounded-full font-medium`}>
                    {task.priorityText}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Schedule */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Lịch quan trọng hôm nay</h4>
            <div className="space-y-3">
              {/* Today's Schedule - Display up to 4 */}
              {todaySchedule.slice(0, 4).map((schedule) => (
                <div key={schedule.id} className={`flex items-center space-x-3 p-2 ${schedule.color.bg} rounded-lg`}>
                  <div className={`w-8 h-8 ${schedule.color.iconBg} rounded-lg flex items-center justify-center`}>
                    {schedule.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${schedule.color.text}`}>{schedule.title}</p>
                    <p className={`text-xs ${schedule.color.subtext}`}>{schedule.time} • {schedule.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-6">Phễu chuyển đổi</h3>
          <div className="space-y-4">
            {conversionData.map((stage, index) => {
              const nextStage = conversionData[index + 1]
              const dropoffRate = nextStage ? ((stage.count - nextStage.count) / stage.count * 100).toFixed(1) : '0'
              
              return (
                <div key={index} className="relative group">
                  {/* Stage info */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-600' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-blue-400' :
                        index === 3 ? 'bg-blue-300' :
                        'bg-blue-200'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-900">{stage.count}</span>
                      <span className="text-sm text-gray-500">({stage.percentage}%)</span>
                      {parseFloat(dropoffRate) > 0 && (
                        <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                          -{dropoffRate}%
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Funnel visualization */}
                  <div className="relative mb-4">
                    <div 
                      className={`h-12 rounded-lg shadow-sm transition-all duration-500 flex items-center justify-between px-4 ${
                        index === 0 ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
                        index === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                        index === 2 ? 'bg-gradient-to-r from-blue-400 to-blue-300' :
                        index === 3 ? 'bg-gradient-to-r from-blue-300 to-blue-200' :
                        'bg-gradient-to-r from-blue-200 to-blue-100'
                      } group-hover:shadow-md`}
                      style={{
                        width: `${Math.max(stage.percentage, 20)}%`,
                        marginLeft: `${(100 - Math.max(stage.percentage, 20)) / 2}%`
                      }}
                    >
                      <span className="text-white text-sm font-semibold">
                        {stage.percentage}%
                      </span>
                      <span className="text-white text-xs">
                        {stage.count} leads
                      </span>
                    </div>
                    
                    {/* Dropoff indicator */}
                    {index < conversionData.length - 1 && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-4 bg-gray-200 rounded-b-full flex items-end justify-center">
                          <div className="w-1 h-2 bg-red-400 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Conversion rate tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-lg z-10 min-w-48">
                    <div className="space-y-1">
                      <div className="font-semibold">{stage.stage}</div>
                      <div className="flex justify-between">
                        <span>Số lượng:</span>
                        <span className="font-medium">{stage.count} leads</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tỷ lệ:</span>
                        <span className="font-medium">{stage.percentage}%</span>
                      </div>
                      {nextStage && (
                        <div className="flex justify-between text-red-300">
                          <span>Tỷ lệ rớt:</span>
                          <span className="font-medium">{dropoffRate}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {conversionData[conversionData.length - 1].count}
                </div>
                <div className="text-xs text-gray-500">Deals thành công</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {conversionData[conversionData.length - 1].percentage}%
                </div>
                <div className="text-xs text-gray-500">Tỷ lệ chuyển đổi</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">
                  {(conversionData[0].count - conversionData[conversionData.length - 1].count)}
                </div>
                <div className="text-xs text-gray-500">Leads bị mất</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Sources Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Nguồn Leads & Phân tích</h3>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Chi tiết</button>
          </div>
          
          {/* Lead Sources Performance */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Facebook Ads</div>
                  <div className="text-sm text-blue-700">245 leads • 24.5%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-900">92%</div>
                <div className="text-xs text-green-600">Chất lượng cao</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-green-900">Google Ads</div>
                  <div className="text-sm text-green-700">182 leads • 18.2%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-900">88%</div>
                <div className="text-xs text-green-600">Ổn định</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.8 2.4L6.4 1L1 6.4l1.4 1.4L7.8 2.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-orange-900">Zalo Business</div>
                  <div className="text-sm text-orange-700">153 leads • 15.3%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-900">95%</div>
                <div className="text-xs text-orange-600">ROI cao</div>
              </div>
            </div>
          </div>

          {/* Bottleneck Analysis */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Điểm tắc nghẽn
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-red-900">Thời gian phản hồi leads</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-900">3.2 giờ</div>
                  <div className="text-xs text-red-600">+25% so với tháng trước</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-900">Giai đoạn &quot;Đàm phán&quot;</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-yellow-900">124 leads</div>
                  <div className="text-xs text-yellow-600">Tồn đọng 5 ngày</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-900">Phân bổ leads</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-900">67 leads</div>
                  <div className="text-xs text-blue-600">Chưa assign</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                Phân bổ leads
              </button>
              <button className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                Tối ưu phản hồi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sales Performers */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top nhân viên kinh doanh</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Xem báo cáo đầy đủ</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Nhân viên</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Doanh thu</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Deals</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((performer, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {performer.name.charAt(0)}
                        </div>
                        <span className="font-medium text-sm">{performer.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 font-medium text-sm">{performer.revenue}</td>
                    <td className="text-right py-3 text-sm">{performer.deals}</td>
                    <td className="text-right py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parseInt(performer.conversion) >= 50 ? 'bg-green-100 text-green-800' :
                        parseInt(performer.conversion) >= 30 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {performer.conversion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top sản phẩm</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Xem báo cáo đầy đủ</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Sản phẩm</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Doanh thu</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Đơn vị</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Tăng trưởng</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-sm">{product.name}</span>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-3 font-medium text-sm">{product.revenue}</td>
                    <td className="text-right py-3 text-sm">{product.units}</td>
                    <td className="text-right py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.growth.startsWith('+') ? 'bg-green-100 text-green-800' :
                        product.growth.startsWith('-') ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Date Range Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Chọn khoảng thời gian</h3>
              <button 
                onClick={() => setShowCustomModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Quick preset buttons */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Hoặc chọn nhanh:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const today = new Date()
                      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
                      setCustomStartDate(lastMonth.toISOString().split('T')[0])
                      setCustomEndDate(today.toISOString().split('T')[0])
                    }}
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    30 ngày qua
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date()
                      const last3Months = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
                      setCustomStartDate(last3Months.toISOString().split('T')[0])
                      setCustomEndDate(today.toISOString().split('T')[0])
                    }}
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    3 tháng qua
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date()
                      const startOfYear = new Date(today.getFullYear(), 0, 1)
                      setCustomStartDate(startOfYear.toISOString().split('T')[0])
                      setCustomEndDate(today.toISOString().split('T')[0])
                    }}
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Từ đầu năm
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date()
                      const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
                      setCustomStartDate(lastYear.toISOString().split('T')[0])
                      setCustomEndDate(today.toISOString().split('T')[0])
                    }}
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    1 năm qua
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCustomModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={applyCustomPeriod}
                disabled={!customStartDate || !customEndDate}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
