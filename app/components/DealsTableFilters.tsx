'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  Filter, 
  Users, 
  Search,
  Calendar,
  Building2,
  Target,
  DollarSign,
  TrendingUp,
  Percent
} from 'lucide-react'

interface DealsTableFiltersProps {
  onFilterChange?: (filters: any) => void
  onSearchChange?: (search: string) => void
}

export default function DealsTableFilters({ onFilterChange, onSearchChange }: DealsTableFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('')
  const [probabilityFilter, setProbabilityFilter] = useState('')
  const [valueRangeFilter, setValueRangeFilter] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleFilterChange = (filterType: string, value: string) => {
    const filters = {
      stage: filterType === 'stage' ? value : stageFilter,
      owner: filterType === 'owner' ? value : ownerFilter,
      probability: filterType === 'probability' ? value : probabilityFilter,
      valueRange: filterType === 'valueRange' ? value : valueRangeFilter,
      time: filterType === 'time' ? value : timeFilter,
      industry: filterType === 'industry' ? value : industryFilter
    }

    // Update local state
    switch (filterType) {
      case 'stage':
        setStageFilter(value)
        break
      case 'owner':
        setOwnerFilter(value)
        break
      case 'probability':
        setProbabilityFilter(value)
        break
      case 'valueRange':
        setValueRangeFilter(value)
        break
      case 'time':
        setTimeFilter(value)
        break
      case 'industry':
        setIndustryFilter(value)
        break
    }

    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setStageFilter('')
    setOwnerFilter('')
    setProbabilityFilter('')
    setValueRangeFilter('')
    setTimeFilter('all')
    setIndustryFilter('')
    
    if (onSearchChange) {
      onSearchChange('')
    }
    if (onFilterChange) {
      onFilterChange({
        stage: '',
        owner: '',
        probability: '',
        valueRange: '',
        time: 'all',
        industry: ''
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
                placeholder="Tìm kiếm deals theo tên, khách hàng, người liên hệ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Stage Filter */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <select 
                value={stageFilter}
                onChange={(e) => handleFilterChange('stage', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả giai đoạn</option>
                <option value="discovery">Khám phá</option>
                <option value="qualified">Đủ điều kiện</option>
                <option value="proposal">Báo giá</option>
                <option value="negotiation">Đàm phán</option>
                <option value="closed_won">Thành công</option>
                <option value="closed_lost">Thất bại</option>
              </select>
            </div>

            {/* Probability Filter */}
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-gray-400" />
              <select 
                value={probabilityFilter}
                onChange={(e) => handleFilterChange('probability', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả xác suất</option>
                <option value="0-25">0% - 25%</option>
                <option value="25-50">25% - 50%</option>
                <option value="50-75">50% - 75%</option>
                <option value="75-100">75% - 100%</option>
                <option value="100">100%</option>
              </select>
            </div>

            {/* Owner Filter */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <select 
                value={ownerFilter}
                onChange={(e) => handleFilterChange('owner', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả người phụ trách</option>
                <option value="Nguyễn Sales">Nguyễn Sales</option>
                <option value="Trần Manager">Trần Manager</option>
                <option value="Lê Director">Lê Director</option>
                <option value="Phạm Consultant">Phạm Consultant</option>
                <option value="Hoàng Expert">Hoàng Expert</option>
              </select>
            </div>

            {/* Value Range Filter */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <select 
                value={valueRangeFilter}
                onChange={(e) => handleFilterChange('valueRange', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả giá trị</option>
                <option value="0-100m">0 - 100 triệu</option>
                <option value="100m-500m">100 - 500 triệu</option>
                <option value="500m-1b">500 triệu - 1 tỷ</option>
                <option value="1b-5b">1 - 5 tỷ</option>
                <option value="5b+">Trên 5 tỷ</option>
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
                <option value="createdThisWeek">Tạo tuần này</option>
                <option value="createdThisMonth">Tạo tháng này</option>
                <option value="createdThisQuarter">Tạo quý này</option>
                <option value="expectedThisMonth">Đóng tháng này</option>
                <option value="expectedThisQuarter">Đóng quý này</option>
                <option value="overdue">Quá hạn</option>
                <option value="hotDeals">Deals nóng</option>
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
            {(searchTerm || stageFilter || ownerFilter || probabilityFilter || valueRangeFilter || timeFilter !== 'all' || industryFilter) && (
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
            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngành nghề</label>
              <select 
                value={industryFilter}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả ngành</option>
                <option value="technology">Công nghệ</option>
                <option value="manufacturing">Sản xuất</option>
                <option value="consulting">Tư vấn</option>
                <option value="retail">Bán lẻ</option>
                <option value="finance">Tài chính</option>
                <option value="healthcare">Y tế</option>
                <option value="education">Giáo dục</option>
                <option value="government">Chính phủ</option>
              </select>
            </div>

            {/* Deal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại deal</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả loại</option>
                <option value="new_business">Khách hàng mới</option>
                <option value="expansion">Mở rộng</option>
                <option value="renewal">Gia hạn</option>
                <option value="upsell">Bán thêm</option>
                <option value="cross_sell">Bán chéo</option>
              </select>
            </div>

            {/* Expected Close Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dự kiến đóng</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="thisWeek">Tuần này</option>
                <option value="thisMonth">Tháng này</option>
                <option value="nextMonth">Tháng sau</option>
                <option value="thisQuarter">Quý này</option>
                <option value="nextQuarter">Quý sau</option>
                <option value="overdue">Quá hạn</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Độ ưu tiên</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="high">Cao</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
            </div>

            {/* Competition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cạnh tranh</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="none">Không có</option>
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
                <option value="direct">Cạnh tranh trực tiếp</option>
              </select>
            </div>

            {/* Last Activity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hoạt động cuối</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tất cả</option>
                <option value="today">Hôm nay</option>
                <option value="thisWeek">Tuần này</option>
                <option value="thisMonth">Tháng này</option>
                <option value="over1week">Quá 1 tuần</option>
                <option value="over2weeks">Quá 2 tuần</option>
                <option value="over1month">Quá 1 tháng</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Lọc deals theo các tiêu chí được chọn
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
      {(stageFilter || ownerFilter || probabilityFilter || valueRangeFilter || timeFilter !== 'all' || industryFilter) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-blue-800">Bộ lọc đang áp dụng:</span>
              {stageFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Giai đoạn: {stageFilter}
                </span>
              )}
              {ownerFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Phụ trách: {ownerFilter}
                </span>
              )}
              {probabilityFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Xác suất: {probabilityFilter}
                </span>
              )}
              {valueRangeFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Giá trị: {valueRangeFilter}
                </span>
              )}
              {industryFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Ngành: {industryFilter}
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
