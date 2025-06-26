'use client'

import React, { useState, useEffect } from 'react'
import CreateTaskModal from './CreateTaskModal'
import TaskDetailModal from './TaskDetailModal'
import AutoTaskRulesModal from './AutoTaskRulesModal'
import CreateEventModal from './CreateEventModal'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Users, 
  Tag, 
  Bell, 
  CheckCircle, 
  Circle, 
  Play, 
  Pause,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Mail,
  Phone,
  AlertTriangle,
  Target,
  FileText,
  Download,
  Upload,
  Settings,
  MoreVertical,
  ChevronDown,
  X,
  Save,
  Send,
  Zap,
  User,
  MapPin,
  Video,
  Coffee,
  Building,
  Star,
  Moon,
  Sun,
  TreePine,
  Grid3X3,
  List,
  Columns,
  ChevronUp,
  Bot,
  Brain,
  TrendingUp,
  BarChart3,
  PieChart,
  Lightbulb,
  Sparkles,
  ArrowRight,
  TrendingDown,
  MousePointer
} from 'lucide-react'

// Interfaces
interface TaskTemplate {
  id: string
  title: string
  description: string
  category: 'lead' | 'order' | 'customer' | 'general'
}

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed'
  progress: number
  assignedTo: string
  assignedTeam?: string
  tags: string[]
  
  // Related entities
  relatedType?: 'lead' | 'order' | 'customer' | 'general'
  relatedId?: string
  relatedName?: string
  relatedInfo?: {
    phone?: string
    orderNumber?: string
    orderStatus?: string
    customerHistory?: string
  }
  
  // Notes and comments
  internalNotes: string
  progressNotes: TaskProgressNote[]
  
  // Automation
  isAutoCreated: boolean
  autoTrigger?: string
  
  // Reminders
  reminders: TaskReminder[]
  customReminders: CustomReminder[]
  
  // Tracking
  createdAt: string
  createdBy: string
  updatedAt: string
  completedAt?: string
  history: TaskHistory[]
}

interface TaskProgressNote {
  id: string
  progress: number
  note: string
  createdAt: string
  createdBy: string
}

interface TaskReminder {
  id: string
  taskId: string
  type: 'zalo' | 'email' | 'app'
  scheduledAt: string
  content: string
  status: 'pending' | 'sent' | 'read' | 'failed'
  sentAt?: string
  readAt?: string
  attempt: number
}

interface CustomReminder {
  id: string
  taskId: string
  scheduleType: 'once' | 'recurring'
  scheduledAt: string
  recurringPattern?: string // 'daily', '12h', etc.
  channels: ('zalo' | 'email' | 'app')[]
  content: string
  isActive: boolean
  lastSent?: string
}

interface TaskHistory {
  id: string
  action: string
  details: string
  createdAt: string
  createdBy: string
}

interface AutoTaskRule {
  id: string
  name: string
  trigger: {
    type: 'lead_stage' | 'order_status'
    value: string
  }
  taskTemplate: {
    title: string
    description: string
    dueDays: number
    priority: 'low' | 'medium' | 'high'
    assignToType: 'lead_owner' | 'order_owner' | 'team'
    assignToValue?: string
  }
  isActive: boolean
  variables: string[] // For template variables like {leadName}, {orderNumber}
  createdAt: string
  lastTriggered?: string
  triggerCount: number
}

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: string
  team: string
  isActive: boolean
}

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  stage: string
  assignedTo: string
  tags: string[]
  isVip: boolean
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  status: string
  paymentStatus: string
  total: number
  assignedTo: string
}

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  type: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
}

