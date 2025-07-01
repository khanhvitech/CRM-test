'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  Filter, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Brain,
  Target,
  Calendar,
  Zap,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface DashboardFiltersProps {
  onFilterChange?: (filters: any) => void
}

export default function EnhancedDashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [timeFilter, setTimeFilter] = useState('thisMonth')
  const [compareTimeFilter, setCompareTimeFilter] = useState('lastMonth')
  const [teamFilter, setTeamFilter] = useState('')
  const [productFilter, setProductFilter] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [showAIInsights, setShowAIInsights] = useState(false)

  const handleTimeChange = (value: string) => {
    setTimeFilter(value)
    notifyFilterChange({ time: value, compareTime: compareTimeFilter, team: teamFilter, product: productFilter })
  }

  const handleCompareTimeChange = (value: string) => {
    setCompareTimeFilter(value)
    notifyFilterChange({ time: timeFilter, compareTime: value, team: teamFilter, product: productFilter })
  }

  const handleTeamChange = (value: string) => {
    setTeamFilter(value)
    notifyFilterChange({ time: timeFilter, compareTime: compareTimeFilter, team: value, product: productFilter })
  }

  const handleProductChange = (value: string) => {
    setProductFilter(value)
    notifyFilterChange({ time: timeFilter, compareTime: compareTimeFilter, team: teamFilter, product: value })
  }

  const notifyFilterChange = (filters: any) => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  // Sample AI insights data
  const aiInsights = [
    {
      type: 'positive',
      icon: <TrendingUp className="w-4 h-4" />,
      title: 'Tăng trưởng mạnh',
      message: 'Leads từ Facebook tăng 45% so với tháng trước. Nên tăng ngân sách quảng cáo Facebook.',
      priority: 'high'
    },
    {
      type: 'warning',
      icon: <AlertCircle className="w-4 h-4" />,
      title: 'Cần chú ý',
      message: 'Tỷ lệ chuyển đổi từ Zalo giảm 12%. Kiểm tra chất lượng nội dung.',
      priority: 'medium'
    },
    {
      type: 'suggestion',
      icon: <Target className="w-4 h-4" />,
      title: 'Gợi ý tối ưu',
      message: 'Nhóm A có tỷ lệ chốt cao nhất (68%). Nên áp dụng phương pháp này cho nhóm khác.',
      priority: 'medium'
    }
  ]

  // Sample comparison data
  const comparisonData = [
    { metric: 'Doanh thu', current: '2.8 tỷ', previous: '2.5 tỷ', change: 12.0, trend: 'up' },
    { metric: 'Leads mới', current: '245', previous: '230', change: 6.5, trend: 'up' },
    { metric: 'Tỷ lệ chuyển đổi', current: '23.5%', previous: '25.1%', change: -6.4, trend: 'down' },
    { metric: 'Đơn hàng', current: '56', previous: '48', change: 16.7, trend: 'up' }
  ]

  return (
    <div className="mb-6 space-y-4">
      {/* Main Filters */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          {/* Time Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Thời gian:</label>
            <div className="relative">
              <select 
                value={timeFilter}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1.5 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="today">Hôm nay</option>
                <option value="yesterday">Hôm qua</option>
                <option value="last7days">7 ngày qua</option>
                <option value="thisMonth">Tháng này</option>
                <option value="lastMonth">Tháng trước</option>
                <option value="thisQuarter">Quý này</option>
                <option value="thisYear">Năm nay</option>
                <option value="custom">Tùy chọn</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Team Filter */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <select 
              value={teamFilter}
              onChange={(e) => handleTeamChange(e.target.value)}
              className="border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toàn bộ</option>
              <option value="nhom_a">Nhóm A</option>
              <option value="nhom_b">Nhóm B</option>
              <option value="nhom_c">Nhóm C</option>
              <option value="nhom_d">Nhóm D</option>
              <option value="nhom_e">Nhóm E</option>
            </select>
          </div>

          {/* Product Filter */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            <select 
              value={productFilter}
              onChange={(e) => handleProductChange(e.target.value)}
              className="border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả sản phẩm</option>
              <option value="product1">Sản phẩm A</option>
              <option value="product2">Sản phẩm B</option>
              <option value="product3">Sản phẩm C</option>
              <option value="product4">Sản phẩm D</option>
              <option value="product5">Sản phẩm E</option>
            </select>
          </div>

          {/* Advanced Filter Button */}
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Lọc nâng cao</span>
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm ${
              showComparison 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg transform hover:scale-105' 
                : 'bg-white border-2 border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50 hover:shadow-md'
            }`}
          >
            <BarChart3 className={`w-5 h-5 ${showComparison ? 'animate-pulse' : ''}`} />
            <span className="relative">
              📊 So sánh
              {showComparison && (
                <span className="absolute -top-1 -right-6 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </span>
          </button>
          
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className={`group relative flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg ${
              showAIInsights 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700' 
                : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 text-purple-700 hover:border-purple-300 hover:from-purple-100 hover:to-indigo-100'
            }`}
          >
            {!showAIInsights && (
              <div className="absolute -top-1 -right-1">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  4 gợi ý
                </div>
              </div>
            )}
            <div className={`p-2 rounded-lg transition-all duration-200 ${
              showAIInsights 
                ? 'bg-white/20' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600'
            }`}>
              <Brain className={`w-5 h-5 transition-all duration-200 ${
                showAIInsights 
                  ? 'text-white' 
                  : 'text-white'
              }`} />
            </div>
            <div className="flex flex-col">
              <span className="relative flex items-center gap-2">
                🤖 AI Phân tích thông minh
                {!showAIInsights && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-normal opacity-75">Live</span>
                  </div>
                )}
              </span>
              {!showAIInsights && (
                <span className="text-xs opacity-75 font-normal">
                  23 leads • 3 quá hạn • 18.5% conversion
                </span>
              )}
            </div>
            {showAIInsights && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Comparison Panel */}
      {showComparison && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              So sánh hiệu suất
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">So với:</span>
              <select 
                value={compareTimeFilter}
                onChange={(e) => handleCompareTimeChange(e.target.value)}
                className="border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="lastMonth">Tháng trước</option>
                <option value="lastQuarter">Quý trước</option>
                <option value="lastYear">Năm trước</option>
                <option value="sameMonthLastYear">Cùng kỳ năm trước</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.metric}</span>
                  <div className={`flex items-center text-sm font-medium ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(item.change)}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{item.current}</span>
                  <span className="text-sm text-gray-500">{item.previous}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights Panel */}
      {showAIInsights && (
        <div className="mt-8">
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4 flex items-center">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg mr-3 shadow-lg">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            🤖 Gợi ý từ AI
            <div className="inline-flex items-center rounded-full border px-3 py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ml-3 text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-300 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Live AI
            </div>
          </h3>
          <div className="space-y-3 mb-6">
            {/* Leads hot chưa liên hệ */}
            <div className="bg-white border border-red-200 hover:border-red-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="flex justify-center mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">Ưu tiên gọi 23 leads hot</h3>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 text-xs animate-pulse">
                      🔥 KHẨN CẤP
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Dựa trên thống kê: 23 leads hot chưa liên hệ (+15% từ tuần trước). Bắt đầu với 5 leads có điểm số cao nhất.</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center space-x-1 bg-red-100 rounded-full px-2 py-1">
                      <Target className="w-3 h-3 text-red-600" />
                      <span className="text-xs text-red-700 font-bold">23 leads</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                      <Brain className="w-3 h-3 text-purple-600" />
                      <span className="text-xs text-purple-700 font-bold">98% tin cậy</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-100 rounded-full px-2 py-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-700 font-bold">Impact cao</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Thời gian dự kiến: <span className="font-medium">2-3 giờ</span></div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-red-500 hover:bg-red-600 text-white">
                      Bắt đầu gọi
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Khách hàng cần liên hệ lại */}
            <div className="bg-white border border-orange-200 hover:border-orange-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div className="flex justify-center mt-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">Follow-up 3 khách hàng quá hạn</h3>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-orange-100 text-orange-700 border-orange-300 text-xs">
                      ⚡ ƯU TIÊN CAO
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Trong 12 khách hàng cần follow-up, có 3 khách đã quá hạn liên hệ. Gửi email cá nhân hóa để duy trì mối quan hệ.</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center space-x-1 bg-orange-100 rounded-full px-2 py-1">
                      <Calendar className="w-3 h-3 text-orange-600" />
                      <span className="text-xs text-orange-700 font-bold">3 quá hạn</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                      <Brain className="w-3 h-3 text-purple-600" />
                      <span className="text-xs text-purple-700 font-bold">92% tin cậy</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-100 rounded-full px-2 py-1">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-700 font-bold">Giữ chân KH</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Thời gian dự kiến: <span className="font-medium">1 giờ</span></div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-orange-500 hover:bg-orange-600 text-white">
                      Soạn email
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tỷ lệ chuyển đổi */}
            <div className="bg-white border border-green-200 hover:border-green-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                      <path d="M3 3v18h18"></path>
                      <path d="M18 17V9"></path>
                      <path d="M13 17V5"></path>
                      <path d="M8 17v-3"></path>
                    </svg>
                  </div>
                  <div className="flex justify-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">Tỷ lệ chuyển đổi tăng 18.5%</h3>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-green-100 text-green-700 border-green-300 text-xs">
                      📈 TÍCH CỰC
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Tỷ lệ chuyển đổi tháng này đạt 18.5% (+2.3% so với tháng trước). Tập trung vào các kênh có ROI cao nhất.</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center space-x-1 bg-green-100 rounded-full px-2 py-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-700 font-bold">+2.3%</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                      <Brain className="w-3 h-3 text-purple-600" />
                      <span className="text-xs text-purple-700 font-bold">95% tin cậy</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-100 rounded-full px-2 py-1">
                      <Target className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-700 font-bold">Trend tốt</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Thời gian dự kiến: <span className="font-medium">30 phút</span></div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-green-300 text-green-600 hover:bg-green-50">
                      Phân tích
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Doanh thu dự kiến */}
            <div className="bg-white border border-blue-200 hover:border-blue-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                      <line x1="12" x2="12" y1="2" y2="22"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="flex justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">Doanh thu dự kiến 2.4M VNĐ</h3>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-blue-100 text-blue-700 border-blue-300 text-xs">
                      💰 TIẾN ĐỘ TỐT
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Đã hoàn thành 85% mục tiêu doanh thu tháng này. Tập trung vào 5 deals lớn nhất để đạt 100% mục tiêu.</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center space-x-1 bg-blue-100 rounded-full px-2 py-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-blue-600">
                        <line x1="12" x2="12" y1="2" y2="22"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <span className="text-xs text-blue-700 font-bold">85% mục tiêu</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                      <Brain className="w-3 h-3 text-purple-600" />
                      <span className="text-xs text-purple-700 font-bold">90% tin cậy</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-100 rounded-full px-2 py-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-700 font-bold">On track</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Thời gian dự kiến: <span className="font-medium">1 giờ</span></div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-blue-300 text-blue-600 hover:bg-blue-50">
                      Xem báo cáo
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insights thông minh */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 mr-2">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                </svg>
                <h5 className="text-sm font-semibold text-purple-900">Insight thông minh</h5>
              </div>
              <p className="text-sm text-purple-700">Leads từ Facebook Ads có tỷ lệ chuyển đổi cao nhất (24.3%). Nên tăng ngân sách cho kênh này.</p>
            </div>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-cyan-600 mr-2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <h5 className="text-sm font-semibold text-cyan-900">Hiệu suất team</h5>
              </div>
              <p className="text-sm text-cyan-700">Team đang hoạt động tốt với 92% leads được liên hệ trong 24h. Duy trì nhịp độ này.</p>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc nâng cao</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lead Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái Lead</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="new">Mới</option>
                <option value="contacted">Đã liên hệ</option>
                <option value="qualified">Đủ điều kiện</option>
                <option value="proposal">Đề xuất</option>
                <option value="negotiation">Đàm phán</option>
                <option value="closed_won">Thành công</option>
                <option value="closed_lost">Thất bại</option>
              </select>
            </div>

            {/* Lead Source Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nguồn Lead</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google Ads</option>
                <option value="zalo">Zalo</option>
                <option value="website">Website</option>
                <option value="referral">Giới thiệu</option>
                <option value="phone">Điện thoại</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Revenue Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá trị đơn hàng</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="0-10m">0 - 10 triệu</option>
                <option value="10m-50m">10 - 50 triệu</option>
                <option value="50m-100m">50 - 100 triệu</option>
                <option value="100m-500m">100 - 500 triệu</option>
                <option value="500m+">Trên 500 triệu</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button 
              onClick={() => setShowAdvancedFilters(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Hủy
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
