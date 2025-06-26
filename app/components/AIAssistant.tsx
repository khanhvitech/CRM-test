'use client'

import React, { useState, useEffect } from 'react'
import { 
  Bot, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock, 
  Target,
  AlertCircle,
  CheckCircle,
  X,
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Minimize2,
  Maximize2
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
  leadId?: number
  orderId?: number
}

interface AISuggestion {
  id: string
  type: 'lead' | 'deal' | 'general' | 'task' | 'follow-up'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  reason: string
  actionItems: string[]
  confidence: number
  relatedItemId?: number
  createdAt: string
  isRead: boolean
  category: 'optimization' | 'opportunity' | 'risk' | 'follow-up' | 'insight'
}

interface AIAssistantProps {
  leads: Lead[]
  deals: Deal[]
  onSuggestionAction?: (suggestionId: string, action: string) => void
  className?: string
}

export default function AIAssistant({ leads, deals, onSuggestionAction, className = '' }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<'suggestions' | 'chat'>('suggestions')
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([])
  const [chatMessages, setChatMessages] = useState<Array<{id: string, message: string, isUser: boolean, timestamp: string}>>([])
  const [chatInput, setChatInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<AISuggestion | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Generate AI suggestions based on leads and deals data
  useEffect(() => {
    const generateSuggestions = () => {
      const newSuggestions: AISuggestion[] = []

      // Analyze leads for follow-up opportunities
      leads.forEach(lead => {
        const daysSinceLastContact = lead.lastContactedAt 
          ? Math.floor((Date.now() - new Date(lead.lastContactedAt).getTime()) / (1000 * 60 * 60 * 24))
          : Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24))

        // High-value lead not contacted recently
        if (lead.value > 50000000 && daysSinceLastContact > 3 && lead.status !== 'converted') {
          newSuggestions.push({
            id: `lead-follow-${lead.id}`,
            type: 'follow-up',
            priority: 'high',
            title: `Follow-up khẩn: ${lead.name}`,
            description: `Lead có giá trị cao (${(lead.value / 1000000).toFixed(0)}M VND) chưa được liên hệ trong ${daysSinceLastContact} ngày`,
            reason: 'Lead có giá trị cao cần được ưu tiên follow-up để tránh mất cơ hội',
            actionItems: [
              'Gọi điện trực tiếp trong 24h',
              'Gửi email cá nhân hóa với proposal chi tiết',
              'Lên lịch demo sản phẩm',
              'Kết nối qua LinkedIn'
            ],
            confidence: 85,
            relatedItemId: lead.id,
            createdAt: new Date().toISOString(),
            isRead: false,
            category: 'opportunity'
          })
        }

        // Lead stuck in qualification stage
        if (lead.status === 'qualified' && daysSinceLastContact > 7) {
          newSuggestions.push({
            id: `lead-stuck-${lead.id}`,
            type: 'lead',
            priority: 'medium',
            title: `Lead đang "kẹt": ${lead.name}`,
            description: `Lead đã ở trạng thái qualified quá ${daysSinceLastContact} ngày mà không có tiến triển`,
            reason: 'Cần hành động để đẩy lead chuyển sang giai đoạn tiếp theo',
            actionItems: [
              'Tái đánh giá nhu cầu khách hàng',
              'Gửi thêm thông tin giá trị sản phẩm',
              'Đề xuất buổi tư vấn miễn phí',
              'Xem xét điều chỉnh chiến lược tiếp cận'
            ],
            confidence: 70,
            relatedItemId: lead.id,
            createdAt: new Date().toISOString(),
            isRead: false,
            category: 'risk'
          })
        }

        // New lead needs immediate attention
        if (lead.status === 'new' && daysSinceLastContact < 1) {
          newSuggestions.push({
            id: `lead-new-${lead.id}`,
            type: 'task',
            priority: 'high',
            title: `Lead mới cần liên hệ: ${lead.name}`,
            description: `Lead mới từ ${lead.source} có tiềm năng ${lead.tags.includes('hot') ? 'cao' : 'trung bình'}`,
            reason: 'Lead mới cần được liên hệ trong 24h để tăng tỷ lệ chuyển đổi',
            actionItems: [
              'Gọi điện xác nhận thông tin trong 2h',
              'Gửi email chào mừng và giới thiệu công ty',
              'Đánh giá và phân loại lead',
              'Lên kế hoạch follow-up'
            ],
            confidence: 90,
            relatedItemId: lead.id,
            createdAt: new Date().toISOString(),
            isRead: false,
            category: 'follow-up'
          })
        }
      })

      // Analyze deals for optimization opportunities
      deals.forEach(deal => {
        const daysUntilExpectedClose = Math.floor((new Date(deal.expectedClose).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        
        // Deal close to expected close date but still in negotiation
        if (deal.stage === 'negotiation' && daysUntilExpectedClose < 7 && daysUntilExpectedClose > 0) {
          newSuggestions.push({
            id: `deal-urgent-${deal.id}`,
            type: 'deal',
            priority: 'high',
            title: `Deal sắp đến hạn: ${deal.name}`,
            description: `Deal có giá trị ${deal.value} sẽ đến hạn trong ${daysUntilExpectedClose} ngày`,
            reason: 'Cần đẩy nhanh quá trình đàm phán để đạt target tháng',
            actionItems: [
              'Liên hệ trực tiếp decision maker',
              'Đưa ra ưu đãi có thời hạn',
              'Lên lịch cuộc họp đóng deal',
              'Chuẩn bị backup plan nếu không thành công'
            ],
            confidence: 88,
            relatedItemId: deal.id,
            createdAt: new Date().toISOString(),
            isRead: false,
            category: 'opportunity'
          })
        }

        // Deal with high probability but stuck
        if (deal.probability > 70 && deal.stage === 'proposal') {
          newSuggestions.push({
            id: `deal-high-prob-${deal.id}`,
            type: 'deal',
            priority: 'medium',
            title: `Deal khả năng cao cần đẩy: ${deal.name}`,
            description: `Deal có xác suất ${deal.probability}% nhưng vẫn ở giai đoạn proposal`,
            reason: 'Deal có khả năng thành công cao cần được ưu tiên để đóng nhanh',
            actionItems: [
              'Schedule follow-up call với khách hàng',
              'Xem xét điều chỉnh proposal',
              'Đưa ra timeline rõ ràng',
              'Tạo urgency với limited-time offer'
            ],
            confidence: 75,
            relatedItemId: deal.id,
            createdAt: new Date().toISOString(),
            isRead: false,
            category: 'optimization'
          })
        }
      })

      // General insights
      const totalLeadValue = leads.reduce((sum, lead) => sum + lead.value, 0)
      const averageLeadValue = totalLeadValue / leads.length
      const hotLeads = leads.filter(lead => lead.tags.includes('hot'))
      
      if (hotLeads.length > 0) {
        newSuggestions.push({
          id: 'general-hot-leads',
          type: 'general',
          priority: 'medium',
          title: `Có ${hotLeads.length} hot leads cần ưu tiên`,
          description: `Bạn có ${hotLeads.length} leads được đánh dấu "hot" với tổng giá trị ${(hotLeads.reduce((sum, lead) => sum + lead.value, 0) / 1000000).toFixed(0)}M VND`,
          reason: 'Hot leads có tỷ lệ chuyển đổi cao hơn 3x so với leads thường',
          actionItems: [
            'Ưu tiên liên hệ các hot leads trước',
            'Phân bổ sales expert để handle',
            'Tạo campaign riêng cho hot leads',
            'Monitor progress hàng ngày'
          ],
          confidence: 95,
          createdAt: new Date().toISOString(),
          isRead: false,
          category: 'insight'
        })
      }

      setSuggestions(newSuggestions.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }))
    }

    generateSuggestions()
  }, [leads, deals])

  const handleSuggestionAction = (suggestionId: string, action: string) => {
    // Mark suggestion as read
    setSuggestions(prev => prev.map(s => 
      s.id === suggestionId ? { ...s, isRead: true } : s
    ))
    
    // Call parent callback if provided
    if (onSuggestionAction) {
      onSuggestionAction(suggestionId, action)
    }
  }

  const handleSuggestionClick = (suggestion: AISuggestion) => {
    setSelectedSuggestion(suggestion)
    setShowDetailModal(true)
    
    // Mark as read when clicked
    setSuggestions(prev => prev.map(s => 
      s.id === suggestion.id ? { ...s, isRead: true } : s
    ))
  }

  const getRelatedData = (suggestion: AISuggestion) => {
    if (suggestion.relatedItemId) {
      if (suggestion.type === 'lead' || suggestion.type === 'follow-up' || suggestion.type === 'task') {
        return leads.find(lead => lead.id === suggestion.relatedItemId)
      } else if (suggestion.type === 'deal') {
        return deals.find(deal => deal.id === suggestion.relatedItemId)
      }
    }
    return null
  }

  const handleChatSend = async () => {
    if (!chatInput.trim() || isProcessing) return

    const userMessage = {
      id: Date.now().toString(),
      message: chatInput,
      isUser: true,
      timestamp: new Date().toISOString()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsProcessing(true)

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(chatInput),
        isUser: false,
        timestamp: new Date().toISOString()
      }
      setChatMessages(prev => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const responses = [
      `Dựa trên dữ liệu hiện tại, tôi thấy bạn có ${leads.filter(l => l.status === 'new').length} leads mới cần được liên hệ trong 24h tới. Bạn có muốn tôi ưu tiên theo giá trị hay theo thời gian tạo?`,
      `Tôi phân tích thấy ${deals.filter(d => d.probability > 70).length} deals có khả năng đóng cao. Bạn nên tập trung vào deals nào trước?`,
      `Về ${input.toLowerCase()}, tôi khuyên bạn nên xem xét các yếu tố: timing, budget của khách hàng, và mức độ cấp thiết của nhu cầu. Bạn có muốn tôi phân tích chi tiết hơn không?`,
      `Từ pattern data, tôi thấy leads từ ${leads[0]?.source || 'website'} có tỷ lệ chuyển đổi cao nhất. Bạn có muốn tối ưu hóa chiến lược marketing cho kênh này?`
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const unreadCount = suggestions.filter(s => !s.isRead).length

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isExpanded ? 'w-96 h-[600px]' : 'w-80 h-[400px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">AI Sales Assistant</h3>
                <p className="text-xs opacity-90">Gợi ý thông minh cho sales</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-white/20 rounded"
                title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/20 rounded"
                title="Ẩn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-4 mt-3">
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                activeTab === 'suggestions' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Gợi ý ({unreadCount})
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Chat AI
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'suggestions' ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {suggestions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Không có gợi ý mới</p>
                    <p className="text-xs text-gray-400 mt-1">AI đang phân tích dữ liệu...</p>
                  </div>
                ) : (
                  suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`border rounded-lg p-3 transition-all duration-200 hover:shadow-md cursor-pointer ${
                        suggestion.isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-200 shadow-sm'
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded ${
                            suggestion.priority === 'high' ? 'bg-red-100' :
                            suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            {suggestion.category === 'opportunity' ? <TrendingUp className="w-3 h-3 text-green-600" /> :
                             suggestion.category === 'risk' ? <AlertCircle className="w-3 h-3 text-red-600" /> :
                             suggestion.category === 'follow-up' ? <Clock className="w-3 h-3 text-blue-600" /> :
                             suggestion.category === 'optimization' ? <Target className="w-3 h-3 text-purple-600" /> :
                             <Lightbulb className="w-3 h-3 text-yellow-600" />}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            suggestion.priority === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : suggestion.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {suggestion.priority === 'high' ? 'Cao' : 
                             suggestion.priority === 'medium' ? 'Vừa' : 'Thấp'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{suggestion.confidence}%</span>
                      </div>
                      
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                      
                      {isExpanded && (
                        <>
                          <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1">Lý do:</p>
                            <p className="text-xs text-gray-700">{suggestion.reason}</p>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-1">Hành động gợi ý:</p>
                            <ul className="space-y-1">
                              {suggestion.actionItems.slice(0, 2).map((item, index) => (
                                <li key={index} className="text-xs text-gray-700 flex items-start">
                                  <span className="text-blue-500 mr-1">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSuggestionAction(suggestion.id, 'accept')
                            }}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                          >
                            Thực hiện
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSuggestionAction(suggestion.id, 'dismiss')
                            }}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            Bỏ qua
                          </button>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSuggestionAction(suggestion.id, 'like')
                            }}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Hữu ích"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSuggestionAction(suggestion.id, 'dislike')
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Không hữu ích"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Chat Tab */
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Hỏi AI về sales</p>
                    <p className="text-xs text-gray-400 mt-1">Ví dụ: &quot;Lead nào tôi nên ưu tiên?&quot;</p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          msg.isUser
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Hỏi AI về sales..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={!chatInput.trim() || isProcessing}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedSuggestion.priority === 'high' ? 'bg-red-100' :
                  selectedSuggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  {selectedSuggestion.category === 'opportunity' ? <TrendingUp className="w-5 h-5 text-green-600" /> :
                   selectedSuggestion.category === 'risk' ? <AlertCircle className="w-5 h-5 text-red-600" /> :
                   selectedSuggestion.category === 'follow-up' ? <Clock className="w-5 h-5 text-blue-600" /> :
                   selectedSuggestion.category === 'optimization' ? <Target className="w-5 h-5 text-purple-600" /> :
                   <Lightbulb className="w-5 h-5 text-yellow-600" />}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedSuggestion.title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedSuggestion.priority === 'high' 
                        ? 'bg-red-100 text-red-700' 
                        : selectedSuggestion.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      Độ ưu tiên: {selectedSuggestion.priority === 'high' ? 'Cao' : 
                                   selectedSuggestion.priority === 'medium' ? 'Vừa' : 'Thấp'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Độ tin cậy: {selectedSuggestion.confidence}%
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Mô tả</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedSuggestion.description}
                </p>
              </div>

              {/* Reason */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Lý do</h3>
                <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  {selectedSuggestion.reason}
                </p>
              </div>

              {/* Action Items */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Hành động được gợi ý</h3>
                <ul className="space-y-2">
                  {selectedSuggestion.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-medium">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Data */}
              {selectedSuggestion.relatedItemId && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Dữ liệu liên quan</h3>
                  {(() => {
                    const relatedData = getRelatedData(selectedSuggestion)
                    if (!relatedData) return <p className="text-sm text-gray-500">Không có dữ liệu liên quan</p>
                    
                    if ('email' in relatedData) {
                      // Lead data
                      const lead = relatedData as Lead
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Lead: {lead.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                              lead.status === 'qualified' ? 'bg-blue-100 text-blue-700' :
                              lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                              lead.status === 'negotiation' ? 'bg-orange-100 text-orange-700' :
                              lead.status === 'proposal' ? 'bg-purple-100 text-purple-700' :
                              lead.status === 'lost' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {lead.status === 'converted' ? 'Đã chuyển đổi' :
                               lead.status === 'qualified' ? 'Đã xác định' :
                               lead.status === 'contacted' ? 'Đã liên hệ' :
                               lead.status === 'negotiation' ? 'Đàm phán' :
                               lead.status === 'proposal' ? 'Báo giá' :
                               lead.status === 'lost' ? 'Thất bại' : 'Mới'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Email:</span>
                              <p className="font-medium">{lead.email}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Điện thoại:</span>
                              <p className="font-medium">{lead.phone}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Công ty:</span>
                              <p className="font-medium">{lead.company || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Giá trị:</span>
                              <p className="font-medium text-green-600">
                                {(lead.value / 1000000).toFixed(0)}M VND
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Nguồn:</span>
                              <p className="font-medium">{lead.source}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Phụ trách:</span>
                              <p className="font-medium">{lead.assignedTo}</p>
                            </div>
                          </div>
                          {lead.notes && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <span className="text-gray-500 text-sm">Ghi chú:</span>
                              <p className="text-sm text-gray-700 mt-1">{lead.notes}</p>
                            </div>
                          )}
                        </div>
                      )
                    } else {
                      // Deal data
                      const deal = relatedData as Deal
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Deal: {deal.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              deal.stage === 'negotiation' ? 'bg-orange-100 text-orange-700' :
                              deal.stage === 'proposal' ? 'bg-blue-100 text-blue-700' :
                              deal.stage === 'qualified' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {deal.stage === 'negotiation' ? 'Đàm phán' :
                               deal.stage === 'proposal' ? 'Đề xuất' :
                               deal.stage === 'qualified' ? 'Đã xác định' : deal.stage}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Khách hàng:</span>
                              <p className="font-medium">{deal.customer}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Liên hệ:</span>
                              <p className="font-medium">{deal.contact}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Giá trị:</span>
                              <p className="font-medium text-green-600">{deal.value}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Xác suất:</span>
                              <p className="font-medium">{deal.probability}%</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Dự kiến đóng:</span>
                              <p className="font-medium">{new Date(deal.expectedClose).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Phụ trách:</span>
                              <p className="font-medium">{deal.owner}</p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })()}
                </div>
              )}

              {/* Metadata */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Thông tin bổ sung</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Loại gợi ý:</span>
                    <p className="font-medium capitalize">{selectedSuggestion.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Danh mục:</span>
                    <p className="font-medium capitalize">{selectedSuggestion.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Thời gian tạo:</span>
                    <p className="font-medium">
                      {new Date(selectedSuggestion.createdAt).toLocaleDateString('vi-VN')} {' '}
                      {new Date(selectedSuggestion.createdAt).toLocaleTimeString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Trạng thái:</span>
                    <p className="font-medium">
                      {selectedSuggestion.isRead ? 'Đã đọc' : 'Chưa đọc'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    handleSuggestionAction(selectedSuggestion.id, 'like')
                    setShowDetailModal(false)
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Hữu ích</span>
                </button>
                <button
                  onClick={() => {
                    handleSuggestionAction(selectedSuggestion.id, 'dislike')
                    setShowDetailModal(false)
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Không hữu ích</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    handleSuggestionAction(selectedSuggestion.id, 'accept')
                    setShowDetailModal(false)
                  }}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Thực hiện
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