// Calendar interfaces
interface CalendarEvent {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  type: 'task' | 'meeting' | 'internal' | 'personal' | 'holiday'
  priority: 'low' | 'medium' | 'high'
  location?: string
  attendees: string[] // Employee IDs
  relatedType?: 'lead' | 'order' | 'customer'
  relatedId?: string
  relatedName?: string
  isAllDay: boolean
  isRecurring: boolean
  recurringPattern?: string
  reminderMinutes: number[]
  color: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface Holiday {
  id: string
  name: string
  date: string
  type: 'public' | 'company' | 'traditional'
  isOfficial: boolean
  description?: string
}

interface LunarDate {
  lunarDay: number
  lunarMonth: number
  lunarYear: number
  zodiac: string
  can: string
  chi: string
  monthName: string
}

interface QuickEventTemplate {
  id: string
  title: string
  type: 'meeting' | 'internal' | 'personal'
  duration: number // minutes
  location?: string
  description: string
  color: string
}

export default function TaskManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [tasks, setTasks] = useState<Task[]>([])
  const [templates, setTemplates] = useState<TaskTemplate[]>([])
  const [autoRules, setAutoRules] = useState<AutoTaskRule[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [showAutoRulesModal, setShowAutoRulesModal] = useState(false)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [dueDateFilter, setDueDateFilter] = useState('')
  const [selectedStatsFilter, setSelectedStatsFilter] = useState<string>('')
  const [eventTypeFilter, setEventTypeFilter] = useState('')

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month')
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [quickTemplates, setQuickTemplates] = useState<QuickEventTemplate[]>([])
  const [showLunar, setShowLunar] = useState(true)
  const [showHolidays, setShowHolidays] = useState(true)

  // Task view state
  const [taskView, setTaskView] = useState<'table' | 'kanban'>('table')
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    task: true,
    related: true,
    assignee: true,
    dueDate: true,
    priority: true,
    progress: true,
    status: true,
    actions: true
  })
  
  const [showColumnSelector, setShowColumnSelector] = useState(false)

  // AI suggestions handler
  const handleAISuggestionClick = (suggestionType: string, data?: any) => {
    switch (suggestionType) {
      case 'overdue':
        setActiveTab('tasks')
        setTaskView('table')
        setStatusFilter('')
        setSelectedStatsFilter('overdue')
        break
      case 'workload':
        setActiveTab('tasks')
        setTaskView('table')
        setAssigneeFilter(data?.assigneeId || '')
        break
      case 'high_priority':
        setActiveTab('tasks')
        setTaskView('kanban')
        setPriorityFilter('high')
        break
      case 'automation':
        setActiveTab('automation')
        setShowAutoRulesModal(true)
        break
      default:
        break
    }
  }

  // Initialize sample data
  useEffect(() => {
    initializeSampleData()
  }, [])

  // Close column selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showColumnSelector && !target.closest('.column-selector')) {
        setShowColumnSelector(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColumnSelector])

  const initializeSampleData = () => {
    // Sample templates
    const sampleTemplates: TaskTemplate[] = [
      {
        id: '1',
        title: 'Gọi lead mới',
        description: 'Liên hệ lead để tư vấn và xác nhận nhu cầu',
        category: 'lead'
      },
      {
        id: '2', 
        title: 'Gửi hợp đồng',
        description: 'Gửi hợp đồng và hướng dẫn ký kết cho khách hàng',
        category: 'order'
      },
      {
        id: '3',
        title: 'Nhắc thanh toán',
        description: 'Nhắc nhở khách hàng thanh toán hóa đơn đến hạn',
        category: 'order'
      },
      {
        id: '4',
        title: 'Chăm sóc khách hàng VIP',
        description: 'Liên hệ chăm sóc và tư vấn sản phẩm mới cho khách VIP',
        category: 'customer'
      }
    ]

    // Sample employees
    const sampleEmployees: Employee[] = [
      { id: '1', name: 'Nguyễn Văn An', email: 'an@company.com', phone: '0123456789', role: 'Sales', team: 'Kinh doanh', isActive: true },
      { id: '2', name: 'Trần Thị Bình', email: 'binh@company.com', phone: '0123456790', role: 'Sales Manager', team: 'Kinh doanh', isActive: true },
      { id: '3', name: 'Lê Văn Cường', email: 'cuong@company.com', phone: '0123456791', role: 'Support', team: 'Hỗ trợ', isActive: true }
    ]

    // Sample leads
    const sampleLeads: Lead[] = [
      { id: '1', name: 'Công ty ABC', phone: '0987654321', email: 'contact@abc.com', stage: 'Tư vấn', assignedTo: '1', tags: ['VIP'], isVip: true },
      { id: '2', name: 'Nguyễn Văn Đức', phone: '0987654322', email: 'duc@email.com', stage: 'Báo giá', assignedTo: '2', tags: [], isVip: false }
    ]

    // Sample orders  
    const sampleOrders: Order[] = [
      { id: '1', orderNumber: 'ORD-001', customerName: 'Công ty ABC', customerPhone: '0987654321', status: 'confirmed', paymentStatus: 'unpaid', total: 50000000, assignedTo: '1' },
      { id: '2', orderNumber: 'ORD-002', customerName: 'Công ty XYZ', customerPhone: '0987654323', status: 'processing', paymentStatus: 'paid', total: 30000000, assignedTo: '2' }
    ]

    // Sample customers
    const sampleCustomers: Customer[] = [
      { id: '1', name: 'Công ty ABC', phone: '0987654321', email: 'contact@abc.com', type: 'VIP', totalOrders: 5, totalSpent: 250000000, lastOrderDate: '2025-06-01' },
      { id: '2', name: 'Công ty XYZ', phone: '0987654323', email: 'contact@xyz.com', type: 'Regular', totalOrders: 2, totalSpent: 80000000, lastOrderDate: '2025-05-15' }
    ]

    // Sample tasks
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Gọi lead Công ty ABC',
        description: 'Liên hệ tư vấn gói phần mềm quản lý nhân sự',
        dueDate: '2025-06-12T10:00:00',
        priority: 'high',
        status: 'pending',
        progress: 0,
        assignedTo: '1',
        tags: ['Khẩn cấp', 'VIP'],
        relatedType: 'lead',
        relatedId: '1',
        relatedName: 'Công ty ABC',
        relatedInfo: { phone: '0987654321' },
        internalNotes: 'Khách quan tâm đến tính năng chấm công tự động',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-11T09:00:00',
        createdBy: '2',
        updatedAt: '2025-06-11T09:00:00',
        history: []
      },
      {
        id: '2',
        title: 'Gửi hợp đồng ORD-001',
        description: 'Gửi hợp đồng phần mềm CRM cho Công ty ABC',
        dueDate: '2025-06-13T15:00:00',
        priority: 'medium',
        status: 'in_progress',
        progress: 50,
        assignedTo: '1',
        tags: ['Hợp đồng'],
        relatedType: 'order',
        relatedId: '1',
        relatedName: 'ORD-001',
        relatedInfo: { orderNumber: 'ORD-001', orderStatus: 'confirmed' },
        internalNotes: 'Đã trao đổi với khách về điều khoản thanh toán',
        progressNotes: [
          {
            id: '1',
            progress: 50,
            note: 'Đã soạn hợp đồng, đang chờ duyệt',
            createdAt: '2025-06-11T14:00:00',
            createdBy: '1'
          }
        ],
        isAutoCreated: true,
        autoTrigger: 'order_confirmed',
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-10T16:00:00',
        createdBy: 'system',
        updatedAt: '2025-06-11T14:00:00',
        history: []
      },
      {
        id: '3',
        title: 'Demo sản phẩm cho Công ty XYZ',
        description: 'Trình diễn tính năng quản lý bán hàng và báo cáo',
        dueDate: '2025-06-14T14:00:00',
        priority: 'high',
        status: 'pending',
        progress: 0,
        assignedTo: '2',
        tags: ['Demo', 'Quan trọng'],
        relatedType: 'lead',
        relatedId: '2',
        relatedName: 'Công ty XYZ',
        relatedInfo: { phone: '0912345678' },
        internalNotes: 'Khách yêu cầu demo online qua Zoom',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-12T08:30:00',
        createdBy: '1',
        updatedAt: '2025-06-12T08:30:00',
        history: []
      },
      {
        id: '4',
        title: 'Theo dõi thanh toán ORD-002',
        description: 'Liên hệ khách hàng về tình trạng thanh toán đơn hàng',
        dueDate: '2025-06-15T09:00:00',
        priority: 'medium',
        status: 'pending',
        progress: 0,
        assignedTo: '1',
        tags: ['Thanh toán', 'Theo dõi'],
        relatedType: 'order',
        relatedId: '2',
        relatedName: 'ORD-002',
        relatedInfo: { orderNumber: 'ORD-002', orderStatus: 'processing' },
        internalNotes: 'Đơn hàng đã giao, chờ thanh toán từ ngày 10/06',
        progressNotes: [],
        isAutoCreated: true,
        autoTrigger: 'payment_overdue',
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-12T10:00:00',
        createdBy: 'system',
        updatedAt: '2025-06-12T10:00:00',
        history: []
      },
      {
        id: '5',
        title: 'Chuẩn bị báo cáo tuần',
        description: 'Tổng hợp báo cáo doanh số và hiệu quả bán hàng tuần này',
        dueDate: '2025-06-16T17:00:00',
        priority: 'medium',
        status: 'in_progress',
        progress: 30,
        assignedTo: '2',
        tags: ['Báo cáo', 'Tuần'],
        relatedType: 'general',
        internalNotes: 'Cần cập nhật số liệu từ team sales',
        progressNotes: [
          {
            id: '2',
            progress: 30,
            note: 'Đã thu thập dữ liệu từ CRM, đang xử lý',
            createdAt: '2025-06-12T11:00:00',
            createdBy: '2'
          }
        ],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-10T09:00:00',
        createdBy: '2',
        updatedAt: '2025-06-12T11:00:00',
        history: []
      },
      {
        id: '6',
        title: 'Chăm sóc khách hàng VIP - Công ty DEF',
        description: 'Gọi điện chăm sóc và tìm hiểu nhu cầu mở rộng',
        dueDate: '2025-06-17T10:30:00',
        priority: 'high',
        status: 'pending',
        progress: 0,
        assignedTo: '1',
        tags: ['VIP', 'Chăm sóc'],
        relatedType: 'customer',
        relatedId: '1',
        relatedName: 'Công ty DEF',
        relatedInfo: { phone: '0903456789', customerHistory: 'Khách hàng từ 2023' },
        internalNotes: 'Khách đã mua 3 gói phần mềm, có thể quan tâm module mới',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-12T14:00:00',
        createdBy: '2',
        updatedAt: '2025-06-12T14:00:00',
        history: []
      },
      {
        id: '7',
        title: 'Xử lý khiếu nại từ Công ty GHI',
        description: 'Giải quyết vấn đề về tính năng đồng bộ dữ liệu',
        dueDate: '2025-06-13T08:00:00',
        priority: 'high',
        status: 'in_progress',
        progress: 70,
        assignedTo: '3',
        tags: ['Khiếu nại', 'Kỹ thuật'],
        relatedType: 'customer',
        relatedId: '3',
        relatedName: 'Công ty GHI',
        relatedInfo: { phone: '0934567890' },
        internalNotes: 'Lỗi do cập nhật hệ thống, cần rollback',
        progressNotes: [
          {
            id: '3',
            progress: 70,
            note: 'Đã xác định nguyên nhân, đang fix',
            createdAt: '2025-06-12T16:00:00',
            createdBy: '3'
          }
        ],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-11T15:30:00',
        createdBy: '1',
        updatedAt: '2025-06-12T16:00:00',
        history: []
      },
      {
        id: '8',
        title: 'Cập nhật thông tin lead từ triển lãm',
        description: 'Nhập thông tin 15 lead mới từ triển lãm công nghệ',
        dueDate: '2025-06-18T12:00:00',
        priority: 'medium',
        status: 'pending',
        progress: 0,
        assignedTo: '2',
        tags: ['Lead mới', 'Triển lãm'],
        relatedType: 'general',
        internalNotes: 'Có card visit và thông tin sơ bộ',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-12T17:00:00',
        createdBy: '1',
        updatedAt: '2025-06-12T17:00:00',
        history: []
      },
      {
        id: '9',
        title: 'Tổ chức webinar giới thiệu sản phẩm',
        description: 'Chuẩn bị và tổ chức webinar "CRM cho doanh nghiệp vừa và nhỏ"',
        dueDate: '2025-06-20T14:00:00',
        priority: 'medium',
        status: 'pending',
        progress: 0,
        assignedTo: '2',
        assignedTeam: 'marketing',
        tags: ['Webinar', 'Marketing'],
        relatedType: 'general',
        internalNotes: 'Đã có 25 người đăng ký, cần chuẩn bị slide',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-11T10:00:00',
        createdBy: '2',
        updatedAt: '2025-06-11T10:00:00',
        history: []
      },
      {
        id: '10',
        title: 'Kiểm tra và backup dữ liệu hệ thống',
        description: 'Thực hiện backup tuần và kiểm tra tình trạng server',
        dueDate: '2025-06-16T02:00:00',
        priority: 'low',
        status: 'pending',
        progress: 0,
        assignedTo: '3',
        tags: ['Backup', 'Hệ thống'],
        relatedType: 'general',
        internalNotes: 'Backup tự động hàng tuần vào chủ nhật',
        progressNotes: [],
        isAutoCreated: true,
        autoTrigger: 'weekly_backup',
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-09T00:00:00',
        createdBy: 'system',
        updatedAt: '2025-06-09T00:00:00',
        history: []
      },
      {
        id: '11',
        title: 'Gửi email marketing chiến dịch tháng 6',
        description: 'Gửi newsletter và ưu đãi đặc biệt cho khách hàng tiềm năng',
        dueDate: '2025-06-19T09:00:00',
        priority: 'medium',
        status: 'pending',
        progress: 0,
        assignedTo: '2',
        tags: ['Email', 'Marketing'],
        relatedType: 'general',
        internalNotes: 'Danh sách 300 email đã được duyệt',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-12T11:30:00',
        createdBy: '1',
        updatedAt: '2025-06-12T11:30:00',
        history: []
      },
      {
        id: '12',
        title: 'Đào tạo sử dụng phần mềm cho Công ty JKL',
        description: 'Hướng dẫn team của khách hàng sử dụng các tính năng CRM',
        dueDate: '2025-06-21T09:00:00',
        priority: 'high',
        status: 'pending',
        progress: 0,
        assignedTo: '3',
        tags: ['Đào tạo', 'Onboarding'],
        relatedType: 'customer',
        relatedId: '4',
        relatedName: 'Công ty JKL',
        relatedInfo: { phone: '0945678901' },
        internalNotes: 'Khách hàng mới, cần đào tạo chi tiết',
        progressNotes: [],
        isAutoCreated: true,
        autoTrigger: 'new_customer_onboarding',
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-10T14:00:00',
        createdBy: 'system',
        updatedAt: '2025-06-10T14:00:00',
        history: []
      },
      {
        id: '13',
        title: 'Phân tích đối thủ cạnh tranh',
        description: 'Nghiên cứu sản phẩm và giá cả của 3 đối thủ chính',
        dueDate: '2025-06-25T17:00:00',
        priority: 'medium',
        status: 'in_progress',
        progress: 25,
        assignedTo: '2',
        tags: ['Phân tích', 'Đối thủ'],
        relatedType: 'general',
        internalNotes: 'Đã thu thập thông tin cơ bản, cần phân tích sâu',
        progressNotes: [
          {
            id: '4',
            progress: 25,
            note: 'Hoàn thành thu thập thông tin về đối thủ A',
            createdAt: '2025-06-12T09:00:00',
            createdBy: '2'
          }
        ],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-08T10:00:00',
        createdBy: '1',
        updatedAt: '2025-06-12T09:00:00',
        history: []
      },
      {
        id: '14',
        title: 'Cập nhật tài liệu hướng dẫn sử dụng',
        description: 'Cập nhật manual với các tính năng mới của phiên bản 2.1',
        dueDate: '2025-06-22T16:00:00',
        priority: 'low',
        status: 'pending',
        progress: 0,
        assignedTo: '3',
        tags: ['Tài liệu', 'Manual'],
        relatedType: 'general',
        internalNotes: 'Có 5 tính năng mới cần cập nhật vào tài liệu',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-11T16:00:00',
        createdBy: '1',
        updatedAt: '2025-06-11T16:00:00',
        history: []
      },
      {
        id: '15',
        title: 'Họp review quý 2 với team',
        description: 'Đánh giá kết quả kinh doanh quý 2 và lập kế hoạch quý 3',
        dueDate: '2025-06-30T10:00:00',
        priority: 'high',
        status: 'pending',
        progress: 0,
        assignedTo: '1',
        assignedTeam: 'all',
        tags: ['Họp', 'Review'],
        relatedType: 'general',
        internalNotes: 'Cần chuẩn bị báo cáo tổng hợp và KPI',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-12T08:00:00',
        createdBy: '1',
        updatedAt: '2025-06-12T08:00:00',
        history: []
      }
    ]

    setTemplates(sampleTemplates)
    setEmployees(sampleEmployees)
    setLeads(sampleLeads)
    setOrders(sampleOrders)
    setCustomers(sampleCustomers)
    setTasks(sampleTasks)
    
    // Sample auto rules
    const sampleAutoRules: AutoTaskRule[] = [
      {
        id: '1',
        name: 'Gọi lead mới khi chuyển sang "Tư vấn"',
        trigger: {
          type: 'lead_stage',
          value: 'Tư vấn'
        },
        taskTemplate: {
          title: 'Gọi tư vấn lead {leadName}',
          description: 'Liên hệ tư vấn và xác nhận nhu cầu cho lead {leadName} - SĐT: {leadPhone}',
          dueDays: 1,
          priority: 'high',
          assignToType: 'lead_owner'
        },
        isActive: true,
        variables: ['{leadName}', '{leadPhone}'],
        createdAt: '2025-06-01T10:00:00',
        triggerCount: 15
      },
      {
        id: '2',
        name: 'Gửi hợp đồng khi đơn hàng xác nhận',
        trigger: {
          type: 'order_status',
          value: 'confirmed'
        },
        taskTemplate: {
          title: 'Gửi hợp đồng {orderNumber}',
          description: 'Gửi hợp đồng và hướng dẫn ký kết cho đơn hàng {orderNumber} - Khách hàng: {customerName}',
          dueDays: 1,
          priority: 'medium',
          assignToType: 'order_owner'
        },
        isActive: true,
        variables: ['{orderNumber}', '{customerName}'],
        createdAt: '2025-05-15T14:00:00',
        lastTriggered: '2025-06-10T16:00:00',
        triggerCount: 8
      },
      {
        id: '3',
        name: 'Nhắc thanh toán khi đơn hàng chưa thanh toán',
        trigger: {
          type: 'order_status',
          value: 'processing'
        },
        taskTemplate: {
          title: 'Nhắc thanh toán {orderNumber}',
          description: 'Nhắc nhở khách hàng {customerName} thanh toán cho đơn hàng {orderNumber}',
          dueDays: 3,
          priority: 'medium',
          assignToType: 'team',
          assignToValue: 'sales'
        },
        isActive: false,
        variables: ['{orderNumber}', '{customerName}'],
        createdAt: '2025-05-20T09:00:00',
        triggerCount: 3
      }
    ]
    
    setAutoRules(sampleAutoRules)
    
    // Sample holidays (Vietnamese holidays)
    const sampleHolidays: Holiday[] = [
      {
        id: '1',
        name: 'Tết Nguyên Đán',
        date: '2025-01-29',
        type: 'public',
        isOfficial: true,
        description: 'Tết Âm lịch - Nghỉ 7 ngày'
      },
      {
        id: '2',
        name: 'Giỗ Tổ Hùng Vương',
        date: '2025-04-06',
        type: 'public',
        isOfficial: true,
        description: 'Nghỉ lễ'
      },
      {
        id: '3',
        name: 'Quốc Khánh',
        date: '2025-09-02',
        type: 'public',
        isOfficial: true,
        description: 'Quốc khánh Việt Nam'
      },
      {
        id: '4',
        name: 'Ngày thành lập công ty',
        date: '2025-03-15',
        type: 'company',
        isOfficial: false,
        description: 'Kỷ niệm 10 năm thành lập'
      }
    ]

    // Sample calendar events
    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Họp với Công ty ABC',
        description: 'Thảo luận hợp đồng phần mềm CRM',
        startDate: '2025-06-12',
        endDate: '2025-06-12',
        startTime: '09:00',
        endTime: '10:30',
        type: 'meeting',
        priority: 'high',
        location: 'Phòng họp A - Tầng 3',
        attendees: ['1', '2'],
        relatedType: 'lead',
        relatedId: '1',
        relatedName: 'Công ty ABC',
        isAllDay: false,
        isRecurring: false,
        reminderMinutes: [15, 30],
        color: '#3B82F6',
        createdBy: '2',
        createdAt: '2025-06-10T14:00:00',
        updatedAt: '2025-06-10T14:00:00'
      },
      {
        id: '2',
        title: 'Họp team hàng tuần',
        description: 'Review tiến độ và kế hoạch tuần mới',
        startDate: '2025-06-13',
        endDate: '2025-06-13',
        startTime: '14:00',
        endTime: '15:00',
        type: 'internal',
        priority: 'medium',
        location: 'Online - Zoom',
        attendees: ['1', '2', '3'],
        isAllDay: false,
        isRecurring: true,
        recurringPattern: 'weekly',
        reminderMinutes: [10],
        color: '#10B981',
        createdBy: '2',
        createdAt: '2025-06-01T10:00:00',
        updatedAt: '2025-06-01T10:00:00'
      },
      {
        id: '3',
        title: 'Demo sản phẩm cho khách hàng XYZ',
        description: 'Trình diễn tính năng quản lý nhân sự',
        startDate: '2025-06-14',
        endDate: '2025-06-14',
        startTime: '10:00',
        endTime: '11:00',
        type: 'meeting',
        priority: 'high',
        location: 'Văn phòng khách hàng',
        attendees: ['1'],
        relatedType: 'customer',
        relatedId: '2',
        relatedName: 'Công ty XYZ',
        isAllDay: false,
        isRecurring: false,
        reminderMinutes: [30, 60],
        color: '#F59E0B',
        createdBy: '1',
        createdAt: '2025-06-11T09:00:00',
        updatedAt: '2025-06-11T09:00:00'
      }
    ]

    // Quick event templates
    const sampleQuickTemplates: QuickEventTemplate[] = [
      {
        id: '1',
        title: 'Gặp khách hàng',
        type: 'meeting',
        duration: 60,
        location: 'Phòng họp',
        description: 'Cuộc họp với khách hàng',
        color: '#3B82F6'
      },
      {
        id: '2',
        title: 'Cuộc gọi tư vấn',
        type: 'meeting',
        duration: 30,
        description: 'Tư vấn qua điện thoại',
        color: '#8B5CF6'
      },
      {
        id: '3',
        title: 'Họp nội bộ',
        type: 'internal',
        duration: 45,
        location: 'Phòng họp',
        description: 'Họp team nội bộ',
        color: '#10B981'
      },
      {
        id: '4',
        title: 'Review dự án',
        type: 'internal',
        duration: 90,
        location: 'Phòng họp lớn',
        description: 'Đánh giá tiến độ dự án',
        color: '#F59E0B'
      },
      {
        id: '5',
        title: 'Coffee break',
        type: 'personal',
        duration: 15,
        description: 'Nghỉ giải lao',
        color: '#6B7280'
      }
    ]

    setHolidays(sampleHolidays)
    setCalendarEvents(sampleEvents)
    setQuickTemplates(sampleQuickTemplates)
  }

  // Utility functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  // Lunar calendar utilities
  const getLunarDate = (solarDate: Date): LunarDate => {
    // Simplified lunar calendar calculation (in real app, use proper lunar calendar library)
    const lunarMonths = [
      'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 
      'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
      'Tháng Chín', 'Tháng Mười', 'Tháng 11', 'Tháng Chạp'
    ]
    
    const can = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý']
    const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
    const zodiac = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
    
    // Simplified calculation - in real app use proper lunar calendar library
    const lunarDay = ((solarDate.getDate() - 15) % 29) + 1
    const lunarMonth = ((solarDate.getMonth() + 11) % 12) + 1
    const lunarYear = solarDate.getFullYear()
    
    return {
      lunarDay: Math.abs(lunarDay),
      lunarMonth,
      lunarYear,
      zodiac: zodiac[lunarYear % 12],
      can: can[lunarYear % 10],
      chi: chi[lunarYear % 12],
      monthName: lunarMonths[lunarMonth - 1]
    }
  }

  const isHoliday = (date: Date): Holiday | null => {
    const dateStr = date.toISOString().split('T')[0]
    return holidays.find(h => h.date === dateStr) || null
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    const tasks = filteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      return taskDate.toDateString() === date.toDateString()
    })
    
    const events = calendarEvents.filter(event => {
      return event.startDate === dateStr && 
             (!eventTypeFilter || event.type === eventTypeFilter)
    })
    
    return { tasks, events }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Cao'
      case 'medium': return 'Trung bình'
      case 'low': return 'Thấp'
      default: return priority
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn tất'
      case 'in_progress': return 'Đang làm'
      case 'pending': return 'Chưa làm'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_progress': return <Play className="w-4 h-4 text-blue-600" />
      case 'pending': return <Circle className="w-4 h-4 text-gray-600" />
      default: return <Circle className="w-4 h-4 text-gray-600" />
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-200'
    if (progress < 50) return 'bg-red-200'
    if (progress < 100) return 'bg-yellow-200'
    return 'bg-green-200'
  }

  const getProgressBarColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-400'
    if (progress < 50) return 'bg-red-500'
    if (progress < 100) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Filter functions
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.relatedName && task.relatedName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = !statusFilter || task.status === statusFilter
    const matchesPriority = !priorityFilter || task.priority === priorityFilter
    const matchesAssignee = !assigneeFilter || task.assignedTo === assigneeFilter
    const matchesTag = !tagFilter || task.tags.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
    
    let matchesDueDate = true
    if (dueDateFilter) {
      const taskDate = new Date(task.dueDate)
      const today = new Date()
      switch (dueDateFilter) {
        case 'overdue':
          matchesDueDate = taskDate < today && task.status !== 'completed'
          break
        case 'today':
          matchesDueDate = taskDate.toDateString() === today.toDateString()
          break
        case 'tomorrow':
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          matchesDueDate = taskDate.toDateString() === tomorrow.toDateString()
          break
        case 'this_week':
          const weekFromNow = new Date(today)
          weekFromNow.setDate(weekFromNow.getDate() + 7)
          matchesDueDate = taskDate >= today && taskDate <= weekFromNow
          break
      }
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesTag && matchesDueDate
  })

  // Statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
    highPriority: tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length
  }

  // Filter tasks based on selected stats filter
  const getFilteredTasksByStats = (statsFilter: string) => {
    switch (statsFilter) {
      case 'total':
        return tasks
      case 'pending':
        return tasks.filter(t => t.status === 'pending')
      case 'in_progress':
        return tasks.filter(t => t.status === 'in_progress')
      case 'completed':
        return tasks.filter(t => t.status === 'completed')
      case 'overdue':
        return tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed')
      case 'high_priority':
        return tasks.filter(t => t.priority === 'high' && t.status !== 'completed')
      default:
        return filteredTasks
    }
  }

  // Get tasks to display based on stats filter or regular filters  
  const displayTasks = selectedStatsFilter ? getFilteredTasksByStats(selectedStatsFilter) : filteredTasks

  // Handle stats card click
  const handleStatsCardClick = (filterType: string) => {
    if (selectedStatsFilter === filterType) {
      // If same filter clicked, clear it
      setSelectedStatsFilter('')
    } else {
      // Set new filter and clear other filters
      setSelectedStatsFilter(filterType)
      setSearchTerm('')
      setStatusFilter('')
      setPriorityFilter('')
      setAssigneeFilter('')
      setTagFilter('')
      setDueDateFilter('')
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Tổng quan Công việc</h2>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo công việc</span>
          </button>
          
          <button 
            onClick={() => setShowAutoRulesModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2 text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Tự động hóa</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div 
          className={`p-4 border border-blue-100 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStatsFilter === 'total' 
              ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300 transform scale-105' 
              : 'bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 hover:border-blue-200'
          }`}
          onClick={() => handleStatsCardClick('total')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng công việc</div>
              <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div 
          className={`p-4 border border-gray-100 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStatsFilter === 'pending' 
              ? 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-300 transform scale-105' 
              : 'bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 hover:border-gray-200'
          }`}
          onClick={() => handleStatsCardClick('pending')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Chưa làm</div>
              <div className="text-2xl font-bold text-gray-600">{taskStats.pending}</div>
            </div>
            <Circle className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div 
          className={`p-4 border border-yellow-100 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStatsFilter === 'in_progress' 
              ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-300 transform scale-105' 
              : 'bg-gradient-to-br from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50 hover:border-yellow-200'
          }`}
          onClick={() => handleStatsCardClick('in_progress')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Đang làm</div>
              <div className="text-2xl font-bold text-yellow-600">{taskStats.inProgress}</div>
            </div>
            <Play className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div 
          className={`p-4 border border-green-100 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStatsFilter === 'completed' 
              ? 'bg-gradient-to-br from-green-100 to-green-50 border-green-300 transform scale-105' 
              : 'bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-green-50 hover:border-green-200'
          }`}
          onClick={() => handleStatsCardClick('completed')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Hoàn tất</div>
              <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div 
          className={`p-4 border border-red-100 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStatsFilter === 'overdue' 
              ? 'bg-gradient-to-br from-red-100 to-red-50 border-red-300 transform scale-105' 
              : 'bg-gradient-to-br from-red-50 to-white hover:from-red-100 hover:to-red-50 hover:border-red-200'
          }`}
          onClick={() => handleStatsCardClick('overdue')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Quá hạn</div>
              <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div 
          className={`p-4 border border-purple-100 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStatsFilter === 'high_priority' 
              ? 'bg-gradient-to-br from-purple-100 to-purple-50 border-purple-300 transform scale-105' 
              : 'bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 hover:border-purple-200'
          }`}
          onClick={() => handleStatsCardClick('high_priority')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Ưu tiên cao</div>
              <div className="text-2xl font-bold text-purple-600">{taskStats.highPriority}</div>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* AI Suggestions & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Gợi ý từ AI</h3>
                <p className="text-sm text-gray-600">Phân tích thông minh từ dữ liệu công việc</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>Smart</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Priority Optimization - Clickable */}
            <div 
              className="bg-white rounded-lg p-4 border border-purple-100 cursor-pointer hover:border-red-300 hover:shadow-md transition-all duration-200 group"
              onClick={() => handleAISuggestionClick('overdue')}
            >
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-700">Ưu tiên cao cần xử lý</h4>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MousePointer className="w-3 h-3 text-red-600" />
                      <ArrowRight className="w-3 h-3 text-red-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Có <span className="font-semibold text-red-600">{taskStats.overdue}</span> công việc quá hạn và <span className="font-semibold text-purple-600">{taskStats.highPriority}</span> công việc ưu tiên cao.
                    Nên xử lý các công việc của Công ty ABC và Demo sản phẩm trước.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      Khẩn cấp
                    </span>
                    <span className="text-xs text-red-600 font-medium group-hover:underline">
                      Click để xem chi tiết →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workload Distribution - Clickable */}
            <div 
              className="bg-white rounded-lg p-4 border border-blue-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
              onClick={() => handleAISuggestionClick('workload', { assigneeId: '1' })}
            >
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Phân bổ công việc</h4>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BarChart3 className="w-3 h-3 text-blue-600" />
                      <ArrowRight className="w-3 h-3 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-semibold text-blue-600">Nguyễn Văn An</span> có {tasks.filter(t => t.assignedTo === '1').length} công việc, 
                    <span className="font-semibold text-blue-600">Trần Thị Bình</span> có {tasks.filter(t => t.assignedTo === '2').length} công việc.
                    Nên cân bằng lại khối lượng công việc.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Tối ưu hóa
                    </span>
                    <span className="text-xs text-blue-600 font-medium group-hover:underline">
                      Click để phân bổ lại →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insight - Clickable */}
            <div 
              className="bg-white rounded-lg p-4 border border-green-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all duration-200 group"
              onClick={() => handleAISuggestionClick('high_priority')}
            >
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-700">Hiệu suất tăng trưởng</h4>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <ArrowRight className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Tỷ lệ hoàn thành công việc tuần này tăng <span className="font-semibold text-green-600">15%</span> so với tuần trước.
                    Team đang có xu hướng làm việc hiệu quả hơn.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Tích cực
                    </span>
                    <span className="text-xs text-green-600 font-medium group-hover:underline">
                      Xem dạng kanban →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Actions - Clickable */}
            <div 
              className="bg-white rounded-lg p-4 border border-yellow-100 cursor-pointer hover:border-yellow-300 hover:shadow-md transition-all duration-200 group"
              onClick={() => handleAISuggestionClick('automation')}
            >
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-yellow-700">Hành động tiếp theo</h4>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap className="w-3 h-3 text-yellow-600" />
                      <ArrowRight className="w-3 h-3 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Nên tạo thêm công việc <span className="font-semibold text-yellow-600">&quot;Theo dõi feedback khách hàng&quot;</span> cho các deal đã hoàn thành
                    để tăng tỷ lệ retention.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Đề xuất
                    </span>
                    <span className="text-xs text-yellow-600 font-medium group-hover:underline">
                      Thiết lập tự động →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional AI Suggestions */}
            {/* Quick Actions */}
            <div 
              className="bg-white rounded-lg p-4 border border-indigo-100 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
              onClick={() => setShowCreateModal(true)}
            >
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Plus className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700">Hành động nhanh</h4>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap className="w-3 h-3 text-indigo-600" />
                      <ArrowRight className="w-3 h-3 text-indigo-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Tạo công việc mới cho <span className="font-semibold text-indigo-600">lead mới</span> hoặc 
                    <span className="font-semibold text-indigo-600"> follow-up khách hàng</span> đã tương tác gần đây.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      Nhanh chóng
                    </span>
                    <span className="text-xs text-indigo-600 font-medium group-hover:underline">
                      Tạo ngay →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Management */}
            <div 
              className="bg-white rounded-lg p-4 border border-orange-100 cursor-pointer hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
              onClick={() => {
                setActiveTab('calendar')
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-orange-700">Quản lý thời gian</h4>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Calendar className="w-3 h-3 text-orange-600" />
                      <ArrowRight className="w-3 h-3 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Có <span className="font-semibold text-orange-600">{tasks.filter(t => {
                      const dueDate = new Date(t.dueDate)
                      const tomorrow = new Date()
                      tomorrow.setDate(tomorrow.getDate() + 1)
                      return dueDate <= tomorrow
                    }).length}</span> công việc cần hoàn thành trong hôm nay và ngày mai.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      Lịch trình
                    </span>
                    <span className="text-xs text-orange-600 font-medium group-hover:underline">
                      Xem lịch →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Type Distribution Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phân loại Công việc</h3>
                <p className="text-sm text-gray-600">Thống kê theo loại và ưu tiên</p>
              </div>
            </div>
          </div>

          {/* Task Categories */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Theo loại công việc</h4>
              <div className="space-y-2">
                {/* Lead Tasks */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Lead & Khách hàng</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(tasks.filter(t => t.relatedType === 'lead' || t.relatedType === 'customer').length / tasks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tasks.filter(t => t.relatedType === 'lead' || t.relatedType === 'customer').length}
                    </span>
                  </div>
                </div>

                {/* Order Tasks */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Đơn hàng</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(tasks.filter(t => t.relatedType === 'order').length / tasks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tasks.filter(t => t.relatedType === 'order').length}
                    </span>
                  </div>
                </div>

                {/* General Tasks */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Nội bộ & Khác</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-purple-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(tasks.filter(t => t.relatedType === 'general' || !t.relatedType).length / tasks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tasks.filter(t => t.relatedType === 'general' || !t.relatedType).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Theo mức độ ưu tiên</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Cao</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-red-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(tasks.filter(t => t.priority === 'high').length / tasks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tasks.filter(t => t.priority === 'high').length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Trung bình</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-yellow-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(tasks.filter(t => t.priority === 'medium').length / tasks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tasks.filter(t => t.priority === 'medium').length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Thấp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gray-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(tasks.filter(t => t.priority === 'low').length / tasks.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tasks.filter(t => t.priority === 'low').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Tình trạng tiến độ</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">{tasks.filter(t => t.progress < 30).length}</div>
                  <div className="text-xs text-red-600">Chậm tiến độ</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">{tasks.filter(t => t.progress >= 30 && t.progress < 70).length}</div>
                  <div className="text-xs text-yellow-600">Đang tiến hành</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{tasks.filter(t => t.progress >= 70).length}</div>
                  <div className="text-xs text-green-600">Sắp hoàn thành</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Filter Indicator */}
      {selectedStatsFilter && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-blue-900">
                Đang hiển thị: {
                  selectedStatsFilter === 'total' ? 'Tất cả công việc' :
                  selectedStatsFilter === 'pending' ? 'Công việc chưa làm' :
                  selectedStatsFilter === 'in_progress' ? 'Công việc đang làm' :
                  selectedStatsFilter === 'completed' ? 'Công việc hoàn tất' :
                  selectedStatsFilter === 'overdue' ? 'Công việc quá hạn' :
                  selectedStatsFilter === 'high_priority' ? 'Công việc ưu tiên cao' : ''
                } ({displayTasks.length} công việc)
              </span>
            </div>
            <button
              onClick={() => setSelectedStatsFilter('')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        </div>
      )}

      {/* Recent Tasks / Filtered Tasks */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Công việc gần đây</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {tasks.slice(0, 5).map(task => (
            <div key={task.id} className="p-6 hover:bg-gray-50 cursor-pointer" onClick={() => {
              setSelectedTask(task)
              setShowDetailModal(true)
            }}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>Đến hạn: {formatDateTime(task.dueDate)}</span>
                    <span>Người phụ trách: {employees.find(e => e.id === task.assignedTo)?.name}</span>
                    {task.relatedType && (
                      <span>Liên quan: {task.relatedName}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                    {getPriorityText(task.priority)}
                  </span>
                  {task.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Tiến độ</span>
                  <span>{task.progress}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${getProgressColor(task.progress)}`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(task.progress)}`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Kanban columns configuration
  const kanbanColumns = [
    {
      id: 'pending',
      title: 'Chưa làm',
      status: 'pending',
      color: 'bg-gray-50',
      headerColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      count: filteredTasks.filter(task => task.status === 'pending').length
    },
    {
      id: 'in_progress', 
      title: 'Đang làm',
      status: 'in_progress',
      color: 'bg-blue-50',
      headerColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      count: filteredTasks.filter(task => task.status === 'in_progress').length
    },
    {
      id: 'completed',
      title: 'Hoàn tất',
      status: 'completed',
      color: 'bg-green-50',
      headerColor: 'bg-green-100', 
      textColor: 'text-green-700',
      count: filteredTasks.filter(task => task.status === 'completed').length
    }
  ]

  const renderTasks = () => (
    <div className="space-y-4">
      {/* Header and filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Danh sách Công việc</h2>
          
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTaskView('table')}
              className={`flex items-center space-x-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                taskView === 'table' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Bảng</span>
            </button>
            <button
              onClick={() => setTaskView('kanban')}
              className={`flex items-center space-x-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                taskView === 'kanban' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Kanban</span>
            </button>
          </div>
          
          {/* Column Selector - Only show for table view */}
          {taskView === 'table' && (
            <div className="relative column-selector">
              <button
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Columns className="w-4 h-4" />
                <span>Cột hiển thị</span>
                <ChevronUp className={`w-4 h-4 transition-transform ${showColumnSelector ? 'rotate-180' : ''}`} />
              </button>
              
              {showColumnSelector && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Chọn cột hiển thị</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.task}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, task: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Công việc</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.related}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, related: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Liên quan</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.assignee}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, assignee: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Người phụ trách</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.dueDate}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, dueDate: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Thời hạn</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.priority}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, priority: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Ưu tiên</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.progress}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, progress: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Tiến độ</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.status}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, status: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Trạng thái</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns.actions}
                          onChange={(e) => setVisibleColumns(prev => ({...prev, actions: e.target.checked}))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Thao tác</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-xs">
                        <button
                          onClick={() => {
                            setVisibleColumns({
                              task: true,
                              related: false,
                              assignee: true,
                              dueDate: true,
                              priority: true,
                              progress: false,
                              status: true,
                              actions: true
                            })
                          }}
                          className="text-gray-500 hover:text-gray-700 underline"
                        >
                          Cơ bản
                        </button>
                        
                        <span className="text-gray-300">|</span>
                        
                        <button
                          onClick={() => {
                            setVisibleColumns({
                              task: true,
                              related: true,
                              assignee: true,
                              dueDate: true,
                              priority: true,
                              progress: true,
                              status: true,
                              actions: true
                            })
                          }}
                          className="text-gray-500 hover:text-gray-700 underline"
                        >
                          Tất cả
                        </button>
                      </div>
                      
                      <button
                        onClick={() => setShowColumnSelector(false)}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Xong
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          {/* Search */}
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm công việc, mô tả, lead..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chưa làm</option>
              <option value="in_progress">Đang làm</option>
              <option value="completed">Hoàn tất</option>
            </select>
            
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Tất cả ưu tiên</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
            
            <select 
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Tất cả nhân viên</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            
            <select 
              value={dueDateFilter}
              onChange={(e) => setDueDateFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Tất cả thời hạn</option>
              <option value="overdue">Quá hạn</option>
              <option value="today">Hôm nay</option>
              <option value="tomorrow">Ngày mai</option>
              <option value="this_week">Tuần này</option>
            </select>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render based on view mode */}
      {taskView === 'kanban' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {kanbanColumns.map(column => {
            const columnTasks = filteredTasks.filter(task => task.status === column.status)
            
            return (
              <div key={column.id} className={`${column.color} rounded-lg border border-gray-200`}>
                {/* Column Header */}
                <div className={`${column.headerColor} px-4 py-3 rounded-t-lg border-b border-gray-200`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${column.textColor}`}>
                      {column.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-white ${column.textColor} border`}>
                      {column.count}
                    </span>
                  </div>
                </div>
                
                {/* Column Content */}
                <div className="p-4 space-y-3 min-h-[400px]">
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                      <Circle className="w-8 h-8 mb-2" />
                      <span className="text-sm">Không có công việc</span>
                    </div>
                  ) : (
                    columnTasks.map(task => {
                      const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'
                      const assignee = employees.find(e => e.id === task.assignedTo)
                      
                      return (
                        <div
                          key={task.id}
                          className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                            isOverdue ? 'border-red-300 bg-red-50' : ''
                          }`}
                          onClick={() => {
                            setSelectedTask(task)
                            setShowDetailModal(true)
                          }}
                        >
                          {/* Task Header */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                                {task.title}
                              </h4>
                              {task.description && (
                                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                              {getPriorityText(task.priority)}
                            </span>
                          </div>

                          {/* Task Info */}
                          <div className="space-y-2">
                            {/* Related info */}
                            {task.relatedType && (
                              <div className="flex items-center text-xs text-gray-600">
                                <FileText className="w-3 h-3 mr-1" />
                                <span>{task.relatedName}</span>
                                <span className="ml-1 text-gray-400">
                                  ({task.relatedType === 'lead' ? 'Lead' : 
                                    task.relatedType === 'order' ? 'Đơn hàng' : 'Khách hàng'})
                                </span>
                              </div>
                            )}

                            {/* Assignee */}
                            <div className="flex items-center text-xs text-gray-600">
                              <User className="w-3 h-3 mr-1" />
                              <span>{assignee?.name}</span>
                            </div>

                            {/* Due date */}
                            <div className={`flex items-center text-xs ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{formatDate(task.dueDate)}</span>
                              {isOverdue && (
                                <AlertTriangle className="w-3 h-3 ml-1" />
                              )}
                            </div>

                            {/* Progress */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Tiến độ</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className={`w-full h-1.5 rounded-full ${getProgressColor(task.progress)}`}>
                                <div 
                                  className={`h-1.5 rounded-full transition-all duration-300 ${getProgressBarColor(task.progress)}`}
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>

                            {/* Tags */}
                            {task.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {task.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="px-1.5 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                    {tag}
                                  </span>
                                ))}
                                {task.tags.length > 3 && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600">
                                    +{task.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Task Actions */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedTask(task)
                                  setShowDetailModal(true)
                                }}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedTask(task)
                                  setShowReminderModal(true)
                                }}
                                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                title="Cài đặt nhắc nhở"
                              >
                                <Bell className="w-3 h-3" />
                              </button>
                            </div>
                            
                            {task.status !== 'completed' && (
                              <div className="flex items-center space-x-1">
                                {task.status === 'pending' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const updatedTask = { ...task, status: 'in_progress' as const }
                                      handleUpdateTask(updatedTask)
                                    }}
                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                  >
                                    Bắt đầu
                                  </button>
                                )}
                                {task.status === 'in_progress' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const updatedTask = { ...task, status: 'completed' as const, progress: 100 }
                                      handleUpdateTask(updatedTask)
                                    }}
                                    className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                  >
                                    Hoàn thành
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        renderTaskTable()
      )}
    </div>
  )

  const renderTaskTable = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.task && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Công việc</th>
              )}
              {visibleColumns.related && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liên quan</th>
              )}
              {visibleColumns.assignee && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người phụ trách</th>
              )}
              {visibleColumns.dueDate && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời hạn</th>
              )}
              {visibleColumns.priority && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ưu tiên</th>
              )}
              {visibleColumns.progress && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiến độ</th>
              )}
              {visibleColumns.status && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              )}
              {visibleColumns.actions && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => {
              const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'
              const assignee = employees.find(e => e.id === task.assignedTo)
              
              return (
                <tr key={task.id} className={`hover:bg-gray-50 ${isOverdue ? 'bg-red-50' : ''}`}>
                  {visibleColumns.task && (
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{task.description}</div>
                        {task.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {task.tags.map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                  
                  {visibleColumns.related && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      {task.relatedType && (
                        <div>
                          <div className="font-medium text-gray-900">{task.relatedName}</div>
                          <div className="text-sm text-gray-500">
                            {task.relatedType === 'lead' && 'Lead'}
                            {task.relatedType === 'order' && 'Đơn hàng'}
                            {task.relatedType === 'customer' && 'Khách hàng'}
                          </div>
                          {task.relatedInfo?.phone && (
                            <div className="text-xs text-gray-400">{task.relatedInfo.phone}</div>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                  
                  {visibleColumns.assignee && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{assignee?.name}</div>
                        <div className="text-sm text-gray-500">{assignee?.team}</div>
                      </div>
                    </td>
                  )}
                  
                  {visibleColumns.dueDate && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={isOverdue ? 'text-red-600' : ''}>
                        <div className="font-medium">{formatDate(task.dueDate)}</div>
                        <div className="text-sm text-gray-500">{new Date(task.dueDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
                        {isOverdue && (
                          <div className="text-xs text-red-600 flex items-center mt-1">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Quá hạn
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                  
                  {visibleColumns.priority && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                      </span>
                    </td>
                  )}
                  
                  {visibleColumns.progress && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="w-full">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Tiến độ</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${getProgressColor(task.progress)}`}>
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(task.progress)}`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  )}
                  
                  {visibleColumns.status && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </td>
                  )}
                  
                  {visibleColumns.actions && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => {
                            setSelectedTask(task)
                            setShowDetailModal(true)
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTask(task)
                            setShowReminderModal(true)
                          }}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Cài đặt nhắc nhở"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCalendar = () => {
    // Get first day of month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDate = new Date(firstDayOfMonth)
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay()) // Start from Sunday
    
    // Generate calendar days
    const calendarDays = []
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      calendarDays.push(date)
    }
    
    const navigateMonth = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentDate)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      setCurrentDate(newDate)
    }
    
    const isToday = (date: Date) => {
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }
    
    const isCurrentMonth = (date: Date) => {
      return date.getMonth() === currentDate.getMonth()
    }

    const handleQuickEvent = (template: QuickEventTemplate, date: Date) => {
      const startTime = new Date()
      startTime.setHours(9, 0, 0, 0) // Default 9:00 AM
      const endTime = new Date(startTime.getTime() + template.duration * 60000)
      
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: template.title,
        description: template.description,
        startDate: date.toISOString().split('T')[0],
        endDate: date.toISOString().split('T')[0],
        startTime: startTime.toTimeString().slice(0, 5),
        endTime: endTime.toTimeString().slice(0, 5),
        type: template.type,
        priority: 'medium',
        location: template.location || '',
        attendees: [employees[0]?.id || '1'],
        isAllDay: false,
        isRecurring: false,
        reminderMinutes: [15],
        color: template.color,
        createdBy: employees[0]?.id || '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setCalendarEvents(prev => [...prev, newEvent])
    }
    
    return (
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Lịch Công việc - {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Hôm nay
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                →
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Calendar Options */}
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1 text-sm">
                <input
                  type="checkbox"
                  checked={showLunar}
                  onChange={(e) => setShowLunar(e.target.checked)}
                  className="rounded"
                />
                <Moon className="w-4 h-4" />
                <span>Âm lịch</span>
              </label>
              <label className="flex items-center space-x-1 text-sm">
                <input
                  type="checkbox"
                  checked={showHolidays}
                  onChange={(e) => setShowHolidays(e.target.checked)}
                  className="rounded"
                />
                <TreePine className="w-4 h-4" />
                <span>Nghỉ lễ</span>
              </label>
            </div>

            {/* Event Type Filter */}
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Tất cả sự kiện</option>
              <option value="task">Công việc</option>
              <option value="meeting">Gặp khách hàng</option>
              <option value="internal">Nội bộ</option>
              <option value="personal">Cá nhân</option>
              <option value="holiday">Nghỉ lễ</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setCalendarView('month')}
                className={`px-3 py-1 text-sm rounded ${calendarView === 'month' ? 'bg-white shadow-sm' : ''}`}
              >
                Tháng
              </button>
              <button
                onClick={() => setCalendarView('week')}
                className={`px-3 py-1 text-sm rounded ${calendarView === 'week' ? 'bg-white shadow-sm' : ''}`}
              >
                Tuần
              </button>
            </div>

            {/* Create Event Button */}
            <button
              onClick={() => {
                setSelectedEventDate(new Date())
                setShowCreateEventModal(true)
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo lịch</span>
            </button>
          </div>
        </div>

        {/* Quick Event Templates */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Tạo lịch nhanh</h3>
          <div className="flex flex-wrap gap-2">
            {quickTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => handleQuickEvent(template, new Date())}
                className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                style={{ borderLeftColor: template.color, borderLeftWidth: '3px' }}
              >
                {template.type === 'meeting' && <Users className="w-4 h-4" />}
                {template.type === 'internal' && <Building className="w-4 h-4" />}
                {template.type === 'personal' && <Coffee className="w-4 h-4" />}
                <span>{template.title}</span>
                <span className="text-gray-500">({template.duration}p)</span>
              </button>
            ))}
          </div>
        </div>
        
        {calendarView === 'month' ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Calendar weekday headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map(day => (
                <div key={day} className="px-2 py-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((date, index) => {
                const { tasks, events } = getEventsForDate(date)
                const holiday = showHolidays ? isHoliday(date) : null
                const lunarDate = showLunar ? getLunarDate(date) : null
                const isWeekend = date.getDay() === 0 || date.getDay() === 6
                
                return (
                  <div
                    key={index}
                    className={`min-h-[140px] p-2 border-r border-b border-gray-200 relative ${
                      !isCurrentMonth(date) ? 'bg-gray-50' : 
                      isToday(date) ? 'bg-blue-50' : 
                      holiday ? 'bg-red-50' :
                      isWeekend ? 'bg-orange-50' : 'bg-white'
                    }`}
                  >
                    {/* Date header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-sm font-medium ${
                        !isCurrentMonth(date) ? 'text-gray-400' : 
                        isToday(date) ? 'text-blue-600' : 
                        holiday ? 'text-red-600' :
                        isWeekend ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      {/* Quick add button */}
                      <button
                        onClick={() => {
                          setSelectedEventDate(date)
                          setShowCreateEventModal(true)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 transition-all"
                        title="Thêm sự kiện"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Lunar calendar */}
                    {showLunar && lunarDate && (
                      <div className="text-xs text-gray-500 mb-1">
                        {lunarDate.lunarDay}/{lunarDate.lunarMonth} {lunarDate.can} {lunarDate.chi}
                      </div>
                    )}
                    
                    {/* Holiday */}
                    {holiday && (
                      <div className="text-xs text-red-600 font-medium mb-1 flex items-center">
                        <TreePine className="w-3 h-3 mr-1" />
                        {holiday.name}
                      </div>
                    )}
                    
                    {/* Events and tasks */}
                    <div className="space-y-1">
                      {/* Tasks */}
                      {tasks.slice(0, 2).map(task => (
                        <div
                          key={`task-${task.id}`}
                          onClick={() => {
                            setSelectedTask(task)
                            setShowDetailModal(true)
                          }}
                          className={`text-xs p-1 rounded cursor-pointer truncate border-l-2 ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-700 border-red-400' 
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
                              : 'bg-gray-100 text-gray-700 border-gray-400'
                          }`}
                          title={task.title}
                        >
                          <div className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {task.title}
                          </div>
                        </div>
                      ))}
                      
                      {/* Events */}
                      {events.slice(0, 3 - tasks.slice(0, 2).length).map(event => (
                        <div
                          key={`event-${event.id}`}
                          onClick={() => setSelectedEvent(event)}
                          className="text-xs p-1 rounded cursor-pointer truncate border-l-2"
                          style={{ 
                            backgroundColor: event.color + '20', 
                            color: event.color,
                            borderLeftColor: event.color
                          }}
                          title={event.title}
                        >
                          <div className="flex items-center">
                            {event.type === 'meeting' && <Users className="w-3 h-3 mr-1" />}
                            {event.type === 'internal' && <Building className="w-3 h-3 mr-1" />}
                            {event.type === 'personal' && <User className="w-3 h-3 mr-1" />}
                            <span className="truncate">{event.title}</span>
                          </div>
                          {!event.isAllDay && (
                            <div className="text-xs opacity-75">
                              {event.startTime} - {event.endTime}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* More indicator */}
                      {(tasks.length + events.length) > 3 && (
                        <div className="text-xs text-gray-500 font-medium">
                          +{(tasks.length + events.length) - 3} khác
                        </div>
                      )}
                    </div>

                    {/* Quick event templates on hover */}
                    <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="relative group">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Plus className="w-3 h-3" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48 hidden group-hover:block">
                          {quickTemplates.slice(0, 3).map(template => (
                            <button
                              key={template.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleQuickEvent(template, date)
                              }}
                              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center space-x-2"
                            >
                              {template.type === 'meeting' && <Users className="w-3 h-3" />}
                              {template.type === 'internal' && <Building className="w-3 h-3" />}
                              {template.type === 'personal' && <Coffee className="w-3 h-3" />}
                              <span>{template.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 text-center text-gray-500">
              Chế độ xem tuần đang phát triển...
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Chú thích</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Gặp khách hàng</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Nội bộ</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span>Cá nhân</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Ưu tiên cao</span>
            </div>
            <div className="flex items-center space-x-2">
              <TreePine className="w-3 h-3 text-red-600" />
              <span>Nghỉ lễ</span>
            </div>
            <div className="flex items-center space-x-2">
              <Moon className="w-3 h-3 text-blue-600" />
              <span>Âm lịch</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="w-3 h-3 text-orange-600" />
              <span>Cuối tuần</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-3 h-3 text-blue-600" />
              <span>Hôm nay</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAutomation = () => (
    <div className="space-y-6">
      {/* Automation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Tự động hóa Công việc</h2>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowAutoRulesModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Quản lý quy tắc</span>
          </button>
        </div>
      </div>

      {/* Auto Rules Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng quy tắc</p>
              <p className="text-2xl font-bold text-gray-900">{autoRules.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-600">{autoRules.filter(r => r.isActive).length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tạm dừng</p>
              <p className="text-2xl font-bold text-orange-600">{autoRules.filter(r => !r.isActive).length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Pause className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Công việc tự động</p>
              <p className="text-2xl font-bold text-purple-600">
                {tasks.filter(t => t.isAutoCreated).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Danh sách Quy tắc</h3>
        </div>

        {autoRules.length === 0 ? (
          <div className="p-8 text-center">
            <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có quy tắc tự động</h3>
            <p className="text-gray-500 mb-4">
              Tạo quy tắc tự động để hệ thống tự động tạo công việc khi có thay đổi trạng thái lead hoặc đơn hàng.
            </p>
            <button
              onClick={() => setShowAutoRulesModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tạo quy tắc đầu tiên
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {autoRules.map(rule => (
              <div key={rule.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium text-gray-900">{rule.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rule.isActive 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {rule.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                      </span>
                    </div>
                    
                    <div className="mt-2 space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Điều kiện:</span>{' '}
                        {rule.trigger.type === 'lead_stage' ? 'Thay đổi giai đoạn Lead' : 'Thay đổi trạng thái Đơn hàng'}{' '}
                        → <span className="font-medium">{rule.trigger.value}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Hành động:</span> Tạo công việc &quot;{rule.taskTemplate.title}&quot;
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Phân công:</span>{' '}
                        {rule.taskTemplate.assignToType === 'lead_owner' ? 'Chủ sở hữu Lead' :
                         rule.taskTemplate.assignToType === 'order_owner' ? 'Chủ sở hữu Đơn hàng' :
                         `Nhóm: ${rule.taskTemplate.assignToValue}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const updatedRules = autoRules.map(r => 
                          r.id === rule.id ? { ...r, isActive: !r.isActive } : r
                        )
                        setAutoRules(updatedRules)
                      }}
                      className={`p-2 rounded-md transition-colors ${
                        rule.isActive 
                          ? 'text-orange-600 hover:bg-orange-50' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={rule.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                    >
                      {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderReports = () => {
    // Calculate report metrics
    const completedTasks = tasks.filter(t => t.status === 'completed')
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed')
    const totalTasksThisMonth = tasks.filter(t => {
      const taskDate = new Date(t.createdAt)
      const now = new Date()
      return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear()
    })
    
    const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0
    const overdueRate = tasks.length > 0 ? Math.round((overdueTasks.length / tasks.length) * 100) : 0
    
    // Employee performance
    const employeeStats = employees.map(emp => {
      const empTasks = tasks.filter(t => t.assignedTo === emp.id)
      const empCompleted = empTasks.filter(t => t.status === 'completed')
      const empOverdue = empTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed')
      
      return {
        ...emp,
        totalTasks: empTasks.length,
        completedTasks: empCompleted.length,
        overdueTasks: empOverdue.length,
        completionRate: empTasks.length > 0 ? Math.round((empCompleted.length / empTasks.length) * 100) : 0
      }
    }).filter(emp => emp.totalTasks > 0)
    
    // Priority distribution
    const priorityStats = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    }
    
    return (
      <div className="space-y-6">
        {/* Reports Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Báo cáo & Phân tích</h2>
          
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Xuất Excel</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Xuất PDF</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">{completionRate}%</p>
                <p className="text-xs text-gray-500 mt-1">{completedTasks.length}/{tasks.length} công việc</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ quá hạn</p>
                <p className="text-2xl font-bold text-red-600">{overdueRate}%</p>
                <p className="text-xs text-gray-500 mt-1">{overdueTasks.length} công việc</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Công việc tháng này</p>
                <p className="text-2xl font-bold text-blue-600">{totalTasksThisMonth.length}</p>
                <p className="text-xs text-gray-500 mt-1">Tăng 12% so với tháng trước</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hiệu suất trung bình</p>
                <p className="text-2xl font-bold text-purple-600">8.5/10</p>
                <p className="text-xs text-gray-500 mt-1">Dựa trên thời gian hoàn thành</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Performance */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Hiệu suất Nhân viên</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {employeeStats.slice(0, 5).map(emp => (
                  <div key={emp.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-sm text-gray-500">{emp.totalTasks} công việc</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{emp.completionRate}%</p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${emp.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Phân bố theo Ưu tiên</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Cao</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-red-500 rounded-full"
                        style={{ width: `${tasks.length > 0 ? (priorityStats.high / tasks.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{priorityStats.high}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Trung bình</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-yellow-500 rounded-full"
                        style={{ width: `${tasks.length > 0 ? (priorityStats.medium / tasks.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{priorityStats.medium}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Thấp</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gray-500 rounded-full"
                        style={{ width: `${tasks.length > 0 ? (priorityStats.low / tasks.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{priorityStats.low}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reports Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Chi tiết Hiệu suất</h3>
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option value="all">Tất cả nhân viên</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhân viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng CV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoàn thành
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quá hạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tỷ lệ HT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điểm
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeStats.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                          <div className="text-sm text-gray-500">{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.totalTasks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {emp.completedTasks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {emp.overdueTasks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.completionRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        emp.completionRate >= 90 ? 'bg-green-100 text-green-800' :
                        emp.completionRate >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {emp.completionRate >= 90 ? 'Xuất sắc' :
                         emp.completionRate >= 70 ? 'Tốt' : 'Cần cải thiện'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const handleCreateEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents(prev => [...prev, newEvent])
  }

  const handleUpdateAutoRules = (updatedRules: AutoTaskRule[]) => {
    setAutoRules(updatedRules)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Công việc</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Danh sách
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Lịch
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'automation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tự động hóa
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Báo cáo
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'automation' && renderAutomation()}
      {activeTab === 'reports' && renderReports()}

      {/* Modals */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateTask}
        templates={templates}
        employees={employees}
        leads={leads}
        orders={orders}
        customers={customers}
      />

      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
        employees={employees}
      />

      <AutoTaskRulesModal
        isOpen={showAutoRulesModal}
        onClose={() => setShowAutoRulesModal(false)}
        onSave={handleUpdateAutoRules}
        employees={employees}
        rules={autoRules}
      />

      <CreateEventModal
        isOpen={showCreateEventModal}
        onClose={() => setShowCreateEventModal(false)}
        onSave={handleCreateEvent}
        selectedDate={selectedEventDate}
        employees={employees}
        leads={leads}
        orders={orders}
        customers={customers}
      />
    </div>
  )
}
