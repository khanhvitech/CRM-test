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
  const [aiChatOpen, setAiChatOpen] = useState(false)
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Menu & Quick Actions - Tăng kích thước */}
        <div className="w-[420px] bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
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
                {/* AI Assistant nhanh */}
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-lg p-3 transition-all duration-200 hover:shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">AI Gợi ý</div>
                        <div className="text-xs text-gray-500">Nhận tư vấn thông minh</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Tìm kiếm nhanh */}
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 border border-gray-200 rounded-lg p-3 transition-all duration-200 hover:shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full flex items-center justify-center">
                        <Search className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Tìm kiếm</div>
                        <div className="text-xs text-gray-500">Khách hàng, deal, task...</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Best Actions - Layout cải thiện */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                Hành động tiếp theo
                <Badge variant="outline" className="ml-2 text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                  AI Powered
                </Badge>
              </h3>
              
              <div className="space-y-4">
                {nextBestActions.map((action, index) => (
                  <div key={action.id} className="group cursor-pointer">
                    <div className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden">
                      <div className="flex flex-col space-y-3">
                        {/* Header với icon và title */}
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                            <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                              <action.icon className="w-5 h-5 text-white" />
                            </div>
                            {/* Priority badge */}
                            {action.priority === 'urgent' && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            {action.priority === 'high' && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                              <h4 className="text-sm font-bold text-gray-900">{action.title}</h4>
                              {index === 0 && (
                                <Badge variant="destructive" className="text-xs px-2 py-1 animate-pulse">
                                  🔥 HOT
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{action.description}</p>
                          </div>
                        </div>
                        
                        {/* Action details và badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 font-medium">{action.time}</span>
                          </div>
                          <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                            <Brain className="w-3 h-3 text-purple-600" />
                            <span className="text-xs text-purple-700 font-bold">{action.aiScore}%</span>
                          </div>
                          <Badge 
                            variant={action.priority === 'urgent' ? 'destructive' : 
                                    action.priority === 'high' ? 'default' : 'secondary'} 
                            className="text-xs font-medium"
                          >
                            {action.priority === 'urgent' ? '🚨 Khẩn cấp' : 
                             action.priority === 'high' ? '⚡ Ưu tiên cao' : '📝 Bình thường'}
                          </Badge>
                        </div>
                        
                        {/* Progress bar và action button */}
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span className="font-medium">AI Confidence</span>
                              <span className="font-bold">{action.aiScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  action.aiScore >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                  action.aiScore >= 80 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                  'bg-gradient-to-r from-gray-400 to-gray-500'
                                }`}
                                style={{ width: `${action.aiScore}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm"
                              className={`${action.priority === 'urgent' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : 
                                         action.priority === 'high' ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' : 
                                         'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold px-4 py-2`}
                            >
                              {action.action}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                            
                            {/* Quick actions */}
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Button size="sm" variant="outline" className="w-7 h-7 p-0 hover:bg-gray-100 border-gray-300">
                                <MoreHorizontal className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="w-7 h-7 p-0 hover:bg-yellow-100 border-yellow-300">
                                <Star className="w-3 h-3 text-yellow-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show more actions */}
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
                  <Plus className="w-3 h-3 mr-1" />
                  Xem thêm hành động AI
                </Button>
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
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">            {/* KPI Metrics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Chỉ số hiệu suất</h2>
              <div className="grid grid-cols-4 gap-4">
                {kpiMetrics.map((metric, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-4">
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

            {/* AI Daily Work Suggestions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                  AI Gợi ý công việc hôm nay
                </h2>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  <Bot className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {aiDailySuggestions.map((suggestion, index) => (
                  <Card key={suggestion.id} className={`relative overflow-hidden border-l-4 ${
                    suggestion.priority === 'urgent' ? 'border-l-red-500 hover:shadow-red-100' :
                    suggestion.priority === 'high' ? 'border-l-blue-500 hover:shadow-blue-100' :
                    'border-l-orange-500 hover:shadow-orange-100'
                  } group hover:shadow-lg transition-all duration-200 cursor-pointer`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${suggestion.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                          <suggestion.icon className={`w-5 h-5 ${suggestion.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">{suggestion.title}</h3>
                            <Badge 
                              variant={suggestion.priority === 'urgent' ? 'destructive' : 
                                      suggestion.priority === 'high' ? 'default' : 'secondary'} 
                              className="text-xs"
                            >
                              {suggestion.priority === 'urgent' ? '🚨 Khẩn cấp' : 
                               suggestion.priority === 'high' ? '⚡ Ưu tiên cao' : '📝 Bình thường'}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3 leading-relaxed">{suggestion.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-2 py-1">
                                <Brain className="w-3 h-3 text-purple-600" />
                                <span className="text-xs text-purple-700 font-bold">{suggestion.confidence}%</span>
                              </div>
                              <span className="text-xs text-green-600 font-medium">{suggestion.impact}</span>
                            </div>
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs px-3 py-1 h-7"
                            >
                              Áp dụng
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                          
                          {/* AI Confidence Progress Bar */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span className="font-medium">AI Confidence</span>
                              <span className="font-bold">{suggestion.confidence}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-700 ${
                                  suggestion.confidence >= 95 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                  suggestion.confidence >= 90 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                  suggestion.confidence >= 85 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                  'bg-gradient-to-r from-gray-400 to-gray-500'
                                }`}
                                style={{ width: `${suggestion.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Quick Stats */}
              <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">4</div>
                      <div className="text-xs text-gray-600">Gợi ý hôm nay</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">91%</div>
                      <div className="text-xs text-gray-600">Độ tin cậy TB</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">+45%</div>
                      <div className="text-xs text-gray-600">Hiệu suất dự kiến</div>
                    </div>
                  </div>
                  
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                    <Rocket className="w-4 h-4 mr-2" />
                    Áp dụng tất cả
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                AI Insights
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {aiInsights.map((insight) => (
                  <Card key={insight.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <insight.icon className={`w-5 h-5 ${insight.color} mt-0.5`} />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                AI: {insight.confidence}%
                              </Badge>
                              <Badge variant={insight.priority === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                                {insight.priority}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600 mt-2 font-medium">
                              {insight.impact}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          {insight.action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tasks & Calendar */}
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nhiệm vụ ưu tiên</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleAITasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                        <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                          <p className="text-xs text-gray-500">{task.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {task.estimatedTime}p
                            </Badge>
                            <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Hoạt động gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <activity.icon className={`w-4 h-4 ${activity.color} mt-0.5`} />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-xs text-gray-500">{activity.description}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        {aiChatOpen && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">AI Assistant</h3>
                <Button variant="ghost" size="sm" onClick={() => setAiChatOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
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
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  onClick={() => setVoiceRecording(!voiceRecording)}
                  variant={voiceRecording ? "default" : "outline"}
                >
                  {voiceRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel - Suggestions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
              Đề xuất AI
            </h3>
            <div className="flex space-x-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
                  <suggestion.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-700">{suggestion.title}</span>
                  <Button size="sm" variant="link" className="text-xs p-0 h-auto">
                    {suggestion.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Cập nhật: {currentTime.toLocaleTimeString('vi-VN')}
          </div>
        </div>
      </div>
    </div>
  )
}
