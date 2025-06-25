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
  Package
} from 'lucide-react'

import OrderManagement from './OrderManagement'

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

interface Deal {
  id: number
  name: string
  customer: string
  contact: string
  value: string
  stage: 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  probability: number
  expectedClose: string
  createdAt: string
  lastActivity: string
  owner: string
  leadId?: number // Liên kết với Lead ban đầu
  orderId?: number // Liên kết với Order đã tạo
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
  const [activeTab, setActiveTab] = useState<'leads' | 'deals' | 'orders' | 'pipeline'>('leads')
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
    dealStage: '',
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

  const [deals] = useState<Deal[]>([
    {
      id: 1,
      name: 'CRM Solution - ABC Corp',
      customer: 'Nguyễn Văn A',
      contact: 'nguyenvana@email.com',
      value: '50,000,000 VND',
      stage: 'negotiation',
      probability: 75,
      expectedClose: '2024-02-15',
      createdAt: '2024-01-20T14:30:00',
      lastActivity: '2024-01-22T10:00:00',
      owner: 'Minh Expert',
      leadId: 1
    },
    {
      id: 2,
      name: 'Marketing Automation - DEF Startup',
      customer: 'Trần Thị B',
      contact: 'tranthib@email.com',
      value: '25,000,000 VND',
      stage: 'proposal',
      probability: 60,
      expectedClose: '2024-02-28',
      createdAt: '2024-01-19T16:45:00',
      lastActivity: '2024-01-21T14:20:00',
      owner: 'An Expert',
      leadId: 2
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
    
    // Simulate previous month data (in real app, this would come from API)
    const previousMonthData = {
      totalLeads: 4, // Tháng trước có 4 leads
      openDeals: 1,  // Tháng trước có 1 deal đang mở
      totalOrders: 0, // Tháng trước chưa có đơn hàng nào
      conversionRate: 25 // Tỷ lệ chuyển đổi tháng trước 25%
    }
    
    const currentData = {
      totalLeads: leads.length,
      openDeals: deals.filter(d => !d.stage.includes('closed')).length,
      totalOrders: orders.length,
      conversionRate: leads.length > 0 ? Math.round((deals.length / leads.length) * 100) : 0
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
          setActiveTab('leads')
          setSelectedMetric('leads')
          setNotification({
            message: `Đang hiển thị chi tiết ${currentData.totalLeads} leads`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 3000)
        }
      },
      {
        id: 'deals',
        title: 'Deals Đang Mở',
        value: currentData.openDeals,
        previousValue: previousMonthData.openDeals,
        percentageChange: calculatePercentageChange(currentData.openDeals, previousMonthData.openDeals),
        icon: <Target className="w-5 h-5" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        trend: calculateTrend(currentData.openDeals, previousMonthData.openDeals),        clickAction: () => {
          setActiveTab('deals')
          setSelectedMetric('deals')
          setNotification({
            message: `Đang hiển thị ${currentData.openDeals} deals đang mở`,
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
      }
    ]
  }
  
  const metrics = calculateMetrics()

  // Convert deal to order function
  const convertDealToOrder = (dealId: number) => {
    const deal = deals.find(d => d.id === dealId)
    if (!deal) return

    // Logic tạo đơn hàng từ deal
    const newOrder: Order = {
      id: orders.length + 1,
      orderNumber: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customer: deal.customer,
      contact: deal.contact,
      totalValue: parseFloat(deal.value.replace(/[,\sVND]/g, '')),
      status: 'draft',
      createdAt: new Date().toISOString(),
      dealId: deal.id,
      leadId: deal.leadId
    }

    // Cập nhật deal thành closed_won
    // Update logic here
    
    setNotification({
      message: `Đã chuyển đổi deal "${deal.name}" thành đơn hàng ${newOrder.orderNumber}`,
      type: 'success'
    })

    setTimeout(() => setNotification(null), 5000)
  }

  const renderLeads = () => {
    // Filter leads based on search and filters
    const filteredLeads = leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                           lead.phone.includes(leadSearchTerm) ||
                           lead.product.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                           lead.content.toLowerCase().includes(leadSearchTerm.toLowerCase())
      
      const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter
      const matchesRegion = leadRegionFilter === 'all' || lead.region === leadRegionFilter
      const matchesSource = leadSourceFilter === 'all' || lead.source === leadSourceFilter
      
      return matchesSearch && matchesStatus && matchesRegion && matchesSource
    })

    // Get unique values for filters
    const uniqueStatuses = Array.from(new Set(leads.map(lead => lead.status)))
    const uniqueRegions = Array.from(new Set(leads.map(lead => lead.region)))
    const uniqueSources = Array.from(new Set(leads.map(lead => lead.source)))

    return (
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm leads..."
                value={leadSearchTerm}
                onChange={(e) => setLeadSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <select
              value={leadStatusFilter}
              onChange={(e) => setLeadStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>
                  {status === 'converted' ? 'Đã chuyển đổi' :
                   status === 'qualified' ? 'Đã xác định' :
                   status === 'contacted' ? 'Đã liên hệ' :
                   status === 'negotiation' ? 'Đàm phán' :
                   status === 'proposal' ? 'Báo giá' :
                   status === 'lost' ? 'Thất bại' : 'Mới'}
                </option>
              ))}
            </select>

            <select
              value={leadRegionFilter}
              onChange={(e) => setLeadRegionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">Tất cả khu vực</option>
              {uniqueRegions.map(region => (
                <option key={region} value={region}>
                  {region === 'ha_noi' ? 'Hà Nội' : 
                   region === 'ho_chi_minh' ? 'Hồ Chí Minh' : 
                   region === 'da_nang' ? 'Đà Nẵng' : 
                   region === 'can_tho' ? 'Cần Thơ' : 
                   region === 'hai_phong' ? 'Hải Phòng' : region}
                </option>
              ))}
            </select>

            <select
              value={leadSourceFilter}
              onChange={(e) => setLeadSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">Tất cả nguồn</option>
              {uniqueSources.map(source => (
                <option key={source} value={source}>
                  {source === 'facebook' ? 'Facebook' :
                   source === 'google' ? 'Google' :
                   source === 'website' ? 'Website' :
                   source === 'zalo' ? 'Zalo' :
                   source === 'referral' ? 'Referral' : source}
                </option>
              ))}
            </select>

            <div className="text-sm text-gray-600">
              Hiển thị {filteredLeads.length} / {leads.length} leads
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Danh sách Leads</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Thêm Lead
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khu vực
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
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
                    Liên hệ cuối
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead, index) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                          <div className="text-xs text-gray-400">{lead.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {lead.region === 'ha_noi' ? 'Hà Nội' : 
                         lead.region === 'ho_chi_minh' ? 'Hồ Chí Minh' : 
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
                        <button className="text-green-600 hover:text-green-900" title="Chuyển đổi">
                          <ArrowRight className="w-4 h-4" />
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
    )
  }

  const renderDeals = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách Deals</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4 inline mr-2" />
              Thêm Deal
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giai đoạn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xác suất
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                    <div className="text-sm text-gray-500">Lead ID: #{deal.leadId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{deal.customer}</div>
                    <div className="text-sm text-gray-500">{deal.contact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      deal.stage === 'negotiation' ? 'bg-orange-100 text-orange-800' :
                      deal.stage === 'proposal' ? 'bg-blue-100 text-blue-800' :
                      deal.stage === 'qualified' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {deal.stage === 'negotiation' ? 'Đàm phán' :
                       deal.stage === 'proposal' ? 'Đề xuất' :
                       deal.stage === 'qualified' ? 'Đã xác định' : deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.probability}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => convertDealToOrder(deal.id)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                      title="Chuyển thành đơn hàng"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>  )

  const renderPipeline = () => {
    // Kanban columns for lead conversion process
    const kanbanColumns = [
      {
        id: 'new',
        title: 'Leads Mới',
        status: 'new',
        color: 'bg-gray-100 border-gray-300',
        headerColor: 'bg-gray-50 text-gray-700',
        icon: <Users className="w-5 h-5" />,
        leads: leads.filter(lead => lead.status === 'new')
      },
      {
        id: 'contacted',
        title: 'Đã Liên Hệ',
        status: 'contacted',
        color: 'bg-blue-100 border-blue-300',
        headerColor: 'bg-blue-50 text-blue-700',
        icon: <Phone className="w-5 h-5" />,
        leads: leads.filter(lead => lead.status === 'contacted')
      },
      {
        id: 'qualified',
        title: 'Đã Xác Định',
        status: 'qualified',
        color: 'bg-yellow-100 border-yellow-300',
        headerColor: 'bg-yellow-50 text-yellow-700',
        icon: <CheckCircle className="w-5 h-5" />,
        leads: leads.filter(lead => lead.status === 'qualified')
      },
      {
        id: 'proposal',
        title: 'Đã Đề Xuất',
        status: 'proposal',
        color: 'bg-purple-100 border-purple-300',
        headerColor: 'bg-purple-50 text-purple-700',
        icon: <Briefcase className="w-5 h-5" />,
        leads: leads.filter(lead => lead.status === 'proposal')
      },
      {
        id: 'negotiation',
        title: 'Đang Đàm Phán',
        status: 'negotiation',
        color: 'bg-orange-100 border-orange-300',
        headerColor: 'bg-orange-50 text-orange-700',
        icon: <Activity className="w-5 h-5" />,
        leads: leads.filter(lead => lead.status === 'negotiation')
      },
      {
        id: 'converted',
        title: 'Đã Chuyển Đổi',
        status: 'converted',
        color: 'bg-green-100 border-green-300',
        headerColor: 'bg-green-50 text-green-700',
        icon: <Target className="w-5 h-5" />,
        leads: leads.filter(lead => lead.status === 'converted')
      }
    ]    // Calculate total value for each column
    const getColumnValue = (columnLeads: Lead[]) => {
      return columnLeads.reduce((sum, lead) => sum + lead.value, 0)
    }

    return (
      <div className="space-y-6">        {/* Pipeline Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <h4 className="text-sm font-medium mb-2">Tỷ lệ chuyển đổi</h4>
            <div className="text-2xl font-bold">
              {leads.length > 0 ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0}%
            </div>
            <p className="text-xs opacity-75">Lead → Deal</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <h4 className="text-sm font-medium mb-2">Giá trị Pipeline</h4>
            <div className="text-lg font-bold">
              {leads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString('vi-VN')}
            </div>
            <p className="text-xs opacity-75">VND</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <h4 className="text-sm font-medium mb-2">Thời gian TB</h4>
            <div className="text-2xl font-bold">
              {Math.round(Math.random() * 15 + 5)}
            </div>
            <p className="text-xs opacity-75">ngày/giai đoạn</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <h4 className="text-sm font-medium mb-2">Doanh thu thực</h4>
            <div className="text-lg font-bold">
              {orders.reduce((sum, order) => sum + order.totalValue, 0).toLocaleString('vi-VN')}
            </div>
            <p className="text-xs opacity-75">VND</p>
          </div>
        </div>        {/* Pipeline Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline - Kanban Board</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Tổng Leads: {leads.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Đã chuyển đổi: {leads.filter(l => l.status === 'converted').length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Tỷ lệ: {leads.length > 0 ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kanbanColumns.map((column) => (
              <div
                key={column.id}
                className={`border-2 border-dashed rounded-lg ${column.color} min-h-[600px]`}
              >
                {/* Column Header */}
                <div className={`p-4 rounded-t-lg ${column.headerColor} border-b`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {column.icon}
                      <h4 className="font-medium text-sm">{column.title}</h4>
                    </div>
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded-full">
                      {column.leads.length}
                    </span>
                  </div>
                  <div className="mt-2 text-xs opacity-75">
                    {getColumnValue(column.leads).toLocaleString('vi-VN')} VND
                  </div>
                </div>

                {/* Column Content */}
                <div className="p-3 space-y-3">
                  {column.leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-move hover:shadow-md transition-shadow"
                    >
                      {/* Lead Card Header */}
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-sm text-gray-900 truncate">
                          {lead.name}
                        </h5>
                        <div className="flex space-x-1">
                          {lead.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${
                                tag === 'hot' ? 'bg-red-100 text-red-800' :
                                tag === 'warm' ? 'bg-orange-100 text-orange-800' :
                                tag === 'cold' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {tag === 'hot' ? '🔥' : tag === 'warm' ? '🌡️' : tag === 'cold' ? '❄️' : tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Lead Details */}
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1" />
                          <span className="truncate">{lead.company || 'Cá nhân'}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Package className="w-3 h-3 mr-1" />
                          <span className="truncate">{lead.product}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span className="font-medium text-green-600">
                            {lead.value.toLocaleString('vi-VN')} VND
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>{lead.assignedTo}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>

                      {/* Lead Actions */}
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                        <div className="flex space-x-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Xem chi tiết">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-orange-600 transition-colors" title="Chỉnh sửa">
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {lead.status !== 'converted' && (
                          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                            Tạo Deal
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Empty State */}
                  {column.leads.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                        {column.icon}
                      </div>
                      <p className="text-xs">Chưa có leads</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{metrics.map((metric) => (
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
              { id: 'leads', name: 'Leads', count: leads.length, icon: <Users className="w-4 h-4" /> },
              { id: 'deals', name: 'Deals', count: deals.filter(d => !d.stage.includes('closed')).length, icon: <Target className="w-4 h-4" /> },
              { id: 'orders', name: 'Đơn hàng', count: orders.length, icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'pipeline', name: 'Pipeline', count: leads.length + deals.length + orders.length, icon: <Activity className="w-4 h-4" /> }].map((tab) => (
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
        <div className="p-4">          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'deals' && renderDeals()}
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
          {activeTab === 'pipeline' && renderPipeline()}
        </div>
      </div>
    </div>
  )
}
