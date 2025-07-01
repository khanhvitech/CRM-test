'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone,
  Mail, 
  Eye, 
  Calendar, 
  DollarSign, 
  User, 
  Building2,
  TrendingUp,
  Target,
  Users,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  ShoppingCart,
  Package,
  Bot
} from 'lucide-react'

import OrderManagement from './OrderManagement'
import AISuggestionsTab from './AISuggestionsTab'

interface Lead {
  id: number
  name: string
  phone: string
  email: string
  source: string
  region: string
  product: string
  tags: string[]
  content: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'converted' | 'lost'
  stage: string
  notes: string
  assignedTo: string
  value: number
  lastContactedAt: string | null
  createdAt: string
  updatedAt: string
  type: 'lead'
  company?: string
}

interface Order {
  id: number
  orderNumber: string
  customer: string
  contact: string
  totalValue: number
  status: 'draft' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
  dealId?: number // Liên kết với Deal ban đầu
  leadId?: number // Liên kết với Lead ban đầu
}

interface MetricData {
  id: string
  title: string
  value: number
  previousValue: number
  percentageChange: number
  icon: React.ReactNode
  color: string
  bgColor: string
  trend?: 'up' | 'down' | 'neutral'
  clickAction: () => void
}

export default function SalesManagement() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'orders' | 'ai-suggestions'>('pipeline')
  const [showFilters, setShowFilters] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  
  // Search and filter states for leads
  const [leadSearchTerm, setLeadSearchTerm] = useState('')
  const [leadStatusFilter, setLeadStatusFilter] = useState('all')
  const [leadRegionFilter, setLeadRegionFilter] = useState('all')
  const [leadSourceFilter, setLeadSourceFilter] = useState('all')
  
  // Filter states
  const [filters, setFilters] = useState({
    timeRange: 'thisMonth',
    team: '',
    product: '',
    owner: '',
    leadStatus: '',
    advancedFilters: false
  })
  // Sample data với liên kết
  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nguyenvana@email.com',
      source: 'facebook',
      region: 'ha_noi',
      product: 'CRM Solution',
      tags: ['hot', 'enterprise'],
      content: 'Cần giải pháp CRM cho 100+ nhân viên bán hàng',
      status: 'converted',
      stage: 'deal_created',
      notes: 'Quan tâm đến tính năng AI, budget 50M',
      assignedTo: 'Minh Expert',
      value: 50000000,
      lastContactedAt: '2024-01-20T14:30:00',
      createdAt: '2024-01-15T09:00:00',
      updatedAt: '2024-01-20T14:30:00',
      type: 'lead',
      company: 'ABC Corp'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0912345678',
      email: 'tranthib@email.com',
      source: 'website',
      region: 'ho_chi_minh',
      product: 'Marketing Automation',
      tags: ['warm', 'sme'],
      content: 'Tự động hóa marketing cho startup',
      status: 'qualified',
      stage: 'proposal_sent',
      notes: 'Đã gửi proposal, chờ phản hồi',
      assignedTo: 'An Expert',
      value: 25000000,
      lastContactedAt: '2024-01-19T16:45:00',
      createdAt: '2024-01-16T11:20:00',
      updatedAt: '2024-01-19T16:45:00',
      type: 'lead',
      company: 'DEF Startup'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      phone: '0923456789',
      email: 'levanc@email.com',
      source: 'google',
      region: 'da_nang',
      product: 'Sales Management',
      tags: ['hot', 'enterprise'],
      content: 'Quản lý đội nhóm sales hiệu quả',
      status: 'negotiation',
      stage: 'demo_scheduled',
      notes: 'Đã demo, đang thương lượng giá',
      assignedTo: 'Phạm Thị Consultant',
      value: 75000000,
      lastContactedAt: '2024-01-21T10:15:00',
      createdAt: '2024-01-17T14:00:00',
      updatedAt: '2024-01-21T10:15:00',
      type: 'lead',
      company: 'GHI Enterprise'
    },
    {
      id: 4,
      name: 'Hoàng Thị D',
      phone: '0934567890',
      email: 'hoangthid@email.com',
      source: 'zalo',
      region: 'can_tho',
      product: 'Customer Service',
      tags: ['warm', 'sme'],
      content: 'Cải thiện chất lượng dịch vụ khách hàng',
      status: 'contacted',
      stage: 'follow_up',
      notes: 'Đã liên hệ lần đầu, cần follow up',
      assignedTo: 'Trần Văn Support',
      value: 30000000,
      lastContactedAt: '2024-01-18T09:30:00',
      createdAt: '2024-01-18T09:00:00',
      updatedAt: '2024-01-18T09:30:00',
      type: 'lead',
      company: 'JKL Services'
    },
    {
      id: 5,
      name: 'Vũ Minh E',
      phone: '0945678901',
      email: 'vuminhe@email.com',
      source: 'referral',
      region: 'hai_phong',
      product: 'Analytics Dashboard',
      tags: ['cold', 'enterprise'],
      content: 'Phân tích dữ liệu bán hàng chi tiết',
      status: 'new',
      stage: 'initial_contact',
      notes: 'Lead mới từ referral, chưa liên hệ',
      assignedTo: 'Đỗ Thị Analytics',
      value: 40000000,
      lastContactedAt: null,
      createdAt: '2024-01-22T16:00:00',
      updatedAt: '2024-01-22T16:00:00',
      type: 'lead',
      company: 'MNO Analytics'
    },
    {
      id: 6,
      name: 'Ngô Thị F',
      phone: '0956789012',
      email: 'ngothif@email.com',
      source: 'website',
      region: 'ha_noi',
      product: 'E-commerce Platform',
      tags: ['hot', 'sme'],
      content: 'Xây dựng platform bán hàng online',
      status: 'proposal',
      stage: 'proposal_sent',
      notes: 'Đã gửi proposal chi tiết, chờ quyết định',
      assignedTo: 'Minh Expert',
      value: 85000000,
      lastContactedAt: '2024-01-20T11:45:00',
      createdAt: '2024-01-14T13:30:00',
      updatedAt: '2024-01-20T11:45:00',
      type: 'lead',
      company: 'PQR Commerce'
    }
  ])

  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'Nguyễn Văn A',
      contact: 'nguyenvana@email.com',
      totalValue: 50000000,
      status: 'confirmed',
      createdAt: '2024-01-25T09:00:00',
      dealId: 1,
      leadId: 1
    }
  ])
  // Calculate metrics with realistic previous month data
  const calculateMetrics = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    // Calculate AI Suggestions count
    const calculateAISuggestions = () => {
      let suggestionsCount = 0
      
      // Count high-value leads needing follow-up
      leads.forEach(lead => {
        const daysSinceLastContact = lead.lastContactedAt 
          ? Math.floor((Date.now() - new Date(lead.lastContactedAt).getTime()) / (1000 * 60 * 60 * 24))
          : Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        
        if (lead.value > 50000000 && daysSinceLastContact > 3 && lead.status !== 'converted') {
          suggestionsCount++
        }
        if (lead.status === 'qualified' && daysSinceLastContact > 7) {
          suggestionsCount++
        }
        if (lead.status === 'new' && daysSinceLastContact < 1) {
          suggestionsCount++
        }
      })
      
      // General insights
      const hotLeads = leads.filter(lead => lead.tags.includes('hot'))
      if (hotLeads.length > 0) {
        suggestionsCount++
      }
      
      return suggestionsCount
    }
    
    // Simulate previous month data (in real app, this would come from API)
    const previousMonthData = {
      totalLeads: 4, // Tháng trước có 4 leads
      totalOrders: 0, // Tháng trước chưa có đơn hàng nào
      conversionRate: 25, // Tỷ lệ chuyển đổi tháng trước 25%
      aiSuggestions: 2 // Tháng trước có 2 gợi ý AI
    }
    
    const currentData = {
      totalLeads: leads.length,
      totalOrders: orders.length,
      conversionRate: leads.length > 0 ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0,
      aiSuggestions: calculateAISuggestions()
    }
    
    const calculateTrend = (current: number, previous: number): 'up' | 'down' | 'neutral' => {
      if (current > previous) return 'up'
      if (current < previous) return 'down'
      return 'neutral'
    }
    
    const calculatePercentageChange = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0
      return Math.round(((current - previous) / previous) * 100)
    }
    
    return [
      {
        id: 'leads',
        title: 'Tổng Leads',
        value: currentData.totalLeads,
        previousValue: previousMonthData.totalLeads,
        percentageChange: calculatePercentageChange(currentData.totalLeads, previousMonthData.totalLeads),
        icon: <Users className="w-5 h-5" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        trend: calculateTrend(currentData.totalLeads, previousMonthData.totalLeads),        clickAction: () => {
          setActiveTab('pipeline')
          setSelectedMetric('leads')
          setNotification({
            message: `Đang hiển thị chi tiết ${currentData.totalLeads} leads trong Pipeline`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 3000)
        }
      },
      {
        id: 'orders',
        title: 'Đơn Hàng',
        value: currentData.totalOrders,
        previousValue: previousMonthData.totalOrders,
        percentageChange: calculatePercentageChange(currentData.totalOrders, previousMonthData.totalOrders),
        icon: <ShoppingCart className="w-5 h-5" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        trend: calculateTrend(currentData.totalOrders, previousMonthData.totalOrders),        clickAction: () => {
          setActiveTab('orders')
          setSelectedMetric('orders')
          setNotification({
            message: `Đang hiển thị ${currentData.totalOrders} đơn hàng`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 3000)
        }
      },
      {
        id: 'conversion',
        title: 'Tỷ Lệ Chuyển Đổi',
        value: currentData.conversionRate,
        previousValue: previousMonthData.conversionRate,
        percentageChange: calculatePercentageChange(currentData.conversionRate, previousMonthData.conversionRate),
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        trend: calculateTrend(currentData.conversionRate, previousMonthData.conversionRate),        clickAction: () => {
          setActiveTab('pipeline')
          setSelectedMetric('conversion')
          setNotification({
            message: `Tỷ lệ chuyển đổi hiện tại: ${currentData.conversionRate}%`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 3000)
        }
      },
      {
        id: 'ai-suggestions',
        title: 'Gợi ý AI',
        value: currentData.aiSuggestions,
        previousValue: previousMonthData.aiSuggestions,
        percentageChange: calculatePercentageChange(currentData.aiSuggestions, previousMonthData.aiSuggestions),
        icon: <Bot className="w-5 h-5" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        trend: calculateTrend(currentData.aiSuggestions, previousMonthData.aiSuggestions),
        clickAction: () => {
          setActiveTab('ai-suggestions')
          setSelectedMetric('ai-suggestions')
          setNotification({
            message: `Hiển thị ${currentData.aiSuggestions} gợi ý AI thông minh`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 3000)
        }
      }
    ]
  }
  
  const metrics = calculateMetrics()
  // Convert lead directly to order function
  const convertLeadToOrder = (leadId: number) => {
    const lead = leads.find(l => l.id === leadId)
    if (!lead) return

    // Logic tạo đơn hàng từ lead
    const newOrder: Order = {
      id: orders.length + 1,
      orderNumber: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customer: lead.name,
      contact: lead.email,
      totalValue: lead.value,
      status: 'draft',
      createdAt: new Date().toISOString(),
      leadId: lead.id
    }

    // Cập nhật lead thành converted
    // Update logic here
    
    setNotification({
      message: `Đã chuyển đổi lead "${lead.name}" thành đơn hàng ${newOrder.orderNumber}`,
      type: 'success'
    })

    setTimeout(() => setNotification(null), 5000)
  }

  // Handle AI suggestions
  const handleAISuggestion = (suggestionId: string, action: string) => {
    switch (action) {
      case 'accept':
        setNotification({
          message: 'Đã thực hiện theo gợi ý AI',
          type: 'success'
        })
        break
      case 'dismiss':
        // Just mark as dismissed
        break
      case 'like':
        // Track positive feedback
        break
      case 'dislike':
        // Track negative feedback
        break
    }
    
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000)
  }

  const renderPipeline = () => {
    // Filtered leads based on search and filters
    const filteredLeads = leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                           lead.phone.includes(leadSearchTerm) ||
                           lead.company?.toLowerCase().includes(leadSearchTerm.toLowerCase())
      
      const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter
      const matchesRegion = leadRegionFilter === 'all' || lead.region === leadRegionFilter
      const matchesSource = leadSourceFilter === 'all' || lead.source === leadSourceFilter
      
      return matchesSearch && matchesStatus && matchesRegion && matchesSource
    })

    return (
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email, phone, công ty..."
                  value={leadSearchTerm}
                  onChange={(e) => setLeadSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Filter Controls */}
            <div className="flex gap-3">
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="new">Mới</option>
                <option value="contacted">Đã liên hệ</option>
                <option value="qualified">Đã xác định</option>
                <option value="proposal">Báo giá</option>
                <option value="negotiation">Đàm phán</option>
                <option value="converted">Đã chuyển đổi</option>
              </select>
              
              <select
                value={leadRegionFilter}
                onChange={(e) => setLeadRegionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả khu vực</option>
                <option value="ha_noi">Hà Nội</option>
                <option value="ho_chi_minh">TP.HCM</option>
                <option value="da_nang">Đà Nẵng</option>
                <option value="can_tho">Cần Thơ</option>
                <option value="hai_phong">Hải Phòng</option>
              </select>
              
              <select
                value={leadSourceFilter}
                onChange={(e) => setLeadSourceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả nguồn</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
                <option value="website">Website</option>
                <option value="zalo">Zalo</option>
                <option value="referral">Referral</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Bộ lọc
              </button>
              
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Thêm Lead
              </button>
            </div>
          </div>
          
          {/* Filter Summary */}
          {(leadSearchTerm || leadStatusFilter !== 'all' || leadRegionFilter !== 'all' || leadSourceFilter !== 'all') && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span>Hiển thị {filteredLeads.length} / {leads.length} leads</span>
              <button 
                onClick={() => {
                  setLeadSearchTerm('');
                  setLeadStatusFilter('all');
                  setLeadRegionFilter('all');
                  setLeadSourceFilter('all');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khu vực
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm/Dịch vụ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nguồn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá trị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giai đoạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phụ trách
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lần cuối liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.company || 'Cá nhân'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.phone}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {lead.region === 'ha_noi' ? 'Hà Nội' : 
                         lead.region === 'ho_chi_minh' ? 'TP.HCM' : 
                         lead.region === 'da_nang' ? 'Đà Nẵng' : 
                         lead.region === 'can_tho' ? 'Cần Thơ' : 
                         lead.region === 'hai_phong' ? 'Hải Phòng' : lead.region}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.product}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-xs">
                        {lead.content.length > 50 ? `${lead.content.substring(0, 50)}...` : lead.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          lead.source === 'facebook' ? 'bg-blue-500' :
                          lead.source === 'google' ? 'bg-red-500' :
                          lead.source === 'website' ? 'bg-green-500' :
                          lead.source === 'zalo' ? 'bg-blue-600' :
                          lead.source === 'referral' ? 'bg-purple-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-sm text-gray-900 capitalize">
                          {lead.source === 'facebook' ? 'Facebook' :
                           lead.source === 'google' ? 'Google' :
                           lead.source === 'website' ? 'Website' :
                           lead.source === 'zalo' ? 'Zalo' :
                           lead.source === 'referral' ? 'Referral' : lead.source}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(lead.value)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                        lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'negotiation' ? 'bg-orange-100 text-orange-800' :
                        lead.status === 'proposal' ? 'bg-purple-100 text-purple-800' :
                        lead.status === 'lost' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status === 'converted' ? 'Đã chuyển đổi' :
                         lead.status === 'qualified' ? 'Đã xác định' :
                         lead.status === 'contacted' ? 'Đã liên hệ' :
                         lead.status === 'negotiation' ? 'Đàm phán' :
                         lead.status === 'proposal' ? 'Báo giá' :
                         lead.status === 'lost' ? 'Thất bại' : 'Mới'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        lead.stage === 'deal_created' ? 'bg-green-100 text-green-800' :
                        lead.stage === 'proposal_sent' ? 'bg-purple-100 text-purple-800' :
                        lead.stage === 'follow_up' ? 'bg-yellow-100 text-yellow-800' :
                        lead.stage === 'demo_scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.stage === 'deal_created' ? 'Đã tạo deal' :
                         lead.stage === 'proposal_sent' ? 'Đã gửi báo giá' :
                         lead.stage === 'follow_up' ? 'Theo dõi' :
                         lead.stage === 'demo_scheduled' ? 'Đã lên lịch demo' : lead.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                            tag === 'hot' ? 'bg-red-100 text-red-800' :
                            tag === 'warm' ? 'bg-orange-100 text-orange-800' :
                            tag === 'cold' ? 'bg-blue-100 text-blue-800' :
                            tag === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                            tag === 'sme' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleDateString('vi-VN') : 'Chưa liên hệ'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Gọi điện">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Gửi email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Xem chi tiết">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Chuyển thành khách hàng">
                          <User className="w-4 h-4" />
                        </button>
                        {lead.status !== 'converted' && (
                          <button 
                            onClick={() => convertLeadToOrder(lead.id)}
                            className="text-purple-600 hover:text-purple-900" 
                            title="Tạo đơn hàng"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Trước
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Sau
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredLeads.length}</span> của{' '}
                  <span className="font-medium">{filteredLeads.length}</span> kết quả
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <span className="sr-only">Trước</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <span className="sr-only">Sau</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="p-4 space-y-4">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
          notification?.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{notification?.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hoạt động Bán hàng</h1>
          <p className="text-gray-600">Quản lý toàn bộ quy trình từ Lead đến Đơn hàng</p>
        </div>
      </div>      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">{metrics.map((metric) => (
          <div 
            key={metric.id} 
            className={`bg-white rounded-lg shadow-sm border-2 p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
              selectedMetric === metric.id 
                ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={metric.clickAction}
            title={`Click để xem chi tiết ${metric.title.toLowerCase()}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}{metric.id === 'conversion' ? '%' : ''}</p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : metric.trend === 'down' ? (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                )}
                <span className={`text-sm ml-1 font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.trend === 'neutral' ? '0%' : 
                   metric.trend === 'up' ? `+${metric.percentageChange}%` : 
                   `${metric.percentageChange}%`}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                vs tháng trước
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Tháng trước: {metric.previousValue}{metric.id === 'conversion' ? '%' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-4">            {[
              { id: 'pipeline', name: 'Leads & Pipeline', count: leads.length, icon: <Activity className="w-4 h-4" /> },
              { id: 'orders', name: 'Đơn hàng', count: orders.length, icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'ai-suggestions', name: 'Gợi ý AI', count: 4, icon: <Bot className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setSelectedMetric(null) // Reset selected metric when manually changing tabs
                }}
                className={`group inline-flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}>
                  {tab.icon}
                </span>
                <span>{tab.name}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>        {/* Tab Content */}
        <div className="p-4">          {activeTab === 'pipeline' && renderPipeline()}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Quy trình khép kín</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Đơn hàng được tạo tự động từ các Deals đã chuyển đổi thành công. 
                      Bạn có thể theo dõi toàn bộ customer journey từ Lead ban đầu.
                    </p>
                  </div>
                </div>
              </div>
              <OrderManagement />
            </div>
          )}
          {activeTab === 'ai-suggestions' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-900">AI Gợi ý thông minh</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      AI phân tích dữ liệu leads và deals để đưa ra những gợi ý hành động tối ưu cho đội sales của bạn.
                    </p>
                  </div>
                </div>
              </div>
              <AISuggestionsTab 
                leads={leads}
                deals={[]}
                onSuggestionAction={handleAISuggestion}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
