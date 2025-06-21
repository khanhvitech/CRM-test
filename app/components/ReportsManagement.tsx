'use client'

import { useState } from 'react'
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Activity,
  Target,
  MessageSquare,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Brain,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  LineChart,
  Settings,
  Save,
  Upload,
  Share2,
  Copy,
  ExternalLink,
  Facebook,
  Send,
  Layers,
  Calendar as CalendarIcon,
  BarChart2,
  Monitor,
  Star,
  XCircle,
  Edit
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'

// Interfaces
interface SalesReport {
  id: string
  dateRange: string
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  ordersByStatus: {
    paid: number
    unpaid: number
    pending_contract: number
    drafting_contract: number
    cancelled: number
  }
  createdAt: string
}

interface SalesPerformanceReport {
  id: string
  salesPerson: string
  salesTeam: string
  dateRange: string
  leadsAssigned: number
  ordersCreated: number
  conversionRate: number
  revenue: number
  leadsBySource: {
    zalo: number
    facebook: number
    manual: number
  }
  createdAt: string
}

interface SalesProcessAnalysis {
  id: string
  stage: string
  leadsCount: number
  conversionRate: number
  averageTimeInStage: number
  dropoffRate: number
}

interface InteractionReport {
  id: string
  period: string
  platform: string
  totalInteractions: number  
  interactionsByChannel: {
    zalo: number
    facebook: number
    email: number
    phone: number
  }
  topPerformingAgents: Array<{
    agentName: string
    interactions: number
    responseRate: number
    avgResponseTime: number
  }>
  averageResponseTime: number
  responseRate: number
  conversionsFromInteractions: number
}

interface ComparisonReport {
  id: string
  period1: {
    name: string
    startDate: string
    endDate: string
  }
  period2: {
    name: string
    startDate: string
    endDate: string
  }
  metrics: {
    [key: string]: {
      period1: number
      period2: number
      change: number
    }
  }
}

// KPI Interfaces
interface KPI {
  id: number
  name: string
  current: number
  target: number
  unit: string
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  category: 'sales' | 'marketing' | 'operations' | 'finance'
  trend: 'up' | 'down' | 'stable'
  achievement: number
  description?: string
  assignedTo?: number // Employee ID responsible for this KPI
  departmentId?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  history: KPIHistory[]
}

interface KPIHistory {
  id: number
  kpiId: number
  value: number
  target: number
  period: string // e.g., "2024-06", "2024-Q2"
  recordedAt: string
  recordedBy: number
  note?: string
}

interface KPITarget {
  id: number
  kpiId: number
  period: string
  target: number
  createdAt: string
  createdBy: number
}

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  position: string
  department: string
  departmentId: number
  teamId?: number
  teamName?: string
  hireDate: string
  probationEndDate?: string
  officialDate?: string
  contractType: 'probation' | 'official' | 'contract'
  workingDays: number
  salary: number
  status: 'active' | 'inactive' | 'on_leave'
  avatar?: string
  performance: number
  salesThisMonth: number
  leadsConverted: number
  tasksCompleted: number
  kpiScore: number
  attendanceRate: number
  customerSatisfaction: number
  projectsCompleted: number
  skillLevel: 'junior' | 'middle' | 'senior' | 'expert'
}

// Sample Data
const sampleSalesReports: SalesReport[] = [
  {
    id: '1',
    dateRange: '01/06/2025 - 07/06/2025',
    totalRevenue: 450000000,
    totalOrders: 125,
    averageOrderValue: 3600000,
    ordersByStatus: {
      paid: 75,
      unpaid: 30,
      pending_contract: 15,
      drafting_contract: 3,
      cancelled: 2
    },
    createdAt: '2025-06-08T00:00:00'
  }
]

const sampleSalesPerformance: SalesPerformanceReport[] = [
  {
    id: '1',
    salesPerson: 'Nguyễn Văn An',
    salesTeam: 'Team A',
    dateRange: '01/06/2025 - 07/06/2025',
    leadsAssigned: 45,
    ordersCreated: 18,
    conversionRate: 40,
    revenue: 125000000,
    leadsBySource: {
      zalo: 25,
      facebook: 15,
      manual: 5
    },
    createdAt: '2025-06-08T00:00:00'
  },
  {
    id: '2',
    salesPerson: 'Trần Thị Bình',
    salesTeam: 'Team B',
    dateRange: '01/06/2025 - 07/06/2025',
    leadsAssigned: 38,
    ordersCreated: 22,
    conversionRate: 58,
    revenue: 180000000,
    leadsBySource: {
      zalo: 20,
      facebook: 12,
      manual: 6
    },
    createdAt: '2025-06-08T00:00:00'
  }
]

const sampleProcessAnalysis: SalesProcessAnalysis[] = [
  {
    id: '1',
    stage: 'Tiếp nhận',
    leadsCount: 150,
    conversionRate: 85,
    averageTimeInStage: 1,
    dropoffRate: 15
  },
  {
    id: '2',
    stage: 'Tư vấn',
    leadsCount: 128,
    conversionRate: 75,
    averageTimeInStage: 3,
    dropoffRate: 25
  },
  {
    id: '3',
    stage: 'Báo giá',
    leadsCount: 96,
    conversionRate: 60,
    averageTimeInStage: 5,
    dropoffRate: 40
  },
  {
    id: '4',
    stage: 'Chốt Deal',
    leadsCount: 58,
    conversionRate: 45,
    averageTimeInStage: 7,
    dropoffRate: 55
  }
]

