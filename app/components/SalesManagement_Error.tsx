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
import CustomerJourney from './CustomerJourney'
import { usePermissions } from '../../hooks/usePermissions'
import { useUserRole } from '../../hooks/useUserRole'

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
  title: string
  value: number
  previousValue: number
  icon: React.ReactNode
  color: string
  bgColor: string
  trend?: 'up' | 'down' | 'neutral'
}

export default function SalesManagement() {
  const userRole = useUserRole()
  const permissions = usePermissions()
    const [activeTab, setActiveTab] = useState<'leads' | 'deals' | 'orders' | 'pipeline'>('leads')
  const [showFilters, setShowFilters] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)
  
  // Add Lead Form Data
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    source: 'website',
    region: 'ha_noi',
    product: '',
    content: '',
    value: '',
    assignedTo: 'Minh Expert',
    tags: [] as string[]
  })
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
  // Lead-specific filters
  const [leadFilters, setLeadFilters] = useState({
    search: '',
    status: '',
    source: '',
    region: '',
    assignedTo: ''
  })
  // Sample data với liên kết
  const [leads, setLeads] = useState<Lead[]>([
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
      region: 'ho_chi_minh',      product: 'Marketing Automation',
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
      email: 'levanc@xyz.com',
      source: 'google',
      region: 'da_nang',
      product: 'E-commerce Platform',
      tags: ['cold', 'retail'],
      content: 'Xây dựng website bán hàng online cho cửa hàng thời trang',
      status: 'contacted',
      stage: 'follow_up',
      notes: 'Đã call, quan tâm nhưng cần thời gian',
      assignedTo: 'Linh Expert',
      value: 15000000,
      lastContactedAt: '2024-01-18T10:15:00',
      createdAt: '2024-01-17T14:30:00',
      updatedAt: '2024-01-18T10:15:00',
      type: 'lead',
      company: 'Fashion Store XYZ'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      phone: '0934567890',
      email: 'phamthid@restaurant.vn',
      source: 'referral',
      region: 'can_tho',
      product: 'POS System',
      tags: ['hot', 'restaurant'],
      content: 'Hệ thống quản lý nhà hàng với 5 chi nhánh',
      status: 'proposal',
      stage: 'demo_scheduled',
      notes: 'Đã demo, rất quan tâm, chuẩn bị ký hợp đồng',
      assignedTo: 'Hoàng Expert',
      value: 35000000,
      lastContactedAt: '2024-01-21T09:30:00',
      createdAt: '2024-01-12T16:45:00',
      updatedAt: '2024-01-21T09:30:00',
      type: 'lead',
      company: 'Golden Restaurant Chain'
    },
    {
      id: 5,
      name: 'Ngô Văn E',
      phone: '0945678901',
      email: 'ngovane@clinic.com',
      source: 'facebook',
      region: 'ha_noi',
      product: 'Healthcare Management',
      tags: ['warm', 'healthcare'],
      content: 'Phần mềm quản lý phòng khám nha khoa',
      status: 'new',
      stage: 'initial_contact',
      notes: 'Lead mới, chưa liên hệ',
      assignedTo: 'Minh Expert',
      value: 20000000,
      lastContactedAt: null,
      createdAt: '2024-01-22T11:00:00',
      updatedAt: '2024-01-22T11:00:00',
      type: 'lead',
      company: 'Smile Dental Clinic'    },
    {
      id: 6,
      name: 'Vũ Thị F',
      phone: '0956789012',
      email: 'vuthif@school.edu.vn',
      source: 'website',
      region: 'ho_chi_minh',
      product: 'Education Platform',
      tags: ['cold', 'education'],
      content: 'Nền tảng học online cho trường tiểu học',
      status: 'negotiation',
      stage: 'price_discussion',
      notes: 'Đang thương lượng giá, cần giảm 15%',
      assignedTo: 'An Expert',
      value: 40000000,
      lastContactedAt: '2024-01-20T15:20:00',
      createdAt: '2024-01-10T08:30:00',
      updatedAt: '2024-01-20T15:20:00',
      type: 'lead',
      company: 'Sunshine Elementary School'
    },
    {
      id: 7,
      name: 'Đỗ Văn G',
      phone: '0967890123',
      email: 'dovang@tech.com',
      source: 'google',
      region: 'ha_noi',
      product: 'Cloud Infrastructure',
      tags: ['hot', 'enterprise'],
      content: 'Dịch vụ cloud computing cho doanh nghiệp lớn',
      status: 'qualified',
      stage: 'technical_review',
      notes: 'Đã đánh giá kỹ thuật, sẵn sàng proposal',
      assignedTo: 'Minh Expert',
      value: 80000000,
      lastContactedAt: '2024-01-23T11:15:00',
      createdAt: '2024-01-18T13:45:00',
      updatedAt: '2024-01-23T11:15:00',
      type: 'lead',
      company: 'TechCorp Vietnam'
    },
    {
      id: 8,
      name: 'Bùi Thị H',
      phone: '0978901234',
      email: 'buithih@beauty.vn',
      source: 'facebook',
      region: 'da_nang',
      product: 'Booking System',
      tags: ['warm', 'retail'],
      content: 'Hệ thống đặt lịch cho salon làm đẹp',
      status: 'contacted',
      stage: 'needs_assessment',
      notes: 'Đã tư vấn qua điện thoại, quan tâm tính năng',
      assignedTo: 'Linh Expert',
      value: 18000000,
      lastContactedAt: '2024-01-22T14:30:00',
      createdAt: '2024-01-19T10:20:00',
      updatedAt: '2024-01-22T14:30:00',
      type: 'lead',
      company: 'Beauty Salon Chain'
    },
    {
      id: 9,
      name: 'Lý Văn I',
      phone: '0989012345',
      email: 'lyvani@logistics.com',
      source: 'referral',
      region: 'can_tho',
      product: 'Fleet Management',
      tags: ['warm', 'enterprise'],
      content: 'Quản lý đội xe tải cho công ty logistics',
      status: 'proposal',
      stage: 'pilot_discussion',
      notes: 'Đề xuất pilot 3 tháng trước khi triển khai',
      assignedTo: 'Hoàng Expert',
      value: 60000000,
      lastContactedAt: '2024-01-21T16:00:00',
      createdAt: '2024-01-14T08:15:00',
      updatedAt: '2024-01-21T16:00:00',
      type: 'lead',
      company: 'MegaLogistics Ltd'
    },
    {
      id: 10,
      name: 'Hồ Thị K',
      phone: '0990123456',
      email: 'hothik@hotel.vn',
      source: 'website',
      region: 'ho_chi_minh',
      product: 'Hotel Management',
      tags: ['cold', 'hospitality'],
      content: 'Phần mềm quản lý khách sạn 4 sao',
      status: 'new',
      stage: 'initial_contact',
      notes: 'Lead mới từ website, chưa liên hệ',
      assignedTo: 'An Expert',
      value: 45000000,
      lastContactedAt: null,
      createdAt: '2024-01-23T17:30:00',
      updatedAt: '2024-01-23T17:30:00',
      type: 'lead',
      company: 'Grand Hotel Saigon'
    }
  ])

  const [deals, setDeals] = useState<Deal[]>([
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

  const [orders, setOrders] = useState<Order[]>([
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
    }  ])

  // Filter leads based on current filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !leadFilters.search || 
      lead.name.toLowerCase().includes(leadFilters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadFilters.search.toLowerCase()) ||
      lead.phone.includes(leadFilters.search) ||
      (lead.company && lead.company.toLowerCase().includes(leadFilters.search.toLowerCase()))
    
    const matchesStatus = !leadFilters.status || lead.status === leadFilters.status
    const matchesSource = !leadFilters.source || lead.source === leadFilters.source
    const matchesRegion = !leadFilters.region || lead.region === leadFilters.region
    const matchesAssignedTo = !leadFilters.assignedTo || lead.assignedTo === leadFilters.assignedTo

    return matchesSearch && matchesStatus && matchesSource && matchesRegion && matchesAssignedTo
  })

  // Metrics calculation
  const metrics: MetricData[] = [
    {
      title: 'Tổng Leads',
      value: leads.length,
      previousValue: leads.length - 2,
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'up'
    },
    {
      title: 'Deals Đang Mở',
      value: deals.filter(d => !d.stage.includes('closed')).length,
      previousValue: deals.filter(d => !d.stage.includes('closed')).length - 1,
      icon: <Target className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: 'up'
    },
    {
      title: 'Đơn Hàng',
      value: orders.length,
      previousValue: orders.length - 1,
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: 'up'
    },
    {
      title: 'Tỷ Lệ Chuyển Đổi',
      value: Math.round((deals.length / leads.length) * 100),
      previousValue: 65,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: 'up'
    }
  ]
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

    // Cập nhật deal thành closed_won và thêm orderId
    const updatedDeals = deals.map(d => 
      d.id === dealId 
        ? { ...d, stage: 'closed_won' as const, orderId: newOrder.id }
        : d
    )
    setDeals(updatedDeals)

    // Thêm đơn hàng mới
    setOrders([...orders, newOrder])
    
    setNotification({
      message: `✅ Đã chuyển đổi deal "${deal.name}" thành đơn hàng ${newOrder.orderNumber}`,
      type: 'success'
    })

    setTimeout(() => setNotification(null), 5000)
  }

  // Create deal from lead function
  const convertLeadToDeal = (leadId: number) => {
    const lead = leads.find(l => l.id === leadId)
    if (!lead) return

    const newDeal: Deal = {
      id: deals.length + 1,
      name: `${lead.product} - ${lead.company || lead.name}`,
      customer: lead.name,
      contact: lead.email,
      value: `${lead.value.toLocaleString('vi-VN')} VND`,
      stage: 'discovery',
      probability: 25,
      expectedClose: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      owner: lead.assignedTo,
      leadId: lead.id
    }

    setDeals([...deals, newDeal])
      setNotification({
      message: `✅ Đã tạo deal "${newDeal.name}" từ lead ${lead.name}`,
      type: 'success'
    });

    setTimeout(() => setNotification(null), 5000);
  }
  // Export leads data
  const exportLeadsData = (format: 'csv' | 'excel') => {
    const dataToExport = filteredLeads.map(lead => ({
      'Tên khách hàng': lead.name,
      'Công ty': lead.company || 'Cá nhân',
      'Điện thoại': lead.phone,
      'Email': lead.email,
      'Sản phẩm/Dịch vụ': lead.product,
      'Nội dung': lead.content,
      'Nguồn': lead.source === 'facebook' ? 'Facebook' :
               lead.source === 'website' ? 'Website' :
               lead.source === 'google' ? 'Google' :
               lead.source === 'referral' ? 'Giới thiệu' : lead.source,
      'Khu vực': lead.region === 'ha_noi' ? 'Hà Nội' :
                 lead.region === 'ho_chi_minh' ? 'TP.HCM' :
                 lead.region === 'da_nang' ? 'Đà Nẵng' :
                 lead.region === 'can_tho' ? 'Cần Thơ' : lead.region,
      'Giá trị dự tính (VND)': lead.value.toLocaleString('vi-VN'),
      'Tags': lead.tags.join(', '),
      'Trạng thái': lead.status === 'converted' ? 'Đã chuyển đổi' :
                    lead.status === 'qualified' ? 'Đã xác định' :
                    lead.status === 'contacted' ? 'Đã liên hệ' :
                    lead.status === 'negotiation' ? 'Đang đàm phán' :
                    lead.status === 'proposal' ? 'Đề xuất' :
                    lead.status === 'new' ? 'Mới' : lead.status,
      'Phụ trách': lead.assignedTo,
      'Ngày tạo': new Date(lead.createdAt).toLocaleDateString('vi-VN'),
      'Lần liên hệ cuối': lead.lastContactedAt 
        ? new Date(lead.lastContactedAt).toLocaleDateString('vi-VN')
        : 'Chưa liên hệ',
      'Ghi chú': lead.notes
    }))

    // Create filter summary for export
    const filterInfo = []
    if (leadFilters.search) filterInfo.push(`Tìm kiếm: "${leadFilters.search}"`)
    if (leadFilters.status) filterInfo.push(`Trạng thái: ${leadFilters.status}`)
    if (leadFilters.source) filterInfo.push(`Nguồn: ${leadFilters.source}`)
    if (leadFilters.region) filterInfo.push(`Khu vực: ${leadFilters.region}`)
    if (leadFilters.assignedTo) filterInfo.push(`Phụ trách: ${leadFilters.assignedTo}`)

    const exportInfo = [
      `Báo cáo Leads - ${new Date().toLocaleDateString('vi-VN')}`,
      `Tổng số leads: ${filteredLeads.length}/${leads.length}`,
      filterInfo.length > 0 ? `Bộ lọc: ${filterInfo.join(', ')}` : 'Không có bộ lọc',
      '', // Empty row separator
    ]

    // Convert to CSV format
    if (format === 'csv') {
      const headers = Object.keys(dataToExport[0] || {})
      const csvContent = [
        ...exportInfo,
        headers.join(','),
        ...dataToExport.map(row => 
          headers.map(header => `"${(row as any)[header] || ''}"`).join(',')
        )
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
      link.click()
    }

    setNotification({
      type: 'success',
      message: `Đã xuất ${filteredLeads.length} leads thành công!`
    });

    setTimeout(() => setNotification(null), 3000);
  }

  // Add new lead function
  const addLead = () => {
    if (!newLeadData.name || !newLeadData.phone || !newLeadData.email) {
      setNotification({
        message: 'Vui lòng nhập đầy đủ thông tin bắt buộc (Tên, SĐT, Email)',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 5000)
      return
    }

    const newLead: Lead = {
      id: Math.max(...leads.map(l => l.id)) + 1,
      name: newLeadData.name,
      phone: newLeadData.phone,
      email: newLeadData.email,
      company: newLeadData.company || undefined,
      source: newLeadData.source as Lead['source'],
      region: newLeadData.region,
      product: newLeadData.product,
      tags: newLeadData.tags,
      content: newLeadData.content,
      status: 'new',
      stage: 'initial_contact',
      notes: 'Lead mới được tạo',
      assignedTo: newLeadData.assignedTo,
      value: parseInt(newLeadData.value) || 0,
      lastContactedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'lead'
    }

    setLeads([...leads, newLead])
    setNotification({
      message: `Lead "${newLeadData.name}" đã được thêm thành công!`,
      type: 'success'
    })
    
    // Reset form
    setNewLeadData({
      name: '',
      phone: '',
      email: '',
      company: '',
      source: 'website',
      region: 'ha_noi',
      product: '',
      content: '',
      value: '',
      assignedTo: 'Minh Expert',
      tags: []
    })
    
    setShowAddLeadModal(false)
    setTimeout(() => setNotification(null), 5000)
  }

  // Reset form function
  const resetLeadForm = () => {
    setNewLeadData({
      name: '',
      phone: '',
      email: '',
      company: '',
      source: 'website',
      region: 'ha_noi',
      product: '',
      content: '',
      value: '',
      assignedTo: 'Minh Expert',
      tags: []
    })
  }

  const renderLeads = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách Leads</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => exportLeadsData('csv')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Package className="w-4 h-4 inline mr-2" />
                Xuất CSV
              </button>
              <button 
                onClick={() => setShowAddLeadModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Thêm Lead
              </button>
            </div>
          </div>
        </div>
          {/* Filter Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, công ty..."
                value={leadFilters.search}
                onChange={(e) => setLeadFilters({...leadFilters, search: e.target.value})}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            
            <select 
              value={leadFilters.status}
              onChange={(e) => setLeadFilters({...leadFilters, status: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="new">Mới</option>
              <option value="contacted">Đã liên hệ</option>
              <option value="qualified">Đã xác định</option>
              <option value="proposal">Đề xuất</option>
              <option value="negotiation">Đàm phán</option>
              <option value="converted">Đã chuyển đổi</option>
            </select>
            
            <select 
              value={leadFilters.source}
              onChange={(e) => setLeadFilters({...leadFilters, source: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Tất cả nguồn</option>
              <option value="facebook">Facebook</option>
              <option value="website">Website</option>
              <option value="google">Google</option>
              <option value="referral">Giới thiệu</option>
            </select>
            
            <select 
              value={leadFilters.region}
              onChange={(e) => setLeadFilters({...leadFilters, region: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Tất cả khu vực</option>
              <option value="ha_noi">Hà Nội</option>
              <option value="ho_chi_minh">TP.HCM</option>
              <option value="da_nang">Đà Nẵng</option>
              <option value="can_tho">Cần Thơ</option>
            </select>

            <select 
              value={leadFilters.assignedTo}
              onChange={(e) => setLeadFilters({...leadFilters, assignedTo: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Tất cả nhân viên</option>
              <option value="Minh Expert">Minh Expert</option>
              <option value="An Expert">An Expert</option>
              <option value="Linh Expert">Linh Expert</option>
              <option value="Hoàng Expert">Hoàng Expert</option>
            </select>
          </div>
          
          {/* Filter Summary */}
          {(leadFilters.search || leadFilters.status || leadFilters.source || leadFilters.region || leadFilters.assignedTo) && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-gray-600">Bộ lọc đang áp dụng:</span>
              {leadFilters.search && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Tìm kiếm: "{leadFilters.search}"
                </span>
              )}
              {leadFilters.status && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Trạng thái: {leadFilters.status === 'new' ? 'Mới' : 
                              leadFilters.status === 'contacted' ? 'Đã liên hệ' :
                              leadFilters.status === 'qualified' ? 'Đã xác định' :
                              leadFilters.status === 'proposal' ? 'Đề xuất' :
                              leadFilters.status === 'negotiation' ? 'Đàm phán' :
                              leadFilters.status === 'converted' ? 'Đã chuyển đổi' : leadFilters.status}
                </span>
              )}
              {leadFilters.source && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  Nguồn: {leadFilters.source === 'facebook' ? 'Facebook' :
                          leadFilters.source === 'website' ? 'Website' :
                          leadFilters.source === 'google' ? 'Google' :
                          leadFilters.source === 'referral' ? 'Giới thiệu' : leadFilters.source}
                </span>
              )}
              {leadFilters.region && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                  Khu vực: {leadFilters.region === 'ha_noi' ? 'Hà Nội' :
                           leadFilters.region === 'ho_chi_minh' ? 'TP.HCM' :
                           leadFilters.region === 'da_nang' ? 'Đà Nẵng' :
                           leadFilters.region === 'can_tho' ? 'Cần Thơ' : leadFilters.region}
                </span>
              )}
              {leadFilters.assignedTo && (
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                  Phụ trách: {leadFilters.assignedTo}
                </span>
              )}
              <button 
                onClick={() => setLeadFilters({search: '', status: '', source: '', region: '', assignedTo: ''})}
                className="text-red-600 hover:text-red-800 text-xs underline ml-2"
              >
                Xóa tất cả
              </button>
            </div>
          )}
          
          {/* Results count */}
          <div className="mt-2 text-sm text-gray-600">
            Hiển thị {filteredLeads.length} / {leads.length} leads
          </div>
        </div>
        
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
                  Sản phẩm/Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nguồn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khu vực
                </th>                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị dự tính
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phụ trách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Users className="w-12 h-12 text-gray-300 mb-2" />
                      <p>Không tìm thấy leads nào phù hợp với bộ lọc</p>
                      {(leadFilters.search || leadFilters.status || leadFilters.source || leadFilters.region || leadFilters.assignedTo) && (
                        <button 
                          onClick={() => setLeadFilters({search: '', status: '', source: '', region: '', assignedTo: ''})}
                          className="mt-2 text-blue-600 hover:text-blue-800 underline text-sm"
                        >
                          Xóa bộ lọc để xem tất cả leads
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  {/* Khách hàng */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.company || 'Cá nhân'}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Liên hệ */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Phone className="w-3 h-3 text-gray-400 mr-1" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="truncate max-w-[150px]">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Sản phẩm/Dịch vụ */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{lead.product}</div>
                    <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">
                      {lead.content}
                    </div>
                  </td>
                  
                  {/* Nguồn */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      lead.source === 'facebook' ? 'bg-blue-100 text-blue-800' :
                      lead.source === 'website' ? 'bg-green-100 text-green-800' :
                      lead.source === 'referral' ? 'bg-purple-100 text-purple-800' :
                      lead.source === 'google' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.source === 'facebook' ? 'Facebook' :
                       lead.source === 'website' ? 'Website' :
                       lead.source === 'referral' ? 'Giới thiệu' :
                       lead.source === 'google' ? 'Google' : lead.source}
                    </span>
                  </td>
                  
                  {/* Khu vực */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.region === 'ha_noi' ? 'Hà Nội' :
                     lead.region === 'ho_chi_minh' ? 'TP.HCM' :
                     lead.region === 'da_nang' ? 'Đà Nẵng' :
                     lead.region === 'can_tho' ? 'Cần Thơ' : lead.region}
                  </td>
                    {/* Giá trị dự tính */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.value.toLocaleString('vi-VN')} VND
                    </div>
                    <div className="text-xs text-gray-500">
                      Dự tính
                    </div>
                  </td>
                  
                  {/* Tags */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag, index) => (
                        <span key={index} className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          tag === 'hot' ? 'bg-red-100 text-red-800' :
                          tag === 'warm' ? 'bg-orange-100 text-orange-800' :
                          tag === 'cold' ? 'bg-blue-100 text-blue-800' :
                          tag === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                          tag === 'sme' ? 'bg-green-100 text-green-800' :
                          tag === 'retail' ? 'bg-yellow-100 text-yellow-800' :
                          tag === 'restaurant' ? 'bg-pink-100 text-pink-800' :
                          tag === 'healthcare' ? 'bg-teal-100 text-teal-800' :
                          tag === 'education' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tag === 'hot' ? '🔥 Hot' :
                           tag === 'warm' ? '🌡️ Warm' :
                           tag === 'cold' ? '❄️ Cold' :
                           tag === 'enterprise' ? '🏢 Enterprise' :
                           tag === 'sme' ? '🏪 SME' :
                           tag === 'retail' ? '🛒 Retail' :
                           tag === 'restaurant' ? '🍽️ Restaurant' :
                           tag === 'healthcare' ? '🏥 Healthcare' :
                           tag === 'education' ? '🎓 Education' : tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  
                  {/* Trạng thái */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                      lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'negotiation' ? 'bg-orange-100 text-orange-800' :
                      lead.status === 'proposal' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status === 'converted' ? 'Đã chuyển đổi' :
                       lead.status === 'qualified' ? 'Đã xác định' :
                       lead.status === 'contacted' ? 'Đã liên hệ' :
                       lead.status === 'negotiation' ? 'Đang đàm phán' :
                       lead.status === 'proposal' ? 'Đề xuất' :
                       lead.status === 'new' ? 'Mới' : lead.status}
                    </span>
                  </td>
                  
                  {/* Phụ trách */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{lead.assignedTo}</div>
                    <div className="text-xs text-gray-500">
                      {lead.lastContactedAt 
                        ? `Liên hệ: ${new Date(lead.lastContactedAt).toLocaleDateString('vi-VN')}`
                        : 'Chưa liên hệ'
                      }
                    </div>
                  </td>
                  
                  {/* Ngày tạo */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  
                  {/* Hành động */}<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" title="Xem chi tiết">
                      <Eye className="w-4 h-4" />
                    </button>                    <button 
                      onClick={() => convertLeadToDeal(lead.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Tạo Deal từ Lead này"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

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
            </tbody>          </table>
        </div>      </div>
    </div>
  )

  const renderPipeline = () => {
    console.log('Pipeline tab is rendering with Kanban view'); // Debug log
    
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
    ]

    // Calculate total value for each column
    const getColumnValue = (columnLeads: Lead[]) => {
      return columnLeads.reduce((sum, lead) => sum + lead.value, 0)
    }

    // Drag and drop handler (for future implementation)
    const handleDragStart = (e: React.DragEvent, leadId: number) => {
      e.dataTransfer.setData('text/plain', leadId.toString())
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent, newStatus: string) => {
      e.preventDefault()
      const leadId = parseInt(e.dataTransfer.getData('text/plain'))
      // Note: This would require leads to be in state to actually update
      console.log(`Move lead ${leadId} to status ${newStatus}`)
    }

    return (
      <div className="space-y-6">
        {/* Pipeline Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
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
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
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
                          <button
                            onClick={() => {/* Open lead detail */}}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {/* Open edit modal */}}
                            className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                            title="Chỉnh sửa"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {lead.status !== 'converted' && (
                          <button
                            onClick={() => convertLeadToDeal(lead.id)}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                          >
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
          </div>
        </div>

        {/* Pipeline Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>

        {/* Customer Journey Tracking */}
        <CustomerJourney />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hoạt động Bán hàng</h1>
          <p className="text-gray-600">Quản lý toàn bộ quy trình từ Lead đến Đơn hàng</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {metric.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : metric.trend === 'down' ? (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              ) : null}
              <span className={`text-sm ml-1 ${
                metric.trend === 'up' ? 'text-green-600' : 
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                So với tháng trước
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">            {[
              { id: 'leads', name: 'Leads', count: leads.length, icon: <Users className="w-4 h-4" /> },
              { id: 'deals', name: 'Deals', count: deals.filter(d => !d.stage.includes('closed')).length, icon: <Target className="w-4 h-4" /> },
              { id: 'orders', name: 'Đơn hàng', count: orders.length, icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'pipeline', name: 'Pipeline', count: leads.length + deals.length + orders.length, icon: <Activity className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'deals' && renderDeals()}          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Process Flow Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Quy trình Bán hàng Khép kín</h3>
                    <p className="text-sm text-gray-600">Theo dõi và quản lý toàn bộ hành trình từ Lead đến Đơn hàng</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="bg-white px-3 py-1 rounded-full">
                      {orders.length} đơn hàng
                    </span>
                  </div>
                </div>
                
                {/* Process Flow Visualization */}
                <div className="flex items-center justify-center space-x-6 bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">Leads</div>
                      <div className="text-xs text-gray-500">{leads.length} leads</div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">Deals</div>
                      <div className="text-xs text-gray-500">{deals.length} deals</div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">Đơn hàng</div>
                      <div className="text-xs text-gray-500">{orders.length} đơn hàng</div>
                    </div>
                  </div>
                </div>
                
                {/* Conversion Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {leads.length > 0 ? Math.round((deals.length / leads.length) * 100) : 0}%
                    </div>
                    <div className="text-xs text-gray-600">Lead → Deal</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">
                      {deals.length > 0 ? Math.round((orders.length / deals.length) * 100) : 0}%
                    </div>
                    <div className="text-xs text-gray-600">Deal → Order</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {leads.length > 0 ? Math.round((orders.length / leads.length) * 100) : 0}%
                    </div>
                    <div className="text-xs text-gray-600">Tổng chuyển đổi</div>
                  </div>
                </div>
              </div>
              
              {/* Order Management Section */}
              <OrderManagement />
            </div>          )}
          {activeTab === 'pipeline' && renderPipeline()}
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Thêm Lead Mới</h2>
              <button
                onClick={() => {
                  setShowAddLeadModal(false)
                  resetLeadForm()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); addLead(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tên khách hàng */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({...newLeadData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nhập tên khách hàng"
                    required
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({...newLeadData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({...newLeadData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nhập email"
                    required
                  />
                </div>

                {/* Công ty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                  <input
                    type="text"
                    value={newLeadData.company}
                    onChange={(e) => setNewLeadData({...newLeadData, company: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nhập tên công ty"
                  />
                </div>

                {/* Nguồn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nguồn</label>
                  <select
                    value={newLeadData.source}
                    onChange={(e) => setNewLeadData({...newLeadData, source: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="website">Website</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google</option>
                    <option value="referral">Giới thiệu</option>
                  </select>
                </div>

                {/* Khu vực */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Khu vực</label>
                  <select
                    value={newLeadData.region}
                    onChange={(e) => setNewLeadData({...newLeadData, region: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="ha_noi">Hà Nội</option>
                    <option value="ho_chi_minh">TP.HCM</option>
                    <option value="da_nang">Đà Nẵng</option>
                    <option value="can_tho">Cần Thơ</option>
                  </select>
                </div>

                {/* Sản phẩm/Dịch vụ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sản phẩm/Dịch vụ</label>
                  <input
                    type="text"
                    value={newLeadData.product}
                    onChange={(e) => setNewLeadData({...newLeadData, product: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nhập sản phẩm/dịch vụ quan tâm"
                  />
                </div>

                {/* Giá trị dự tính */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị dự tính (VND)</label>
                  <input
                    type="number"
                    value={newLeadData.value}
                    onChange={(e) => setNewLeadData({...newLeadData, value: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nhập giá trị dự tính"
                  />
                </div>
              </div>

              {/* Phụ trách */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phụ trách</label>
                <select
                  value={newLeadData.assignedTo}
                  onChange={(e) => setNewLeadData({...newLeadData, assignedTo: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="Minh Expert">Minh Expert</option>
                  <option value="An Expert">An Expert</option>
                  <option value="Linh Expert">Linh Expert</option>
                  <option value="Hoàng Expert">Hoàng Expert</option>
                </select>
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả nhu cầu</label>
                <textarea
                  value={newLeadData.content}
                  onChange={(e) => setNewLeadData({...newLeadData, content: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Mô tả chi tiết nhu cầu của khách hàng"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['hot', 'warm', 'cold', 'enterprise', 'sme', 'retail', 'restaurant', 'healthcare', 'education'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const newTags = newLeadData.tags.includes(tag)
                          ? newLeadData.tags.filter(t => t !== tag)
                          : [...newLeadData.tags, tag]
                        setNewLeadData({...newLeadData, tags: newTags})
                      }}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        newLeadData.tags.includes(tag)
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {tag === 'hot' ? '🔥 Hot' :
                       tag === 'warm' ? '🌡️ Warm' :
                       tag === 'cold' ? '❄️ Cold' :
                       tag === 'enterprise' ? '🏢 Enterprise' :
                       tag === 'sme' ? '🏪 SME' :
                       tag === 'retail' ? '🛒 Retail' :
                       tag === 'restaurant' ? '🍽️ Restaurant' :
                       tag === 'healthcare' ? '🏥 Healthcare' :
                       tag === 'education' ? '🎓 Education' : tag}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Chọn các tags phù hợp với lead này
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddLeadModal(false)
                    resetLeadForm()
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Thêm Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
