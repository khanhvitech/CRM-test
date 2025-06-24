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
  title: string
  value: number
  previousValue: number
  icon: React.ReactNode
  color: string
  bgColor: string
  trend?: 'up' | 'down' | 'neutral'
}

export default function SalesManagement() {
  const [activeTab, setActiveTab] = useState<'leads' | 'deals' | 'orders' | 'pipeline'>('leads')
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

    // Cập nhật deal thành closed_won
    // Update logic here
    
    setNotification({
      message: `Đã chuyển đổi deal "${deal.name}" thành đơn hàng ${newOrder.orderNumber}`,
      type: 'success'
    })

    setTimeout(() => setNotification(null), 5000)
  }

  const renderLeads = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
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
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phụ trách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.value.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                      lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status === 'converted' ? 'Đã chuyển đổi' :
                       lead.status === 'qualified' ? 'Đã xác định' :
                       lead.status === 'contacted' ? 'Đã liên hệ' : 'Mới'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPipeline = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quy trình Sales Pipeline</h3>
        
        {/* Pipeline Flow */}
        <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Leads</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium">Deals</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium">Đơn hàng</span>
            </div>
          </div>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Leads → Deals</h4>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((deals.length / leads.length) * 100)}%
            </div>
            <p className="text-sm text-blue-700">Tỷ lệ chuyển đổi Lead thành Deal</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-900 mb-2">Deals → Orders</h4>
            <div className="text-2xl font-bold text-green-600">
              {deals.length > 0 ? Math.round((orders.length / deals.length) * 100) : 0}%
            </div>
            <p className="text-sm text-green-700">Tỷ lệ chuyển đổi Deal thành Đơn hàng</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-900 mb-2">Leads → Orders</h4>
            <div className="text-2xl font-bold text-purple-600">
              {leads.length > 0 ? Math.round((orders.length / leads.length) * 100) : 0}%
            </div>
            <p className="text-sm text-purple-700">Tỷ lệ chuyển đổi tổng thể</p>
          </div>
        </div>
      </div>
    </div>
  )

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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
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
