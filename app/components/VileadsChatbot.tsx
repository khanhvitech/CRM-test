'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Bot,
  Send,
  X,
  Minimize2,
  Maximize2,
  User,
  FileText,
  Package,
  Zap,
  MessageSquare,
  Clock,
  CheckCircle,
  Copy,
  Download,
  Sparkles,
  Brain,
  Settings,
  HelpCircle,
  Search,
  Plus,
  ArrowRight,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'contract' | 'product' | 'suggestion'
  data?: any
}

interface QuickAction {
  id: string
  label: string
  icon: any
  description: string
  category: 'contract' | 'product' | 'ai' | 'support'
  color: string
}

const quickActions: QuickAction[] = [
  {
    id: 'create-contract',
    label: 'Tạo hợp đồng nhanh',
    icon: FileText,
    description: 'Tạo hợp đồng từ template với AI',
    category: 'contract',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
  },
  {
    id: 'product-info',
    label: 'Thông tin sản phẩm',
    icon: Package,
    description: 'Hỏi về tính năng, giá cả sản phẩm',
    category: 'product',
    color: 'bg-green-100 text-green-700 hover:bg-green-200'
  },
  {
    id: 'ai-analysis',
    label: 'Phân tích AI',
    icon: Brain,
    description: 'Phân tích dữ liệu và đưa ra insights',
    category: 'ai',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
  },
  {
    id: 'quick-support',
    label: 'Hỗ trợ nhanh',
    icon: Zap,
    description: 'Giải đáp thắc mắc, hướng dẫn sử dụng',
    category: 'support',
    color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
  }
]

const sampleContracts = [
  { id: 1, name: 'Hợp đồng Bán hàng B2B', type: 'Bán hàng', duration: '12 tháng' },
  { id: 2, name: 'Hợp đồng Dịch vụ CRM', type: 'Dịch vụ', duration: '6 tháng' },
  { id: 3, name: 'Hợp đồng Thuê bao Software', type: 'Subscription', duration: 'Hàng năm' }
]

const sampleProducts = [
  { 
    id: 1, 
    name: 'CRM Pro', 
    price: '2,500,000 VND/tháng', 
    features: ['Quản lý Lead', 'Tự động hóa Sales', 'Báo cáo AI', 'Tích hợp Zalo/FB'] 
  },
  { 
    id: 2, 
    name: 'CRM Enterprise', 
    price: '5,000,000 VND/tháng', 
    features: ['Tất cả tính năng Pro', 'Custom workflow', 'API không giới hạn', 'Support 24/7'] 
  },
  { 
    id: 3, 
    name: 'CRM Starter', 
    price: '500,000 VND/tháng', 
    features: ['Quản lý cơ bản', '1000 leads/tháng', 'Báo cáo cơ bản', 'Email support'] 
  }
]

