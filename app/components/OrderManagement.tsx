'use client'

import { useState, useEffect } from 'react'
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
  FileText,
  MessageSquare,
  Tag,
  Upload,
  Download,
  Edit,
  Trash2,
  RefreshCw,
  Send,
  AlertTriangle,
  History,
  Zap,
  ShoppingCart,
  Package,
  CreditCard,
  Bell,
  Settings,
  X,
  Check
} from 'lucide-react'

import CreateOrderModal from './CreateOrderModal'
import OrderDetailModal from './OrderDetailModal'

// Interfaces
interface Customer {
  id: number
  name: string
  phone: string
  email: string
  company?: string
  type: 'lead' | 'customer'
}

interface Product {
  id: number
  name: string
  code: string
  basePrice: number
  variants: ProductVariant[]
  category: string
  description: string
}

interface ProductVariant {
  id: number
  name: string
  price: number
  description: string
}

interface OrderItem {
  id: number
  productId: number
  product: Product
  variantId?: number
  variant?: ProductVariant
  quantity: number
  unitPrice: number
  totalPrice: number
  notes?: string
}

interface Invoice {
  id: number
  number: string
  date: string
  totalAmount: number
  tax?: number
  fileUrl?: string
  fileType?: 'pdf' | 'image' | 'link'
  status: 'draft' | 'issued' | 'paid'
}

interface OrderNote {
  id: number
  content: string
  type: 'customer_request' | 'internal' | 'system'
  createdAt: string
  createdBy: string
  isEditable: boolean
}

interface ZaloMessage {
  id: number
  content: string
  direction: 'incoming' | 'outgoing'
  timestamp: string
  sender: string
  tag?: string
  isRead: boolean
}

interface OrderHistory {
  id: number
  action: 'created' | 'status_changed' | 'invoice_added' | 'note_added' | 'refunded' | 'cancelled'
  timestamp: string
  performedBy: string
  oldValue?: string
  newValue?: string
  reason?: string
  details?: string
}

interface Reminder {
  id: number
  type: 'payment' | 'contract' | 'custom'
  schedule: number // hours
  maxAttempts: number
  template: string
  isActive: boolean
}

