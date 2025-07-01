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
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Doanh thu theo tháng</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">6 tháng</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">12 tháng</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">Tùy chỉnh</button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Doanh thu (tỷ)"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  name="Mục tiêu (tỷ)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Nguồn leads</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {leadSourceData.map((source, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{backgroundColor: source.color}}
                  ></div>
                  <span>{source.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{source.leads}</span>
                  <span className="text-gray-500">({source.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Phễu chuyển đổi</h3>
          <div className="space-y-3">
            {conversionData.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">{stage.count}</span>
                    <span className="text-xs text-gray-500">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{width: `${stage.percentage}%`}}
                  >
                    <span className="text-white text-xs font-medium">
                      {stage.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Hoạt động gần đây</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            {activityData.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'new' ? 'bg-green-500' :
                  activity.status === 'progress' ? 'bg-blue-500' :
                  activity.status === 'scheduled' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.type}</p>
                  <p className="text-xs text-gray-500">
                    {activity.name} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
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
                <th className="text-right py-2 text-sm font-medium text-gray-600">Tỷ lệ chuyển đổi</th>
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
                      <span className="font-medium">{performer.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 font-medium">{performer.revenue}</td>
                  <td className="text-right py-3">{performer.deals}</td>
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

      {/* Collapsible sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Section */}
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
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis Section */}
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
            <div className="mt-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Hiệu suất tốt</p>
                    <p className="text-sm text-green-700">Tỷ lệ chuyển đổi tăng 12% so với tháng trước.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Cảnh báo</p>
                    <p className="text-sm text-yellow-700">Thời gian phản hồi lead tăng 25%.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
