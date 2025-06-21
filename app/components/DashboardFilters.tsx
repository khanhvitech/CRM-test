'use client'

import { useState } from 'react'
import { ChevronDown, Filter, Users, Package } from 'lucide-react'

interface DashboardFiltersProps {
  onFilterChange?: (filters: any) => void
}

export default function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [timeFilter, setTimeFilter] = useState('today')
  const [teamFilter, setTeamFilter] = useState('')
  const [productFilter, setProductFilter] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleTimeChange = (value: string) => {
    setTimeFilter(value)
    notifyFilterChange({ time: value, team: teamFilter, product: productFilter })
  }

  const handleTeamChange = (value: string) => {
    setTeamFilter(value)
    notifyFilterChange({ time: timeFilter, team: value, product: productFilter })
  }

  const handleProductChange = (value: string) => {
    setProductFilter(value)
    notifyFilterChange({ time: timeFilter, team: teamFilter, product: value })
  }

  const notifyFilterChange = (filters: any) => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="mb-6">
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
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
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