export default function VileadsChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Xin chào! Tôi là Trợ lý Vileads. Tôi có thể giúp bạn tạo hợp đồng nhanh, tìm hiểu sản phẩm, phân tích dữ liệu và nhiều tính năng AI khác. Bạn cần hỗ trợ gì hôm nay?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (content: string, sender: 'user' | 'bot', type: 'text' | 'contract' | 'product' | 'suggestion' = 'text', data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type,
      data
    }
    setMessages(prev => [...prev, newMessage])
  }

  const simulateTyping = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    addMessage(inputValue, 'user')
    setInputValue('')
    setShowQuickActions(false)
    
    simulateTyping()
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(inputValue)
      addMessage(response.content, 'bot', response.type, response.data)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): { content: string, type: 'text' | 'contract' | 'product' | 'suggestion', data?: any } => {
    const input = userInput.toLowerCase()
    
    if (input.includes('hợp đồng') || input.includes('contract')) {
      return {
        content: '📋 Tôi có thể giúp bạn tạo hợp đồng nhanh. Dưới đây là các template có sẵn:',
        type: 'contract',
        data: sampleContracts
      }
    }
    
    if (input.includes('sản phẩm') || input.includes('giá') || input.includes('tính năng')) {
      return {
        content: '📦 Đây là thông tin các sản phẩm CRM của chúng tôi:',
        type: 'product',
        data: sampleProducts
      }
    }
    
    if (input.includes('phân tích') || input.includes('ai') || input.includes('dữ liệu')) {
      return {
        content: '🧠 Tôi có thể giúp phân tích dữ liệu của bạn. Một số insights từ hệ thống:\n\n• Doanh thu tháng này tăng 15.3%\n• Tỷ lệ chuyển đổi lead tăng 8.7%\n• Facebook Ads có ROI cao nhất (3.2x)\n• Cần tối ưu thời gian phản hồi lead (hiện tại 2.5h)',
        type: 'suggestion'
      }
    }
    
    if (input.includes('lead') || input.includes('khách hàng')) {
      return {
        content: '👥 Về quản lý leads:\n\n• Hiện có 254 leads mới tháng này\n• 73.2% đã được liên hệ\n• Top nguồn: Facebook (24.5%), Google (18.2%), Zalo (15.3%)\n• Giai đoạn cần chú ý: "Báo giá" (conversion rate thấp)',
        type: 'suggestion'
      }
    }
    
    if (input.includes('báo cáo') || input.includes('report')) {
      return {
        content: '📊 Tôi có thể tạo báo cáo tự động cho bạn:\n\n• Báo cáo doanh số hàng ngày\n• Phân tích hiệu quả marketing\n• Báo cáo chuyển đổi lead\n• Dự báo doanh thu\n\nBạn muốn báo cáo nào?',
        type: 'suggestion'
      }
    }
    
    // Default response with suggestions
    return {
      content: '🤖 Tôi hiểu bạn đang cần hỗ trợ. Tôi có thể giúp bạn:\n\n• Tạo hợp đồng từ template\n• Tìm hiểu sản phẩm và giá cả\n• Phân tích dữ liệu kinh doanh\n• Tạo báo cáo tự động\n• Hướng dẫn sử dụng tính năng\n\nHãy nói cụ thể hơn về điều bạn cần nhé!',
      type: 'suggestion'
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    setShowQuickActions(false)
    addMessage(`Tôi muốn ${action.label.toLowerCase()}`, 'user')
    
    simulateTyping()
    
    setTimeout(() => {
      const response = generateAIResponse(action.label)
      addMessage(response.content, 'bot', response.type, response.data)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  const renderMessage = (message: Message) => {
    const isBot = message.sender === 'bot'
    
    return (
      <div key={message.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-blue-500 mr-3' : 'bg-gray-500 ml-3'}`}>
            {isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
          </div>
          
          <div className={`rounded-lg px-4 py-3 ${isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'}`}>
            <div className="whitespace-pre-wrap">{message.content}</div>
            
            {/* Render special content based on message type */}
            {message.type === 'contract' && message.data && (
              <div className="mt-3 space-y-2">
                {message.data.map((contract: any) => (
                  <Card key={contract.id} className="cursor-pointer hover:bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{contract.name}</p>
                          <p className="text-xs text-gray-500">{contract.type} • {contract.duration}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          Tạo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {message.type === 'product' && message.data && (
              <div className="mt-3 space-y-3">
                {message.data.map((product: any) => (
                  <Card key={product.id} className="cursor-pointer hover:bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-blue-600 font-semibold text-sm">{product.price}</p>
                          <div className="mt-2 space-y-1">
                            {product.features.slice(0, 2).map((feature: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs mr-1">
                                {feature}
                              </Badge>
                            ))}
                            {product.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.features.length - 2} tính năng
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Package className="w-3 h-3 mr-1" />
                          Chi tiết
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              {isBot && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                  onClick={() => copyToClipboard(message.content)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Bot className="w-6 h-6" />
        </Button>
        <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          Trợ lý Vileads
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl border transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Trợ lý Vileads</h3>
            <p className="text-xs opacity-80">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white hover:bg-opacity-20 h-8 w-8 p-0"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white hover:bg-opacity-20 h-8 w-8 p-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-[440px]">
            {showQuickActions && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">🚀 Hành động nhanh:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      className={`${action.color} border-0 h-auto p-3 flex flex-col items-start text-left`}
                      onClick={() => handleQuickAction(action)}
                    >
                      <action.icon className="w-4 h-4 mb-1" />
                      <span className="font-medium text-xs">{action.label}</span>
                      <span className="text-xs opacity-80">{action.description}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map(renderMessage)}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {!showQuickActions && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                onClick={() => setShowQuickActions(true)}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Hiện hành động nhanh
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