// Sample KPI data
const sampleKPIs: KPI[] = [
  {
    id: 1,
    name: "Doanh số tháng",
    current: 450000000,
    target: 500000000,
    unit: "VND",
    period: "monthly",
    category: "sales",
    trend: "up",
    achievement: 90,
    description: "Tổng doanh số bán hàng trong tháng",
    assignedTo: 2,
    departmentId: 1,
    isActive: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2025-06-11T00:00:00",
    history: [
      {
        id: 1,
        kpiId: 1,
        value: 450000000,
        target: 500000000,
        period: "2025-06",
        recordedAt: "2025-06-11T00:00:00",
        recordedBy: 2,
        note: "Doanh số tháng 6 đang khả quan"
      },
      {
        id: 2,
        kpiId: 1,
        value: 480000000,
        target: 500000000,
        period: "2025-05",
        recordedAt: "2025-05-31T00:00:00",
        recordedBy: 2,
        note: "Đạt 96% mục tiêu tháng 5"
      }
    ]
  },
  {
    id: 2,
    name: "Số leads mới",
    current: 285,
    target: 300,
    unit: "leads",
    period: "monthly",
    category: "marketing",
    trend: "up",
    achievement: 95,
    description: "Số lượng leads mới được tạo trong tháng",
    assignedTo: 4,
    departmentId: 2,
    isActive: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2025-06-11T00:00:00",
    history: [
      {
        id: 3,
        kpiId: 2,
        value: 285,
        target: 300,
        period: "2025-06",
        recordedAt: "2025-06-11T00:00:00",
        recordedBy: 4,
        note: "Cần tăng cường hoạt động marketing"
      }
    ]
  },
  {
    id: 3,
    name: "Tỷ lệ chuyển đổi",
    current: 25,
    target: 30,
    unit: "%",
    period: "monthly",
    category: "sales",
    trend: "up",
    achievement: 83,
    description: "Tỷ lệ chuyển đổi từ leads thành khách hàng",
    assignedTo: 2,
    departmentId: 1,
    isActive: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2025-06-11T00:00:00",
    history: [
      {
        id: 4,
        kpiId: 3,
        value: 25,
        target: 30,
        period: "2025-06",
        recordedAt: "2025-06-11T00:00:00",
        recordedBy: 2,
        note: "Cần cải thiện quy trình bán hàng"
      }
    ]
  },
  {
    id: 4,
    name: "Doanh thu/nhân viên",
    current: 180000000,
    target: 200000000,
    unit: "VND",
    period: "monthly",
    category: "operations",
    trend: "up",
    achievement: 90,
    description: "Doanh thu trung bình mỗi nhân viên",
    assignedTo: 1,
    isActive: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2025-06-11T00:00:00",
    history: [
      {
        id: 5,
        kpiId: 4,
        value: 180000000,
        target: 200000000,
        period: "2025-06",
        recordedAt: "2025-06-11T00:00:00",
        recordedBy: 1,
        note: "Hiệu suất làm việc ổn định"
      }
    ]
  },
  {
    id: 5,
    name: "Chỉ số hài lòng KH",
    current: 4.2,
    target: 4.5,
    unit: "/5",
    period: "monthly",
    category: "operations",
    trend: "stable",
    achievement: 93,
    description: "Điểm đánh giá trung bình của khách hàng",
    assignedTo: 3,
    departmentId: 3,
    isActive: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2025-06-11T00:00:00",
    history: [
      {
        id: 6,
        kpiId: 5,
        value: 4.2,
        target: 4.5,
        period: "2025-06",
        recordedAt: "2025-06-11T00:00:00",
        recordedBy: 3,
        note: "Chất lượng dịch vụ tốt"
      }
    ]
  },
  {
    id: 6,
    name: "Chi phí vận hành",
    current: 120000000,
    target: 100000000,
    unit: "VND",
    period: "monthly",
    category: "finance",
    trend: "down",
    achievement: 83,
    description: "Tổng chi phí vận hành hàng tháng",
    assignedTo: 5,
    isActive: true,
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2025-06-11T00:00:00",
    history: [
      {
        id: 7,
        kpiId: 6,
        value: 120000000,
        target: 100000000,
        period: "2025-06",
        recordedAt: "2025-06-11T00:00:00",
        recordedBy: 5,
        note: "Cần tối ưu hóa chi phí"
      }
    ]
  }
]

const sampleEmployees: Employee[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@company.com",
    phone: "0901234567",
    position: "Sales Manager",
    department: "Kinh doanh",
    departmentId: 1,
    teamId: 1,
    teamName: "Sales Team A",
    hireDate: "2023-01-15",
    probationEndDate: "2023-04-15",
    officialDate: "2023-04-16",
    contractType: "official",
    workingDays: 852,
    salary: 25000000,
    status: "active",
    performance: 92,
    salesThisMonth: 150000000,
    leadsConverted: 23,
    tasksCompleted: 45,
    kpiScore: 88,
    attendanceRate: 96,
    customerSatisfaction: 4.5,
    projectsCompleted: 12,
    skillLevel: "senior"
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "tran.thi.binh@company.com",
    phone: "0901234568",
    position: "Sales Director",
    department: "Kinh doanh",
    departmentId: 1,
    teamId: 2,
    teamName: "Sales Team B",
    hireDate: "2022-03-20",
    probationEndDate: "2022-06-20",
    officialDate: "2022-06-21",
    contractType: "official",
    workingDays: 1083,
    salary: 35000000,
    status: "active",
    performance: 88,
    salesThisMonth: 180000000,
    leadsConverted: 28,
    tasksCompleted: 52,
    kpiScore: 92,
    attendanceRate: 98,
    customerSatisfaction: 4.7,
    projectsCompleted: 18,
    skillLevel: "expert"
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "le.van.cuong@company.com",
    phone: "0901234569",
    position: "Customer Support Manager",
    department: "Hỗ trợ khách hàng",
    departmentId: 3,
    teamId: 4,
    teamName: "Customer Support",
    hireDate: "2023-02-10",
    probationEndDate: "2023-05-10",
    officialDate: "2023-05-11",
    contractType: "official",
    workingDays: 795,
    salary: 20000000,
    status: "active",
    performance: 89,
    salesThisMonth: 0,
    leadsConverted: 0,
    tasksCompleted: 38,
    kpiScore: 85,
    attendanceRate: 94,
    customerSatisfaction: 4.8,
    projectsCompleted: 8,
    skillLevel: "senior"
  },
  {
    id: 4,
    name: "Lê Văn Dũng",
    email: "le.van.dung@company.com",
    phone: "0901234570",
    position: "Marketing Manager",
    department: "Marketing",
    departmentId: 2,
    teamId: 3,
    teamName: "Digital Marketing",
    hireDate: "2023-03-01",
    probationEndDate: "2023-06-01",
    officialDate: "2023-06-02",
    contractType: "official",
    workingDays: 776,
    salary: 22000000,
    status: "active",
    performance: 91,
    salesThisMonth: 0,
    leadsConverted: 0,
    tasksCompleted: 42,
    kpiScore: 87,
    attendanceRate: 95,
    customerSatisfaction: 4.3,
    projectsCompleted: 15,
    skillLevel: "senior"
  },
  {
    id: 5,
    name: "Phạm Thị Hương",
    email: "pham.thi.huong@company.com",
    phone: "0901234571",
    position: "Customer Support",
    department: "Hỗ trợ khách hàng",
    departmentId: 3,
    teamId: 4,
    teamName: "Customer Support",
    hireDate: "2024-01-15",
    probationEndDate: "2024-04-15",
    officialDate: "2024-04-16",
    contractType: "official",
    workingDays: 512,
    salary: 16000000,
    status: "active",
    performance: 86,
    salesThisMonth: 0,
    leadsConverted: 0,
    tasksCompleted: 35,
    kpiScore: 82,
    attendanceRate: 93,
    customerSatisfaction: 4.6,
    projectsCompleted: 6,
    skillLevel: "middle"
  }
]