interface Order {
  id: number
  orderNumber: string
  customerId: number
  customer: Customer
  items: OrderItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  status: 'draft' | 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled' | 'refunded'
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded'
  paymentMethod: 'cash' | 'transfer' | 'installment' | 'momo' | 'custom'
  notes: OrderNote[]
  invoices: Invoice[]
  tags: string[]
  createdAt: string
  createdBy: string
  updatedAt: string
  history: OrderHistory[]
  zaloMessages: ZaloMessage[]
  deadline?: string
  remindersSent: number
  isVip: boolean
  upsellSuggestions?: Product[]
  crosssellSuggestions?: Product[]
}

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'reminders'>('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  // Sample data
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nguyenvana@email.com',
      company: 'ABC Corp',
      type: 'customer'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0902345678',
      email: 'tranthib@email.com',
      type: 'lead'
    }
  ])

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Gói Tư Vấn CRM',
      code: 'CRM-001',
      basePrice: 5000000,
      category: 'Tư vấn',
      description: 'Gói tư vấn triển khai CRM cho doanh nghiệp',
      variants: [
        { id: 1, name: 'Cơ bản', price: 5000000, description: 'Tư vấn cơ bản 10 giờ' },
        { id: 2, name: 'Nâng cao', price: 8000000, description: 'Tư vấn nâng cao 20 giờ' },
        { id: 3, name: 'Cao cấp', price: 12000000, description: 'Tư vấn cao cấp 40 giờ' }
      ]
    },
    {
      id: 2,
      name: 'Phần Mềm ERP',
      code: 'ERP-001',
      basePrice: 15000000,
      category: 'Phần mềm',
      description: 'Hệ thống quản lý tài nguyên doanh nghiệp',
      variants: [
        { id: 4, name: 'Starter', price: 15000000, description: 'Dành cho 5-10 người dùng' },
        { id: 5, name: 'Professional', price: 25000000, description: 'Dành cho 10-50 người dùng' },
        { id: 6, name: 'Enterprise', price: 50000000, description: 'Dành cho 50+ người dùng' }
      ]
    }
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'DH20250611001',
      customerId: 1,
      customer: customers[0],
      items: [
        {
          id: 1,
          productId: 1,
          product: products[0],
          variantId: 2,
          variant: products[0].variants[1],
          quantity: 1,
          unitPrice: 8000000,
          totalPrice: 8000000,
          notes: 'Khách yêu cầu tư vấn online'
        }
      ],
      subtotal: 8000000,
      discount: 800000,
      tax: 720000,
      total: 7920000,
      status: 'confirmed',
      paymentStatus: 'unpaid',
      paymentMethod: 'transfer',
      notes: [
        {
          id: 1,
          content: 'Khách hàng yêu cầu gửi hợp đồng qua Zalo',
          type: 'customer_request',
          createdAt: '2025-06-11T10:30:00',
          createdBy: 'Nguyễn Sales',
          isEditable: true
        }
      ],
      invoices: [],
      tags: ['VIP', 'Khẩn cấp'],
      createdAt: '2025-06-11T09:00:00',
      createdBy: 'Nguyễn Sales Manager',
      updatedAt: '2025-06-11T10:30:00',
      history: [],
      zaloMessages: [
        {
          id: 1,
          content: 'Chào anh, em muốn mua gói tư vấn CRM nâng cao',
          direction: 'incoming',
          timestamp: '2025-06-11T09:00:00',
          sender: 'Nguyễn Văn A',
          isRead: true
        }
      ],
      deadline: '2025-06-14T23:59:59',
      remindersSent: 0,
      isVip: true,
      upsellSuggestions: [products[0]], // Gói cao cấp
      crosssellSuggestions: [products[1]] // ERP
    }
  ])

  // Helper functions
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' đ'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'refunded':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Nháp'
      case 'pending': return 'Chờ xác nhận'
      case 'confirmed': return 'Đã xác nhận'
      case 'processing': return 'Đang xử lý'
      case 'completed': return 'Hoàn thành'
      case 'cancelled': return 'Đã hủy'
      case 'refunded': return 'Đã hoàn'
      default: return status
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'unpaid': return 'Chưa thanh toán'
      case 'partial': return 'Thanh toán một phần'
      case 'paid': return 'Đã thanh toán'
      case 'refunded': return 'Đã hoàn tiền'
      default: return status
    }
  }

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'khẩn cấp':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'chờ ký hợp đồng':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'thanh toán trễ':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const calculateTimeRemaining = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diff = deadlineDate.getTime() - now.getTime()
    
    if (diff <= 0) return 'Quá hạn'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `Còn ${days} ngày ${hours} giờ`
    return `Còn ${hours} giờ`
  }

  // Overview Metrics
  const getOverviewMetrics = () => {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const unpaidOrders = orders.filter(o => o.paymentStatus === 'unpaid').length
    const overdueOrders = orders.filter(o => o.deadline && new Date(o.deadline) < new Date()).length
    const vipOrders = orders.filter(o => o.isVip).length
    const completedOrders = orders.filter(o => o.status === 'completed').length

    return {
      totalOrders,
      totalRevenue,
      unpaidOrders,
      overdueOrders,
      vipOrders,
      completedOrders,
      completionRate: totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0
    }
  }

  // Handle create order
  const handleCreateOrder = (orderData: any) => {
    const newOrder: Order = {
      id: Date.now(),
      ...orderData,
      customer: customers.find(c => c.id === parseInt(orderData.customerId))!,
      history: [{
        id: Date.now(),
        action: 'created',
        timestamp: new Date().toISOString(),
        performedBy: 'Nguyễn Sales Manager',
        details: `Tạo đơn hàng ${orderData.orderNumber}`
      }],
      remindersSent: 0,
      createdBy: 'Nguyễn Sales Manager'
    }

    setOrders(prev => [...prev, newOrder])
    setNotification({
      message: `Đơn hàng ${orderData.orderNumber} đã được tạo thành công!`,
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  // Handle update order
  const handleUpdateOrder = (orderId: number, updates: any) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, ...updates }
        : order
    ))
    
    setNotification({
      message: 'Đơn hàng đã được cập nhật thành công!',
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const metrics = getOverviewMetrics()

  // Render functions
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng đơn hàng</div>
              <div className="text-2xl font-bold text-blue-600">{metrics.totalOrders}</div>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white p-6 border border-green-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng doanh thu</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(metrics.totalRevenue)}</div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white p-6 border border-red-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Chưa thanh toán</div>
              <div className="text-2xl font-bold text-red-600">{metrics.unpaidOrders}</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white p-6 border border-purple-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Khách VIP</div>
              <div className="text-2xl font-bold text-purple-600">{metrics.vipOrders}</div>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng cần chú ý</h3>
          <div className="space-y-3">
            {orders.filter(o => o.paymentStatus === 'unpaid' || (o.deadline && new Date(o.deadline) < new Date())).slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{order.orderNumber}</div>
                  <div className="text-sm text-gray-500">{order.customer.name}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {order.deadline && new Date(order.deadline) < new Date() && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      Quá hạn
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {getPaymentStatusText(order.paymentStatus)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Đơn mới được tạo</div>
                <div className="text-xs text-gray-500">DH20250611001 - 2 giờ trước</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Thanh toán thành công</div>
                <div className="text-xs text-gray-500">DH20250610005 - 4 giờ trước</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Nhắc thanh toán lần 2</div>
                <div className="text-xs text-gray-500">DH20250609003 - 6 giờ trước</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProductOrders = () => {
    // Group orders by product
    const productOrdersMap = new Map()
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const productKey = `${item.product.id}-${item.variantId || 'base'}`
        if (!productOrdersMap.has(productKey)) {
          productOrdersMap.set(productKey, {
            product: item.product,
            variant: item.variant,
            orders: [],
            totalQuantity: 0,
            totalRevenue: 0,
            orderCount: 0
          })
        }
        
        const productData = productOrdersMap.get(productKey)
        if (!productData.orders.some((o: Order) => o.id === order.id)) {
          productData.orders.push(order)
          productData.orderCount++
        }
        productData.totalQuantity += item.quantity
        productData.totalRevenue += item.totalPrice
      })
    })

    const productOrders = Array.from(productOrdersMap.values())

    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Đơn hàng theo Sản phẩm</h2>
          
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Tất cả danh mục</option>
              <option value="Tư vấn">Tư vấn</option>
              <option value="Phần mềm">Phần mềm</option>
              <option value="Dịch vụ">Dịch vụ</option>
            </select>
          </div>
        </div>

        {/* Product Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Tổng sản phẩm</div>
                <div className="text-2xl font-bold text-blue-600">{productOrders.length}</div>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white p-6 border border-green-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Sản phẩm bán chạy nhất</div>
                <div className="text-lg font-bold text-green-600">
                  {productOrders.length > 0 ? 
                    productOrders.reduce((best, current) => 
                      current.totalQuantity > best.totalQuantity ? current : best
                    ).product.name.substring(0, 15) + '...'
                    : 'N/A'
                  }
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-6 border border-purple-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Doanh thu cao nhất</div>
                <div className="text-lg font-bold text-purple-600">
                  {productOrders.length > 0 ? 
                    formatCurrency(productOrders.reduce((max, current) => 
                      current.totalRevenue > max ? current.totalRevenue : max
                    , 0))
                    : '0 đ'
                  }
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Product Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số đơn hàng</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng số lượng</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng doanh thu</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Giá trung bình</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productOrders.map((productData, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{productData.product.name}</div>
                        <div className="text-sm text-gray-500">
                          {productData.variant ? productData.variant.name : 'Cơ bản'} • {productData.product.code}
                        </div>
                        <div className="text-xs text-gray-400">{productData.product.category}</div>
                      </div>
                    </td>
                    
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{productData.orderCount}</div>
                    </td>
                    
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{productData.totalQuantity}</div>
                    </td>
                    
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{formatCurrency(productData.totalRevenue)}</div>
                    </td>
                    
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-gray-900">
                        {formatCurrency(Math.round(productData.totalRevenue / productData.totalQuantity))}
                      </div>
                    </td>
                    
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Xem đơn hàng"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Xuất báo cáo">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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

        {/* Product Details - Expandable Rows */}
        <div className="space-y-4">
          {productOrders.slice(0, 3).map((productData, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Đơn hàng cho: {productData.product.name} 
                  {productData.variant && ` - ${productData.variant.name}`}
                </h3>
                <span className="text-sm text-gray-500">{productData.orderCount} đơn hàng</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Số lượng bán</div>
                  <div className="text-xl font-bold text-blue-600">{productData.totalQuantity}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Doanh thu</div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(productData.totalRevenue)}</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-gray-600">Giá trung bình</div>
                  <div className="text-xl font-bold text-purple-600">
                    {formatCurrency(Math.round(productData.totalRevenue / productData.totalQuantity))}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-gray-600">Khách hàng</div>
                  <div className="text-xl font-bold text-orange-600">
                    {Array.from(new Set(productData.orders.map((o: Order) => o.customerId))).length}
                  </div>
                </div>
              </div>

              {/* Recent Orders for this Product */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Đơn hàng gần đây</h4>
                <div className="space-y-2">
                  {productData.orders.slice(0, 3).map((order: Order) => {
                    const item = order.items.find((i: OrderItem) => i.product.id === productData.product.id && 
                      (i.variantId || 'base') === (productData.variant?.id || 'base'))
                    return (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500">
                            {order.customer.name} • {item?.quantity} x {formatCurrency(item?.unitPrice || 0)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderOrders = () => (
    <div className="space-y-4">
      {/* Header and filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Quản lý Đơn hàng</h2>
        
        {/* Inline Filters */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng theo mã, khách hàng..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            
            {/* Payment Status Filter */}
            <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Tình trạng thanh toán</option>
              <option value="unpaid">Chưa thanh toán</option>
              <option value="partial">Thanh toán một phần</option>
              <option value="paid">Đã thanh toán</option>
              <option value="refunded">Đã hoàn tiền</option>
            </select>
            
            {/* Time Filter */}
            <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Thời gian</option>
              <option value="today">Hôm nay</option>
              <option value="yesterday">Hôm qua</option>
              <option value="thisWeek">Tuần này</option>
              <option value="thisMonth">Tháng này</option>
              <option value="lastMonth">Tháng trước</option>
            </select>
            
            {/* Create Order Button */}
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo đơn hàng</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Thanh toán</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Thời hạn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Nhãn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.phone}</div>
                      {order.isVip && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                          <Target className="w-3 h-3 mr-1" />
                          VIP
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{order.items[0]?.product.name}</div>
                      {order.items.length > 1 && (
                        <div className="text-sm text-gray-500">+{order.items.length - 1} sản phẩm khác</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{formatCurrency(order.total)}</div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                    {order.deadline ? (
                      <div className={`text-sm ${new Date(order.deadline) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                        {calculateTimeRemaining(order.deadline)}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {order.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded border ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                      {order.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{order.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Gửi tin nhắn">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
        <p className="text-gray-600">Quản lý đơn hàng, thanh toán và theo dõi lịch sử</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Tổng quan', icon: <Activity className="w-4 h-4" /> },
              { id: 'orders', name: 'Đơn hàng', icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'products', name: 'Sản phẩm', icon: <Package className="w-4 h-4" /> },
              { id: 'reminders', name: 'Nhắc thanh toán', icon: <Bell className="w-4 h-4" /> }
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
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'products' && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Quản lý sản phẩm đang được phát triển...</p>
            </div>
          )}
          {activeTab === 'reminders' && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Cài đặt nhắc thanh toán đang được phát triển...</p>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}