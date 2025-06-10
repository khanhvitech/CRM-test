'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  Filter, 
  Users, 
  Search,
  Calendar,
  Tag,
  Building2,
  Phone,
  Mail,
  Target,
  DollarSign
} from 'lucide-react'

interface SalesTableFiltersProps {
  type: 'leads' | 'deals'
  onFilterChange?: (filters: any) => void
  onSearchChange?: (search: string) => void
}

export default function SalesTableFilters({ type, onFilterChange, onSearchChange }: SalesTableFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [assignedToFilter, setAssignedToFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [valueRangeFilter, setValueRangeFilter] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')
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
      source: filterType === 'source' ? value : sourceFilter,
      assignedTo: filterType === 'assignedTo' ? value : assignedToFilter,
      region: filterType === 'region' ? value : regionFilter,
      valueRange: filterType === 'valueRange' ? value : valueRangeFilter,
      time: filterType === 'time' ? value : timeFilter
    }

    // Update local state
    switch (filterType) {
      case 'status':
        setStatusFilter(value)
        break
      case 'source':
        setSourceFilter(value)
        break
      case 'assignedTo':
        setAssignedToFilter(value)
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
    }

    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const getStatusOptions = () => {
    if (type === 'leads') {
      return [
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'new', label: 'Mới' },
        { value: 'contacted', label: 'Đã liên hệ' },
        { value: 'qualified', label: 'Đủ điều kiện' },
        { value: 'proposal', label: 'Đề xuất' },
        { value: 'negotiation', label: 'Đàm phán' },
        { value: 'converted', label: 'Chuyển đổi' },
        { value: 'lost', label: 'Thất bại' }
      ]
    } else {
      return [
        { value: '', label: 'Tất cả giai đoạn' },
        { value: 'discovery', label: 'Khám phá' },
        { value: 'qualified', label: 'Đủ điều kiện' },
        { value: 'proposal', label: 'Báo giá' },
        { value: 'negotiation', label: 'Đàm phán' },
        { value: 'closed_won', label: 'Thành công' },
        { value: 'closed_lost', label: 'Thất bại' }
      ]
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setStatusFilter('')
    setSourceFilter('')
    setAssignedToFilter('')
    setRegionFilter('')
    setValueRangeFilter('')
    setTimeFilter('all')
    
    if (onSearchChange) {
      onSearchChange('')
    }
    if (onFilterChange) {
      onFilterChange({
        status: '',
        source: '',
        assignedTo: '',
        region: '',
        valueRange: '',
        time: 'all'
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
                placeholder={type === 'leads' ? 'Tìm kiếm leads theo tên, email, điện thoại...' : 'Tìm kiếm deals theo tên, khách hàng...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status/Stage Filter */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <select 
                value={statusFilter}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {getStatusOptions().map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Source Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <select 
                value={sourceFilter}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả nguồn</option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
                <option value="Zalo">Zalo</option>
                <option value="Website">Website</option>
                <option value="Referral">Giới thiệu</option>
                <option value="Phone">Điện thoại</option>
                <option value="Email">Email</option>
              </select>
            </div>

            {/* Assigned To Filter */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <select 
                value={assignedToFilter}
                onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
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

            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select 
                value={timeFilter}
                onChange={(e) => handleFilterChange('time', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="yesterday">Hôm qua</option>
                <option value="thisWeek">Tuần này</option>
                <option value="lastWeek">Tuần trước</option>
                <option value="thisMonth">Tháng này</option>
                <option value="lastMonth">Tháng trước</option>
                <option value="thisQuarter">Quý này</option>
                <option value="thisYear">Năm nay</option>
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
            {(searchTerm || statusFilter || sourceFilter || assignedToFilter || regionFilter || valueRangeFilter || timeFilter !== 'all') && (
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
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Value Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'leads' ? 'Giá trị tiềm năng' : 'Giá trị deal'}
              </label>
              <select 
                value={valueRangeFilter}
                onChange={(e) => handleFilterChange('valueRange', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả giá trị</option>
                <option value="0-10m">0 - 10 triệu</option>
                <option value="10m-50m">10 - 50 triệu</option>
                <option value="50m-100m">50 - 100 triệu</option>
                <option value="100m-500m">100 - 500 triệu</option>
                <option value="500m-1b">500 triệu - 1 tỷ</option>
                <option value="1b+">Trên 1 tỷ</option>
              </select>
            </div>

            {type === 'leads' && (
              /* Tags Filter for Leads */
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả tags</option>
                  <option value="hot_lead">Hot Lead</option>
                  <option value="vip">VIP</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="follow_up">Follow Up</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
            )}

            {type === 'deals' && (
              /* Probability Filter for Deals */
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Xác suất thành công</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả xác suất</option>
                  <option value="0-25">0% - 25%</option>
                  <option value="25-50">25% - 50%</option>
                  <option value="50-75">50% - 75%</option>
                  <option value="75-100">75% - 100%</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {type === 'leads' 
                ? 'Hiển thị kết quả lọc theo tiêu chí được chọn'
                : 'Lọc deals theo các tiêu chí trên'
              }
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
      {(statusFilter || sourceFilter || assignedToFilter || regionFilter || valueRangeFilter || timeFilter !== 'all') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-blue-800">Bộ lọc đang áp dụng:</span>
              {statusFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getStatusOptions().find(opt => opt.value === statusFilter)?.label}
                </span>
              )}
              {sourceFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Nguồn: {sourceFilter}
                </span>
              )}
              {assignedToFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Phụ trách: {assignedToFilter}
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
