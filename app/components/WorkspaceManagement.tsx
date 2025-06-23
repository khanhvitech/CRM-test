'use client'

import { useState, useEffect } from 'react'
import { 
  Brain,
  Search,
  MessageCircle,
  Zap,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  FileText,
  DollarSign,
  Plus,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Star,
  Filter,
  SortDesc,
  MoreHorizontal,
  ChevronRight,
  PlayCircle,
  PauseCircle,
  X,
  Maximize2,
  Minimize2,
  Settings,
  Briefcase,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Rocket,
  Crown,
  Gift,
  MapPin,
  Headphones,
  Video,
  Coffee,
  Smartphone,
  Monitor,
  Globe,
  Layers,
  Database,
  CloudRain,
  Sun,
  Moon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Interfaces
interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: string
  isTyping?: boolean
  actions?: Array<{
    label: string
    action: string
    data?: any
  }>
}

interface AITask {
  id: string
  title: string
  description: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  estimatedTime: number
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  aiScore: number
}

interface NextBestAction {
  id: string
  title: string
  description: string
  priority: 'urgent' | 'high' | 'medium'
  action: string
  time: string
  aiScore: number
  icon: any
  color: string
}

export default function WorkspaceManagement() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [aiChatOpen, setAiChatOpen] = useState(true) // Chat AI luôn hiển thị
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Chào bạn! Tôi là AI Assistant của ViLead. Hôm nay bạn muốn tôi giúp gì?',
      timestamp: new Date().toISOString()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [voiceRecording, setVoiceRecording] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Sample data
  const kpiMetrics = [
    {
      title: 'Leads mới',
      value: '24',
      change: '+12% hôm qua',
      trend: 'up' as const,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      progress: 78
    },
    {
      title: 'Conversion Rate',
      value: '32%',
      change: '+5% tuần này',
      trend: 'up' as const,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      progress: 65
    },
    {
      title: 'Revenue',
      value: '₫125M',
      change: '+8% tháng này',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      progress: 82
    },
    {
      title: 'Tasks hoàn thành',
      value: '18/23',
      change: '5 còn lại',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      progress: 78
    }
  ]

  const nextBestActions: NextBestAction[] = [
    {
      id: '1',
      title: 'Gọi điện cho Nguyễn Văn A',
      description: 'Lead từ Facebook Ads, quan tâm gói Premium. Đã miss call 2 lần.',
      priority: 'urgent',
      action: 'Gọi ngay',
      time: '15 phút',
      aiScore: 95,
      icon: Phone,
      color: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      id: '2',
      title: 'Follow-up email cho ABC Corp',
      description: 'Proposal đã gửi 3 ngày. Cần reminder về meeting.',
      priority: 'high',
      action: 'Gửi email',
      time: '30 phút',
      aiScore: 87,
      icon: Mail,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      id: '3',
      title: 'Cập nhật CRM cho khách hàng XYZ',
      description: 'Meeting notes và next steps cần được ghi lại.',
      priority: 'medium',
      action: 'Cập nhật',
      time: '45 phút',
      aiScore: 72,
      icon: FileText,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    }
  ]

  const sampleAITasks: AITask[] = [
    {
      id: '1',
      title: 'Phân tích lead chất lượng cao',
      description: 'Review 15 leads mới từ LinkedIn campaign',
      priority: 'high',
      estimatedTime: 30,
      dueDate: 'Hôm nay',
      status: 'pending',
      aiScore: 92
    },
    {
      id: '2',
      title: 'Chuẩn bị presentation cho client',
      description: 'Demo sản phẩm cho TechCorp vào 14:00',
      priority: 'urgent',
      estimatedTime: 45,
      dueDate: 'Hôm nay',
      status: 'in-progress',
      aiScore: 88
    }
  ]

  const upcomingSchedule = [
    {
      id: '1',
      time: '09:30',
      title: 'Meeting với ABC Corp',
      client: 'Nguyễn Văn B',
      status: 'Sắp diễn ra',
      importance: 'high'
    },
    {
      id: '2',
      time: '11:00',
      title: 'Demo sản phẩm',
      client: 'TechStartup Ltd',
      status: 'Confirmed',
      importance: 'medium'
    },
    {
      id: '3',
      time: '14:30',
      title: 'Follow-up call',
      client: 'Enterprise Solutions',
      status: 'Pending',
      importance: 'high'
    }
  ]

  const aiInsights = [
    {
      id: '1',
      title: 'Lead Quality Spike',
      description: 'LinkedIn campaign có conversion rate tăng 40%',
      priority: 'urgent',
      confidence: 95,
      impact: 'Tăng ROI ước tính 25%',
      action: 'Tăng budget',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: '2',
      title: 'Client Risk Alert',
      description: 'ABC Corp chưa response email 5 ngày',
      priority: 'high',
      confidence: 87,
      impact: 'Risk mất deal 50M VND',
      action: 'Liên hệ ngay',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: '3',
      title: 'Upsell Opportunity',
      description: 'XYZ Company sử dụng 95% quota',
      priority: 'medium',
      confidence: 78,
      impact: 'Potential revenue +30%',
      action: 'Đề xuất upgrade',
      icon: ArrowUpRight,
      color: 'text-blue-600'
    }
  ]

  const recentActivities = [
    {
      id: '1',
      type: 'lead',
      title: 'Lead mới từ website',
      description: 'Công ty DEF quan tâm gói Enterprise',
      time: '5 phút trước',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'deal',
      title: 'Deal được cập nhật',
      description: 'ABC Corp - Moved to negotiation',
      time: '1 giờ trước',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'call',
      title: 'Cuộc gọi hoàn thành',
      description: 'Follow-up với khách hàng GHI',
      time: '2 giờ trước',
      icon: Phone,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'email',
      title: 'Email proposal gửi',
      description: 'Báo giá cho JKL Company',
      time: '3 giờ trước',
      icon: Mail,
      color: 'text-orange-600'
    }
  ]
  const aiSuggestions = [
    {
      id: '1',
      type: 'automation',
      title: 'Tự động hoá follow-up',
      description: 'Thiết lập email sequence cho leads mới',
      potential: 'Tăng 40% hiệu suất',
      action: 'Thiết lập ngay',
      icon: Zap
    },
    {
      id: '2',
      type: 'optimization',
      title: 'Tối ưu call script',
      description: 'AI phân tích và đề xuất script hiệu quả hơn',
      potential: 'Tăng 25% tỷ lệ chuyển đổi',
      action: 'Xem đề xuất',
      icon: Brain
    },
    {
      id: '3',
      type: 'insight',
      title: 'Phân tích hành vi khách hàng',
      description: 'Tìm pattern từ data khách hàng VIP',
      potential: 'Tăng 30% customer satisfaction',
      action: 'Xem báo cáo',
      icon: Eye
    }
  ]

  // AI Daily Work Suggestions
  const aiDailySuggestions = [
    {
      id: '1',
      title: 'Tối ưu hóa thời gian gọi điện',
      description: 'AI phân tích cho thấy 9:30-11:00 AM là thời gian khách hàng response tốt nhất',
      impact: 'Tăng 35% tỷ lệ kết nối',
      priority: 'high',
      actionType: 'schedule',
      icon: Clock,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      confidence: 92
    },
    {
      id: '2',
      title: 'Focus vào leads chất lượng cao',
      description: 'AI đã xác định 8 leads có potential >85% từ LinkedIn campaign',
      impact: 'Ước tính 3-4 deals mới',
      priority: 'urgent',
      actionType: 'leads',
      icon: Target,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      confidence: 96
    },
    {
      id: '3',
      title: 'Cập nhật CRM cho 5 clients quan trọng',
      description: 'Các clients này chưa có update >7 ngày, cần follow-up để maintain relationship',
      impact: 'Tránh risk mất 2-3 deals',
      priority: 'medium',
      actionType: 'update',
      icon: Users,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      confidence: 87
    },
    {
      id: '4',
      title: 'Chuẩn bị materials cho meeting',
      description: 'AI đề xuất customize presentation dựa trên profile và pain points của client',
      impact: 'Tăng 40% khả năng close deal',
      priority: 'high',
      actionType: 'preparation',
      icon: FileText,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      confidence: 89
    }
  ]

  // Handle quick message send
  const handleQuickSend = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }

    setChatMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(message),
        timestamp: new Date().toISOString()
      }
      setChatMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  // Handle chat
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    }

    setChatMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(newMessage),
        timestamp: new Date().toISOString()
      }
      setChatMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message: string) => {
    const responses = [
      "Tôi hiểu rồi! Để tôi giúp bạn phân tích thông tin này.",
      "Dựa trên data hiện tại, tôi có một số đề xuất cho bạn...",
      "Tôi đã tìm được thông tin bạn cần. Hãy để tôi tổng hợp...",
      "Đây là insight từ AI: Based on pattern analysis...",
      "Tôi khuyên bạn nên focus vào những lead có potential cao nhất."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Quick search
  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search logic
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Top Bar - AI Assistant & Context */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Workspace</h1>
                <p className="text-sm text-gray-500">Trung tâm điều khiển thông minh</p>
              </div>
            </div>
            
            {/* Contextual Overview */}
            <div className="flex items-center space-x-6 ml-8">
              <div className="text-sm">
                <span className="text-gray-500">Hôm nay:</span>
                <span className="ml-1 font-medium text-gray-900">{currentTime.toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Trạng thái:</span>
                <span className="ml-1 font-medium text-green-600">Hoạt động tốt</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">AI Score:</span>
                <span className="ml-1 font-medium text-blue-600">87/100</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Smart Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm thông minh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {/* AI Chat Toggle */}
            <Button
              variant={aiChatOpen ? "default" : "outline"}
              size="sm"
              onClick={() => setAiChatOpen(!aiChatOpen)}
              className="relative"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Chat
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-40px)]">
        {/* Left Panel - Menu & Quick Actions */}
        <div className="w-[420px] bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                Hành động nhanh
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Lead mới */}
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-105">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Lead mới</div>
                        <div className="text-xs text-gray-500">Thêm khách hàng tiềm năng</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gọi điện */}
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-105">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Gọi điện</div>
                        <div className="text-xs text-gray-500">Liên hệ khách hàng</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 border border-purple-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-105">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Email</div>
                        <div className="text-xs text-gray-500">Gửi tin nhắn</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lịch hẹn */}
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-orange-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-105">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Lịch hẹn</div>
                        <div className="text-xs text-gray-500">Đặt cuộc họp</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thêm Quick Actions khác */}
              <div className="mt-4 space-y-3">
              </div>
            </div>

            {/* Quick Stats Dashboard */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                Thống kê nhanh
                <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-300">
                  Cập nhật
                </Badge>
              </h3>
              
              {/* Main Stats - Redesigned as Action Blocks */}
              <div className="space-y-4 mb-6">
                {/* Leads cần chăm sóc */}
                <div className="bg-white border border-red-200 hover:border-red-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-red-700">23</h4>
                        <Badge className="bg-red-100 text-red-700 border-red-300 text-xs">
                          Cần chăm sóc
                        </Badge>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">Leads hot chưa liên hệ</p>
                      <div className="flex items-center text-xs text-red-600">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        <span>+15% từ tuần trước</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Khách hàng cần follow-up */}
                <div className="bg-white border border-orange-200 hover:border-orange-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-orange-700">12</h4>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                          Follow-up
                        </Badge>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">Khách hàng cần liên hệ lại</p>
                      <div className="flex items-center text-xs text-orange-600">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>3 khách quá hạn</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Liên hệ ngay
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tỷ lệ chuyển đổi */}
                <div className="bg-white border border-green-200 hover:border-green-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-green-700">18.5%</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                          Conversion
                        </Badge>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">Tỷ lệ chuyển đổi tháng này</p>
                      <div className="flex items-center text-xs text-green-600">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        <span>+2.3% so với tháng trước</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                        Phân tích
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Doanh thu dự kiến */}
                <div className="bg-white border border-blue-200 hover:border-blue-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-blue-700">2.4M</h4>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs">
                          Revenue
                        </Badge>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">Doanh thu dự kiến tháng này</p>
                      <div className="flex items-center text-xs text-blue-600">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        <span>85% hoàn thành mục tiêu</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                        Xem báo cáo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Insights */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
                    <h5 className="text-sm font-semibold text-purple-900">Insight thông minh</h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Leads từ Facebook Ads có tỷ lệ chuyển đổi cao nhất (24.3%). 
                    Nên tăng ngân sách cho kênh này.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Activity className="w-5 h-5 text-cyan-600 mr-2" />
                    <h5 className="text-sm font-semibold text-cyan-900">Hiệu suất team</h5>
                  </div>
                  <p className="text-sm text-cyan-700">
                    Team đang hoạt động tốt với 92% leads được liên hệ trong 24h. 
                    Duy trì nhịp độ này.
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                Lịch hôm nay
              </h3>
              <div className="space-y-2">
                {upcomingSchedule.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="text-sm font-medium text-gray-900 w-14">{item.time}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.client}</div>
                    </div>
                    <Badge variant={item.importance === 'high' ? 'default' : 'secondary'} className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Central Panel - KPI Metrics, Tasks, Calendar */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">            {/* KPI Metrics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Chỉ số hiệu suất</h2>
              <div className="grid grid-cols-4 gap-3">
                {kpiMetrics.map((metric, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{metric.title}</div>
                          <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                          <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Tiến độ</span>
                          <span>{metric.progress}%</span>
                        </div>
                        <Progress value={metric.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Work Suggestions Based on Statistics */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                  Gợi ý công việc dựa trên thống kê
                </h2>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  <Bot className="w-3 h-3 mr-1" />
                  Data Driven
                </Badge>
              </div>
              
              {/* Primary Suggestions Based on Stats */}
              <div className="space-y-3 mb-6">
                {/* Urgent: Handle Hot Leads */}
                <div className="bg-white border border-red-200 hover:border-red-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex justify-center mt-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-bold text-gray-900">Ưu tiên gọi 23 leads hot</h3>
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          🔥 KHẨN CẤP
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Dựa trên thống kê: 23 leads hot chưa liên hệ (+15% từ tuần trước). 
                        Bắt đầu với 5 leads có điểm số cao nhất.
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center space-x-1 bg-red-100 rounded-full px-2 py-1">
                          <Target className="w-3 h-3 text-red-600" />
                          <span className="text-xs text-red-700 font-bold">23 leads</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                          <Brain className="w-3 h-3 text-purple-600" />
                          <span className="text-xs text-purple-700 font-bold">98% tin cậy</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-green-100 rounded-full px-2 py-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-700 font-bold">Impact cao</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Thời gian dự kiến: <span className="font-medium">2-3 giờ</span>
                        </div>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          Bắt đầu gọi
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High Priority: Follow-up Overdue Customers */}
                <div className="bg-white border border-orange-200 hover:border-orange-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex justify-center mt-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-bold text-gray-900">Follow-up 3 khách hàng quá hạn</h3>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                          ⚡ ƯU TIÊN CAO
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Trong 12 khách hàng cần follow-up, có 3 khách đã quá hạn liên hệ. 
                        Gửi email cá nhân hóa để duy trì mối quan hệ.
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center space-x-1 bg-orange-100 rounded-full px-2 py-1">
                          <Clock className="w-3 h-3 text-orange-600" />
                          <span className="text-xs text-orange-700 font-bold">3 quá hạn</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                          <Brain className="w-3 h-3 text-purple-600" />
                          <span className="text-xs text-purple-700 font-bold">92% tin cậy</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-blue-100 rounded-full px-2 py-1">
                          <Users className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-blue-700 font-bold">Giữ chân KH</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Thời gian dự kiến: <span className="font-medium">1 giờ</span>
                        </div>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          Soạn email
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Important Tasks */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Công việc quan trọng khác
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* Revenue Analysis */}
                  <div className="bg-white border border-blue-200 hover:border-blue-300 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Phân tích xu hướng conversion</h4>
                        <p className="text-xs text-gray-600 mb-2">
                          Conversion rate tăng 2.3% - tìm hiểu yếu tố thành công để nhân rộng
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600 font-medium">Conversion: 18.5%</span>
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            Phân tích
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Coordination */}
                  <div className="bg-white border border-purple-200 hover:border-purple-300 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Họp team review tuần</h4>
                        <p className="text-xs text-gray-600 mb-2">
                          Chia sẻ best practices để duy trì performance cao của team
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-600 font-medium">10:00 AM</span>
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            Lên lịch
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CRM Update */}
                  <div className="bg-white border border-green-200 hover:border-green-300 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Cập nhật data CRM</h4>
                        <p className="text-xs text-gray-600 mb-2">
                          Đồng bộ thông tin khách hàng và leads mới để có dữ liệu chính xác
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600 font-medium">Hàng tuần</span>
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            Cập nhật
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Training */}
                  <div className="bg-white border border-yellow-200 hover:border-yellow-300 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Học kỹ năng sales mới</h4>
                        <p className="text-xs text-gray-600 mb-2">
                          Cải thiện kỹ năng closing để tăng conversion rate lên 20%
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-600 font-medium">30 phút/ngày</span>
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            Bắt đầu
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Insight */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">💡 Insight thông minh</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Dựa trên dữ liệu hiện tại, nếu hoàn thành các công việc ưu tiên trên, 
                      bạn có thể tăng conversion rate lên <span className="font-bold text-blue-600">22%</span> 
                      và đạt <span className="font-bold text-green-600">3.2M doanh thu</span> trong tháng này.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                        Dự đoán AI
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                        95% độ tin cậy
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        {aiChatOpen && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Bot className="w-4 h-4 mr-2 text-blue-500" />
                  AI Assistant
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 font-medium">Online</span>
                  <Button variant="ghost" size="sm" onClick={() => setAiChatOpen(false)} className="ml-2 h-6 w-6 p-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <ScrollArea className="h-[768px] px-4 py-3">
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2.5 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-sm' 
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}>
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-2.5 rounded-lg rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 h-9 text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={() => setVoiceRecording(!voiceRecording)}
                  variant={voiceRecording ? "default" : "outline"}
                  className="h-9 w-9 p-0"
                >
                  {voiceRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim()}
                  className="h-9 w-9 p-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
              
              {/* AI Quick Actions & Suggestions */}
              <div className="mt-3 space-y-3">
                {/* Quick AI Actions */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Zap className="w-3 h-3 mr-1 text-blue-500" />
                    Hành động nhanh
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Phân tích leads hôm nay")}
                      className="text-xs h-7 px-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Target className="w-3 h-3 mr-1" />
                      Phân tích leads
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Gợi ý kế hoạch bán hàng")}
                      className="text-xs h-7 px-2 border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Kế hoạch bán hàng
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Tóm tắt hiệu suất tuần này")}
                      className="text-xs h-7 px-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Tóm tắt hiệu suất
                    </Button>
                  </div>
                </div>

                {/* Smart Suggestions */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                    Gợi ý thông minh
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Viết email follow-up cho client ABC Corp")}
                      className="text-xs h-7 px-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Viết email follow-up
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Tạo script call cho lead mới")}
                      className="text-xs h-7 px-2 border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Tạo script call
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Đề xuất chiến lược tăng conversion rate")}
                      className="text-xs h-7 px-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Tăng conversion
                    </Button>
                  </div>
                </div>

                {/* Quick Questions */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1 text-gray-500" />
                    Câu hỏi thường gặp
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Làm thế nào để tăng chất lượng leads?")}
                      className="text-xs h-7 px-2 border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      💡 Tăng chất lượng leads?
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Best practices cho việc nurture leads")}
                      className="text-xs h-7 px-2 border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      🎯 Best practices nurture?
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleQuickSend("Cách theo dõi ROI marketing hiệu quả")}
                      className="text-xs h-7 px-2 border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      📊 Theo dõi ROI?
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel - Suggestions */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
              Đề xuất AI
            </h3>
            <div className="flex space-x-2">
              {aiSuggestions.slice(0, 2).map((suggestion) => (
                <div key={suggestion.id} className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
                  <suggestion.icon className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-700">{suggestion.title}</span>
                  <Button size="sm" variant="link" className="text-xs p-0 h-auto">
                    {suggestion.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  )
}
