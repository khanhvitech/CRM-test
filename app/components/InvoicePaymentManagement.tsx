'use client'

import React, { useState, useEffect } from 'react'
import CreateInvoiceModal from './CreateInvoiceModal'
import RecordPaymentModal from './RecordPaymentModal'
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Send,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  CreditCard,
  Receipt,
  BanknoteIcon as Banknote,
  Building,
  User,
  MoreVertical,
  X,
  Check,
  RefreshCw,
  Save,
  TrendingUp,
  Target
} from 'lucide-react'

// Interfaces
interface Invoice {
  id: number
  invoiceNumber: string
  customerId: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerTaxId?: string
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  discount: number
  total: number
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled'
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  paymentMethod?: 'cash' | 'transfer' | 'card' | 'ewallet'
  notes?: string
  terms?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  paidDate?: string
  paidAmount: number
  remainingAmount: number
  currency: 'VND'
  tags: string[]
  attachments: InvoiceAttachment[]
  reminders: InvoiceReminder[]
  history: InvoiceHistory[]
}

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unitPrice: number
  total: number
  taxable: boolean
}

interface InvoiceAttachment {
  id: number
  fileName: string
  fileUrl: string
  fileType: string
  uploadedAt: string
  uploadedBy: string
}

interface InvoiceReminder {
  id: number
  type: 'email' | 'sms' | 'call'
  sentAt: string
  status: 'sent' | 'failed' | 'opened'
  message: string
}

interface InvoiceHistory {
  id: number
  action: string
  timestamp: string
  performedBy: string
  details: string
}

interface Payment {
  id: number
  invoiceId: number
  invoiceNumber: string
  customerName: string
  amount: number
  method: 'cash' | 'transfer' | 'card' | 'ewallet'
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
  date: string
  notes?: string
  receipt?: string
  confirmedBy: string
  createdAt: string
}

interface Filters {
  status: string
  paymentStatus: string
  dateRange: string
  customer: string
  searchQuery: string
}

