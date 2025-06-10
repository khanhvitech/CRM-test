'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  Filter, 
  Users, 
  Search,
  Calendar,
  Building2,
  Phone,
  Mail,
  DollarSign,
  Activity
} from 'lucide-react'

interface CustomersTableFiltersProps {
  onFilterChange?: (filters: any) => void
  onSearchChange?: (search: string) => void
}

export default function CustomersTableFilters({ onFilterChange, onSearchChange }: CustomersTableFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [valueRangeFilter, setValueRangeFilter] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')
  const [dealsCountFilter, setDealsCountFilter] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleFilterChange = (filterType: string, value: string) => {
    const filters = {
      status: filterType === 'status' ? value : statusFilter,
      industry: filterType === 'industry' ? value : industryFilter,
      region: filterType === 'region' ? value : regionFilter,
      valueRange: filterType === 'valueRange' ? value : valueRangeFilter,
      time: filterType === 'time' ? value : timeFilter,
      dealsCount: filterType === 'dealsCount' ? value : dealsCountFilter
    }

    // Update local state
    switch (filterType) {
      case 'status':
        setStatusFilter(value)
        break
      case 'industry':
        setIndustryFilter(value)
        break
      case 'region':
        setRegionFilter(value)
        break
      case 'valueRange':
        setValueRangeFilter(value)
        break
      case 'time':
        setTimeFilter(value)
        break
      case 'dealsCount':
        setDealsCountFilter(value)
        break
    }

    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setIndustryFilter('')
    setRegionFilter('')
    setValueRangeFilter('')
    setTimeFilter('all')
    setDealsCountFilter('')
    
    if (onSearchChange) {
      onSearchChange('')
    }
    if (onFilterChange) {
      onFilterChange({
        status: '',
        industry: '',
        region: '',
        valueRange: '',
        time: 'all',
        dealsCount: ''
      })
    }
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Main Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Tìm kiếm khách hàng theo tên công ty, người liên hệ, email, điện thoại..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <select 
                value={statusFilter}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="pending">Chờ xử lý</option>
                <option value="vip">VIP</option>
              </select>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <select 
                value={industryFilter}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả ngành</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="IT Services">IT Services</option>
                <option value="Sản xuất">Sản xuất</option>
                <option value="Tư vấn">Tư vấn</option>
                <option value="Bán lẻ">Bán lẻ</option>
                <option value="Dịch vụ">Dịch vụ</option>
                <option value="Giáo dục">Giáo dục</option>
                <option value="Y tế">Y tế</option>
                <option value="Tài chính">Tài chính</option>
              </select>
            </div>

            {/* Deals Count Filter */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <select 
                value={dealsCountFilter}
                onChange={(e) => handleFilterChange('dealsCount', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả deals</option>
                <option value="0">Chưa có deal</option>
                <option value="1-5">1-5 deals</option>
                <option value="6-10">6-10 deals</option>
                <option value="11-20">11-20 deals</option>
                <option value="20+">Trên 20 deals</option>
              </select>
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select 
                value={timeFilter}
                onChange={(e) => handleFilterChange('time', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả thời gian</option>
                <option value="thisMonth">Tham gia tháng này</option>
                <option value="lastMonth">Tham gia tháng trước</option>
                <option value="thisQuarter">Tham gia quý này</option>
                <option value="thisYear">Tham gia năm nay</option>
                <option value="lastPurchaseThisMonth">Mua cuối tháng này</option>
                <option value="lastPurchaseLastMonth">Mua cuối tháng trước</option>
                <option value="noRecentPurchase">Chưa mua gần đây</option>
              </select>
            </div>

            {/* Advanced Filter Button */}
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showAdvancedFilters 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Lọc nâng cao</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Clear Filters */}
            {(searchTerm || statusFilter || industryFilter || regionFilter || valueRangeFilter || timeFilter !== 'all' || dealsCountFilter) && (
              <button 
                onClick={clearAllFilters}
                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Bộ lọc nâng cao
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực</label>
              <select 
                value={regionFilter}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả khu vực</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Miền Bắc">Miền Bắc</option>
                <option value="Miền Trung">Miền Trung</option>
                <option value="Miền Nam">Miền Nam</option>
              </select>
            </div>

            {/* Total Value Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tổng giá trị</label>
              <select 
                value={valueRangeFilter}
                onChange={(e) => handleFilterChange('valueRange', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả giá trị</option>
                <option value="0-50m">0 - 50 triệu</option>
                <option value="50m-100m">50 - 100 triệu</option>
                <option value="100m-500m">100 - 500 triệu</option>
                <option value="500m-1b">500 triệu - 1 tỷ</option>
                <option value="1b-5b">1 - 5 tỷ</option>
                <option value="5b+">Trên 5 tỷ</option>
              </select>
            </div>

            {/* Customer Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại khách hàng</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả loại</option>
                <option value="enterprise">Doanh nghiệp lớn</option>
                <option value="sme">SME</option>
                <option value="startup">Startup</option>
                <option value="individual">Cá nhân</option>
                <option value="government">Chính phủ</option>
                <option value="ngo">Tổ chức phi lợi nhuận</option>
              </select>
            </div>

            {/* Contact Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức liên hệ ưa thích</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="email">Email</option>
                <option value="phone">Điện thoại</option>
                <option value="zalo">Zalo</option>
                <option value="meeting">Họp trực tiếp</option>
              </select>
            </div>

            {/* Last Activity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hoạt động gần nhất</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="today">Hôm nay</option>
                <option value="thisWeek">Tuần này</option>
                <option value="thisMonth">Tháng này</option>
                <option value="overdue">Quá hạn liên hệ</option>
                <option value="inactive">Không hoạt động &gt; 3 tháng</option>
              </select>
            </div>

            {/* Revenue Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đóng góp doanh thu</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="top10">Top 10%</option>
                <option value="top20">Top 20%</option>
                <option value="top50">Top 50%</option>
                <option value="low">Thấp</option>
                <option value="zero">Chưa có doanh thu</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Lọc khách hàng theo các tiêu chí được chọn
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Đóng
              </button>
              <button 
                onClick={clearAllFilters}
                className="px-4 py-2 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 transition-colors"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(statusFilter || industryFilter || regionFilter || valueRangeFilter || timeFilter !== 'all' || dealsCountFilter) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-blue-800">Bộ lọc đang áp dụng:</span>
              {statusFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Trạng thái: {statusFilter}
                </span>
              )}
              {industryFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Ngành: {industryFilter}
                </span>
              )}
              {regionFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Khu vực: {regionFilter}
                </span>
              )}
              {valueRangeFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Giá trị: {valueRangeFilter}
                </span>
              )}
              {dealsCountFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Deals: {dealsCountFilter}
                </span>
              )}
              {timeFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Thời gian: {timeFilter}
                </span>
              )}
            </div>
            <button 
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