// Sample Interaction Reports
const sampleInteractionReports: InteractionReport[] = [
  {
    id: '1',
    platform: 'zalo',
    period: '01/06/2025 - 07/06/2025',
    totalInteractions: 1250,
    responseRate: 85,
    averageResponseTime: 45, // 45 minutes
    conversionsFromInteractions: 78,
    interactionsByChannel: {
      zalo: 1250,
      facebook: 0,
      email: 0,
      phone: 0
    },
    topPerformingAgents: [
      {
        agentName: 'Nguyễn Văn An',
        interactions: 320,
        responseRate: 92,
        avgResponseTime: 25
      },
      {
        agentName: 'Trần Thị Bình',
        interactions: 280,
        responseRate: 88,
        avgResponseTime: 35
      },
      {
        agentName: 'Lê Minh Chánh',
        interactions: 245,
        responseRate: 82,
        avgResponseTime: 50
      }
    ]
  },
  {
    id: '2',
    platform: 'facebook',
    period: '01/06/2025 - 07/06/2025',
    totalInteractions: 890,
    responseRate: 78,
    averageResponseTime: 65,
    conversionsFromInteractions: 45,
    interactionsByChannel: {
      zalo: 0,
      facebook: 890,
      email: 0,
      phone: 0
    },
    topPerformingAgents: [
      {
        agentName: 'Phạm Thị Dung',
        interactions: 220,
        responseRate: 85,
        avgResponseTime: 40
      },
      {
        agentName: 'Hoàng Văn Em',
        interactions: 195,
        responseRate: 80,
        avgResponseTime: 55
      }
    ]
  }
]

// Sample Comparison Reports
const sampleComparisonReports: ComparisonReport[] = [
  {
    id: '1',
    period1: {
      name: 'Tháng này',
      startDate: '2025-06-01',
      endDate: '2025-06-07'
    },
    period2: {
      name: 'Tháng trước',
      startDate: '2025-05-01',
      endDate: '2025-05-07'
    },
    metrics: {
      revenue: { period1: 450000000, period2: 380000000, change: 18.4 },
      orders: { period1: 125, period2: 108, change: 15.7 },
      leads: { period1: 450, period2: 420, change: 7.1 },
      conversionRate: { period1: 27.8, period2: 25.7, change: 8.2 }
    }
  }
]