export default function InvoicePaymentManagement() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'reports'>('invoices')
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([])
  const [selectedPayments, setSelectedPayments] = useState<number[]>([])
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    paymentStatus: 'all',
    dateRange: 'all',
    customer: '',
    searchQuery: ''
  })

  // Sample data
  useEffect(() => {
    setInvoices([
      {
        id: 1,
        invoiceNumber: 'INV-2025-001',
        customerId: 1,
        customerName: 'Công ty TNHH ABC',
        customerEmail: 'contact@abc.com',
        customerPhone: '0123456789',
        customerAddress: '123 Đường Nguyễn Văn Linh, TP.HCM',
        customerTaxId: '0123456789',
        issueDate: '2025-06-01',
        dueDate: '2025-06-15',
        items: [
          {
            id: 1,
            description: 'Phần mềm CRM - Gói Enterprise',
            quantity: 1,
            unitPrice: 10000000,
            total: 10000000,
            taxable: true
          },
          {
            id: 2,
            description: 'Training và Support',
            quantity: 1,
            unitPrice: 2000000,
            total: 2000000,
            taxable: true
          }
        ],
        subtotal: 12000000,
        taxRate: 10,
        taxAmount: 1200000,
        discount: 0,
        total: 13200000,
        status: 'sent',
        paymentStatus: 'unpaid',
        paymentMethod: 'transfer',
        notes: 'Thanh toán trong 15 ngày',
        terms: 'Thanh toán đầy đủ trong vòng 15 ngày kể từ ngày xuất hóa đơn',
        createdAt: '2025-06-01T09:00:00',
        updatedAt: '2025-06-01T09:00:00',
        createdBy: 'Nguyễn Văn A',
        paidAmount: 0,
        remainingAmount: 13200000,
        currency: 'VND',
        tags: ['Enterprise', 'VIP'],
        attachments: [],
        reminders: [],
        history: [
          {
            id: 1,
            action: 'created',
            timestamp: '2025-06-01T09:00:00',
            performedBy: 'Nguyễn Văn A',
            details: 'Hóa đơn được tạo'
          }
        ]
      },
      {
        id: 2,
        invoiceNumber: 'INV-2025-002',
        customerId: 2,
        customerName: 'Trần Thị B',
        customerEmail: 'tranthib@email.com',
        customerPhone: '0987654321',
        customerAddress: '456 Đường Lê Lợi, Hà Nội',
        issueDate: '2025-06-05',
        dueDate: '2025-06-20',
        items: [
          {
            id: 3,
            description: 'Phần mềm CRM - Gói Standard',
            quantity: 1,
            unitPrice: 5000000,
            total: 5000000,
            taxable: true
          }
        ],
        subtotal: 5000000,
        taxRate: 10,
        taxAmount: 500000,
        discount: 250000,
        total: 5250000,
        status: 'paid',
        paymentStatus: 'paid',
        paymentMethod: 'transfer',
        createdAt: '2025-06-05T10:30:00',
        updatedAt: '2025-06-07T14:20:00',
        createdBy: 'Lê Văn C',
        paidDate: '2025-06-07',
        paidAmount: 5250000,
        remainingAmount: 0,
        currency: 'VND',
        tags: ['Standard'],
        attachments: [],
        reminders: [],
        history: [
          {
            id: 2,
            action: 'created',
            timestamp: '2025-06-05T10:30:00',
            performedBy: 'Lê Văn C',
            details: 'Hóa đơn được tạo'
          },
          {
            id: 3,
            action: 'paid',
            timestamp: '2025-06-07T14:20:00',
            performedBy: 'Lê Văn C',
            details: 'Thanh toán đầy đủ 5,250,000 VND'
          }
        ]
      },
      {
        id: 3,
        invoiceNumber: 'INV-2025-003',
        customerId: 3,
        customerName: 'Công ty XYZ',
        customerEmail: 'info@xyz.com',
        customerPhone: '0901234567',
        customerAddress: '789 Đường Trần Hưng Đạo, Đà Nẵng',
        customerTaxId: '0987654321',
        issueDate: '2025-05-28',
        dueDate: '2025-06-12',
        items: [
          {
            id: 4,
            description: 'Tích hợp API và Customization',
            quantity: 1,
            unitPrice: 8000000,
            total: 8000000,
            taxable: true
          }
        ],
        subtotal: 8000000,
        taxRate: 10,
        taxAmount: 800000,
        discount: 0,
        total: 8800000,
        status: 'overdue',
        paymentStatus: 'unpaid',
        paymentMethod: 'transfer',
        createdAt: '2025-05-28T11:15:00',
        updatedAt: '2025-05-28T11:15:00',
        createdBy: 'Phạm Thị D',
        paidAmount: 0,
        remainingAmount: 8800000,
        currency: 'VND',
        tags: ['Customization', 'Quá hạn'],
        attachments: [],
        reminders: [
          {
            id: 1,
            type: 'email',
            sentAt: '2025-06-13T09:00:00',
            status: 'sent',
            message: 'Nhắc nhở thanh toán hóa đơn INV-2025-003'
          }
        ],
        history: [
          {
            id: 4,
            action: 'created',
            timestamp: '2025-05-28T11:15:00',
            performedBy: 'Phạm Thị D',
            details: 'Hóa đơn được tạo'
          },
          {
            id: 5,
            action: 'overdue',
            timestamp: '2025-06-13T00:00:00',
            performedBy: 'System',
            details: 'Hóa đơn đã quá hạn thanh toán'
          }
        ]
      }
    ])

    setPayments([
      {
        id: 1,
        invoiceId: 2,
        invoiceNumber: 'INV-2025-002',
        customerName: 'Trần Thị B',
        amount: 5250000,
        method: 'transfer',
        status: 'completed',
        transactionId: 'TXN-20250607001',
        date: '2025-06-07',
        notes: 'Chuyển khoản ngân hàng',
        receipt: 'receipt-001.pdf',
        confirmedBy: 'Lê Văn C',
        createdAt: '2025-06-07T14:20:00'
      },
      {
        id: 2,
        invoiceId: 1,
        invoiceNumber: 'INV-2025-001',
        customerName: 'Công ty TNHH ABC',
        amount: 6600000,
        method: 'transfer',
        status: 'pending',
        date: '2025-06-15',
        notes: 'Thanh toán trước 50%',
        confirmedBy: 'Nguyễn Văn A',
        createdAt: '2025-06-15T10:00:00'
      }
    ])
  }, [])

  // Helper functions
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'viewed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200'
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
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Nháp'
      case 'sent': return 'Đã gửi'
      case 'viewed': return 'Đã xem'
      case 'paid': return 'Đã thanh toán'
      case 'overdue': return 'Quá hạn'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'unpaid': return 'Chưa thanh toán'
      case 'partial': return 'Thanh toán một phần'
      case 'paid': return 'Đã thanh toán'
      default: return status
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash': return 'Tiền mặt'
      case 'transfer': return 'Chuyển khoản'
      case 'card': return 'Thẻ tín dụng'
      case 'ewallet': return 'Ví điện tử'
      default: return method
    }
  }

  // Filter functions
  const getFilteredInvoices = () => {
    return invoices.filter(invoice => {
      const matchesStatus = filters.status === 'all' || invoice.status === filters.status
      const matchesPaymentStatus = filters.paymentStatus === 'all' || invoice.paymentStatus === filters.paymentStatus
      const matchesCustomer = !filters.customer || invoice.customerName.toLowerCase().includes(filters.customer.toLowerCase())
      const matchesSearch = !filters.searchQuery || 
        invoice.invoiceNumber.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      
      return matchesStatus && matchesPaymentStatus && matchesCustomer && matchesSearch
    })
  }

  const getFilteredPayments = () => {
    return payments.filter(payment => {
      const matchesSearch = !filters.searchQuery || 
        payment.invoiceNumber.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        payment.customerName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      
      return matchesSearch
    })
  }

  // Handle create invoice
  const handleCreateInvoice = (invoiceData: any) => {
    const newInvoice: Invoice = {
      id: Date.now(),
      invoiceNumber: `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`,
      customerId: Date.now(),
      ...invoiceData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current User',
      currency: 'VND' as const,
      tags: [],
      attachments: [],
      reminders: [],
      history: [
        {
          id: Date.now(),
          action: 'created',
          timestamp: new Date().toISOString(),
          performedBy: 'Current User',
          details: 'Hóa đơn được tạo'
        }
      ]
    }

    setInvoices(prev => [...prev, newInvoice])
    setNotification({
      message: `Hóa đơn ${newInvoice.invoiceNumber} đã được tạo thành công!`,
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  // Handle record payment
  const handleRecordPayment = (paymentData: any) => {
    const newPayment: Payment = {
      id: Date.now(),
      ...paymentData,
      confirmedBy: 'Current User',
      createdAt: new Date().toISOString()
    }

    setPayments(prev => [...prev, newPayment])

    // Update invoice payment status
    setInvoices(prev => prev.map(invoice => {
      if (invoice.id === parseInt(paymentData.invoiceId)) {
        const newPaidAmount = invoice.paidAmount + paymentData.amount
        const newRemainingAmount = invoice.total - newPaidAmount
        const newPaymentStatus = newRemainingAmount <= 0 ? 'paid' : 
                                newPaidAmount > 0 ? 'partial' : 'unpaid'
        const newStatus = newPaymentStatus === 'paid' ? 'paid' : invoice.status

        return {
          ...invoice,
          paidAmount: newPaidAmount,
          remainingAmount: Math.max(0, newRemainingAmount),
          paymentStatus: newPaymentStatus as 'unpaid' | 'partial' | 'paid',
          status: newStatus as 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled',
          paidDate: newPaymentStatus === 'paid' ? paymentData.date : invoice.paidDate,
          updatedAt: new Date().toISOString()
        }
      }
      return invoice
    }))

    setNotification({
      message: `Đã ghi nhận thanh toán ${paymentData.amount.toLocaleString('vi-VN')} ₫`,
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }
  const handleBulkOperation = async (operation: string) => {
    if (selectedInvoices.length === 0) return
    
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      switch (operation) {
        case 'send_invoices':
          setInvoices(prev => prev.map(invoice => 
            selectedInvoices.includes(invoice.id) 
              ? { ...invoice, status: 'sent' as const }
              : invoice
          ))
          setNotification({
            message: `Đã gửi ${selectedInvoices.length} hóa đơn`,
            type: 'success'
          })
          break
        case 'mark_paid':
          setInvoices(prev => prev.map(invoice => 
            selectedInvoices.includes(invoice.id) 
              ? { 
                  ...invoice, 
                  status: 'paid' as const, 
                  paymentStatus: 'paid' as const,
                  paidAmount: invoice.total,
                  remainingAmount: 0,
                  paidDate: new Date().toISOString().split('T')[0]
                }
              : invoice
          ))
          setNotification({
            message: `Đã đánh dấu ${selectedInvoices.length} hóa đơn là đã thanh toán`,
            type: 'success'
          })
          break
        case 'send_reminders':
          setNotification({
            message: `Đã gửi nhắc nhở cho ${selectedInvoices.length} hóa đơn`,
            type: 'success'
          })
          break
      }
      setSelectedInvoices([])
      setShowBulkActions(false)
    } catch (error) {
      setNotification({
        message: 'Có lỗi xảy ra khi thực hiện thao tác',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => setNotification(null), 3000)
    }
  }

  // Calculate metrics
  const getInvoiceMetrics = () => {
    const totalInvoices = invoices.length
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0)
    const paidAmount = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
    const unpaidAmount = invoices.reduce((sum, inv) => sum + inv.remainingAmount, 0)
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length
    const thisMonthInvoices = invoices.filter(inv => 
      new Date(inv.createdAt).getMonth() === new Date().getMonth()
    ).length

    return {
      totalInvoices,
      totalAmount,
      paidAmount,
      unpaidAmount,
      overdueInvoices,
      thisMonthInvoices,
      paymentRate: totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0
    }
  }

  const metrics = getInvoiceMetrics()

  // Render functions
  const renderInvoicesTab = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng hóa đơn</div>
              <div className="text-2xl font-bold text-blue-600">{metrics.totalInvoices}</div>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white p-6 border border-green-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng giá trị</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(metrics.totalAmount)}</div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-white p-6 border border-yellow-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Chưa thanh toán</div>
              <div className="text-2xl font-bold text-yellow-600">{formatCurrency(metrics.unpaidAmount)}</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white p-6 border border-red-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Quá hạn</div>
              <div className="text-2xl font-bold text-red-600">{metrics.overdueInvoices}</div>
            </div>
            <Clock className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm hóa đơn..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="sent">Đã gửi</option>
              <option value="viewed">Đã xem</option>
              <option value="paid">Đã thanh toán</option>
              <option value="overdue">Quá hạn</option>
              <option value="cancelled">Đã hủy</option>
            </select>

            <select
              value={filters.paymentStatus}
              onChange={(e) => setFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả thanh toán</option>
              <option value="unpaid">Chưa thanh toán</option>
              <option value="partial">Thanh toán một phần</option>
              <option value="paid">Đã thanh toán</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateInvoice(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo hóa đơn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedInvoices.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-900">
                Đã chọn {selectedInvoices.length} hóa đơn
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkOperation('send_invoices')}
                disabled={isLoading}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Gửi</span>
              </button>
              <button
                onClick={() => handleBulkOperation('mark_paid')}
                disabled={isLoading}
                className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>Đánh dấu đã thanh toán</span>
              </button>
              <button
                onClick={() => handleBulkOperation('send_reminders')}
                disabled={isLoading}
                className="px-3 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                <span>Gửi nhắc nhở</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.length === getFilteredInvoices().length && getFilteredInvoices().length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInvoices(getFilteredInvoices().map(inv => inv.id))
                      } else {
                        setSelectedInvoices([])
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số hóa đơn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Thanh toán</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Hạn thanh toán</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredInvoices().map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoices(prev => [...prev, invoice.id])
                        } else {
                          setSelectedInvoices(prev => prev.filter(id => id !== invoice.id))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">{new Date(invoice.issueDate).toLocaleDateString('vi-VN')}</div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{invoice.customerName}</div>
                    <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                    <div className="text-sm text-gray-500">{invoice.customerPhone}</div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{formatCurrency(invoice.total)}</div>
                    {invoice.remainingAmount > 0 && (
                      <div className="text-sm text-red-600">Còn lại: {formatCurrency(invoice.remainingAmount)}</div>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                      {getPaymentStatusText(invoice.paymentStatus)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className={`text-sm ${new Date(invoice.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                      {new Date(invoice.dueDate).toLocaleDateString('vi-VN')}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors" 
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-purple-600 transition-colors" 
                        title="Tải xuống"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {invoice.paymentStatus !== 'paid' && (
                        <button 
                          onClick={() => {
                            setInvoices(prev => prev.map(inv => 
                              inv.id === invoice.id 
                                ? { 
                                    ...inv, 
                                    status: 'paid' as const, 
                                    paymentStatus: 'paid' as const,
                                    paidAmount: inv.total,
                                    remainingAmount: 0,
                                    paidDate: new Date().toISOString().split('T')[0]
                                  }
                                : inv
                            ))
                            setNotification({
                              message: `Đã đánh dấu hóa đơn ${invoice.invoiceNumber} là đã thanh toán`,
                              type: 'success'
                            })
                            setTimeout(() => setNotification(null), 3000)
                          }}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors" 
                          title="Đánh dấu đã thanh toán"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
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

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      {/* Payment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-white p-6 border border-green-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng thanh toán</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(metrics.paidAmount)}</div>
            </div>
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tỷ lệ thanh toán</div>
              <div className="text-2xl font-bold text-blue-600">{metrics.paymentRate}%</div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white p-6 border border-purple-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Giao dịch tháng này</div>
              <div className="text-2xl font-bold text-purple-600">{payments.length}</div>
            </div>
            <Receipt className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Lịch sử thanh toán</h3>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ghi nhận thanh toán</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hóa đơn</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredPayments().map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{payment.invoiceNumber}</div>
                    {payment.transactionId && (
                      <div className="text-sm text-gray-500">ID: {payment.transactionId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{payment.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-medium text-green-600">{formatCurrency(payment.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                      {getPaymentMethodText(payment.method)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      {payment.status === 'completed' ? 'Hoàn thành' :
                       payment.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Xem chi tiết">
                        <Eye className="w-4 h-4" />
                      </button>
                      {payment.receipt && (
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Tải biên lai">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
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

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Báo cáo Hóa đơn & Thanh toán</h3>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-700">Doanh thu tháng này</div>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(metrics.paidAmount)}</div>
            <div className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% so với tháng trước
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm text-green-700">Tỷ lệ thu hồi</div>
            <div className="text-2xl font-bold text-green-900">{metrics.paymentRate}%</div>
            <div className="text-xs text-green-600">Mục tiêu: 85%</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-sm text-yellow-700">Thời gian thu hồi TB</div>
            <div className="text-2xl font-bold text-yellow-900">12 ngày</div>
            <div className="text-xs text-yellow-600">Mục tiêu: ≤ 15 ngày</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="text-sm text-red-700">Nợ quá hạn</div>
            <div className="text-2xl font-bold text-red-900">{formatCurrency(invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.remainingAmount, 0))}</div>
            <div className="text-xs text-red-600">{invoices.filter(inv => inv.status === 'overdue').length} hóa đơn</div>
          </div>
        </div>

        {/* Charts placeholder */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <div className="text-gray-500">Biểu đồ báo cáo sẽ được hiển thị ở đây</div>
          <div className="text-sm text-gray-400 mt-2">Doanh thu theo thời gian, phân tích khách hàng, xu hướng thanh toán...</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Modals */}
      <CreateInvoiceModal
        isOpen={showCreateInvoice}
        onClose={() => setShowCreateInvoice(false)}
        onSubmit={handleCreateInvoice}
      />
      
      <RecordPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSubmit={handleRecordPayment}
        invoices={invoices}
      />

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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Hóa đơn & Thanh toán</h1>
          <p className="text-gray-600">Quản lý hóa đơn, theo dõi thanh toán và báo cáo tài chính</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'invoices', name: 'Hóa đơn', icon: <FileText className="w-4 h-4" /> },
              { id: 'payments', name: 'Thanh toán', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'reports', name: 'Báo cáo', icon: <TrendingUp className="w-4 h-4" /> }
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
          {activeTab === 'invoices' && renderInvoicesTab()}
          {activeTab === 'payments' && renderPaymentsTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>
    </div>
  )
}
