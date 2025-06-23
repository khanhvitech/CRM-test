'use client'

import { useState, useMemo } from 'react'
import { 
  Plus, Search, Filter, MoreVertical, Phone, Mail, Eye, Building2, 
  User, Calendar, Tag, Clock, TrendingUp, TrendingDown, AlertTriangle,
  Star, Heart, DollarSign, MessageCircle, Activity, Target, Gift,
  MapPin, Briefcase, CreditCard, UserCheck, UserX, Users, ChevronDown,
  Bell, RefreshCw, Zap, BarChart3, PieChart, CheckCircle, XCircle,
  FileText, History, Send, Settings
} from 'lucide-react'
import CustomerFilters, { CustomerFilters as FilterType } from './CustomerFilters'
import CustomerEventsManager from './CustomerEventsManager'
import CustomerAnalytics from './CustomerAnalytics'
import CustomerAIInsights from './CustomerAIInsights'

interface CustomerTag {
  id: string
  name: string
  color: string
  category: 'behavior' | 'value' | 'engagement' | 'risk'
}

interface CustomerInteraction {
  id: string
  type: 'email' | 'call' | 'meeting' | 'sms' | 'chat' | 'support'
  channel: string
  title: string
  summary: string
  date: string
  status: 'success' | 'pending' | 'failed'
  aiSummary?: string
}

interface CustomerEvent {
  id: string
  type: 'birthday' | 'anniversary' | 'custom'
  title: string
  date: string
  recurring: boolean
  reminderDays: number
  customMessage?: string
}

interface Customer {
  id: number
  // Basic Info
  name: string
  contact: string
  email: string
  phone: string
  gender: 'male' | 'female' | 'other'
  address: string
  
  // Extended Info
  idNumber: string
  profession: string
  company: string
  region: string
  industry: string
  
  // Status & Scores
  status: 'active' | 'inactive' | 'at-risk' | 'vip'
  engagementScore: number
  churnRisk: number
  upsellScore: number
  
  // Financial
  totalValue: string
  lastPurchase: string
  joinDate: string
  deals: number
  avgOrderValue: number
  
  // Behavioral Data
  lastInteraction: string
  responseTime: number // hours
  emailOpenRate: number
  clickRate: number
  
  // Tags & Events
  tags: CustomerTag[]
  events: CustomerEvent[]
  interactions: CustomerInteraction[]
  
  // Remarketing
  daysSinceLastInteraction: number
  remarketing: {
    priority: 'high' | 'medium' | 'low'
    suggestedActions: string[]
    campaigns: string[]
  }
}

