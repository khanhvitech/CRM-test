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
  Activity
} from 'lucide-react'

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
}

interface MetricData {
  title: string
  value: number
  previousValue: number
  icon: React.ReactNode
  color: string
  bgColor: string
  trend?: 'up' | 'down' | 'neutral'
}

export default function SalesManagement() {
  const [activeTab, setActiveTab] = useState<'leads' | 'deals' | 'pipeline'>('leads')
  const [showFilters, setShowFilters] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  
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

  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nguyenvana@email.com',
      source: 'facebook',
      region: 'ha_noi',
      product: 'CRM Solution',
      tags: ['hot_lead', 'enterprise'],
      content: 'Khách hàng quan tâm đến giải pháp CRM cho doanh nghiệp 500+ nhân viên',
      status: 'new',
      stage: 'reception',
      notes: 'Khách hàng có nhu cầu triển khai trong Q2',
      assignedTo: 'Nguyễn Sales Manager',
      value: 50000000,
      lastContactedAt: '2024-01-15T10:30:00',
      createdAt: '2024-01-15T09:00:00',
      updatedAt: '2024-01-15T10:30:00',
      type: 'lead',
      company: 'ABC Corp'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0902345678',
      email: 'tranthib@email.com',
      source: 'google_ads',
      region: 'ho_chi_minh',
      product: 'ERP System',
      tags: ['warm_lead', 'manufacturing'],
      content: 'Tìm hiểu hệ thống ERP cho nhà máy sản xuất',
      status: 'contacted',
      stage: 'consulting',
      notes: 'Đã gọi điện tư vấn, khách quan tâm đến module kho',
      assignedTo: 'Trần Business Dev',
      value: 75000000,
      lastContactedAt: '2024-01-16T14:20:00',
      createdAt: '2024-01-14T08:45:00',
      updatedAt: '2024-01-16T14:20:00',
      type: 'lead',
      company: 'XYZ Ltd'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      phone: '0903456789',
      email: 'levanc@email.com',
      source: 'zalo',
      region: 'da_nang',
      product: 'Digital Transformation',
      tags: ['potential', 'tech_company'],
      content: 'Cần tư vấn chuyển đổi số cho startup công nghệ',
      status: 'qualified',
      stage: 'quoted',
      notes: 'Đã gửi báo giá, chờ phản hồi từ ban lãnh đạo',
      assignedTo: 'Lê Tech Consultant',
      value: 120000000,
      lastContactedAt: '2024-01-17T16:00:00',
      createdAt: '2024-01-13T11:15:00',
      updatedAt: '2024-01-17T16:00:00',
      type: 'lead',
      company: 'DEF Co'
    },
    {
      id: 4,
      name: 'Phạm Minh D',
      phone: '0904567890',
      email: 'phamminhtd@email.com',
      source: 'manual',
      region: 'mien_bac',
      product: 'Consulting Services',
      tags: ['cold_lead', 'retail'],
      content: 'Giới thiệu từ khách hàng cũ, quan tâm tư vấn quản lý bán lẻ',
      status: 'new',
      stage: 'reception',
      notes: 'Chưa liên hệ, cần gọi điện trong tuần này',
      assignedTo: 'Phạm Sales Rep',
      value: 30000000,
      lastContactedAt: null,
      createdAt: '2024-01-18T13:30:00',
      updatedAt: '2024-01-18T13:30:00',
      type: 'lead',
      company: 'GHI Inc'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      phone: '0905678901',
      email: 'hoangvane@email.com',
      source: 'referral',
      region: 'can_tho',
      product: 'HRM System',
      tags: ['manufacturing', 'large'],
      content: 'Quản lý nhân sự cho nhà máy 500+ người',
      status: 'converted',
      stage: 'deal_created',
      notes: 'Signed contract, implementation started',
      assignedTo: 'Hoàng Expert',
      value: 300000000,
      lastContactedAt: '2024-01-19T10:00:00',
      createdAt: '2024-01-11T09:00:00',
      updatedAt: '2024-01-19T10:00:00',
      type: 'lead',
      company: 'JKL Group'
    }
  ])

  const [deals] = useState<Deal[]>([
    {
      id: 1,
      name: 'Hợp đồng phần mềm CRM cho ABC Corp',
      customer: 'ABC Corporation',
      contact: 'Nguyễn Văn A',
      value: '500,000,000',
      stage: 'proposal',
      probability: 75,
      expectedClose: '2024-02-15',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-18',
      owner: 'Nguyễn Sales',
      leadId: 1
    },
    {
      id: 2,
      name: 'Nâng cấp hệ thống IT cho XYZ Tech',
      customer: 'XYZ Technology',
      contact: 'Trần Thị B',
      value: '750,000,000',
      stage: 'negotiation',
      probability: 85,
      expectedClose: '2024-02-28',
      createdAt: '2024-01-03',
      lastActivity: '2024-01-19',
      owner: 'Trần Manager',
      leadId: 2
    },
    {
      id: 3,
      name: 'Triển khai ERP cho DEF Manufacturing',
      customer: 'DEF Manufacturing',
      contact: 'Lê Văn C',
      value: '1,200,000,000',
      stage: 'qualified',
      probability: 60,
      expectedClose: '2024-03-31',
      createdAt: '2024-01-01',
      lastActivity: '2024-01-17',
      owner: 'Lê Director',
      leadId: 3
    },
    {
      id: 4,
      name: 'Hệ thống POS cho JKL Retail',
      customer: 'JKL Retail',
      contact: 'Hoàng Văn E',
      value: '400,000,000',
      stage: 'closed_won',
      probability: 100,
      expectedClose: '2024-01-20',
      createdAt: '2023-12-20',
      lastActivity: '2024-01-20',
      owner: 'Hoàng Expert',
      leadId: 5
    },
  ])

  // Calculate percentage change
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  // Calculate statistics
  const stats = {
    totalLeads: leads.length,
    totalDeals: deals.length,
    totalValue: [...leads, ...deals]
      .reduce((sum, item) => sum + (typeof item.value === 'number' ? item.value : parseInt(item.value.toString().replace(/,/g, ''))), 0),
    conversionRate: deals.length > 0 ? 
      Math.round((deals.length / (leads.length + deals.length)) * 100) : 0
  }

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/,/g, ''))
    return numValue.toLocaleString('vi-VN') + ' đ'
  }

  // Apply filters function
  const applyFilters = () => {
    setNotification({
      message: 'Bộ lọc đã được áp dụng thành công!',
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      timeRange: 'thisMonth',
      team: '',
      product: '',
      owner: '',
      leadStatus: '',
      dealStage: '',
      advancedFilters: false
    })
    setNotification({
      message: 'Bộ lọc đã được đặt lại!',
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'qualified':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'proposal':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'negotiation':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'lost':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Mới'
      case 'contacted': return 'Đã liên hệ'
      case 'qualified': return 'Đủ điều kiện'
      case 'proposal': return 'Báo giá'
      case 'negotiation': return 'Đàm phán'
      case 'converted': return 'Đã chuyển đổi'
      case 'lost': return 'Thất bại'
      default: return status
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'discovery':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'qualified':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'proposal':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'negotiation':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'closed_won':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'closed_lost':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'discovery': return 'Khám phá'
      case 'qualified': return 'Đủ điều kiện'
      case 'proposal': return 'Báo giá'
      case 'negotiation': return 'Đàm phán'
      case 'closed_won': return 'Thành công'
      case 'closed_lost': return 'Thất bại'
      default: return stage
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Facebook': return 'bg-blue-500'
      case 'Google Ads': return 'bg-red-500'
      case 'Google': return 'bg-red-500'
      case 'Zalo Business': return 'bg-blue-600'
      case 'Zalo': return 'bg-blue-600'
      case 'Website': return 'bg-green-500'
      case 'Referral': return 'bg-purple-500'
      case 'LinkedIn': return 'bg-blue-700'
      case 'Email Marketing': return 'bg-orange-500'
      case 'Cold Call': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPipelineData = () => {
    const stages = [
      { id: 'lead_new', name: 'Lead Mới', leads: leads.filter(l => l.status === 'new') },
      { id: 'lead_contacted', name: 'Đã Liên Hệ', leads: leads.filter(l => l.status === 'contacted') },
      { id: 'lead_qualified', name: 'Đủ Điều Kiện', leads: leads.filter(l => l.status === 'qualified') },
      { id: 'deal_proposal', name: 'Deal - Báo Giá', deals: deals.filter(d => d.stage === 'proposal') },
      { id: 'deal_negotiation', name: 'Deal - Đàm Phán', deals: deals.filter(d => d.stage === 'negotiation') },
      { id: 'deal_won', name: 'Thành Công', deals: deals.filter(d => d.stage === 'closed_won') }
    ]
    return stages
  }

  // Overview metrics data
  const overviewMetrics: MetricData[] = [
    {
      title: 'Tổng Leads',
      value: leads.length,
      previousValue: leads.length - 5,
      icon: <Users className="w-4 h-4 sm:w-6 sm:h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Leads Hot',
      value: leads.filter(l => l.tags.includes('hot_lead')).length,
      previousValue: leads.filter(l => l.tags.includes('hot_lead')).length - 2,
      icon: <Target className="w-4 h-4 sm:w-6 sm:h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Deals Đang Mở',
      value: deals.filter(d => !d.stage.includes('closed')).length,
      previousValue: deals.filter(d => !d.stage.includes('closed')).length - 1,
      icon: <Briefcase className="w-4 h-4 sm:w-6 sm:h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Deals Thành Công',
      value: deals.filter(d => d.stage === 'closed_won').length,
      previousValue: deals.filter(d => d.stage === 'closed_won').length - 1,
      icon: <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Tổng Giá Trị Pipeline',
      value: Math.round(deals.filter(d => !d.stage.includes('closed')).reduce((sum, deal) => sum + parseInt(deal.value.replace(/,/g, '')), 0) / 1000000),
      previousValue: Math.round(deals.filter(d => !d.stage.includes('closed')).reduce((sum, deal) => sum + parseInt(deal.value.replace(/,/g, '')), 0) / 1000000) - 10,
      icon: <DollarSign className="w-4 h-4 sm:w-6 sm:h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Tỷ Lệ Chuyển Đổi',
      value: Math.round((deals.filter(d => d.stage === 'closed_won').length / leads.length) * 100),
      previousValue: Math.round((deals.filter(d => d.stage === 'closed_won').length / leads.length) * 100) - 2,
      icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
        {overviewMetrics.map((metric, index) => {
          const percentageChange = calculatePercentageChange(metric.value, metric.previousValue)
          const isPositive = percentageChange >= 0
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${metric.bgColor} rounded-lg`}>
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-xl font-bold text-gray-900">
                  {metric.title.includes('Giá Trị') ? `${metric.value}M đ` : metric.title.includes('Tỷ Lệ') ? `${metric.value}%` : metric.value}
                </p>
              </div>
              
              <div className="mt-2 flex items-center text-xs">
                <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  <span className="font-medium">
                    {Math.abs(percentageChange).toFixed(1)}%
                  </span>
                </div>
                <span className="text-gray-500 ml-1">vs tháng trước</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Cần Theo Dõi</h3>
          <div className="space-y-3">
            {leads.filter(l => ['qualified', 'proposal'].includes(l.status)).slice(0, 3).map(lead => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.company || lead.region}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
                    {getStatusText(lead.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deals Sắp Đóng</h3>
          <div className="space-y-3">
            {deals.filter(d => !d.stage.includes('closed')).slice(0, 3).map(deal => (
              <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{deal.customer}</div>
                  <div className="text-sm text-gray-500">{deal.expectedClose}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{deal.value} đ</div>
                  <div className="text-sm text-gray-500">{deal.probability}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional card for larger screens */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hidden xl:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Sources</h3>
          <div className="space-y-3">
            {['facebook', 'google_ads', 'zalo'].map(source => {
              const count = leads.filter(l => l.source === source).length;
              return (
                <div key={source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getSourceColor(source)} mr-3`}></div>
                    <span className="font-medium text-gray-900 capitalize">{source.replace('_', ' ')}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{count} leads</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional card for very large screens */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hidden 2xl:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Lead mới từ Facebook</div>
                <div className="text-xs text-gray-500">2 giờ trước</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Deal được đóng</div>
                <div className="text-xs text-gray-500">4 giờ trước</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Follow-up cần thiết</div>
                <div className="text-xs text-gray-500">6 giờ trước</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLeads = () => (
    <div className="space-y-4">
      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Liên hệ</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Vùng/Sản phẩm</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tags</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Nội dung</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Giai đoạn</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Người phụ trách</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Giá trị</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Cập nhật</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Công ty</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Nguồn</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  {/* ID */}
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{lead.id}</div>
                  </td>
                  
                  {/* Lead Info */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${getSourceColor(lead.source)} mr-2`}></div>
                      </div>
                      <div className="ml-2 min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{lead.name}</div>
                        <div className="text-xs text-gray-500 truncate">{lead.source}</div>
                        {/* Mobile info - show contact info on mobile */}
                        <div className="sm:hidden text-xs text-gray-500 mt-1">
                          <div>{lead.phone}</div>
                          <div className="truncate">{lead.email}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Contact Info - Hidden on mobile */}
                  <td className="px-3 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">{lead.phone}</div>
                    <div className="text-sm text-gray-500 truncate max-w-40">{lead.email}</div>
                  </td>
                  
                  {/* Region & Product - Hidden on mobile/tablet */}
                  <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm font-medium text-gray-900">{lead.region}</div>
                    <div className="text-sm text-gray-500 truncate max-w-32">{lead.product}</div>
                  </td>
                  
                  {/* Tags - Hidden on mobile/tablet */}
                  <td className="px-3 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {tag}
                        </span>
                      ))}
                      {lead.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{lead.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  
                  {/* Content - Hidden on smaller screens */}
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <div className="text-sm text-gray-900 max-w-64 truncate" title={lead.content}>
                      {lead.content}
                    </div>
                    {lead.notes && (
                      <div className="text-sm text-gray-500 max-w-64 truncate mt-1" title={lead.notes}>
                        📝 {lead.notes}
                      </div>
                    )}
                  </td>
                  
                  {/* Status */}
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
                      <span className="hidden sm:inline">{getStatusText(lead.status)}</span>
                      <span className="sm:hidden">{getStatusText(lead.status).slice(0, 3)}</span>
                    </span>
                  </td>
                  
                  {/* Stage - Hidden on mobile/tablet */}
                  <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-900 max-w-32 truncate" title={lead.stage}>
                      {lead.stage}
                    </div>
                  </td>
                  
                  {/* Assigned To - Hidden on mobile/tablet */}
                  <td className="px-3 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900 truncate max-w-28">{lead.assignedTo}</div>
                  </td>
                  
                  {/* Value - Hidden on mobile */}
                  <td className="px-3 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm font-medium text-gray-900">{lead.value.toLocaleString()} đ</div>
                  </td>
                  
                  {/* Last Updated - Hidden on mobile/tablet */}
                  <td className="px-3 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900">
                      {lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleDateString('vi-VN') : 'Chưa liên hệ'}
                    </div>
                    <div className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</div>
                  </td>

                  {/* Company - Hidden except on very large screens */}
                  <td className="px-3 py-4 whitespace-nowrap hidden xl:table-cell">
                    <div className="text-sm font-medium text-gray-900">{lead.company || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{lead.region}</div>
                  </td>

                  {/* Source - Hidden except on very large screens */}
                  <td className="px-3 py-4 whitespace-nowrap hidden xl:table-cell">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getSourceColor(lead.source)} mr-2`}></div>
                      <span className="text-sm text-gray-900">{lead.source}</span>
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-3 py-4 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Gọi điện">
                        <Phone className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors hidden sm:inline-block" title="Gửi email">
                        <Mail className="w-3 h-3" />
                      </button>
                      {lead.status === 'qualified' && (
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors hidden sm:inline-block" title="Chuyển thành Deal">
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Xem thêm">
                        <MoreVertical className="w-3 h-3" />
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

  const renderPipeline = () => {
    const pipelineStages = getPipelineData()
    
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Pipeline Header */}
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sales Pipeline</h2>
          <span className="text-gray-300">|</span>
          <p className="text-sm text-gray-600">Theo dõi quy trình chuyển đổi từ Lead thành Deal</p>
        </div>

        {/* Kanban Board */}
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {pipelineStages.map((stage, index) => {
              const allLeads = stage.leads || [];
              const allDeals = stage.deals || [];
              const totalItems = allLeads.length + allDeals.length;
              
              const totalValue = [...allLeads, ...allDeals].reduce((sum, item) => {
                if ('type' in item && item.type === 'lead') {
                  return sum + (item.value || 0);
                } else if ('value' in item) {
                  const value = typeof item.value === 'string' ? 
                    parseInt(item.value.replace(/,/g, '')) : item.value;
                  return sum + (value || 0);
                }
                return sum;
              }, 0);
              
              return (
                <div key={stage.id} className="flex-shrink-0 w-80">
                  {/* Column Header */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm">{stage.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {totalItems}
                        </span>
                      </div>
                      {totalValue > 0 && (
                        <div className="mt-2 text-xs text-gray-600">
                          Tổng giá trị: {(totalValue / 1000000).toFixed(1)}M đ
                        </div>
                      )}
                    </div>
                    
                    {/* Items Container */}
                    <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
                      {/* Lead Cards */}
                      {allLeads.map(lead => (
                        <div key={`lead-${lead.id}`} className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm truncate">{lead.name}</div>
                              <div className="text-xs text-gray-600 truncate">{lead.company || lead.email}</div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-600 font-medium">Lead</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{lead.source}</span>
                            <span className="font-medium text-gray-900">
                              {(lead.value / 1000000).toFixed(1)}M đ
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                              {getStatusText(lead.status)}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                <Phone className="w-3 h-3" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                <Mail className="w-3 h-3" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreVertical className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Deal Cards */}
                      {allDeals.map(deal => (
                        <div key={`deal-${deal.id}`} className="bg-green-50 border border-green-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm truncate">{deal.customer}</div>
                              <div className="text-xs text-gray-600 truncate">{deal.contact}</div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600 font-medium">Deal</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-gray-600">Owner: {deal.owner}</span>
                            <span className="font-medium text-gray-900">{deal.value} đ</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(deal.stage)}`}>
                                {getStageText(deal.stage)}
                              </span>
                              <div className="flex items-center space-x-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  deal.probability >= 80 ? 'bg-green-500' :
                                  deal.probability >= 60 ? 'bg-yellow-500' :
                                  deal.probability >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                }`}></div>
                                <span className="text-xs text-gray-600">{deal.probability}%</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                <Calendar className="w-3 h-3" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreVertical className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            Dự kiến đóng: {deal.expectedClose}
                          </div>
                        </div>
                      ))}
                      
                      {/* Empty State */}
                      {totalItems === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">📋</div>
                          <div className="text-sm">Chưa có mục nào</div>
                        </div>
                      )}
                      
                      {/* Add Button */}
                      <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm">
                        <Plus className="w-4 h-4 mx-auto mb-1" />
                        Thêm {stage.id.includes('lead') ? 'Lead' : 'Deal'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversion Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Tỷ lệ Lead → Deal</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                  {Math.round((deals.length / leads.length) * 100)}%
                </div>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Thời gian trung bình</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">14 ngày</div>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Giá trị trung bình</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                  {Math.round(deals.reduce((sum, deal) => sum + parseInt(deal.value.replace(/,/g, '')), 0) / deals.length / 1000000)}M đ
                </div>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderDeals = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Deal Stats - Compact View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Thống kê theo giai đoạn</h3>
          <div className="text-xs text-gray-500">Tổng: {deals.length}</div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['discovery', 'qualified', 'proposal', 'negotiation'].map(stage => {
            const count = deals.filter(d => d.stage === stage).length;
            const percentage = deals.length > 0 ? Math.round((count / deals.length) * 100) : 0;
            return (
              <div key={stage} className="text-center">
                <div className="text-lg font-bold text-blue-600">{count}</div>
                <div className="text-xs text-gray-600">{getStageText(stage)}</div>
                <div className="text-xs text-gray-400">{percentage}%</div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar Overview */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Pipeline Progress</span>
            <span>{deals.filter(d => d.stage === 'closed_won').length} đã hoàn thành</span>
          </div>
          <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden">
            {['discovery', 'qualified', 'proposal', 'negotiation'].map((stage, index) => {
              const count = deals.filter(d => d.stage === stage).length;
              const width = deals.length > 0 ? (count / deals.length) * 100 : 0;
              const colors = ['bg-blue-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400'];
              return width > 0 ? (
                <div
                  key={stage}
                  className={`${colors[index]} transition-all duration-300`}
                  style={{ width: `${width}%` }}
                  title={`${getStageText(stage)}: ${count} deals (${Math.round(width)}%)`}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Khách hàng</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Giai đoạn</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Xác suất</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Dự kiến đóng</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Người phụ trách</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden 2xl:table-cell">Hoạt động gần đây</th>
                <th className="px-3 sm:px-6 lg:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{deal.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {deal.leadId && (
                          <span className="inline-flex items-center text-blue-600">
                            <User className="w-3 h-3 mr-1" />
                            Từ Lead #{deal.leadId}
                          </span>
                        )}
                      </div>
                      {/* Mobile info - show customer info on mobile */}
                      <div className="sm:hidden text-xs text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1" />
                          {deal.customer}
                        </div>
                        <div className="ml-4">{deal.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap hidden sm:table-cell">
                    <div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 text-sm lg:text-base">{deal.customer}</span>
                      </div>
                      <div className="text-sm lg:text-base text-gray-500 ml-6">{deal.contact}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap">
                    <div className="font-medium text-gray-900 text-sm lg:text-base">{deal.value} đ</div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap hidden md:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStageColor(deal.stage)}`}>
                      {getStageText(deal.stage)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 lg:w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            deal.probability >= 80 ? 'bg-green-500' :
                            deal.probability >= 60 ? 'bg-yellow-500' :
                            deal.probability >= 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm lg:text-base font-medium ${
                        deal.probability >= 80 ? 'text-green-600' :
                        deal.probability >= 60 ? 'text-yellow-600' :
                        deal.probability >= 40 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {deal.probability}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm lg:text-base text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {deal.expectedClose}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap hidden xl:table-cell">
                    <div className="font-medium text-gray-900 text-sm lg:text-base">{deal.owner}</div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap hidden 2xl:table-cell">
                    <div className="text-xs lg:text-sm text-gray-900">
                      {new Date(deal.lastActivity).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500">
                      {Math.ceil((new Date().getTime() - new Date(deal.lastActivity).getTime()) / (1000 * 60 * 60 * 24))} ngày trước
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 lg:px-8 py-4 lg:py-6 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hoạt động bán hàng</h1>
        <p className="text-gray-600">Quản lý leads và deals một cách hiệu quả</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 border border-blue-100 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Total Leads</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{leads.length}</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-1 inline" />
                    15.0%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">{leads.length - 1}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap z-10">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">{leads.length}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">{leads.length - 1}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-blue-600 text-xs hidden sm:block">Khách hàng tiềm năng</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-6 border border-green-100 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <Target className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Active Deals</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{deals.filter(d => !d.stage.includes('closed')).length}</h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-1 inline" />
                    25.0%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">{deals.filter(d => !d.stage.includes('closed')).length - 1}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap z-10">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">{deals.filter(d => !d.stage.includes('closed')).length}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">{deals.filter(d => !d.stage.includes('closed')).length - 1}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-green-600 text-xs hidden sm:block">Cơ hội bán hàng</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 border border-purple-100 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Pipeline Value</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {Math.round(deals.filter(d => !d.stage.includes('closed')).reduce((sum, deal) => sum + parseInt(deal.value.replace(/,/g, '')), 0) / 1000000000 * 10) / 10}B đ
              </h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-1 inline" />
                    18.5%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">2.1B</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap z-10">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">{Math.round(deals.filter(d => !d.stage.includes('closed')).reduce((sum, deal) => sum + parseInt(deal.value.replace(/,/g, '')), 0) / 1000000000 * 10) / 10}B đ</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">2.1B đ</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-purple-600 text-xs hidden sm:block">Tổng pipeline value</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-white p-4 sm:p-6 border border-orange-100 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Conversion Rate</h3>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {Math.round((deals.filter(d => d.stage === 'closed_won').length / leads.length) * 100)}%
              </h2>
              <div className="group relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="text-red-600">
                    <ArrowDownRight className="w-3 h-3 mr-1 inline" />
                    -5.2%
                  </span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-gray-500 text-xs">25%</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 right-0 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap z-10">
                  <div>So với tháng trước:</div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng này:</span>
                    <span className="font-medium">{Math.round((deals.filter(d => d.stage === 'closed_won').length / leads.length) * 100)}%</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Tháng trước:</span>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-orange-600 text-xs hidden sm:block">Lead thành Deal</div>
          </div>
        </div>
      </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-2 sm:space-x-8 px-4 sm:px-6">
              {[
                { id: 'leads', name: 'Leads', count: leads.length, icon: <Users className="w-4 h-4" /> },
                { id: 'deals', name: 'Deals', count: deals.filter(d => !d.stage.includes('closed')).length, icon: <Target className="w-4 h-4" /> },
                { id: 'pipeline', name: 'Pipeline', count: leads.length + deals.length, icon: <Activity className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group inline-flex items-center space-x-2 py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}>
                    {tab.icon}
                  </span>
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.slice(0, 4)}</span>
                  <span className={`ml-1 sm:ml-2 py-0.5 px-1.5 sm:px-2 rounded-full text-xs font-medium ${
                    activeTab === tab.id 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'leads' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  {/* Header and Inline Filters */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Quản lý Leads</h2>
                    
                    {/* Inline Filters */}
                    <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
                      {/* Search Input */}
                      <div className="relative flex-1 lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Tìm kiếm leads theo tên, email, điện thoại..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          onChange={(e) => {
                            console.log('Search changed:', e.target.value)
                          }}
                        />
                      </div>
                      
                      {/* Quick Filters */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Tất cả trạng thái</option>
                            <option value="new">Mới</option>
                            <option value="contacted">Đã liên hệ</option>
                            <option value="qualified">Đủ điều kiện</option>
                            <option value="proposal">Đề xuất</option>
                            <option value="negotiation">Đàm phán</option>
                            <option value="converted">Chuyển đổi</option>
                            <option value="lost">Thất bại</option>
                          </select>
                        </div>
                        
                        {/* Source Filter */}
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Tất cả nguồn</option>
                            <option value="facebook">Facebook</option>
                            <option value="google_ads">Google</option>
                            <option value="zalo">Zalo</option>
                            <option value="manual">Website</option>
                            <option value="referral">Giới thiệu</option>
                            <option value="phone">Điện thoại</option>
                            <option value="email">Email</option>
                          </select>
                        </div>
                        
                        {/* Assigned User Filter */}
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Tất cả người phụ trách</option>
                            <option value="Nguyễn Sales Manager">Nguyễn Sales</option>
                            <option value="Trần Business Dev">Trần Manager</option>
                            <option value="Lê Tech Consultant">Lê Director</option>
                            <option value="Phạm Sales Rep">Phạm Consultant</option>
                            <option value="Hoàng Expert">Hoàng Expert</option>
                          </select>
                        </div>
                        
                        {/* Time Filter */}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
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
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200">
                          <Filter className="w-4 h-4" />
                          <span className="hidden sm:inline">Lọc nâng cao</span>
                        </button>
                        
                        {/* Add Lead Button */}
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 text-sm">
                          <Plus className="w-4 h-4" />
                          <span>Thêm Lead</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {renderLeads()}
              </div>
            )}
            {activeTab === 'deals' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  {/* Header and Inline Filters */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Quản lý Deals</h2>
                    
                    {/* Inline Filters */}
                    <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
                      {/* Search Input */}
                      <div className="relative flex-1 lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Tìm kiếm deals theo tên, khách hàng..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          onChange={(e) => {
                            console.log('Deals search changed:', e.target.value)
                          }}
                        />
                      </div>
                      
                      {/* Quick Filters */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Stage Filter */}
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Tất cả giai đoạn</option>
                            <option value="discovery">Khám phá</option>
                            <option value="qualified">Đủ điều kiện</option>
                            <option value="proposal">Báo giá</option>
                            <option value="negotiation">Đàm phán</option>
                            <option value="closed_won">Thành công</option>
                            <option value="closed_lost">Thất bại</option>
                          </select>
                        </div>
                        
                        {/* Owner Filter */}
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Tất cả người phụ trách</option>
                            <option value="Nguyễn Sales">Nguyễn Sales</option>
                            <option value="Trần Manager">Trần Manager</option>
                            <option value="Lê Director">Lê Director</option>
                            <option value="Hoàng Expert">Hoàng Expert</option>
                          </select>
                        </div>
                        
                        {/* Time Filter */}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
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
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200">
                          <Filter className="w-4 h-4" />
                          <span className="hidden sm:inline">Lọc nâng cao</span>
                        </button>
                        
                        {/* Add Deal Button */}
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 text-sm">
                          <Plus className="w-4 h-4" />
                          <span>Thêm Deal</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {renderDeals()}
              </div>
            )}
            {activeTab === 'pipeline' && (
              <div className="space-y-4 sm:space-y-6">
                {renderPipeline()}
              </div>
            )}
          </div>
        </div>
    </div>
  )
}
