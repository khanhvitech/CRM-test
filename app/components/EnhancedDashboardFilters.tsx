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
  const [showComparison, setShowComparison] = useState(true)
  const [showAIInsights, setShowAIInsights] = useState(true)

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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm ${
              showAIInsights 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105' 
                : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md'
            }`}
          >
            <Brain className={`w-5 h-5 ${showAIInsights ? 'animate-pulse' : ''}`} />
            <span className="relative">
              🤖 AI Phân tích
              {showAIInsights && (
                <span className="absolute -top-1 -right-6 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
              )}
            </span>
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
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
                <Brain className="w-6 h-6 text-white animate-pulse" />
              </div>
              🤖 AI Phân tích & Gợi ý thông minh
            </h3>
            <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-sm border border-purple-200">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Live AI</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl border-l-4 p-4 shadow-sm transition-all hover:shadow-md ${
                insight.type === 'positive' ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50' :
                insight.type === 'warning' ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50' :
                'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg shadow-sm ${
                    insight.type === 'positive' ? 'bg-green-600 text-white' :
                    insight.type === 'warning' ? 'bg-yellow-600 text-white' :
                    'bg-blue-600 text-white'
                  }`}>
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-base">{insight.title}</h4>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${
                        insight.priority === 'high' ? 'bg-red-500 text-white animate-pulse' :
                        'bg-gray-500 text-white'
                      }`}>
                        {insight.priority === 'high' ? '🔥 Ưu tiên cao' : '📋 Bình thường'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{insight.message}</p>
                  </div>
                </div>
                {/* Decoration */}
                <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 ${
                  insight.type === 'positive' ? 'text-green-600' :
                  insight.type === 'warning' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  <Brain className="w-full h-full" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-purple-200">
            <button className="group flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Brain className="w-5 h-5 group-hover:animate-spin" />
              <span>🔮 Xem thêm phân tích AI chi tiết</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
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
