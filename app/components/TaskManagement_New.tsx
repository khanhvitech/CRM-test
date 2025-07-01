'use client'

import React, { useState, useEffect } from 'react'
import CreateTaskModal from './CreateTaskModal'
import TaskDetailModal from './TaskDetailModal'
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
  recurringPattern?: string
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
  attendees: string[]
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

export default function TaskManagement() {
  const [activeTab, setActiveTab] = useState('tasks')
  const [tasks, setTasks] = useState<Task[]>([])
  const [templates, setTemplates] = useState<TaskTemplate[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [dueDateFilter, setDueDateFilter] = useState('')
  const [selectedStatsFilter, setSelectedStatsFilter] = useState<string>('')

  // Task view state
  const [taskView, setTaskView] = useState<'table' | 'kanban'>('table')
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    task: true,
    category: true,
    related: true,
    assignee: true,
    dueDate: true,
    priority: true,
    progress: true,
    status: true,
    tags: true,
    createdDate: true,
    actions: true
  })
  
  const [showColumnSelector, setShowColumnSelector] = useState(false)

  // Initialize sample data
  useEffect(() => {
    initializeSampleData()
  }, [])

  const initializeSampleData = () => {
    // Sample employees
    const sampleEmployees: Employee[] = [
      { id: '1', name: 'Nguyễn Văn An', email: 'an@company.com', phone: '0123456789', role: 'Sales', team: 'Team A', isActive: true },
      { id: '2', name: 'Trần Thị Bình', email: 'binh@company.com', phone: '0123456790', role: 'Sales Manager', team: 'Team B', isActive: true },
      { id: '3', name: 'Lê Văn Cường', email: 'cuong@company.com', phone: '0123456791', role: 'Support', team: 'Team A', isActive: true }
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
        dueDate: '2025-07-15T10:00:00',
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
        createdAt: '2025-07-01T09:00:00',
        createdBy: '2',
        updatedAt: '2025-07-01T09:00:00',
        history: []
      },
      {
        id: '2',
        title: 'Gửi hợp đồng ORD-001',
        description: 'Gửi hợp đồng phần mềm CRM cho Công ty ABC',
        dueDate: '2025-07-10T15:00:00',
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
        progressNotes: [],
        isAutoCreated: true,
        autoTrigger: 'order_confirmed',
        reminders: [],
        customReminders: [],
        createdAt: '2025-06-28T16:00:00',
        createdBy: 'system',
        updatedAt: '2025-07-01T14:00:00',
        history: []
      },
      {
        id: '3',
        title: 'Chăm sóc khách hàng VIP',
        description: 'Liên hệ chăm sóc và tư vấn sản phẩm mới',
        dueDate: '2025-07-20T14:00:00',
        priority: 'high',
        status: 'pending',
        progress: 0,
        assignedTo: '2',
        tags: ['VIP', 'Chăm sóc'],
        relatedType: 'customer',
        relatedId: '1',
        relatedName: 'Công ty ABC',
        relatedInfo: { phone: '0987654321' },
        internalNotes: 'Khách hàng đã mua sản phẩm 6 tháng trước',
        progressNotes: [],
        isAutoCreated: false,
        reminders: [],
        customReminders: [],
        createdAt: '2025-07-01T08:30:00',
        createdBy: '1',
        updatedAt: '2025-07-01T08:30:00',
        history: []
      }
    ]

    setEmployees(sampleEmployees)
    setLeads(sampleLeads)
    setOrders(sampleOrders)
    setCustomers(sampleCustomers)
    setTasks(sampleTasks)
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Cao'
      case 'medium':
        return 'Trung bình'
      case 'low':
        return 'Thấp'
      default:
        return 'Không xác định'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chưa làm'
      case 'in_progress':
        return 'Đang làm'
      case 'completed':
        return 'Hoàn tất'
      default:
        return 'Không xác định'
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'lead':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'order':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'customer':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'general':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryText = (category?: string) => {
    switch (category) {
      case 'lead':
        return 'Lead'
      case 'order':
        return 'Đơn hàng'
      case 'customer':
        return 'Khách hàng'
      case 'general':
        return 'Tổng quát'
      default:
        return 'Khác'
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !searchTerm || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.relatedName?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = !statusFilter || task.status === statusFilter
    const matchesPriority = !priorityFilter || task.priority === priorityFilter
    const matchesAssignee = !assigneeFilter || task.assignedTo === assigneeFilter
    const matchesTag = !tagFilter || task.tags.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))

    const matchesDueDate = !dueDateFilter || (() => {
      const taskDate = new Date(task.dueDate)
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

      switch (dueDateFilter) {
        case 'overdue':
          return taskDate < today && task.status !== 'completed'
        case 'today':
          return taskDate.toDateString() === today.toDateString()
        case 'tomorrow':
          return taskDate.toDateString() === tomorrow.toDateString()
        case 'this_week':
          return taskDate >= today && taskDate <= weekFromNow
        default:
          return true
      }
    })()

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesTag && matchesDueDate
  })

  // Filter tasks based on selected stats filter
  const getFilteredTasksByStats = (statsFilter: string) => {
    switch (statsFilter) {
      case 'leads':
        return tasks.filter(t => t.relatedType === 'lead')
      case 'customers':
        return tasks.filter(t => t.relatedType === 'customer')
      case 'other':
        return tasks.filter(t => !t.relatedType || t.relatedType === 'general')
      default:
        return filteredTasks
    }
  }

  // Get tasks to display based on stats filter or regular filters  
  const displayTasks = selectedStatsFilter ? getFilteredTasksByStats(selectedStatsFilter) : filteredTasks

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const handleCreateEvent = (newEvent: CalendarEvent) => {
    // Handle event creation
    console.log('New event created:', newEvent)
  }

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

      {/* Quick View Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Chọn chế độ xem</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => {
              setAssigneeFilter('')
              setStatusFilter('')
              setPriorityFilter('')
              setTagFilter('')
              setDueDateFilter('')
              setSelectedStatsFilter('leads')
            }}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            style={{ borderLeftColor: '#3B82F6', borderLeftWidth: '3px' }}
          >
            <Users className="w-4 h-4" />
            <span>Công việc Leads</span>
          </button>
          
          <button 
            onClick={() => {
              setAssigneeFilter('')
              setStatusFilter('')
              setPriorityFilter('')
              setTagFilter('')
              setDueDateFilter('')
              setSelectedStatsFilter('customers')
            }}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            style={{ borderLeftColor: '#8B5CF6', borderLeftWidth: '3px' }}
          >
            <User className="w-4 h-4" />
            <span>Công việc Khách hàng</span>
          </button>
          
          <button 
            onClick={() => {
              setAssigneeFilter('1')
              setStatusFilter('')
              setPriorityFilter('')
              setTagFilter('')
              setDueDateFilter('')
              setSelectedStatsFilter('')
            }}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            style={{ borderLeftColor: '#10B981', borderLeftWidth: '3px' }}
          >
            <Building className="w-4 h-4" />
            <span>Của Team A</span>
          </button>
          
          <button 
            onClick={() => {
              setAssigneeFilter('2')
              setStatusFilter('')
              setPriorityFilter('')
              setTagFilter('')
              setDueDateFilter('')
              setSelectedStatsFilter('')
            }}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            style={{ borderLeftColor: '#F59E0B', borderLeftWidth: '3px' }}
          >
            <Building className="w-4 h-4" />
            <span>Của Team B</span>
          </button>
          
          <button 
            onClick={() => {
              setAssigneeFilter('')
              setStatusFilter('')
              setPriorityFilter('')
              setTagFilter('')
              setDueDateFilter('')
              setSelectedStatsFilter('other')
            }}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            style={{ borderLeftColor: '#6B7280', borderLeftWidth: '3px' }}
          >
            <MoreVertical className="w-4 h-4" />
            <span>Khác</span>
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.task && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc
                  </th>
                )}
                {visibleColumns.category && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phân loại
                  </th>
                )}
                {visibleColumns.related && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên quan
                  </th>
                )}
                {visibleColumns.assignee && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người phụ trách
                  </th>
                )}
                {visibleColumns.dueDate && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời hạn
                  </th>
                )}
                {visibleColumns.priority && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ưu tiên
                  </th>
                )}
                {visibleColumns.progress && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiến độ
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                )}
                {visibleColumns.tags && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                )}
                {visibleColumns.createdDate && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                )}
                {visibleColumns.actions && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayTasks.map((task) => {
                const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'
                const assignee = employees.find(e => e.id === task.assignedTo)
                
                return (
                  <tr key={task.id} className={`hover:bg-gray-50 ${isOverdue ? 'bg-red-50' : ''}`}>
                    {visibleColumns.task && (
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{task.description}</div>
                        </div>
                      </td>
                    )}
                    
                    {visibleColumns.category && (
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(task.relatedType)}`}>
                          {getCategoryText(task.relatedType)}
                        </span>
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
                          <div className="w-full h-2 rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full transition-all duration-300 bg-blue-500"
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
                    
                    {visibleColumns.tags && (
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    )}
                    
                    {visibleColumns.createdDate && (
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{formatDate(task.createdAt)}</div>
                          <div className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
                          <div className="text-xs text-gray-400">
                            Bởi: {employees.find(e => e.id === task.createdBy)?.name || task.createdBy}
                          </div>
                        </div>
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
    </div>
  )

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
            onClick={() => setActiveTab('tasks')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Danh sách
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && renderTasks()}

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
