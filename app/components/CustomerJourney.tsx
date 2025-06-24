'use client'

import { useState } from 'react'
import { 
  Users, Target, ShoppingCart, ArrowRight, 
  Calendar, DollarSign, User, Eye, CheckCircle,
  Clock, AlertCircle, Zap, TrendingUp, Package
} from 'lucide-react'

interface CustomerJourneyItem {
  id: number
  leadId?: number
  dealId?: number
  orderId?: number
  customerName: string
  customerEmail: string
  product: string
  leadValue: number
  dealValue?: string
  orderValue?: number
  leadStatus: string
  dealStage?: string
  orderStatus?: string
  leadDate: string
  dealDate?: string
  orderDate?: string
  assignedTo: string
}

interface CustomerJourneyProps {
  journeyData?: CustomerJourneyItem[]
}

export default function CustomerJourney({ journeyData = [] }: CustomerJourneyProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerJourneyItem | null>(null)

  // Sample integrated data showing the complete journey
  const defaultJourneyData: CustomerJourneyItem[] = [
    {
      id: 1,
      leadId: 1,
      dealId: 1,
      orderId: 1,
      customerName: 'Nguyễn Văn A',
      customerEmail: 'nguyenvana@email.com',
      product: 'CRM Solution',
      leadValue: 50000000,
      dealValue: '50,000,000 VND',
      orderValue: 50000000,
      leadStatus: 'converted',
      dealStage: 'closed_won',
      orderStatus: 'confirmed',
      leadDate: '2024-01-15',
      dealDate: '2024-01-20',
      orderDate: '2024-01-25',
      assignedTo: 'Minh Expert'
    },
    {
      id: 2,
      leadId: 2,
      dealId: 2,
      customerName: 'Trần Thị B',
      customerEmail: 'tranthib@email.com',
      product: 'Marketing Automation',
      leadValue: 25000000,
      dealValue: '25,000,000 VND',
      leadStatus: 'qualified',
      dealStage: 'proposal',
      leadDate: '2024-01-16',
      dealDate: '2024-01-19',
      assignedTo: 'An Expert'
    },
    {
      id: 3,
      leadId: 3,
      customerName: 'Lê Văn C',
      customerEmail: 'levanc@email.com',
      product: 'E-commerce Platform',
      leadValue: 75000000,
      leadStatus: 'contacted',
      leadDate: '2024-01-18',
      assignedTo: 'Linh Expert'
    }
  ]

  const data = journeyData.length > 0 ? journeyData : defaultJourneyData

  const getStageColor = (stage: string, type: 'lead' | 'deal' | 'order') => {
    switch (type) {
      case 'lead':
        switch (stage) {
          case 'converted': return 'bg-green-100 text-green-800'
          case 'qualified': return 'bg-blue-100 text-blue-800'
          case 'contacted': return 'bg-yellow-100 text-yellow-800'
          default: return 'bg-gray-100 text-gray-800'
        }
      case 'deal':
        switch (stage) {
          case 'closed_won': return 'bg-green-100 text-green-800'
          case 'negotiation': return 'bg-orange-100 text-orange-800'
          case 'proposal': return 'bg-blue-100 text-blue-800'
          default: return 'bg-gray-100 text-gray-800'
        }
      case 'order':
        switch (stage) {
          case 'completed': return 'bg-green-100 text-green-800'
          case 'confirmed': return 'bg-blue-100 text-blue-800'
          case 'processing': return 'bg-yellow-100 text-yellow-800'
          default: return 'bg-gray-100 text-gray-800'
        }
    }
  }

  const getStageText = (stage: string, type: 'lead' | 'deal' | 'order') => {
    switch (type) {
      case 'lead':
        switch (stage) {
          case 'converted': return 'Đã chuyển đổi'
          case 'qualified': return 'Đã xác định'
          case 'contacted': return 'Đã liên hệ'
          case 'new': return 'Mới'
          default: return stage
        }
      case 'deal':
        switch (stage) {
          case 'closed_won': return 'Thành công'
          case 'negotiation': return 'Đàm phán'
          case 'proposal': return 'Đề xuất'
          case 'qualified': return 'Đã xác định'
          default: return stage
        }
      case 'order':
        switch (stage) {
          case 'completed': return 'Hoàn thành'
          case 'confirmed': return 'Xác nhận'
          case 'processing': return 'Đang xử lý'
          case 'draft': return 'Nháp'
          default: return stage
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customer Journey Tracking</h2>
          <p className="text-gray-600">Theo dõi hành trình khách hàng từ Lead đến Đơn hàng</p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Lead</span>
          </div>
          <ArrowRight className="w-4 h-4" />
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-green-600" />
            <span>Deal</span>
          </div>
          <ArrowRight className="w-4 h-4" />
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-purple-600" />
            <span>Order</span>
          </div>
        </div>
      </div>

      {/* Journey Cards */}
      <div className="space-y-4">
        {data.map((journey) => (
          <div key={journey.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Customer Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-900">{journey.customerName}</div>
                    <div className="text-sm text-gray-500">{journey.customerEmail}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{journey.product}</div>
                  <div className="text-sm text-gray-500">Phụ trách: {journey.assignedTo}</div>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="flex items-center space-x-4">
                {/* Lead Stage */}
                <div className="flex-1">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Lead #{journey.leadId}</span>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(journey.leadStatus, 'lead')}`}>
                        {getStageText(journey.leadStatus, 'lead')}
                      </span>
                    </div>
                    <div className="text-xs text-blue-700 mb-1">
                      {new Date(journey.leadDate).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-sm font-bold text-blue-900">
                      {journey.leadValue.toLocaleString('vi-VN')} VND
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <ArrowRight className={`w-5 h-5 ${journey.dealId ? 'text-green-500' : 'text-gray-300'}`} />
                </div>

                {/* Deal Stage */}
                <div className="flex-1">
                  {journey.dealId ? (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">Deal #{journey.dealId}</span>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(journey.dealStage || '', 'deal')}`}>
                          {getStageText(journey.dealStage || '', 'deal')}
                        </span>
                      </div>
                      <div className="text-xs text-green-700 mb-1">
                        {journey.dealDate ? new Date(journey.dealDate).toLocaleDateString('vi-VN') : '-'}
                      </div>
                      <div className="text-sm font-bold text-green-900">
                        {journey.dealValue || '-'}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 opacity-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Chưa có Deal</span>
                      </div>
                      <div className="text-xs text-gray-400">-</div>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <ArrowRight className={`w-5 h-5 ${journey.orderId ? 'text-purple-500' : 'text-gray-300'}`} />
                </div>

                {/* Order Stage */}
                <div className="flex-1">
                  {journey.orderId ? (
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <ShoppingCart className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">Order #{journey.orderId}</span>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(journey.orderStatus || '', 'order')}`}>
                          {getStageText(journey.orderStatus || '', 'order')}
                        </span>
                      </div>
                      <div className="text-xs text-purple-700 mb-1">
                        {journey.orderDate ? new Date(journey.orderDate).toLocaleDateString('vi-VN') : '-'}
                      </div>
                      <div className="text-sm font-bold text-purple-900">
                        {journey.orderValue ? `${journey.orderValue.toLocaleString('vi-VN')} VND` : '-'}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 opacity-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <ShoppingCart className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Chưa có Đơn hàng</span>
                      </div>
                      <div className="text-xs text-gray-400">-</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button 
                  onClick={() => setSelectedCustomer(journey)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Chi tiết</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Tỷ lệ Lead → Deal</div>
              <div className="text-xl font-bold text-gray-900">
                {Math.round((data.filter(d => d.dealId).length / data.length) * 100)}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Tỷ lệ Deal → Order</div>
              <div className="text-xl font-bold text-gray-900">
                {data.filter(d => d.dealId).length > 0 
                  ? Math.round((data.filter(d => d.orderId).length / data.filter(d => d.dealId).length) * 100)
                  : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Chuyển đổi tổng thể</div>
              <div className="text-xl font-bold text-gray-900">
                {Math.round((data.filter(d => d.orderId).length / data.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