export default function ReportsManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDateRange, setSelectedDateRange] = useState('this_week')
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Collapsible sections state
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  
  // Filters
  const [productFilter, setProductFilter] = useState('')
  const [salesPersonFilter, setSalesPersonFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  // Interaction & Comparison states
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'zalo' | 'facebook' | 'email' | 'phone'>('all')
  const [comparisonPeriod1, setComparisonPeriod1] = useState('this_month')
  const [comparisonPeriod2, setComparisonPeriod2] = useState('last_month')

  // KPI states
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null)
  const [activeKPITab, setActiveKPITab] = useState('overview')
  const [kpiSearchTerm, setKpiSearchTerm] = useState('')
  const [kpiCategoryFilter, setKpiCategoryFilter] = useState('all')
  const [kpiPeriodFilter, setKpiPeriodFilter] = useState('all')

  // Utility functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} phút`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <span className="w-4 h-4 text-gray-400">—</span>
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'zalo': return <MessageSquare className="w-5 h-5 text-blue-500" />
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />
      case 'email': return <Mail className="w-5 h-5 text-gray-600" />
      case 'phone': return <Phone className="w-5 h-5 text-green-600" />
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />
    }
  }

  // KPI Utility functions
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-blue-100 text-blue-800'
      case 'marketing': return 'bg-green-100 text-green-800'
      case 'operations': return 'bg-purple-100 text-purple-800'
      case 'finance': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'sales': return 'Kinh doanh'
      case 'marketing': return 'Marketing'
      case 'operations': return 'Vận hành'
      case 'finance': return 'Tài chính'
      default: return category
    }
  }

  const getPeriodText = (period: string) => {
    switch (period) {
      case 'daily': return 'Hàng ngày'
      case 'weekly': return 'Hàng tuần'
      case 'monthly': return 'Hàng tháng'
      case 'quarterly': return 'Hàng quý'
      case 'yearly': return 'Hàng năm'
      default: return period
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      case 'stable': return <Activity className="w-4 h-4 text-yellow-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredKPIs = sampleKPIs.filter(kpi => {
    const matchesSearch = kpi.name.toLowerCase().includes(kpiSearchTerm.toLowerCase()) ||
                         (kpi.description && kpi.description.toLowerCase().includes(kpiSearchTerm.toLowerCase()))
    const matchesCategory = !kpiCategoryFilter || kpiCategoryFilter === 'all' || kpi.category === kpiCategoryFilter
    const matchesPeriod = !kpiPeriodFilter || kpiPeriodFilter === 'all' || kpi.period === kpiPeriodFilter
    return matchesSearch && matchesCategory && matchesPeriod && kpi.isActive
  })

  // Export functionality
  const handleExport = (format: 'excel' | 'csv' | 'pdf', reportType: string) => {
    // Mock export functionality
    console.log(`Exporting ${reportType} as ${format}`)
    // In real implementation, this would call an API or generate the file
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'unpaid': return 'bg-yellow-100 text-yellow-800'
      case 'pending_contract': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Đã thanh toán'
      case 'unpaid': return 'Chưa thanh toán'
      case 'pending_contract': return 'Chờ hợp đồng'
      case 'drafting_contract': return 'Đang soạn hợp đồng'
      case 'cancelled': return 'Hủy'
      default: return status
    }
  }

  // Report Overview Component
  const ReportOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh số</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(sampleSalesReports[0]?.totalRevenue || 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Tuần này</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Số đơn bán</p>
                <p className="text-2xl font-bold text-blue-600">
                  {sampleSalesReports[0]?.totalOrders || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">+12% so với tuần trước</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ chốt TB</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(sampleSalesPerformance.reduce((acc, s) => acc + s.conversionRate, 0) / sampleSalesPerformance.length)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">+5% so với tuần trước</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GTB đơn hàng</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(sampleSalesReports[0]?.averageOrderValue || 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">-2% so với tuần trước</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab('sales')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Báo cáo Doanh số</h3>
                <p className="text-sm text-gray-600">Theo dõi doanh thu và đơn hàng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab('performance')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Hiệu suất Sales</h3>
                <p className="text-sm text-gray-600">Đánh giá hiệu quả bán hàng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab('process')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Quy trình Bán hàng</h3>
                <p className="text-sm text-gray-600">Phân tích funnel chuyển đổi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab('sources')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Nguồn Lead</h3>
                <p className="text-sm text-gray-600">Hiệu quả các kênh marketing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab('cancellation')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Tỷ lệ Hủy đơn</h3>
                <p className="text-sm text-gray-600">Phân tích đơn hàng bị hủy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab('custom')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Báo cáo Tùy chỉnh</h3>
                <p className="text-sm text-gray-600">Tạo và lưu báo cáo riêng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Báo cáo gần đây</CardTitle>
          <CardDescription>Các báo cáo được tạo trong 7 ngày qua</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Doanh số tuần 23/2025', type: 'Doanh số', date: '2025-06-07', status: 'completed' },
              { name: 'Hiệu suất Team A - Tháng 6', type: 'Hiệu suất', date: '2025-06-06', status: 'completed' },
              { name: 'Phân tích Lead Facebook', type: 'Nguồn Lead', date: '2025-06-05', status: 'processing' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-500">{report.type} • {formatDate(report.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                    {report.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Sales Report Component
  const SalesReportComponent = () => (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo Doanh số</h2>
          <p className="text-gray-600">Theo dõi doanh thu và hiệu quả bán hàng</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          >
            <option value="today">Hôm nay</option>
            <option value="this_week">Tuần này</option>
            <option value="this_month">Tháng này</option>
            <option value="this_quarter">Quý này</option>
            <option value="custom">Tùy chỉnh</option>
          </select>
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo báo cáo
          </Button>
        </div>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh số</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(450000000)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+15.2%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Số đơn bán</p>
                <p className="text-2xl font-bold text-blue-600">125</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+8.3%</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GTB đơn hàng</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(3600000)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-xs text-red-600">-2.1%</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ thanh toán</p>
                <p className="text-2xl font-bold text-orange-600">75%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+3.2%</span>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân loại đơn hàng theo trạng thái</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'paid', count: 75, label: 'Đã thanh toán', color: 'green' },
                { status: 'unpaid', count: 30, label: 'Chưa thanh toán', color: 'yellow' },
                { status: 'pending_contract', count: 15, label: 'Chờ hợp đồng', color: 'blue' },
                { status: 'drafting_contract', count: 3, label: 'Đang soạn HĐ', color: 'purple' },
                { status: 'cancelled', count: 2, label: 'Đã hủy', color: 'red' }
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{item.count}</span>
                    <span className="text-sm text-gray-500">
                      ({Math.round((item.count / 125) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Xu hướng doanh số 7 ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Biểu đồ xu hướng doanh số</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết doanh số theo ngày</CardTitle>
          <CardDescription>Thống kê chi tiết theo từng ngày trong tuần</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Doanh số</TableHead>
                <TableHead>Số đơn</TableHead>
                <TableHead>GTB</TableHead>
                <TableHead>Tỷ lệ TT</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: '2025-06-01', revenue: 65000000, orders: 18, avg: 3611111, paymentRate: 72 },
                { date: '2025-06-02', revenue: 58000000, orders: 16, avg: 3625000, paymentRate: 75 },
                { date: '2025-06-03', revenue: 72000000, orders: 20, avg: 3600000, paymentRate: 80 },
                { date: '2025-06-04', revenue: 69000000, orders: 19, avg: 3631579, paymentRate: 74 },
                { date: '2025-06-05', revenue: 82000000, orders: 23, avg: 3565217, paymentRate: 78 },
                { date: '2025-06-06', revenue: 55000000, orders: 15, avg: 3666667, paymentRate: 73 },
                { date: '2025-06-07', revenue: 49000000, orders: 14, avg: 3500000, paymentRate: 71 }
              ].map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{formatDate(day.date)}</TableCell>
                  <TableCell className="font-bold text-green-600">
                    {formatCurrency(day.revenue)}
                  </TableCell>
                  <TableCell>{day.orders}</TableCell>
                  <TableCell>{formatCurrency(day.avg)}</TableCell>
                  <TableCell>
                    <Badge variant={day.paymentRate >= 75 ? 'default' : 'secondary'}>
                      {day.paymentRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  // Sales Performance Component
  const SalesPerformanceComponent = () => (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo Hiệu suất Sales</h2>
          <p className="text-gray-600">Đánh giá hiệu quả bán hàng của từng sales</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          >
            <option value="this_week">Tuần này</option>
            <option value="this_month">Tháng này</option>
            <option value="this_quarter">Quý này</option>
            <option value="custom">Tùy chỉnh</option>
          </select>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Lead được giao</p>
                <p className="text-2xl font-bold text-blue-600">
                  {sampleSalesPerformance.reduce((acc, s) => acc + s.leadsAssigned, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đơn chốt</p>
                <p className="text-2xl font-bold text-green-600">
                  {sampleSalesPerformance.reduce((acc, s) => acc + s.ordersCreated, 0)}
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ chốt TB</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(sampleSalesPerformance.reduce((acc, s) => acc + s.conversionRate, 0) / sampleSalesPerformance.length)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh số</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(sampleSalesPerformance.reduce((acc, s) => acc + s.revenue, 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng hiệu suất Sales</CardTitle>
          <CardDescription>Chi tiết hiệu quả bán hàng của từng sales</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sales</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Lead được giao</TableHead>
                <TableHead>Đơn chốt</TableHead>
                <TableHead>Tỷ lệ chốt</TableHead>
                <TableHead>Doanh số</TableHead>
                <TableHead>Nguồn Lead</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSalesPerformance.map((sales) => (
                <TableRow key={sales.id}>
                  <TableCell className="font-medium">{sales.salesPerson}</TableCell>
                  <TableCell>{sales.salesTeam}</TableCell>
                  <TableCell>{sales.leadsAssigned}</TableCell>
                  <TableCell>{sales.ordersCreated}</TableCell>
                  <TableCell>
                    <Badge variant={sales.conversionRate >= 50 ? 'default' : sales.conversionRate >= 30 ? 'secondary' : 'destructive'}>
                      {sales.conversionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-green-600">
                    {formatCurrency(sales.revenue)}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      <div>Zalo: {sales.leadsBySource.zalo}</div>
                      <div>FB: {sales.leadsBySource.facebook}</div>
                      <div>Manual: {sales.leadsBySource.manual}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  // Sales Process Component
  const SalesProcessComponent = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Phân tích Quy trình Bán hàng</h2>
          <p className="text-gray-600">Theo dõi hiệu quả chuyển đổi qua các giai đoạn</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Funnel Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Phễu chuyển đổi</CardTitle>
          <CardDescription>Số lượng leads qua các giai đoạn bán hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleProcessAnalysis.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-blue-600">{index + 1}</div>
                    <div>
                      <h3 className="font-semibold">{stage.stage}</h3>
                      <p className="text-sm text-gray-500">{stage.leadsCount} leads</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">Tỷ lệ chuyển đổi</p>
                      <p className="text-lg font-bold text-green-600">{stage.conversionRate}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Thời gian TB</p>
                      <p className="text-lg font-bold text-orange-600">{stage.averageTimeInStage} ngày</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Tỷ lệ rớt</p>
                      <p className="text-lg font-bold text-red-600">{stage.dropoffRate}%</p>
                    </div>
                  </div>
                </div>
                <Progress value={stage.conversionRate} className="w-full mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Lead Source Component
  const LeadSourceComponent = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo Nguồn Lead</h2>
          <p className="text-gray-600">Phân tích hiệu quả các kênh marketing</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Source Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { source: 'Zalo', leads: 45, conversion: 42, revenue: 185000000, color: 'blue' },
          { source: 'Facebook', leads: 27, conversion: 38, revenue: 120000000, color: 'purple' },
          { source: 'Nhập tay', leads: 11, conversion: 55, revenue: 80000000, color: 'green' }
        ].map((source) => (
          <Card key={source.source}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{source.source}</h3>
                <Badge className={`bg-${source.color}-100 text-${source.color}-800`}>
                  {source.conversion}% chuyển đổi
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số leads:</span>
                  <span className="font-bold">{source.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doanh số:</span>
                  <span className="font-bold text-green-600">{formatCurrency(source.revenue)}</span>
                </div>
                <Progress value={source.conversion} className="w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // Cancellation Report Component  
  const CancellationReportComponent = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo Tỷ lệ Hủy đơn</h2>
          <p className="text-gray-600">Phân tích các đơn hàng bị hủy và nguyên nhân</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Cancellation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đơn hủy</p>
                <p className="text-2xl font-bold text-red-600">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ hủy</p>
                <p className="text-2xl font-bold text-red-600">8.7%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Giá trị mất</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(45000000)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lý do chính</p>
                <p className="text-lg font-bold text-gray-900">Khách hủy</p>
              </div>
              <Users className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cancellation Reasons */}
      <Card>
        <CardHeader>
          <CardTitle>Phân tích lý do hủy đơn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { reason: 'Khách hủy', count: 7, percentage: 58, color: 'red' },
              { reason: 'Sai hợp đồng', count: 3, percentage: 25, color: 'yellow' },
              { reason: 'Chưa thanh toán', count: 2, percentage: 17, color: 'blue' }
            ].map((item) => (
              <div key={item.reason} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                  <span className="font-medium">{item.reason}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold">{item.count} đơn</span>
                  <span className="text-sm text-gray-500">{item.percentage}%</span>
                  <Progress value={item.percentage} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Customer Report Component
  const CustomerReportComponent = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo Khách hàng</h2>
          <p className="text-gray-600">Phân tích hành vi và giá trị khách hàng</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng KH</p>
                <p className="text-2xl font-bold text-blue-600">486</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KH VIP</p>
                <p className="text-2xl font-bold text-purple-600">23</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GTB/KH</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(5200000)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tần suất mua</p>
                <p className="text-2xl font-bold text-orange-600">2.3</p>
              </div>
              <RefreshCw className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segmentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân khúc khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { segment: 'VIP', count: 23, percentage: 5, revenue: 180000000 },
                { segment: 'Doanh nghiệp', count: 156, percentage: 32, revenue: 850000000 },
                { segment: 'Cá nhân', count: 307, percentage: 63, revenue: 420000000 }
              ].map((seg) => (
                <div key={seg.segment} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{seg.segment}</p>
                    <p className="text-sm text-gray-500">{seg.count} khách ({seg.percentage}%)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(seg.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tần suất mua hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { frequency: '1 lần', count: 298, percentage: 61 },
                { frequency: '2-5 lần', count: 152, percentage: 31 },
                { frequency: '>5 lần', count: 36, percentage: 8 }
              ].map((freq) => (
                <div key={freq.frequency} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">{freq.frequency}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{freq.count}</span>
                    <span className="text-sm text-gray-500">({freq.percentage}%)</span>
                    <Progress value={freq.percentage} className="w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Custom Report Component
  const CustomReportComponent = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo Tùy chỉnh</h2>
          <p className="text-gray-600">Tạo và quản lý các báo cáo theo nhu cầu riêng</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo báo cáo mới
          </Button>
        </div>
      </div>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Báo cáo đã lưu</CardTitle>
          <CardDescription>Các báo cáo tùy chỉnh đã được tạo và lưu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Doanh số Team A - Tháng 6',
                type: 'Doanh số',
                filters: 'Team A, 01/06 - 30/06/2025',
                createdAt: '2025-06-01',
                lastRun: '2025-06-11'
              },
              {
                name: 'Hiệu suất Lead Facebook',
                type: 'Nguồn Lead',
                filters: 'Facebook, VIP, Tuần này',
                createdAt: '2025-05-28',
                lastRun: '2025-06-10'
              },
              {
                name: 'So sánh Q1 vs Q2',
                type: 'So sánh',
                filters: 'Q1 2025 vs Q2 2025',
                createdAt: '2025-05-15',
                lastRun: '2025-06-08'
              }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-gray-500">{report.type} • {report.filters}</p>
                      <p className="text-xs text-gray-400">
                        Tạo: {formatDate(report.createdAt)} • Chạy gần nhất: {formatDate(report.lastRun)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Mẫu báo cáo</CardTitle>
          <CardDescription>Các mẫu báo cáo có sẵn để bắt đầu nhanh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Doanh số hàng tuần', type: 'sales', description: 'Báo cáo doanh số theo tuần' },
              { name: 'Hiệu suất Sales', type: 'performance', description: 'Đánh giá hiệu quả bán hàng' },
              { name: 'Phân tích Lead', type: 'source', description: 'Hiệu quả các nguồn lead' },
              { name: 'Tỷ lệ hủy đơn', type: 'cancellation', description: 'Phân tích đơn hàng hủy' },
              { name: 'Khách hàng VIP', type: 'customer', description: 'Báo cáo khách hàng VIP' },
              { name: 'So sánh thời gian', type: 'comparison', description: 'So sánh giữa các kỳ' }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Interaction Reports Component
  const InteractionReportComponent = () => (
    <div className="space-y-6">
      {/* Header & Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Báo cáo tương tác</span>
              </CardTitle>
              <CardDescription>Phân tích hiệu quả tương tác qua các kênh</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleExport('excel', 'interaction')}>
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf', 'interaction')}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Kênh:</span>
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as any)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="zalo">Zalo</option>
                <option value="facebook">Facebook</option>
                <option value="email">Email</option>
                <option value="phone">Điện thoại</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Thời gian:</span>
              <select 
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="today">Hôm nay</option>
                <option value="yesterday">Hôm qua</option>
                <option value="this_week">Tuần này</option>
                <option value="last_week">Tuần trước</option>
                <option value="this_month">Tháng này</option>
                <option value="last_month">Tháng trước</option>
              </select>
            </div>
          </div>

          {/* Platform Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {sampleInteractionReports.map(report => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getPlatformIcon(report.platform)}
                      <span className="font-medium capitalize">{report.platform}</span>
                    </div>
                    <Badge variant={report.responseRate > 80 ? "default" : "secondary"}>
                      {formatPercent(report.responseRate)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tương tác:</span>
                      <span className="font-medium">{report.totalInteractions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Thời gian phản hồi:</span>
                      <span className="font-medium">{formatTime(report.averageResponseTime)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Chuyển đổi:</span>
                      <span className="font-medium text-green-600">{report.conversionsFromInteractions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phân tích thời gian phản hồi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleInteractionReports.map(report => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        {getPlatformIcon(report.platform)}
                        <span className="font-medium capitalize">{report.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatTime(report.averageResponseTime)}</div>
                        <div className="text-xs text-gray-500">
                          {report.averageResponseTime < 30 ? 'Rất tốt' :
                           report.averageResponseTime < 60 ? 'Tốt' : 'Cần cải thiện'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Agents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nhân viên xuất sắc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleInteractionReports[0].topPerformingAgents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-xs text-gray-500">{agent.interactions} tương tác</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{formatPercent(agent.responseRate)}</div>
                        <div className="text-xs text-gray-500">{formatTime(agent.avgResponseTime)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Comparison Report Component
  const ComparisonReportComponent = () => (
    <div className="space-y-6">
      {/* Header & Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <span>So sánh thời gian</span>
              </CardTitle>
              <CardDescription>So sánh hiệu suất giữa các kỳ khác nhau</CardDescription>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo so sánh mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Kỳ 1:</span>
              <select 
                value={comparisonPeriod1}
                onChange={(e) => setComparisonPeriod1(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="this_month">Tháng này</option>
                <option value="last_month">Tháng trước</option>
                <option value="this_quarter">Quý này</option>
                <option value="last_quarter">Quý trước</option>
                <option value="this_year">Năm này</option>
                <option value="last_year">Năm trước</option>
              </select>
            </div>
            <div className="text-gray-400">vs</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Kỳ 2:</span>
              <select 
                value={comparisonPeriod2}
                onChange={(e) => setComparisonPeriod2(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="last_month">Tháng trước</option>
                <option value="last_quarter">Quý trước</option>
                <option value="last_year">Năm trước</option>
                <option value="same_month_last_year">Cùng kỳ năm trước</option>
              </select>
            </div>
          </div>

          {/* Comparison Metrics */}
          {sampleComparisonReports.map(comparison => (
            <div key={comparison.id} className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div>
                  <h3 className="font-semibold">{comparison.period1.name} vs {comparison.period2.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(comparison.period1.startDate)} - {formatDate(comparison.period1.endDate)} 
                    {' vs '}
                    {formatDate(comparison.period2.startDate)} - {formatDate(comparison.period2.endDate)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport('excel', 'comparison')}>
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(comparison.metrics).map(([key, metric]) => (
                  <Card key={key}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {key === 'revenue' ? 'Doanh thu' :
                           key === 'orders' ? 'Đơn hàng' :
                           key === 'leads' ? 'Leads' : 'Tỷ lệ chuyển đổi'}
                        </span>
                        {getChangeIcon(metric.change)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">{comparison.period1.name}:</span>
                          <span className="text-sm font-medium">
                            {key === 'revenue' ? formatCurrency(metric.period1) :
                             key === 'conversionRate' ? formatPercent(metric.period1) :
                             metric.period1.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">{comparison.period2.name}:</span>
                          <span className="text-sm font-medium">
                            {key === 'revenue' ? formatCurrency(metric.period2) :
                             key === 'conversionRate' ? formatPercent(metric.period2) :
                             metric.period2.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Thay đổi:</span>
                            <span className={`text-sm font-semibold ${getChangeColor(metric.change)}`}>
                              {metric.change > 0 ? '+' : ''}{formatPercent(metric.change)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
          <p className="text-gray-600">Theo dõi hiệu quả kinh doanh và phân tích dữ liệu</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo báo cáo mới
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-11">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="sales">Doanh số</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
          <TabsTrigger value="process">Quy trình</TabsTrigger>
          <TabsTrigger value="sources">Nguồn Lead</TabsTrigger>
          <TabsTrigger value="cancellation">Hủy đơn</TabsTrigger>
          <TabsTrigger value="customer">Khách hàng</TabsTrigger>
          <TabsTrigger value="interaction">Tương tác</TabsTrigger>
          <TabsTrigger value="comparison">So sánh</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="custom">Tùy chỉnh</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ReportOverview />
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <SalesReportComponent />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <SalesPerformanceComponent />
        </TabsContent>

        <TabsContent value="process" className="mt-6">
          <SalesProcessComponent />
        </TabsContent>

        <TabsContent value="sources" className="mt-6">
          <LeadSourceComponent />
        </TabsContent>

        <TabsContent value="cancellation" className="mt-6">
          <CancellationReportComponent />
        </TabsContent>

        <TabsContent value="customer" className="mt-6">
          <CustomerReportComponent />
        </TabsContent>

        <TabsContent value="interaction" className="mt-6">
          <InteractionReportComponent />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <ComparisonReportComponent />
          
          {/* AI Analysis Section - Collapsible */}
          <div className="mt-6 bg-white rounded-lg shadow p-6 border border-gray-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowAIAnalysis(!showAIAnalysis)}
            >
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Phân tích so sánh</h3>
                  <p className="text-sm text-gray-600">Insights thông minh từ dữ liệu so sánh</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {showAIAnalysis ? 'Thu gọn' : 'Xem phân tích'}
                </span>
                {showAIAnalysis ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            
            {showAIAnalysis && (
              <div className="mt-6 space-y-6">
                {/* AI Comparative Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-purple-600" />
                      Phân tích xu hướng
                    </h4>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">Tăng trưởng doanh thu</p>
                          <p className="text-sm text-blue-700">Doanh thu tháng này tăng 15.3% so với tháng trước, chủ yếu từ segment khách hàng doanh nghiệp (+22%).</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-yellow-900">Thay đổi hành vi khách hàng</p>
                          <p className="text-sm text-yellow-700">Tỷ lệ hủy đơn tăng 3.2%, tập trung ở nhóm đơn hàng &lt; 5 triệu. Nguyên nhân chính: thời gian giao hàng.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-green-900">Hiệu quả marketing</p>
                          <p className="text-sm text-green-700">ROI Facebook Ads tăng 28%, với CPA giảm từ 850k xuống 650k nhờ tối ưu targeting.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-green-600" />
                      Khuyến nghị hành động
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="bg-white border-l-4 border-purple-500 p-4 rounded-r-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-purple-600 text-sm font-bold">1</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Tăng ngân sách Facebook Ads</p>
                            <p className="text-sm text-gray-600">Tăng 25% ngân sách để tận dụng hiệu quả cao. Dự báo tăng 40% leads chất lượng.</p>
                            <p className="text-xs text-purple-600 mt-1">Ưu tiên: Cao • ROI dự kiến: +35%</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border-l-4 border-orange-500 p-4 rounded-r-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-orange-600 text-sm font-bold">2</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Cải thiện quy trình giao hàng</p>
                            <p className="text-sm text-gray-600">Tối ưu logistics để giảm thời gian giao xuống 2-3 ngày, giảm tỷ lệ hủy đơn.</p>
                            <p className="text-xs text-orange-600 mt-1">Ưu tiên: Trung bình • Tiết kiệm: 8% đơn hủy</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                            <span className="text-green-600 text-sm font-bold">3</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Phát triển segment doanh nghiệp</p>
                            <p className="text-sm text-gray-600">Tạo gói sản phẩm riêng cho DN, tăng AOV từ 12tr lên 18tr.</p>
                            <p className="text-xs text-green-600 mt-1">Ưu tiên: Cao • Tăng trưởng: +50% AOV</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predictive Analytics */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Dự báo thông minh</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-purple-700">Doanh thu tháng tới</p>
                      <p className="text-2xl font-bold text-purple-900">4.8 tỷ</p>
                      <p className="text-xs text-purple-600">+14.3% vs tháng này</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-purple-700">Số đơn hàng mới</p>
                      <p className="text-2xl font-bold text-purple-900">156</p>
                      <p className="text-xs text-purple-600">+8.7% vs tháng này</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-purple-700">Tỷ lệ chuyển đổi</p>
                      <p className="text-2xl font-bold text-purple-900">18.2%</p>
                      <p className="text-xs text-purple-600">+1.7% vs tháng này</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white/50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>AI Summary:</strong> Xu hướng tích cực đang duy trì với sự cải thiện đáng kể ở hiệu quả marketing. 
                      Nếu thực hiện các khuyến nghị, dự báo tăng trưởng tháng tới có thể đạt 18-20% thay vì 14.3%.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <CustomReportComponent />
        </TabsContent>

        <TabsContent value="kpis" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Quản lý KPI</h3>
                <p className="text-sm text-muted-foreground">
                  Theo dõi và quản lý các chỉ số hiệu quả quan trọng
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất báo cáo
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm KPI
                </Button>
              </div>
            </div>

            <Tabs value={activeKPITab} onValueChange={setActiveKPITab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="list">Danh sách</TabsTrigger>
                <TabsTrigger value="history">Lịch sử</TabsTrigger>
                <TabsTrigger value="reports">Báo cáo</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6">
                  {/* KPI Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sampleKPIs.slice(0, 6).map((kpi) => (
                      <Card key={kpi.id} className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedKPI(kpi)}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(kpi.category)}`}>
                              {getCategoryText(kpi.category)}
                            </span>
                            {getTrendIcon(kpi.trend)}
                          </div>
                          <h4 className="font-medium text-sm mb-1">{kpi.name}</h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl font-bold">
                              {kpi.unit === 'VND' ? formatCurrency(kpi.current) : 
                               kpi.unit === '%' ? `${kpi.current}%` : 
                               kpi.current.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Mục tiêu: {kpi.unit === 'VND' ? formatCurrency(kpi.target) : 
                                           kpi.unit === '%' ? `${kpi.target}%` : 
                                           kpi.target.toLocaleString()}</span>
                            <span className={`font-medium ${kpi.achievement >= 100 ? 'text-green-600' : 
                                                          kpi.achievement >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {kpi.achievement}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                kpi.achievement >= 100 ? 'bg-green-500' : 
                                kpi.achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* KPI Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">Tổng KPI</p>
                            <p className="text-2xl font-bold">{sampleKPIs.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Đạt mục tiêu</p>
                            <p className="text-2xl font-bold">{sampleKPIs.filter(kpi => kpi.achievement >= 100).length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="text-sm font-medium">Cảnh báo</p>
                            <p className="text-2xl font-bold">{sampleKPIs.filter(kpi => kpi.achievement < 80 && kpi.achievement >= 60).length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium">Chưa đạt</p>
                            <p className="text-2xl font-bold">{sampleKPIs.filter(kpi => kpi.achievement < 60).length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Tìm kiếm KPI..."
                          value={kpiSearchTerm}
                          onChange={(e) => setKpiSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <Select value={kpiCategoryFilter} onValueChange={setKpiCategoryFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="sales">Kinh doanh</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="operations">Vận hành</SelectItem>
                        <SelectItem value="finance">Tài chính</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={kpiPeriodFilter} onValueChange={setKpiPeriodFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Chu kỳ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="daily">Hàng ngày</SelectItem>
                        <SelectItem value="weekly">Hàng tuần</SelectItem>
                        <SelectItem value="monthly">Hàng tháng</SelectItem>
                        <SelectItem value="quarterly">Hàng quý</SelectItem>
                        <SelectItem value="yearly">Hàng năm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* KPI List */}
                  <div className="space-y-3">
                    {filteredKPIs.map((kpi) => (
                      <Card key={kpi.id} className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedKPI(kpi)}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium">{kpi.name}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(kpi.category)}`}>
                                  {getCategoryText(kpi.category)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {getPeriodText(kpi.period)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{kpi.description}</p>
                              <div className="flex items-center space-x-4">
                                <span className="text-sm">
                                  <strong>Hiện tại:</strong> {kpi.unit === 'VND' ? formatCurrency(kpi.current) : 
                                                           kpi.unit === '%' ? `${kpi.current}%` : 
                                                           kpi.current.toLocaleString()}
                                </span>
                                <span className="text-sm">
                                  <strong>Mục tiêu:</strong> {kpi.unit === 'VND' ? formatCurrency(kpi.target) : 
                                                           kpi.unit === '%' ? `${kpi.target}%` : 
                                                           kpi.target.toLocaleString()}
                                </span>
                                <span className="text-sm">
                                  <strong>Người phụ trách:</strong> {sampleEmployees.find(emp => emp.id === kpi.assignedTo)?.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getTrendIcon(kpi.trend)}
                              <div className="text-right">
                                <div className={`text-lg font-bold ${kpi.achievement >= 100 ? 'text-green-600' : 
                                                                  kpi.achievement >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                                  {kpi.achievement}%
                                </div>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      kpi.achievement >= 100 ? 'bg-green-500' : 
                                      kpi.achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <div className="space-y-4">
                  <div className="grid gap-4">
                    {sampleKPIs.map((kpi) => (
                      <Card key={kpi.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">{kpi.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(kpi.category)}`}>
                              {getCategoryText(kpi.category)}
                            </span>
                          </div>
                          <div className="space-y-3">
                            {kpi.history.map((record) => (
                              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">
                                      {kpi.unit === 'VND' ? formatCurrency(record.value) : 
                                       kpi.unit === '%' ? `${record.value}%` : 
                                       record.value.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      / {kpi.unit === 'VND' ? formatCurrency(record.target) : 
                                          kpi.unit === '%' ? `${record.target}%` : 
                                          record.target.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {record.note && <span className="mr-2">{record.note}</span>}
                                    <span>Chu kỳ: {record.period}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {Math.round((record.value / record.target) * 100)}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatDate(record.recordedAt)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {sampleEmployees.find(emp => emp.id === record.recordedBy)?.name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Performance Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Tổng quan hiệu suất</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Tỷ lệ đạt mục tiêu</span>
                            <span className="text-lg font-bold text-green-600">
                              {Math.round((sampleKPIs.filter(kpi => kpi.achievement >= 100).length / sampleKPIs.length) * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Điểm trung bình</span>
                            <span className="text-lg font-bold">
                              {Math.round(sampleKPIs.reduce((sum, kpi) => sum + kpi.achievement, 0) / sampleKPIs.length)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Xu hướng tăng trưởng</span>
                            <span className="text-lg font-bold text-green-600">
                              {sampleKPIs.filter(kpi => kpi.trend === 'up').length}/{sampleKPIs.length}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Category Performance */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Hiệu suất theo danh mục</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {['sales', 'marketing', 'operations', 'finance'].map((category) => {
                            const categoryKPIs = sampleKPIs.filter(kpi => kpi.category === category)
                            const avgAchievement = categoryKPIs.length > 0 ? 
                              Math.round(categoryKPIs.reduce((sum, kpi) => sum + kpi.achievement, 0) / categoryKPIs.length) : 0
                            
                            return (
                              <div key={category} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                                    {getCategoryText(category)}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    ({categoryKPIs.length} KPI)
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        avgAchievement >= 100 ? 'bg-green-500' : 
                                        avgAchievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${Math.min(avgAchievement, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium">{avgAchievement}%</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Analytics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Phân tích chi tiết</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h4 className="font-medium text-green-600">Top Performers</h4>
                          {sampleKPIs
                            .filter(kpi => kpi.achievement >= 100)
                            .sort((a, b) => b.achievement - a.achievement)
                            .slice(0, 3)
                            .map((kpi) => (
                              <div key={kpi.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                                <span className="text-sm font-medium">{kpi.name}</span>
                                <span className="text-sm text-green-600">{kpi.achievement}%</span>
                              </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-yellow-600">Needs Attention</h4>
                          {sampleKPIs
                            .filter(kpi => kpi.achievement >= 70 && kpi.achievement < 100)
                            .sort((a, b) => a.achievement - b.achievement)
                            .slice(0, 3)
                            .map((kpi) => (
                              <div key={kpi.id} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                                <span className="text-sm font-medium">{kpi.name}</span>
                                <span className="text-sm text-yellow-600">{kpi.achievement}%</span>
                              </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-red-600">Critical Issues</h4>
                          {sampleKPIs
                            .filter(kpi => kpi.achievement < 70)
                            .sort((a, b) => a.achievement - b.achievement)
                            .slice(0, 3)
                            .map((kpi) => (
                              <div key={kpi.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                                <span className="text-sm font-medium">{kpi.name}</span>
                                <span className="text-sm text-red-600">{kpi.achievement}%</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Tạo báo cáo mới</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Report Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Loại báo cáo</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'sales', name: 'Doanh số', icon: DollarSign, color: 'green' },
                    { type: 'performance', name: 'Hiệu suất', icon: Target, color: 'blue' },
                    { type: 'interaction', name: 'Tương tác', icon: MessageSquare, color: 'purple' },
                    { type: 'comparison', name: 'So sánh', icon: BarChart2, color: 'orange' },
                    { type: 'customer', name: 'Khách hàng', icon: Users, color: 'indigo' },
                    { type: 'source', name: 'Nguồn Lead', icon: Zap, color: 'yellow' }
                  ].map(reportType => (
                    <div key={reportType.type} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-${reportType.color}-100 rounded`}>
                          <reportType.icon className={`w-5 h-5 text-${reportType.color}-600`} />
                        </div>
                        <span className="font-medium">{reportType.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên báo cáo</label>
                  <Input placeholder="Nhập tên báo cáo..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <Input placeholder="Mô tả ngắn gọn..." />
                </div>
              </div>

              {/* Time Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Khoảng thời gian</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Từ ngày</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Đến ngày</label>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div>
                <label className="block text-sm font-medium mb-3">Bộ lọc</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Sản phẩm</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option value="">Tất cả sản phẩm</option>
                      <option value="product1">Sản phẩm A</option>
                      <option value="product2">Sản phẩm B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nhân viên</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option value="">Tất cả nhân viên</option>
                      <option value="emp1">Nguyễn Văn An</option>
                      <option value="emp2">Trần Thị Bình</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium mb-3">Lập lịch tự động</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Gửi báo cáo tự động</span>
                  </label>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option value="daily">Hàng ngày</option>
                    <option value="weekly">Hàng tuần</option>
                    <option value="monthly">Hàng tháng</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Hủy
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Tạo báo cáo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Xuất báo cáo</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowExportModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Định dạng</label>
                <div className="space-y-2">
                  {[
                    { format: 'excel', name: 'Excel (.xlsx)', icon: FileText },
                    { format: 'csv', name: 'CSV (.csv)', icon: FileText },
                    { format: 'pdf', name: 'PDF (.pdf)', icon: FileText }
                  ].map(option => (
                    <label key={option.format} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="export-format" value={option.format} defaultChecked={option.format === 'excel'} />
                      <option.icon className="w-5 h-5 text-gray-500" />
                      <span>{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Bao gồm biểu đồ</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Bao gồm dữ liệu chi tiết</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowExportModal(false)}>
                Hủy
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Xuất file
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Detail Modal */}
      {selectedKPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold">{selectedKPI.name}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedKPI.category)}`}>
                  {getCategoryText(selectedKPI.category)}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedKPI(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* KPI Overview */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Thông tin KPI</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mô tả:</span>
                        <span className="text-sm">{selectedKPI.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Chu kỳ:</span>
                        <span className="text-sm">{getPeriodText(selectedKPI.period)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Người phụ trách:</span>
                        <span className="text-sm">{sampleEmployees.find(emp => emp.id === selectedKPI.assignedTo)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Trạng thái:</span>
                        <span className={`text-sm font-medium ${selectedKPI.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedKPI.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Hiệu suất hiện tại</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          {selectedKPI.unit === 'VND' ? formatCurrency(selectedKPI.current) : 
                           selectedKPI.unit === '%' ? `${selectedKPI.current}%` : 
                           selectedKPI.current.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Mục tiêu: {selectedKPI.unit === 'VND' ? formatCurrency(selectedKPI.target) : 
                                   selectedKPI.unit === '%' ? `${selectedKPI.target}%` : 
                                   selectedKPI.target.toLocaleString()}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all duration-300 ${
                            selectedKPI.achievement >= 100 ? 'bg-green-500' : 
                            selectedKPI.achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(selectedKPI.achievement, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tỷ lệ hoàn thành</span>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(selectedKPI.trend)}
                          <span className={`font-medium ${selectedKPI.achievement >= 100 ? 'text-green-600' : 
                                                        selectedKPI.achievement >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {selectedKPI.achievement}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* KPI History */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Lịch sử cập nhật</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedKPI.history.map((record) => (
                        <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {selectedKPI.unit === 'VND' ? formatCurrency(record.value) : 
                               selectedKPI.unit === '%' ? `${record.value}%` : 
                               record.value.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(record.recordedAt)}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>Mục tiêu: {selectedKPI.unit === 'VND' ? formatCurrency(record.target) : 
                                         selectedKPI.unit === '%' ? `${record.target}%` : 
                                         record.target.toLocaleString()}</div>
                            <div>Chu kỳ: {record.period}</div>
                            {record.note && <div>Ghi chú: {record.note}</div>}
                            <div>Cập nhật bởi: {sampleEmployees.find(emp => emp.id === record.recordedBy)?.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Cập nhật giá trị
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
