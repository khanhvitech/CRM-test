'use client'

import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'form' | 'report' | 'action' | string
  data?: any
}

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: '👋 Chào bạn! Tôi là **Trợ lý Vileads AI** - phiên bản nâng cao với khả năng:\n\n🚀 **Tự động hóa thông minh:**\n• Tạo hợp đồng từ template AI\n• Phân tích dữ liệu real-time\n• Tạo báo cáo tự động\n• Đồng bộ đa kênh (Zalo/FB)\n\n🧠 **AI thông minh:**\n• Hiểu ngữ cảnh conversation\n• Gợi ý hành động tiếp theo\n• Dự đoán xu hướng\n• Tối ưu quy trình\n\nBạn muốn tôi hỗ trợ gì hôm nay? 💬',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    { id: 1, label: '📝 Tạo Lead nhanh', action: 'quick_lead' },
    { id: 2, label: '📋 Tạo Task nhanh', action: 'quick_task' },
    { id: 3, label: '📧 Soạn tin nhắn', action: 'compose_message' },
    { id: 4, label: '📊 Xem báo cáo', action: 'view_reports' },
    { id: 5, label: '🔔 Nhắc nhở', action: 'reminders' },
    { id: 6, label: '📦 Sản phẩm', action: 'product_info' },
    { id: 7, label: '📋 Hợp đồng AI', action: 'smart_contract' },
    { id: 8, label: '🎯 Phân bổ lead', action: 'lead_assignment' },
    { id: 9, label: '🎁 Gửi ưu đãi', action: 'send_promotion' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Keyboard shortcut for quick actions toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.ctrlKey && e.key === 'q') {
        e.preventDefault()
        setIsQuickActionsExpanded(!isQuickActionsExpanded)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isQuickActionsExpanded])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }
    
    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)
    
    // Simulate intelligent typing delay
    setTimeout(() => {
      const botResponse = generateIntelligentResponse(currentInput)
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type || 'text',
        data: botResponse.data
      }])
      setIsTyping(false)
    }, 800 + Math.random() * 1200)
  }

  const parseLeadInfo = (input: string) => {
    const phoneRegex = /(\d{10,11}|\+\d{11,12})/
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/
    const namePattern = /(?:tạo lead|lead)\s+([^,\n]+?)(?:,|\s*số|\s*email|\s*quan tâm|$)/i
    
    const phone = input.match(phoneRegex)?.[0]
    const email = input.match(emailRegex)?.[0]
    const name = input.match(namePattern)?.[1]?.trim()
    
    return { name, phone, email }
  }

  const parseTaskInfo = (input: string) => {
    const taskPattern = /tạo task\s+(.+?)(?:\s+vào\s+(.+?))?(?:\s+ngày\s+(.+?))?$/i
    const match = input.match(taskPattern)
    
    if (match) {
      return {
        title: match[1]?.trim(),
        time: match[2]?.trim(),
        date: match[3]?.trim()
      }
    }
    return null
  }

  const generateIntelligentResponse = (input: string): { text: string, type?: string, data?: any } => {
    const lowerInput = input.toLowerCase()
    
    // 1. Tạo Lead Nhanh
    if (lowerInput.includes('tạo lead') || (lowerInput.includes('lead') && lowerInput.includes('tạo'))) {
      const leadInfo = parseLeadInfo(input)
      
      if (leadInfo.name || leadInfo.phone) {
        return {
          text: `🚀 **Lead được tạo thành công!**\n\n👤 **Thông tin lead:**\n• Tên: ${leadInfo.name || 'Chưa xác định'}\n• SĐT: ${leadInfo.phone || 'Chưa có'}\n• Email: ${leadInfo.email || 'Chưa có'}\n\n✅ **Đã thực hiện:**\n• Kiểm tra trùng lặp: Không trùng\n• Gắn nhãn tự động: "Zalo OA"\n• Phân bổ sales: Theo khu vực HN\n\n🎯 **Bước tiếp theo:**`,
          type: 'action',
          data: { 
            actionType: 'lead_created',
            leadInfo,
            actions: ['Gắn nhãn thêm', 'Phân bổ thủ công', 'Tạo task follow-up']
          }
        }
      }
      
      return {
        text: '📝 **Tạo Lead Nhanh**\n\n🎯 **Cách sử dụng:**\nNhập: "Tạo lead [Tên], số [SĐT], email [Email], quan tâm [Sản phẩm]"\n\n📋 **Ví dụ:**\n"Tạo lead Nguyễn Văn A, số 0901234567, quan tâm gói tư vấn"\n\n⚡ **Tự động:**\n• Kiểm tra trùng lặp\n• Gắn nhãn theo nguồn\n• Phân bổ sales theo quy tắc\n• Gửi thông báo',
        type: 'form',
        data: { formType: 'quick_lead' }
      }
    }

    // 2. Tạo Task Nhanh
    if (lowerInput.includes('tạo task') || (lowerInput.includes('task') && lowerInput.includes('tạo'))) {
      const taskInfo = parseTaskInfo(input)
      
      if (taskInfo) {
        return {
          text: `✅ **Task được tạo thành công!**\n\n📋 **Chi tiết task:**\n• Tiêu đề: ${taskInfo.title}\n• Thời gian: ${taskInfo.time || 'Chưa xác định'}\n• Ngày: ${taskInfo.date || 'Hôm nay'}\n\n🔔 **Thông báo đã gửi:**\n• Zalo OA ✓\n• Email ✓\n• App notification ✓\n\n🎯 **Bước tiếp theo:**`,
          type: 'action',
          data: { 
            actionType: 'task_created',
            taskInfo,
            actions: ['Xem task hôm nay', 'Gán thêm người', 'Đặt nhắc nhở']
          }
        }
      }
      
      return {
        text: '📋 **Tạo Task Nhanh**\n\n🎯 **Cách sử dụng:**\nNhập: "Tạo task [Nội dung] vào [Giờ] ngày [Ngày]"\n\n📝 **Ví dụ:**\n"Tạo task gọi lead Nguyễn Văn A vào 14h ngày 12/06/2025"\n\n⚡ **Tự động:**\n• Gắn với lead/khách hàng\n• Phân công sales phụ trách\n• Gửi thông báo đa kênh\n• Đặt reminder',
        type: 'form',
        data: { formType: 'quick_task' }
      }
    }

    // 3. Soạn và Gửi Tin Nhắn/Email
    if (lowerInput.includes('soạn') && (lowerInput.includes('email') || lowerInput.includes('tin nhắn') || lowerInput.includes('zalo'))) {
      return {
        text: '📧 **Soạn Tin Nhắn/Email Thông Minh**\n\n✨ **Mẫu có sẵn:**\n• 👋 Chào mừng lead mới\n• 💰 Nhắc thanh toán\n• 🎁 Gửi ưu đãi\n• 📞 Lịch hẹn tư vấn\n• 🔔 Follow-up sau demo\n\n🤖 **AI tự động:**\n• Cá nhân hóa nội dung\n• Chèn biến động (tên, sản phẩm)\n• Tối ưu thời gian gửi\n• Tracking hiệu quả\n\n📱 **Đa kênh:**\n• Zalo OA Business\n• Email Marketing\n• Facebook Messenger\n• SMS Gateway\n\n🎯 **Bạn muốn soạn loại nào?**',
        type: 'action',
        data: { 
          actionType: 'compose_message',
          templates: ['welcome', 'payment_reminder', 'promotion', 'appointment', 'followup'],
          channels: ['zalo', 'email', 'facebook', 'sms']
        }
      }
    }

    // 4. Xem Số Liệu và Báo Cáo
    if (lowerInput.includes('doanh số') || lowerInput.includes('báo cáo') || lowerInput.includes('số liệu') || lowerInput.includes('thống kê')) {
      const timeframe = lowerInput.includes('tuần') ? 'tuần' : lowerInput.includes('tháng') ? 'tháng' : 'hôm nay'
      
      return {
        text: `📊 **Báo Cáo ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}**\n\n💰 **Doanh số:**\n• Tổng: **50 triệu VND** (+15% ↗️)\n• Số đơn: **10 deals** (avg: 5M/đơn)\n• Pipeline: **120M** (24 deals)\n\n📈 **Hiệu suất:**\n• Conversion: **18.5%** (+2.1%)\n• Lead velocity: **3.2 ngày**\n• Customer LTV: **45M**\n\n🏆 **Top Performers:**\n• Sales: Trần Văn A (12M)\n• Product: Gói Premium (60%)\n• Channel: Facebook (ROI 4.2x)\n\n📋 **Báo cáo chi tiết:**`,
        type: 'report',
        data: { 
          reportType: 'dashboard',
          timeframe,
          reports: ['sales_detail', 'conversion_funnel', 'channel_roi', 'customer_analysis']
        }
      }
    }

    // 5. Gửi Nhắc Nhở
    if (lowerInput.includes('nhắc nhở') || lowerInput.includes('nhắc tôi') || lowerInput.includes('reminder')) {
      return {
        text: '🔔 **Hệ Thống Nhắc Nhở Thông Minh**\n\n⏰ **Loại nhắc nhở:**\n• 📞 Gọi lead/khách hàng\n• 📧 Follow-up email\n• 💰 Thu công nợ\n• 📋 Hoàn thành task\n• 🎯 Chăm sóc khách hàng\n\n🤖 **AI tự động:**\n• Phát hiện lead cold\n• Đề xuất thời gian tối ưu\n• Cá nhân hóa nội dung\n• Multi-channel notification\n\n⚡ **Thiết lập nhanh:**\nNhập: "Nhắc tôi [hành động] vào [thời gian] ngày [ngày]"\n\n🎯 **Đã thiết lập nhắc nhở nào chưa?**',
        type: 'action',
        data: { 
          actionType: 'reminder_setup',
          types: ['call', 'email', 'payment', 'task', 'care'],
          existing_reminders: ['Gọi ABC Corp - 10h hôm nay', 'Follow-up XYZ - 14h mai']
        }
      }
    }

    // 6. Truy Vấn Kiến Thức Sản Phẩm
    if (lowerInput.includes('sản phẩm') || lowerInput.includes('gói') || lowerInput.includes('dịch vụ') || lowerInput.includes('tính năng')) {
      return {
        text: '📦 **Trung Tâm Tri Thức Sản Phẩm**\n\n🏆 **Gói Tư Vấn CRM:**\n• 🎯 5 buổi chiến lược 1-1\n• 🔧 Setup & customization\n• 📞 Hỗ trợ 24/7 (Zalo/Call)\n• 📊 Báo cáo tùy chỉnh\n• 💰 **Giá:** 5 triệu/tháng\n\n🚀 **Gói Premium:**\n• 📈 Advanced Analytics AI\n• 🤖 Automation workflows\n• 🔗 Tích hợp đa kênh\n• 👥 Đào tạo team (10 users)\n• 💰 **Giá:** 15 triệu/tháng\n\n✨ **Add-ons:**\n• Mobile App: +2M/tháng\n• API Integration: +3M\n• Custom Reports: +1M\n\n🎯 **Tư vấn cho lead nào?**',
        type: 'action',
        data: { 
          actionType: 'product_info',
          products: ['consultation', 'premium', 'enterprise'],
          actions: ['Soạn tin tư vấn', 'Tạo quote', 'Book demo']
        }
      }
    }

    // 7. Soạn Hợp Đồng (Enhanced)
    if (lowerInput.includes('hợp đồng') || lowerInput.includes('contract')) {
      return {
        text: '📋 **Hệ Thống Hợp Đồng AI**\n\n🎯 **Smart Templates:**\n• 📄 Hợp đồng Tư vấn CRM\n• 🏢 Hợp đồng Doanh nghiệp\n• 🔧 Hợp đồng Triển khai\n• 🤝 Hợp đồng Partnership\n\n🤖 **AI Features:**\n• Auto-fill từ CRM data\n• Risk assessment tự động\n• Compliance check pháp lý\n• Tính toán giá trị & thuế\n• E-signature integration\n\n⚡ **Quy trình 3 bước:**\n1. Chọn template phù hợp\n2. AI điền thông tin tự động\n3. Review & gửi ký\n\n🎯 **Tạo hợp đồng cho đơn nào?**',
        type: 'form',
        data: { 
          formType: 'smart_contract',
          templates: ['consultation', 'enterprise', 'implementation', 'partnership']
        }
      }
    }

    // 8. Phân Bổ Lead
    if (lowerInput.includes('phân bổ') || lowerInput.includes('assign') || (lowerInput.includes('lead') && lowerInput.includes('sales'))) {
      return {
        text: '🎯 **Hệ Thống Phân Bổ Lead Thông Minh**\n\n🤖 **Auto Assignment Rules:**\n• 📍 Theo khu vực địa lý\n• 🏆 Theo năng lực sales\n• 📊 Load balancing tự động\n• 🎯 Theo chuyên môn sản phẩm\n\n👥 **Sales Team Active:**\n• Trần Văn A (HN): 8 leads\n• Nguyễn Thị B (HCM): 6 leads\n• Lê Văn C (ĐN): 4 leads\n\n⚡ **Phân bổ thủ công:**\nNhập: "Phân bổ lead [Tên] cho sales [Tên Sales]"\n\n📊 **Performance Tracking:**\n• Response time average\n• Conversion rate by sales\n• Lead quality score\n\n🎯 **Phân bổ lead nào?**',
        type: 'action',
        data: { 
          actionType: 'lead_assignment',
          sales_team: ['Trần Văn A', 'Nguyễn Thị B', 'Lê Văn C'],
          assignment_rules: ['geographic', 'performance', 'workload', 'expertise']
        }
      }
    }

    // 9. Gửi Ưu Đãi
    if (lowerInput.includes('ưu đãi') || lowerInput.includes('khuyến mại') || lowerInput.includes('giảm giá') || lowerInput.includes('promotion')) {
      return {
        text: '🎁 **Hệ Thống Ưu Đãi Thông Minh**\n\n✨ **Ưu đãi Hot:**\n• 🔥 Giảm 20% gói Tư vấn\n• 🎯 Tặng 1 tháng Premium\n• 💎 Combo Setup miễn phí\n• 🚀 Early bird -30%\n\n🤖 **AI Personalization:**\n• Phân tích hành vi khách\n• Đề xuất ưu đãi phù hợp\n• Timing tối ưu để gửi\n• A/B testing tự động\n\n📱 **Multi-channel:**\n• Zalo OA với hình ảnh\n• Email template responsive\n• Facebook Dynamic Ads\n• SMS ngắn gọn\n\n⏰ **Limited Time:**\n• Deadline tracking\n• Urgency messaging\n• Countdown timer\n\n🎯 **Gửi ưu đãi cho ai?**',
        type: 'action',
        data: { 
          actionType: 'send_promotion',
          promotions: ['discount_20', 'free_month', 'setup_free', 'early_bird'],
          channels: ['zalo', 'email', 'facebook', 'sms']
        }
      }
    }

    // Advanced analytics (existing)
    if (lowerInput.includes('phân tích') || lowerInput.includes('ai') || lowerInput.includes('analytics')) {
      return {
        text: '🧠 **AI Analytics Dashboard**\n\n📊 **Performance Real-time (Hôm nay):**\n• 💰 Doanh thu: **1.8 tỷ** (+22% ↗️)\n• 🎯 Leads mới: **34** (vs 28 hôm qua)\n• ⚡ Hot leads: **8** (cần action ngay!)\n• 📈 Conversion: **18.5%** (+3.2% ↗️)\n\n🔥 **AI Insights thông minh:**\n• **Cơ hội vàng:** 3 deals xác suất >85% (value 45M)\n• **Risk alert:** 5 leads cold >48h\n• **Channel star:** Facebook ROI 4.2x (tăng budget!)\n• **Predict:** 94% khả năng đạt target tháng\n\n🎯 **Smart Recommendations:**\n1. **Urgent:** Follow up leads: ABC Corp, XYZ Ltd\n2. **Optimize:** Tăng Facebook budget +30%\n3. **Automate:** Setup nurturing cho leads warm\n\n📈 **Quick Reports:**\n• Executive Summary (1-click)\n• Sales Performance Deep-dive\n• Channel ROI Analysis\n• Customer Journey Mapping\n\n🚀 Tạo custom report ngay?',
        type: 'report',
        data: { 
          reportType: 'analytics',
          availableReports: ['executive', 'sales', 'roi', 'customer_journey']
        }
      }
    }
    
    // Product demo
    if (lowerInput.includes('sản phẩm') || lowerInput.includes('demo') || lowerInput.includes('giá')) {
      return {
        text: '📦 **CRM Vileads 2025 - Next Generation**\n\n🏆 **CRM Enterprise** - 5.000.000₫/tháng\n   ✅ **Unlimited:** Users, storage, API calls\n   ✅ **AI Power:** Predictive analytics, auto-insights\n   ✅ **Custom:** Workflow builder, white-label\n   ✅ **Enterprise:** SSO, on-premise, 24/7 support\n   ✅ **Advanced:** Multi-tenant, custom integrations\n\n🚀 **CRM Pro** - 2.500.000₫/tháng  ⭐ **POPULAR**\n   ✅ **Team:** Up to 50 users\n   ✅ **Smart:** AI recommendations, auto-scoring\n   ✅ **Connect:** All integrations (Zalo/FB/Google)\n   ✅ **Automate:** Workflow, email sequences\n   ✅ **Report:** Advanced analytics dashboard\n\n🌱 **CRM Starter** - 500.000₫/tháng\n   ✅ **Small team:** Up to 5 users\n   ✅ **Essential:** Lead management, basic reports\n   ✅ **Connect:** Email, basic integrations\n   ✅ **Support:** Email support, knowledge base\n\n🎁 **Ưu đãi Q2/2025:**\n• 🆓 **Free setup** + training (worth 10M)\n• 🎯 **30% OFF** first 6 months\n• 🎁 **Bonus:** Marketing automation module\n• ⚡ **Priority** implementation (7 days)\n\n📞 Book demo ngay để được tư vấn 1:1?',
        type: 'action',
        data: { 
          actionType: 'product_demo',
          packages: ['starter', 'pro', 'enterprise'],
          promotion: 'Q2_2025'
        }
      }
    }
    
    // Automation help
    if (lowerInput.includes('tự động') || lowerInput.includes('automation') || lowerInput.includes('workflow')) {
      return {
        text: '🤖 **Automation Center**\n\n⚡ **Ready-to-use Automations:**\n\n🎯 **Lead Management:**\n• Auto-assign leads theo region/product\n• Smart lead scoring (AI-powered)\n• Follow-up sequences (email/SMS/call)\n• Lead nurturing campaigns\n\n📊 **Sales Pipeline:**\n• Auto-move deals based on activities\n• Notification cho deals stuck\n• Forecast updates real-time\n• Commission calculation\n\n📱 **Multi-channel Sync:**\n• Zalo OA → CRM (2-way sync)\n• Facebook Lead Ads → Auto-import\n• Website forms → Instant lead\n• Call logs → Activity tracking\n\n📈 **Reporting Automation:**\n• Daily sales summary (auto-send)\n• Weekly performance report\n• Monthly executive dashboard\n• Custom KPI alerts\n\n🛠️ **Custom Workflows:**\n• Drag-drop workflow builder\n• Conditional logic (if/then/else)\n• API webhooks integration\n• Custom field automations\n\nBạn muốn setup automation nào trước?',
        type: 'action',
        data: { 
          actionType: 'automation_setup',
          categories: ['lead_management', 'sales_pipeline', 'multi_channel', 'reporting']
        }
      }
    }
    
    // Lead and customer insights
    if (lowerInput.includes('lead') || lowerInput.includes('khách hàng') || lowerInput.includes('customer')) {
      return {
        text: '👥 **Customer Intelligence Hub**\n\n📈 **Lead Pipeline Today:**\n• 📥 **New leads:** 34 (🔥 8 hot, ⚡ 12 warm, ❄️ 14 cold)\n• 📞 **Contacted:** 186/254 (73.2%)\n• 💬 **In discussion:** 124 leads\n• ✅ **Converted:** 42 deals (16.5% rate)\n\n🎯 **Source Performance:**\n🥇 **Facebook Ads:** 24.5% (ROI: 4.2x) 📈\n🥈 **Google Ads:** 18.2% (ROI: 3.1x) 📈\n🥉 **Zalo OA:** 15.3% (ROI: 5.8x) 🚀\n📞 **Referrals:** 12.1% (ROI: 8.5x) 💎\n🌐 **Organic:** 8.7% (ROI: ∞) ⭐\n\n⚠️ **Action Required:**\n• 🔴 **28 leads** cold >48h (assign sales rep)\n• 🟡 **15 deals** stuck at "Quote" stage\n• 🟢 **5 hot leads** ready for closing call\n\n🧠 **AI Recommendations:**\n• Prioritize Zalo channel (+58% ROI)\n• Create follow-up sequence for Quote stage\n• A/B test landing pages for Google Ads\n\n📊 Need detailed customer analysis?',
        type: 'report',
        data: { 
          reportType: 'customer_intelligence',
          urgent_actions: 28,
          hot_leads: 5
        }
      }
    }
    
    // Integration help
    if (lowerInput.includes('tích hợp') || lowerInput.includes('integration') || lowerInput.includes('api')) {
      return {
        text: '🔗 **Integration Hub**\n\n⚡ **1-Click Integrations:**\n\n📱 **Social & Messaging:**\n• **Zalo OA** - 2-way sync, auto-import forms\n• **Facebook** - Lead ads, Messenger\n• **WhatsApp Business** - Chat integration\n• **Telegram** - Bot notifications\n\n📧 **Email & Communication:**\n• **Gmail/Outlook** - Email tracking\n• **Mailchimp** - Marketing campaigns\n• **SendGrid** - Transactional emails\n• **Twilio** - SMS automation\n\n💼 **Business Tools:**\n• **Google Workspace** - Calendar, Drive\n• **Microsoft 365** - Teams, SharePoint\n• **Slack** - Team notifications\n• **Zoom** - Meeting integration\n\n💰 **Finance & Payment:**\n• **VNPay/MoMo** - Payment tracking\n• **Misa/Fast** - Accounting sync\n• **Banking APIs** - Transaction monitoring\n\n🛠️ **Developer APIs:**\n• REST API (1000 calls/hour)\n• Webhook notifications\n• SDK: NodeJS, PHP, Python\n• GraphQL endpoint\n\n📖 **Quick Setup Guide:**\n1. Choose integration\n2. Auth với OAuth 2.0\n3. Configure sync rules\n4. Test & go live\n\nBạn muốn tích hợp platform nào?',
        type: 'action',
        data: { 
          actionType: 'integration_setup',
          popular: ['zalo', 'facebook', 'gmail', 'vnpay']
        }
      }
    }
    
    // Default intelligent response
    return {
      text: '🤖 **Trợ lý AI** đang lắng nghe...\n\n💡 **Tôi có thể giúp bạn:**\n\n🎯 **Công việc hàng ngày:**\n• "Tạo hợp đồng cho khách ABC Corp"\n• "Phân tích leads Facebook tuần này"\n• "Setup automation cho deals mới"\n• "Báo cáo doanh số real-time"\n\n📊 **Analytics & Insights:**\n• "Dự báo doanh thu Q3"\n• "So sánh ROI các kênh marketing"\n• "Phân tích customer journey"\n• "Tìm leads có risk cao"\n\n⚡ **Quick Actions:**\n• "Leads nào cần follow up gấp?"\n• "Deals nào sắp close?"\n• "Performance team sales hôm nay?"\n• "Cách tăng conversion rate?"\n\n🔧 **Setup & Training:**\n• "Hướng dẫn import khách hàng"\n• "Cách tích hợp Zalo OA"\n• "Tạo workflow automation"\n• "Export báo cáo Excel"\n\n💬 **Pro tip:** Nói càng cụ thể, tôi hỗ trợ càng chính xác!'
    }
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: { [key: string]: string } = {
      quick_lead: 'Hướng dẫn tôi tạo lead nhanh',
      quick_task: 'Tôi muốn tạo task nhanh',
      compose_message: 'Soạn tin nhắn email cho khách hàng',
      view_reports: 'Xem doanh số tuần này',
      reminders: 'Thiết lập nhắc nhở cho tôi',
      product_info: 'Thông tin sản phẩm gói tư vấn',
      smart_contract: 'Tôi muốn tạo hợp đồng thông minh với AI',
      lead_assignment: 'Phân bổ lead cho sales team',
      send_promotion: 'Gửi ưu đãi cho khách hàng',
      ai_analytics: 'Phân tích dữ liệu và insights AI cho tôi',
      product_demo: 'Cho tôi xem demo sản phẩm và bảng giá',
      automation: 'Hướng dẫn tôi setup automation workflows'
    }
    
    setInputValue(actionMessages[action] || actionMessages['smart_contract'])
    setTimeout(() => handleSendMessage(), 100)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group relative"
        >
          <div className="text-2xl group-hover:animate-bounce">🤖</div>
          {/* Quick Actions Indicator */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            9
          </div>
        </button>
        <div className="absolute -top-16 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="font-medium">Trợ lý Vileads AI</div>
          <div className="text-xs opacity-80">9 tính năng nhanh • Click để chat!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 w-[420px] h-[650px] flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="flex items-center space-x-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h3 className="font-bold text-sm">Trợ lý Vileads AI</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs opacity-90">Đang online</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all relative z-10"
        >
          ✕
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
              message.sender === 'bot' 
                ? 'bg-white text-gray-800 border border-gray-100' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</div>
              
              {/* Action buttons for special message types */}
              {message.type === 'form' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    🚀 Bắt đầu tạo
                  </button>
                </div>
              )}
              
              {message.type === 'report' && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:shadow-lg transition-all mr-2">
                    📊 Tạo báo cáo
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:shadow-lg transition-all">
                    📈 Export Excel
                  </button>
                </div>
              )}
              
              {message.type === 'action' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    ⚡ Thực hiện ngay
                  </button>
                </div>
              )}
              
              <div className="text-xs opacity-60 mt-2 flex items-center justify-between">
                <span>{message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                {message.sender === 'bot' && (
                  <span className="text-xs opacity-50">AI Assistant</span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500">AI đang suy nghĩ...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions - Collapsible */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        {/* Toggle Button */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-600">Tính năng nhanh</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">9 tính năng</span>
            </div>
          </div>
          <button
            onClick={() => setIsQuickActionsExpanded(!isQuickActionsExpanded)}
            className="flex items-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
          >
            <span className="text-xs text-gray-600">
              {isQuickActionsExpanded ? 'Thu gọn' : 'Mở rộng'}
            </span>
            <div className={`transition-transform duration-300 ${isQuickActionsExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Quick Actions Grid - Collapsible */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isQuickActionsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-lg px-2 py-2 transition-all duration-200 text-left hover:shadow-sm transform hover:scale-105"
              >
                <div className="font-medium text-gray-700 text-xs leading-tight">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Actions - Always Visible */}
        {!isQuickActionsExpanded && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickAction('quick_lead')}
              className="text-xs bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg px-3 py-2 transition-all duration-200 text-left hover:shadow-sm"
            >
              <div className="font-medium text-blue-700 text-xs">📝 Tạo Lead</div>
            </button>
            <button
              onClick={() => handleQuickAction('smart_contract')}
              className="text-xs bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg px-3 py-2 transition-all duration-200 text-left hover:shadow-sm"
            >
              <div className="font-medium text-purple-700 text-xs">📋 Hợp đồng</div>
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập tin nhắn... (VD: Tạo hợp đồng cho ABC Corp)"
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
          >
            {isTyping ? '⏳' : '🚀'}
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center flex items-center justify-between">
          <span>Powered by Vileads AI</span>
          <span className="text-xs text-gray-400">Ctrl+Q: Tính năng nhanh</span>
        </div>
      </div>
    </div>
  )
}

export default ChatbotAssistant
