'use client'

import { useState } from 'react'
import { 
  Lightbulb, TrendingUp, Target, MessageSquare, Clock, 
  Users, DollarSign, Gift, Phone, Mail, Calendar, 
  ChevronRight, X, RefreshCw, Star, AlertCircle
} from 'lucide-react'

interface AISuggestion {
  id: string
  type: 'marketing' | 'sales' | 'retention' | 'upsell' | 'support' | 'engagement'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  confidence: number
  estimatedImpact: string
  suggestedAction: string
  relatedCustomers: number
  timeToImplement: string
}

interface CustomerAISuggestionsProps {
  customerData?: any[]
}

export default function CustomerAISuggestions({ customerData = [] }: CustomerAISuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedSuggestion, setSelectedSuggestion] = useState<AISuggestion | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculate dynamic data based on customer data
  const todayNeedCare = Math.floor(customerData.length * 0.15) // 15% customers need care today
  const notContactedBack = Math.floor(customerData.length * 0.08) // 8% not contacted back
  const upsellOpportunities = Math.floor(customerData.length * 0.12) // 12% have upsell opportunities
  const birthdayReminders = Math.floor(customerData.length * 0.04) // 4% have birthdays coming

  // Mock AI suggestions data
  const aiSuggestions: AISuggestion[] = [
    {
      id: '1',
      type: 'support',
      priority: 'high',
      title: `Khách hàng cần chăm sóc hôm nay`,
      description: `${todayNeedCare} khách hàng cần được chăm sóc trong ngày hôm nay. Trong đó có ${notContactedBack} khách hàng chưa được liên hệ lại sau lần tương tác cuối cùng.`,
      confidence: 95,
      estimatedImpact: 'Tăng 30% mức độ hài lòng khách hàng',
      suggestedAction: 'Ưu tiên gọi điện và gửi tin nhắn chăm sóc cho các khách hàng này',
      relatedCustomers: todayNeedCare,
      timeToImplement: 'Trong ngày'
    },
    {
      id: '2',
      type: 'upsell',
      priority: 'high',
      title: 'Cơ hội bán thêm cho khách hàng cũ',
      description: `${upsellOpportunities} khách hàng hiện tại có tiềm năng mua thêm sản phẩm/dịch vụ dựa trên lịch sử mua hàng và hành vi sử dụng`,
      confidence: 88,
      estimatedImpact: 'Tăng 25% doanh thu từ khách hàng hiện tại',
      suggestedAction: 'Tạo offer cá nhân hóa và tư vấn trực tiếp cho từng khách hàng',
      relatedCustomers: upsellOpportunities,
      timeToImplement: '3-5 ngày'
    },
    {
      id: '3',
      type: 'engagement',
      priority: 'medium',
      title: 'Nhắc nhở sinh nhật khách hàng',
      description: `${birthdayReminders} khách hàng sắp có sinh nhật trong 7 ngày tới. Đây là cơ hội tuyệt vời để tăng cường mối quan hệ`,
      confidence: 92,
      estimatedImpact: 'Tăng 40% lòng trung thành khách hàng',
      suggestedAction: 'Gửi lời chúc sinh nhật kèm ưu đãi đặc biệt',
      relatedCustomers: birthdayReminders,
      timeToImplement: '1-2 ngày'
    },
    {
      id: '4',
      type: 'retention',
      priority: 'medium',
      title: 'Khách hàng có nguy cơ churn',
      description: `Phát hiện ${Math.floor(customerData.length * 0.06)} khách hàng có dấu hiệu giảm tương tác và có thể rời bỏ trong 30 ngày tới`,
      confidence: 83,
      estimatedImpact: 'Giữ chân 70% khách hàng có nguy cơ rời bỏ',
      suggestedAction: 'Liên hệ ngay để tìm hiểu vấn đề và đưa ra giải pháp phù hợp',
      relatedCustomers: Math.floor(customerData.length * 0.06),
      timeToImplement: '1 tuần'
    }
  ]

  const handleRefreshSuggestions = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'marketing': return <Target className="w-4 h-4" />
      case 'sales': return <DollarSign className="w-4 h-4" />
      case 'retention': return <Users className="w-4 h-4" />
      case 'upsell': return <TrendingUp className="w-4 h-4" />
      case 'support': return <MessageSquare className="w-4 h-4" />
      case 'engagement': return <Calendar className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'marketing': return 'text-blue-600 bg-blue-100'
      case 'sales': return 'text-green-600 bg-green-100'
      case 'retention': return 'text-red-600 bg-red-100'
      case 'upsell': return 'text-purple-600 bg-purple-100'
      case 'support': return 'text-orange-600 bg-orange-100'
      case 'engagement': return 'text-pink-600 bg-pink-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (!isExpanded) {
    return (
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Gợi ý AI</h3>
                <p className="text-sm text-gray-600">{aiSuggestions.length} gợi ý được tạo</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Xem gợi ý</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Gợi ý AI</h3>
              <p className="text-sm text-gray-600">
                Được tạo dựa trên phân tích {customerData.length} khách hàng • Cập nhật 5 phút trước
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefreshSuggestions}
              disabled={isRefreshing}
              className="flex items-center px-3 py-2 text-sm text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Đang cập nhật...' : 'Làm mới'}
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiSuggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSuggestion(suggestion)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getTypeColor(suggestion.type)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority === 'high' ? 'Cao' : 
                       suggestion.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{suggestion.confidence}%</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-800 mb-2">{suggestion.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{suggestion.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{suggestion.relatedCustomers} KH</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{suggestion.timeToImplement}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-blue-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{todayNeedCare}</div>
              <div className="text-sm text-gray-600">Cần chăm sóc hôm nay</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{upsellOpportunities}</div>
              <div className="text-sm text-gray-600">Cơ hội Upsell</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{birthdayReminders}</div>
              <div className="text-sm text-gray-600">Sinh nhật sắp tới</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{Math.floor(customerData.length * 0.06)}</div>
              <div className="text-sm text-gray-600">Nguy cơ Churn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Detail Modal */}
      {selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getTypeColor(selectedSuggestion.type)}`}>
                    {getTypeIcon(selectedSuggestion.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedSuggestion.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedSuggestion.priority)}`}>
                        Ưu tiên {selectedSuggestion.priority === 'high' ? 'cao' : 
                                selectedSuggestion.priority === 'medium' ? 'trung bình' : 'thấp'}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span>Độ tin cậy: {selectedSuggestion.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSuggestion(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Mô tả chi tiết</h4>
                  <p className="text-gray-600">{selectedSuggestion.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Tác động dự kiến</h4>
                  <p className="text-gray-600">{selectedSuggestion.estimatedImpact}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Hành động được đề xuất</h4>
                  <p className="text-gray-600">{selectedSuggestion.suggestedAction}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-800">Khách hàng liên quan</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">{selectedSuggestion.relatedCustomers}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-800">Thời gian thực hiện</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">{selectedSuggestion.timeToImplement}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedSuggestion(null)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Đóng
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Thực hiện gợi ý
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
