'use client'

import { useState, useEffect } from 'react'
import { 
  X,
  Edit,
  Save,
  Upload,
  Download,
  MessageSquare,
  Tag,
  Clock,
  DollarSign,
  User,
  Building2,
  Phone,
  Mail,
  Calendar,
  FileText,
  History,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Send,
  Plus,
  Trash2,
  Eye,
  Package,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react'

interface Order {
  id: number
  orderNumber: string
  customerId: number
  customer: any
  items: any[]
  subtotal: number
  discount: number
  tax: number
  total: number
  status: string
  paymentStatus: string
  paymentMethod: string
  notes: any[]
  invoices: any[]
  tags: string[]
  createdAt: string
  createdBy: string
  updatedAt: string
  history: any[]
  zaloMessages: any[]
  deadline?: string
  remindersSent: number
  isVip: boolean
  upsellSuggestions?: any[]
  crosssellSuggestions?: any[]
}

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
  onUpdate: (orderId: number, updates: any) => void
}

export default function OrderDetailModal({ 
  isOpen, 
  onClose, 
  order, 
  onUpdate 
}: OrderDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'payment' | 'notes' | 'messages' | 'history'>('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})
  const [newNote, setNewNote] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusChange, setStatusChange] = useState({
    newStatus: '',
    reason: ''
  })
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [refundData, setRefundData] = useState({
    amount: 0,
    method: 'transfer',
    reason: '',
    notes: ''
  })

  useEffect(() => {
    if (order) {
      setEditData(order)
    }
  }, [order])

  if (!isOpen || !order) return null

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' đ'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid': return 'bg-red-100 text-red-800 border-red-200'
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'refunded': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'draft': 'Nháp',
      'pending': 'Chờ xác nhận',
      'confirmed': 'Đã xác nhận',
      'processing': 'Đang xử lý',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy',
      'refunded': 'Đã hoàn'
    }
    return statusMap[status] || status
  }

  const getPaymentStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'unpaid': 'Chưa thanh toán',
      'partial': 'Thanh toán một phần',
      'paid': 'Đã thanh toán',
      'refunded': 'Đã hoàn tiền'
    }
    return statusMap[status] || status
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

  const handleStatusChange = () => {
    if (!statusChange.newStatus) return
    
    // Add to history
    const historyEntry = {
      id: Date.now(),
      action: 'status_changed',
      timestamp: new Date().toISOString(),
      performedBy: 'Nguyễn Sales Manager',
      oldValue: order.status,
      newValue: statusChange.newStatus,
      reason: statusChange.reason
    }

    const updates = {
      status: statusChange.newStatus,
      history: [...order.history, historyEntry],
      updatedAt: new Date().toISOString()
    }

    onUpdate(order.id, updates)
    setShowStatusModal(false)
    setStatusChange({ newStatus: '', reason: '' })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: Date.now(),
      content: newNote,
      type: 'internal',
      createdAt: new Date().toISOString(),
      createdBy: 'Nguyễn Sales Manager',
      isEditable: true
    }

    const updates = {
      notes: [...order.notes, note],
      updatedAt: new Date().toISOString()
    }

    onUpdate(order.id, updates)
    setNewNote('')
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      content: newMessage,
      direction: 'outgoing',
      timestamp: new Date().toISOString(),
      sender: 'Nguyễn Sales Manager',
      isRead: false
    }

    const updates = {
      zaloMessages: [...order.zaloMessages, message],
      updatedAt: new Date().toISOString()
    }

    onUpdate(order.id, updates)
    setNewMessage('')
  }

  const handleRefund = () => {
    const historyEntry = {
      id: Date.now(),
      action: 'refunded',
      timestamp: new Date().toISOString(),
      performedBy: 'Nguyễn Sales Manager',
      details: `Hoàn ${formatCurrency(refundData.amount)} qua ${refundData.method}`,
      reason: refundData.reason
    }

    const updates = {
      status: refundData.amount === order.total ? 'refunded' : order.status,
      paymentStatus: refundData.amount === order.total ? 'refunded' : 'partial',
      history: [...order.history, historyEntry],
      updatedAt: new Date().toISOString()
    }

    onUpdate(order.id, updates)
    setShowRefundModal(false)
    setRefundData({ amount: 0, method: 'transfer', reason: '', notes: '' })
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Thông tin đơn hàng</h3>
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Cập nhật trạng thái
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đơn:</span>
              <span className="font-medium">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trạng thái:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thanh toán:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getPaymentStatusColor(order.paymentStatus)}`}>
                {getPaymentStatusText(order.paymentStatus)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức:</span>
              <span className="font-medium capitalize">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-bold text-lg text-blue-600">{formatCurrency(order.total)}</span>
            </div>
            {order.deadline && (
              <div className="flex justify-between">
                <span className="text-gray-600">Thời hạn:</span>
                <span className={`font-medium ${new Date(order.deadline) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                  {calculateTimeRemaining(order.deadline)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Thông tin khách hàng</h3>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{order.customer.name}</div>
                {order.isVip && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    VIP
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <span>{order.customer.email}</span>
              </div>
              {order.customer.company && (
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{order.customer.company}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      {order.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Nhãn</h3>
          <div className="flex flex-wrap gap-2">
            {order.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border border-blue-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">Gửi tin nhắn</span>
        </button>
        <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Upload className="w-4 h-4" />
          <span className="text-sm">Gắn hóa đơn</span>
        </button>
        <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Tag className="w-4 h-4" />
          <span className="text-sm">Gắn nhãn</span>
        </button>
        <button 
          onClick={() => setShowRefundModal(true)}
          className="flex items-center justify-center space-x-2 px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Hoàn/Hủy</span>
        </button>
      </div>

      {/* Upsell/Cross-sell Suggestions */}
      {(order.upsellSuggestions?.length || order.crosssellSuggestions?.length) && (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            <Zap className="w-5 h-5 inline mr-2" />
            Đề xuất bán thêm
          </h3>
          
          {order.upsellSuggestions && order.upsellSuggestions.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-blue-800 mb-2">Nâng cấp (Upsell)</h4>
              <div className="space-y-2">
                {order.upsellSuggestions.map((product: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{formatCurrency(product.basePrice)}</div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                      Đề xuất
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.crosssellSuggestions && order.crosssellSuggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Sản phẩm bổ sung (Cross-sell)</h4>
              <div className="space-y-2">
                {order.crosssellSuggestions.map((product: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{formatCurrency(product.basePrice)}</div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                      Đề xuất
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderItems = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Chi tiết sản phẩm</h3>
      
      <div className="space-y-3">
        {order.items.map((item: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {item.product.name}
                  {item.variant && (
                    <span className="text-gray-600"> - {item.variant.name}</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Mã: {item.product.code} | Danh mục: {item.product.category}
                </div>
                {item.notes && (
                  <div className="text-sm text-blue-600 mt-2">📝 {item.notes}</div>
                )}
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(item.unitPrice)} x {item.quantity}</div>
                <div className="text-lg font-bold text-blue-600">{formatCurrency(item.totalPrice)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 pt-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tạm tính:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Giảm giá:</span>
              <span>-{formatCurrency(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Thuế VAT:</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotes = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Ghi chú</h3>
      </div>
      
      {/* Add Note */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Thêm ghi chú mới..."
            rows={3}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            maxLength={500}
          />
          <button
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {newNote.length}/500 ký tự
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {order.notes.map((note: any) => (
          <div key={note.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm text-gray-900">{note.content}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {note.type === 'customer_request' && '👤 Yêu cầu khách hàng'}
                  {note.type === 'internal' && '📝 Ghi chú nội bộ'}
                  {note.type === 'system' && '🤖 Hệ thống'}
                  {' • '}
                  {note.createdBy} • {new Date(note.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>
              {note.isEditable && (
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Tin nhắn Zalo/Facebook</h3>
      </div>
      
      {/* Send Message */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn gửi cho khách hàng..."
            rows={3}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Gửi</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {order.zaloMessages.map((message: any) => (
          <div key={message.id} className={`flex ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.direction === 'outgoing' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-900'
            }`}>
              <div className="text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.direction === 'outgoing' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.sender} • {new Date(message.timestamp).toLocaleString('vi-VN')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHistory = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Lịch sử thay đổi</h3>
      
      <div className="space-y-3">
        {order.history.map((entry: any) => (
          <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <History className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {entry.action === 'created' && 'Tạo đơn hàng'}
                  {entry.action === 'status_changed' && 'Thay đổi trạng thái'}
                  {entry.action === 'invoice_added' && 'Gắn hóa đơn'}
                  {entry.action === 'note_added' && 'Thêm ghi chú'}
                  {entry.action === 'refunded' && 'Hoàn tiền'}
                  {entry.action === 'cancelled' && 'Hủy đơn'}
                </div>
                {entry.oldValue && entry.newValue && (
                  <div className="text-sm text-gray-600">
                    Từ "{entry.oldValue}" thành "{entry.newValue}"
                  </div>
                )}
                {entry.reason && (
                  <div className="text-sm text-gray-600">Lý do: {entry.reason}</div>
                )}
                {entry.details && (
                  <div className="text-sm text-gray-600">{entry.details}</div>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {entry.performedBy} • {new Date(entry.timestamp).toLocaleString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Chi tiết đơn hàng</h2>
            <p className="text-sm text-gray-600">{order.orderNumber}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Tổng quan', icon: <Eye className="w-4 h-4" /> },
              { id: 'items', name: 'Sản phẩm', icon: <Package className="w-4 h-4" /> },
              { id: 'notes', name: 'Ghi chú', icon: <FileText className="w-4 h-4" /> },
              { id: 'messages', name: 'Tin nhắn', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'history', name: 'Lịch sử', icon: <History className="w-4 h-4" /> }
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'items' && renderItems()}
          {activeTab === 'notes' && renderNotes()}
          {activeTab === 'messages' && renderMessages()}
          {activeTab === 'history' && renderHistory()}
        </div>
      </div>

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cập nhật trạng thái</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái mới
                  </label>
                  <select
                    value={statusChange.newStatus}
                    onChange={(e) => setStatusChange(prev => ({ ...prev, newStatus: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lý do thay đổi
                  </label>
                  <textarea
                    value={statusChange.reason}
                    onChange={(e) => setStatusChange(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Nhập lý do thay đổi trạng thái..."
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleStatusChange}
                  disabled={!statusChange.newStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hoàn tiền/Hủy đơn</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền hoàn (VNĐ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={order.total}
                    value={refundData.amount}
                    onChange={(e) => setRefundData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder={`Tối đa: ${formatCurrency(order.total)}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức hoàn
                  </label>
                  <select
                    value={refundData.method}
                    onChange={(e) => setRefundData(prev => ({ ...prev, method: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="transfer">Chuyển khoản</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="voucher">Voucher</option>
                    <option value="custom">Tùy chỉnh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lý do hoàn/hủy
                  </label>
                  <textarea
                    value={refundData.reason}
                    onChange={(e) => setRefundData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Khách hủy, Sai hợp đồng, Chưa thanh toán..."
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleRefund}
                  disabled={refundData.amount <= 0 || !refundData.reason}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-300"
                >
                  Xác nhận hoàn tiền
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