const customerTags: CustomerTag[] = [
  { id: 'vip', name: 'VIP', color: 'bg-purple-100 text-purple-800 border-purple-200', category: 'value' },
  { id: 'loyal', name: 'Khách thân thiết', color: 'bg-blue-100 text-blue-800 border-blue-200', category: 'value' },
  { id: 'price-sensitive', name: 'Nhạy cảm giá', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', category: 'behavior' },
  { id: 'slow-response', name: 'Phản hồi chậm', color: 'bg-orange-100 text-orange-800 border-orange-200', category: 'behavior' },
  { id: 'high-engagement', name: 'Tương tác cao', color: 'bg-green-100 text-green-800 border-green-200', category: 'engagement' },
  { id: 'at-risk', name: 'Có nguy cơ rời bỏ', color: 'bg-red-100 text-red-800 border-red-200', category: 'risk' },
  { id: 'new-customer', name: 'Khách hàng mới', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', category: 'engagement' },
]

export default function CustomersManagement() {
  const [selectedView, setSelectedView] = useState<'list' | 'cards' | 'analytics' | 'events' | 'insights'>('list')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [showRemarketingModal, setShowRemarketingModal] = useState(false)
  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [filterEngagement, setFilterEngagement] = useState('')
  const [filterRisk, setFilterRisk] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [advancedFilters, setAdvancedFilters] = useState<FilterType>({})

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'ABC Corporation',
      contact: 'Nguyễn Văn A',
      email: 'contact@abc.com',
      phone: '0901234567',
      gender: 'male',
      address: '123 Nguyễn Huệ, Q1, TP.HCM',
      idNumber: '079123456789',
      profession: 'Giám đốc',
      company: 'ABC Corporation',
      region: 'TP.HCM',
      industry: 'Công nghệ',
      status: 'active',
      engagementScore: 85,
      churnRisk: 15,
      upsellScore: 78,
      totalValue: '500,000,000',
      lastPurchase: '2024-01-10',
      joinDate: '2023-06-15',
      deals: 5,
      avgOrderValue: 100000000,
      lastInteraction: '2024-06-20',
      responseTime: 2.5,
      emailOpenRate: 85,
      clickRate: 35,
      daysSinceLastInteraction: 3,
      tags: [
        customerTags.find(t => t.id === 'vip')!,
        customerTags.find(t => t.id === 'high-engagement')!
      ],
      events: [
        {
          id: '1',
          type: 'birthday',
          title: 'Sinh nhật',
          date: '1985-03-15',
          recurring: true,
          reminderDays: 7
        }
      ],
      interactions: [
        {
          id: '1',
          type: 'email',
          channel: 'Email Marketing',
          title: 'Gửi báo giá sản phẩm mới',
          summary: 'Đã gửi báo giá cho 3 sản phẩm, khách hàng quan tâm đến giải pháp A',
          date: '2024-06-20',
          status: 'success',
          aiSummary: 'Khách hàng tỏ ra quan tâm đến sản phẩm A, yêu cầu demo vào tuần tới.'
        }
      ],
      remarketing: {
        priority: 'low',
        suggestedActions: ['Gửi email cảm ơn', 'Mời tham gia webinar mới'],
        campaigns: ['Email nurturing', 'Product update']
      }
    },
    {
      id: 2,
      name: 'XYZ Technology',
      contact: 'Trần Thị B',
      email: 'info@xyz.com',
      phone: '0902345678',
      gender: 'female',
      address: '456 Lê Lợi, Q1, TP.HCM',
      idNumber: '079987654321',
      profession: 'CTO',
      company: 'XYZ Technology',
      region: 'TP.HCM',
      industry: 'IT Services',
      status: 'at-risk',
      engagementScore: 45,
      churnRisk: 72,
      upsellScore: 25,
      totalValue: '750,000,000',
      lastPurchase: '2024-01-08',
      joinDate: '2023-04-20',
      deals: 8,
      avgOrderValue: 93750000,
      lastInteraction: '2024-05-15',
      responseTime: 48,
      emailOpenRate: 25,
      clickRate: 8,
      daysSinceLastInteraction: 39,
      tags: [
        customerTags.find(t => t.id === 'at-risk')!,
        customerTags.find(t => t.id === 'slow-response')!
      ],
      events: [
        {
          id: '2',
          type: 'anniversary',
          title: 'Kỷ niệm hợp tác',
          date: '2023-04-20',
          recurring: true,
          reminderDays: 14
        }
      ],
      interactions: [
        {
          id: '2',
          type: 'call',
          channel: 'Phone',
          title: 'Cuộc gọi chăm sóc khách hàng',
          summary: 'Không liên lạc được, để lại tin nhắn',
          date: '2024-05-15',
          status: 'failed'
        }
      ],
      remarketing: {
        priority: 'high',
        suggestedActions: ['Gọi điện khẩn cấp', 'Gửi ưu đãi đặc biệt', 'Lên lịch meeting'],
        campaigns: ['Win-back campaign', 'Urgent follow-up']
      }
    },
    // Add more sample customers...
  ])

  // Filtered and sorted customers with advanced filters
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = !filterStatus || customer.status === filterStatus
      const matchesIndustry = !filterIndustry || customer.industry === filterIndustry
      const matchesTag = !filterTag || customer.tags.some(tag => tag.id === filterTag)
      
      const matchesEngagement = !filterEngagement || 
        (filterEngagement === 'high' && customer.engagementScore >= 70) ||
        (filterEngagement === 'medium' && customer.engagementScore >= 40 && customer.engagementScore < 70) ||
        (filterEngagement === 'low' && customer.engagementScore < 40)
      
      const matchesRisk = !filterRisk ||
        (filterRisk === 'high' && customer.churnRisk >= 60) ||
        (filterRisk === 'medium' && customer.churnRisk >= 30 && customer.churnRisk < 60) ||
        (filterRisk === 'low' && customer.churnRisk < 30)

      // Apply advanced filters
      const matchesAdvancedFilters = Object.entries(advancedFilters).every(([key, value]) => {
        if (!value) return true
        
        switch (key) {
          case 'daysSinceLastInteraction':
            const daysFilter = value as { min?: number; max?: number }
            if (daysFilter.min !== undefined && customer.daysSinceLastInteraction < daysFilter.min) return false
            if (daysFilter.max !== undefined && customer.daysSinceLastInteraction > daysFilter.max) return false
            return true
          
          case 'engagementScore':
            const engagementFilter = value as { min?: number; max?: number }
            if (engagementFilter.min !== undefined && customer.engagementScore < engagementFilter.min) return false
            if (engagementFilter.max !== undefined && customer.engagementScore > engagementFilter.max) return false
            return true
          
          case 'churnRisk':
            const churnFilter = value as { min?: number; max?: number }
            if (churnFilter.min !== undefined && customer.churnRisk < churnFilter.min) return false
            if (churnFilter.max !== undefined && customer.churnRisk > churnFilter.max) return false
            return true
          
          case 'totalValue':
            const valueFilter = value as { min?: number; max?: number }
            const customerValue = parseInt(customer.totalValue.replace(/,/g, ''))
            if (valueFilter.min !== undefined && customerValue < valueFilter.min) return false
            if (valueFilter.max !== undefined && customerValue > valueFilter.max) return false
            return true
          
          case 'isVIP':
            return !value || customer.status === 'vip'
          
          case 'isAtRisk':
            return !value || customer.status === 'at-risk' || customer.churnRisk >= 60
          
          case 'needsRemarketing':
            return !value || customer.daysSinceLastInteraction > 30 || customer.churnRisk > 50
          
          default:
            return true
        }
      })
      
      return matchesSearch && matchesStatus && matchesIndustry && matchesTag && 
             matchesEngagement && matchesRisk && matchesAdvancedFilters
    })

    // Sort customers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'lastInteraction':
          return new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime()
        case 'engagementScore':
          return b.engagementScore - a.engagementScore
        case 'churnRisk':
          return b.churnRisk - a.churnRisk
        case 'totalValue':
          return parseInt(b.totalValue.replace(/,/g, '')) - parseInt(a.totalValue.replace(/,/g, ''))
        default:
          return 0
      }
    })

    return filtered
  }, [customers, searchTerm, filterStatus, filterIndustry, filterTag, filterEngagement, filterRisk, sortBy, advancedFilters])

  // Remarketing suggestions
  const remarketingCustomers = useMemo(() => {
    return customers.filter(customer => {
      return customer.daysSinceLastInteraction > 30 || 
             customer.churnRisk > 50 ||
             customer.engagementScore < 40
    }).sort((a, b) => b.churnRisk - a.churnRisk)
  }, [customers])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'at-risk':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'vip':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động'
      case 'inactive':
        return 'Không hoạt động'
      case 'at-risk':
        return 'Có nguy cơ'
      case 'vip':
        return 'VIP'
      default:
        return status
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 60) return 'text-red-600'
    if (risk >= 30) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'Công nghệ':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'IT Services':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Sản xuất':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Tư vấn':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Bán lẻ':
        return 'bg-pink-100 text-pink-800 border-pink-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatCurrency = (value: string) => {
    const num = parseInt(value.replace(/,/g, ''))
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowCustomerModal(true)
  }

  const handleRemarketingClick = () => {
    setShowRemarketingModal(true)
  }

  const handleAdvancedFilterChange = (filters: FilterType) => {
    setAdvancedFilters(filters)
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
          <p className="text-gray-600">Quản lý thông tin chi tiết và hành vi khách hàng</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRemarketingClick}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <Target className="w-4 h-4" />
            <span>Remarketing ({remarketingCustomers.length})</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Thêm khách hàng</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('list')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              🗂️ Danh sách
            </button>
            <button
              onClick={() => setSelectedView('cards')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'cards' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              📋 Thẻ khách hàng
            </button>
            <button
              onClick={() => setSelectedView('analytics')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'analytics' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              📊 Phân tích
            </button>
            <button
              onClick={() => setSelectedView('events')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'events' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              🎉 Sự kiện
            </button>
            <button
              onClick={() => setSelectedView('insights')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'insights' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              🤖 AI Insights
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="lastInteraction">Tương tác gần nhất</option>
            <option value="engagementScore">Điểm tương tác</option>
            <option value="churnRisk">Rủi ro rời bỏ</option>
            <option value="totalValue">Giá trị</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <CustomerFilters 
        onFilterChange={handleAdvancedFilterChange}
        initialFilters={advancedFilters}
      />

      {/* Advanced Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="at-risk">Có nguy cơ</option>
            <option value="vip">VIP</option>
          </select>

          <select 
            value={filterIndustry} 
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="input-field"
          >
            <option value="">Tất cả ngành</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="IT Services">IT Services</option>
            <option value="Sản xuất">Sản xuất</option>
            <option value="Tư vấn">Tư vấn</option>
            <option value="Bán lẻ">Bán lẻ</option>
          </select>

          <select 
            value={filterTag} 
            onChange={(e) => setFilterTag(e.target.value)}
            className="input-field"
          >
            <option value="">Tất cả thẻ</option>
            {customerTags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>

          <select 
            value={filterEngagement} 
            onChange={(e) => setFilterEngagement(e.target.value)}
            className="input-field"
          >
            <option value="">Mức tương tác</option>
            <option value="high">Cao (≥70)</option>
            <option value="medium">Trung bình (40-69)</option>
            <option value="low">Thấp (&lt;40)</option>
          </select>

          <select 
            value={filterRisk} 
            onChange={(e) => setFilterRisk(e.target.value)}
            className="input-field"
          >
            <option value="">Rủi ro rời bỏ</option>
            <option value="high">Cao (≥60)</option>
            <option value="medium">Trung bình (30-59)</option>
            <option value="low">Thấp (&lt;30)</option>
          </select>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng khách hàng</div>
              <div className="text-2xl font-bold text-primary-600">{filteredCustomers.length}</div>
            </div>
            <Users className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">VIP & Hoạt động</div>
              <div className="text-2xl font-bold text-green-600">
                {filteredCustomers.filter(c => c.status === 'active' || c.status === 'vip').length}
              </div>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Có nguy cơ</div>
              <div className="text-2xl font-bold text-red-600">
                {filteredCustomers.filter(c => c.status === 'at-risk' || c.churnRisk >= 60).length}
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Cần remarketing</div>
              <div className="text-2xl font-bold text-orange-600">
                {remarketingCustomers.length}
              </div>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-gray-600">Tổng giá trị</div>
          <div className="text-2xl font-bold text-success-600">
            {formatCurrency(filteredCustomers.reduce((sum, customer) => 
              sum + parseInt(customer.totalValue.replace(/,/g, '')), 0).toString())} VNĐ
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-gray-600">Điểm tương tác TB</div>
          <div className="text-2xl font-bold text-primary-600">
            {Math.round(filteredCustomers.reduce((sum, customer) => 
              sum + customer.engagementScore, 0) / filteredCustomers.length || 0)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {selectedView === 'list' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Khách hàng</th>
                  <th className="table-header">Liên hệ</th>
                  <th className="table-header">Trạng thái</th>
                  <th className="table-header">Tags</th>
                  <th className="table-header">Tương tác cuối</th>
                  <th className="table-header">Điểm số AI</th>
                  <th className="table-header">Giá trị</th>
                  <th className="table-header sticky right-0 bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.contact}</div>
                          <div className="text-xs text-gray-400">{customer.region} • {customer.industry}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(customer.status)}`}>
                        {getStatusText(customer.status)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.slice(0, 2).map((tag) => (
                          <span key={tag.id} className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${tag.color}`}>
                            {tag.name}
                          </span>
                        ))}
                        {customer.tags.length > 2 && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                            +{customer.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm text-gray-900">{customer.lastInteraction}</div>
                      <div className="text-xs text-gray-500">
                        {customer.daysSinceLastInteraction} ngày trước
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-3 h-3 text-gray-400" />
                          <span className={`text-sm font-medium ${getEngagementColor(customer.engagementScore)}`}>
                            {customer.engagementScore}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-3 h-3 text-gray-400" />
                          <span className={`text-sm font-medium ${getRiskColor(customer.churnRisk)}`}>
                            {customer.churnRisk}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-3 h-3 text-gray-400" />
                          <span className={`text-sm font-medium ${getEngagementColor(customer.upsellScore)}`}>
                            {customer.upsellScore}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="font-medium text-gray-900">{formatCurrency(customer.totalValue)} VNĐ</div>
                      <div className="text-xs text-gray-500">{customer.deals} deals</div>
                    </td>
                    <td className="table-cell sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleCustomerSelect(customer)}
                          className="p-1 text-gray-400 hover:text-primary-600"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600" title="Gọi điện">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600" title="Gửi email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="card p-6 hover:shadow-lg transition-shadow cursor-pointer" 
                 onClick={() => handleCustomerSelect(customer)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.contact}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(customer.status)}`}>
                  {getStatusText(customer.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{customer.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{customer.industry}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900 font-medium">{formatCurrency(customer.totalValue)} VNĐ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{customer.daysSinceLastInteraction} ngày trước</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {customer.tags.map((tag) => (
                    <span key={tag.id} className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${tag.color}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-gray-400" />
                    <span className={getEngagementColor(customer.engagementScore)}>
                      Tương tác: {customer.engagementScore}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-gray-400" />
                    <span className={getRiskColor(customer.churnRisk)}>
                      Rủi ro: {customer.churnRisk}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === 'analytics' && (
        <CustomerAnalytics customers={customers} />
      )}

      {selectedView === 'events' && (
        <CustomerEventsManager customers={customers} />
      )}

      {selectedView === 'insights' && (
        <CustomerAIInsights customers={customers} />
      )}
      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                    <p className="text-gray-600">{selectedCustomer.contact} • {selectedCustomer.region}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedCustomer.status)}`}>
                        {getStatusText(selectedCustomer.status)}
                      </span>
                      {selectedCustomer.tags.map((tag) => (
                        <span key={tag.id} className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${tag.color}`}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCustomerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Customer Profile */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="card p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Thông tin cơ bản
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.email}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Điện thoại</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.phone}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.address}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Giới tính</label>
                        <div className="text-sm text-gray-900 capitalize">{selectedCustomer.gender}</div>
                      </div>
                    </div>
                  </div>

                  <div className="card p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Thông tin mở rộng
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">CMND/CCCD</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.idNumber}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nghề nghiệp</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.profession}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Công ty</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.company}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Ngành</label>
                        <div className="text-sm text-gray-900">{selectedCustomer.industry}</div>
                      </div>
                    </div>
                  </div>

                  <div className="card p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Điểm số AI
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Mức độ tương tác</span>
                          <span className={getEngagementColor(selectedCustomer.engagementScore)}>
                            {selectedCustomer.engagementScore}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${selectedCustomer.engagementScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Rủi ro rời bỏ</span>
                          <span className={getRiskColor(selectedCustomer.churnRisk)}>
                            {selectedCustomer.churnRisk}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${selectedCustomer.churnRisk}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tiềm năng upsell</span>
                          <span className={getEngagementColor(selectedCustomer.upsellScore)}>
                            {selectedCustomer.upsellScore}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${selectedCustomer.upsellScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactions & Timeline */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="card p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Lịch sử tương tác gần nhất
                    </h3>
                    <div className="space-y-4">
                      {selectedCustomer.interactions.map((interaction) => (
                        <div key={interaction.id} className="border-l-4 border-primary-200 pl-4 py-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">{interaction.title}</span>
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  interaction.status === 'success' ? 'bg-green-100 text-green-800' :
                                  interaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {interaction.status === 'success' ? 'Thành công' :
                                   interaction.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{interaction.summary}</p>
                              {interaction.aiSummary && (
                                <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                                  <div className="flex items-start space-x-2">
                                    <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                                    <div>
                                      <div className="text-xs font-medium text-blue-800 mb-1">AI Summary</div>
                                      <p className="text-sm text-blue-700">{interaction.aiSummary}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>{interaction.channel}</span>
                                <span>•</span>
                                <span>{interaction.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Sự kiện cá nhân
                      </h3>
                      <div className="space-y-3">
                        {selectedCustomer.events.map((event) => (
                          <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                {event.type === 'birthday' ? (
                                  <Gift className="w-4 h-4 text-primary-600" />
                                ) : (
                                  <Calendar className="w-4 h-4 text-primary-600" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{event.title}</div>
                                <div className="text-sm text-gray-500">{event.date}</div>
                              </div>
                            </div>
                            <button className="text-primary-600 hover:text-primary-700">
                              <Bell className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Gợi ý Remarketing
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Mức độ ưu tiên:</span>
                          <span className={`font-medium ${
                            selectedCustomer.remarketing.priority === 'high' ? 'text-red-600' :
                            selectedCustomer.remarketing.priority === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {selectedCustomer.remarketing.priority === 'high' ? 'Cao' :
                             selectedCustomer.remarketing.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-2">Hành động đề xuất:</div>
                          <div className="space-y-1">
                            {selectedCustomer.remarketing.suggestedActions.map((action, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span className="text-sm text-gray-600">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-2">Chiến dịch phù hợp:</div>
                          <div className="flex flex-wrap gap-1">
                            {selectedCustomer.remarketing.campaigns.map((campaign, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {campaign}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Phone className="w-4 h-4" />
                    <span>Gọi điện</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Mail className="w-4 h-4" />
                    <span>Gửi email</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Calendar className="w-4 h-4" />
                    <span>Đặt lịch</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Settings className="w-4 h-4" />
                    <span>Cài đặt</span>
                  </button>
                  <button 
                    onClick={() => setShowCustomerModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remarketing Modal */}
      {showRemarketingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Remarketing Dashboard</h2>
                  <p className="text-gray-600">Quản lý chiến dịch tái tiếp cận khách hàng</p>
                </div>
                <button 
                  onClick={() => setShowRemarketingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Khách hàng cần chăm sóc</div>
                      <div className="text-2xl font-bold text-red-600">{remarketingCustomers.length}</div>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Ưu tiên cao</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {remarketingCustomers.filter(c => c.remarketing.priority === 'high').length}
                      </div>
                    </div>
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Tiềm năng recover</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(remarketingCustomers.reduce((sum, c) => 
                          sum + parseInt(c.totalValue.replace(/,/g, '')), 0).toString())} VNĐ
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Danh sách khách hàng cần chăm sóc</h3>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Send className="w-4 h-4" />
                      <span>Gửi campaign hàng loạt</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <RefreshCw className="w-4 h-4" />
                      <span>Cập nhật điểm số</span>
                    </button>
                  </div>
                </div>

                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="table-header">Khách hàng</th>
                          <th className="table-header">Lần cuối tương tác</th>
                          <th className="table-header">Rủi ro</th>
                          <th className="table-header">Ưu tiên</th>
                          <th className="table-header">Giá trị</th>
                          <th className="table-header">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {remarketingCustomers.map((customer) => (
                          <tr key={customer.id} className="hover:bg-gray-50">
                            <td className="table-cell">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{customer.name}</div>
                                  <div className="text-sm text-gray-500">{customer.contact}</div>
                                </div>
                              </div>
                            </td>
                            <td className="table-cell">
                              <div className="text-sm text-gray-900">{customer.lastInteraction}</div>
                              <div className="text-xs text-gray-500">{customer.daysSinceLastInteraction} ngày</div>
                            </td>
                            <td className="table-cell">
                              <div className={`text-sm font-medium ${getRiskColor(customer.churnRisk)}`}>
                                {customer.churnRisk}%
                              </div>
                            </td>
                            <td className="table-cell">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                customer.remarketing.priority === 'high' ? 'bg-red-100 text-red-800' :
                                customer.remarketing.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {customer.remarketing.priority === 'high' ? 'Cao' :
                                 customer.remarketing.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                              </span>
                            </td>
                            <td className="table-cell">
                              <div className="font-medium text-gray-900">{formatCurrency(customer.totalValue)} VNĐ</div>
                            </td>
                            <td className="table-cell">
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => handleCustomerSelect(customer)}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                >
                                  Chi tiết
                                </button>
                                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                  Gọi
                                </button>
                                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                                  Email
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}