'use client'

import { useState } from 'react'
import { 
  Users, 
  Package, 
  TrendingUp, 
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Target,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
interface Department {
  id: number
  name: string
  code: string
  managerId: number
  managerName: string
  employeeCount: number
  budget: number
  description: string
  status: 'active' | 'inactive'
  createdAt: string
  teams: Team[]
}

interface Team {
  id: number
  name: string
  departmentId: number
  leaderId: number
  leaderName: string
  memberCount: number
  description: string
  status: 'active' | 'inactive'
  createdAt: string
  members: number[] // Employee IDs
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

interface Product {
  id: number
  name: string
  category: string
  price: number
  cost: number
  stock: number
  sold: number
  status: 'active' | 'inactive' | 'discontinued'
  description: string
  createdAt: string
  updatedAt: string
  image?: string
}

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

// Sample data
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
    id: 7,
    name: "Nguyễn Thị Giang",
    email: "nguyen.thi.giang@company.com",
    phone: "0901234573",
    position: "Junior Sales",
    department: "Kinh doanh",
    departmentId: 1,
    teamId: 1,
    teamName: "Sales Team A",
    hireDate: "2025-02-01",
    probationEndDate: "2025-05-01",
    contractType: "probation",
    workingDays: 130,
    salary: 15000000,
    status: "active",
    performance: 78,
    salesThisMonth: 50000000,
    leadsConverted: 8,
    tasksCompleted: 22,
    kpiScore: 72,
    attendanceRate: 92,
    customerSatisfaction: 4.0,
    projectsCompleted: 2,
    skillLevel: "junior"
  },
  {
    id: 8,
    name: "Trần Văn Hải",
    email: "tran.van.hai@company.com",
    phone: "0901234574",
    position: "Marketing Executive",
    department: "Marketing",
    departmentId: 2,
    teamId: 3,
    teamName: "Digital Marketing",
    hireDate: "2024-12-01",
    probationEndDate: "2025-03-01",
    contractType: "probation",
    workingDays: 192,
    salary: 12000000,
    status: "active",
    performance: 68,
    salesThisMonth: 0,
    leadsConverted: 0,
    tasksCompleted: 18,
    kpiScore: 65,
    attendanceRate: 88,
    customerSatisfaction: 3.8,
    projectsCompleted: 1,
    skillLevel: "junior"
  }
]

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "CRM Enterprise",
    category: "Software",
    price: 50000000,
    cost: 20000000,
    stock: 0,
    sold: 45,
    status: "active",
    description: "Giải pháp CRM tổng thể cho doanh nghiệp",
    createdAt: "2023-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    name: "CRM Professional",
    category: "Software",
    price: 25000000,
    cost: 10000000,
    stock: 0,
    sold: 128,
    status: "active",
    description: "Giải pháp CRM cho doanh nghiệp vừa và nhỏ",
    createdAt: "2023-02-01",
    updatedAt: "2024-01-10"
  },
  {
    id: 3,
    name: "CRM Starter",
    category: "Software",
    price: 12000000,
    cost: 5000000,
    stock: 0,
    sold: 89,
    status: "active",
    description: "Giải pháp CRM cơ bản cho doanh nghiệp nhỏ",
    createdAt: "2023-03-01",
    updatedAt: "2024-01-05"
  },
  {
    id: 4,
    name: "Tư vấn triển khai",
    category: "Service",
    price: 15000000,
    cost: 8000000,
    stock: 0,
    sold: 32,
    status: "active",
    description: "Dịch vụ tư vấn triển khai và đào tạo hệ thống",
    createdAt: "2023-04-01",
    updatedAt: "2024-01-20"
  },
  {
    id: 5,
    name: "Hỗ trợ 24/7",
    category: "Service",
    price: 5000000,
    cost: 2000000,
    stock: 0,
    sold: 156,
    status: "active",
    description: "Dịch vụ hỗ trợ kỹ thuật 24/7",
    createdAt: "2023-05-01",
    updatedAt: "2024-01-18"
  },
  {
    id: 6,
    name: "CRM Legacy",
    category: "Software",
    price: 8000000,
    cost: 3000000,
    stock: 0,
    sold: 12,
    status: "discontinued",
    description: "Phiên bản CRM cũ (đã ngưng bán)",
    createdAt: "2022-01-01",
    updatedAt: "2023-12-31"
  }
]

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

const sampleDepartments: Department[] = [
  {
    id: 1,
    name: "Kinh doanh",
    code: "SALES",
    managerId: 2,
    managerName: "Trần Thị Bình",
    employeeCount: 4,
    budget: 500000000,
    description: "Phòng ban phụ trách bán hàng và tư vấn khách hàng",
    status: "active",
    createdAt: "2023-01-01",
    teams: []
  },
  {
    id: 2,
    name: "Marketing",
    code: "MKT",
    managerId: 4,
    managerName: "Lê Văn Dũng",
    employeeCount: 2,
    budget: 200000000,
    description: "Phòng ban phụ trách marketing và truyền thông",
    status: "active",
    createdAt: "2023-01-01",
    teams: []
  },
  {
    id: 3,
    name: "Hỗ trợ khách hàng",
    code: "CS",
    managerId: 3,
    managerName: "Lê Văn Cường",
    employeeCount: 2,
    budget: 150000000,
    description: "Phòng ban chăm sóc và hỗ trợ khách hàng",
    status: "active",
    createdAt: "2023-01-01",
    teams: []
  }
]

const sampleTeams: Team[] = [
  {
    id: 1,
    name: "Sales Team A",
    departmentId: 1,
    leaderId: 2,
    leaderName: "Trần Thị Bình",
    memberCount: 3,
    description: "Nhóm bán hàng chính, phụ trách khách hàng doanh nghiệp",
    status: "active",
    createdAt: "2023-01-01",
    members: [1, 2, 7]
  },
  {
    id: 2,
    name: "Enterprise Sales",
    departmentId: 1,
    leaderId: 6,
    leaderName: "Phạm Văn Phúc",
    memberCount: 1,
    description: "Nhóm bán hàng doanh nghiệp lớn",
    status: "active",
    createdAt: "2023-06-01",
    members: [6]
  },
  {
    id: 3,
    name: "Digital Marketing",
    departmentId: 2,
    leaderId: 4,
    leaderName: "Lê Văn Dũng",
    memberCount: 2,
    description: "Nhóm marketing kỹ thuật số",
    status: "active",
    createdAt: "2023-01-01",
    members: [4, 8]
  },
  {
    id: 4,
    name: "Customer Support",
    departmentId: 3,
    leaderId: 3,
    leaderName: "Lê Văn Cường",
    memberCount: 2,
    description: "Nhóm hỗ trợ khách hàng",
    status: "active",
    createdAt: "2023-01-01",
    members: [3, 5]
  }
]

export default function CompanyManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'on_leave': return 'bg-yellow-100 text-yellow-800'
      case 'official': return 'bg-blue-100 text-blue-800'
      case 'probation': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-purple-100 text-purple-800'
      case 'senior': return 'bg-blue-100 text-blue-800'
      case 'middle': return 'bg-green-100 text-green-800'
      case 'junior': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Employee Management Component
  const EmployeeManagement = () => {
    const probationEmployees = sampleEmployees.filter(e => e.contractType === 'probation')
    const overdueProbationEmployees = probationEmployees.filter(e => {
      if (!e.probationEndDate) return false
      return new Date(e.probationEndDate) < new Date()
    })
    const officialEmployees = sampleEmployees.filter(e => e.contractType === 'official')
    const avgKpiScore = Math.round(sampleEmployees.reduce((acc, emp) => acc + emp.kpiScore, 0) / sampleEmployees.length)
    const avgAttendanceRate = Math.round(sampleEmployees.reduce((acc, emp) => acc + emp.attendanceRate, 0) / sampleEmployees.length)

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quản lý Nhân viên</h2>
            <p className="text-gray-600">Quản lý thông tin và hiệu suất nhân viên</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm nhân viên
          </Button>
        </div>

        {/* Overdue Probation Alert */}
        {overdueProbationEmployees.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-900">
                    Cảnh báo: {overdueProbationEmployees.length} nhân viên chưa lên chính thức
                  </h3>
                  <p className="text-sm text-red-700">
                    Các nhân viên sau đã hết thời gian thử việc nhưng chưa được chuyển lên chính thức:
                  </p>
                  <div className="mt-2 space-y-1">
                    {overdueProbationEmployees.map(emp => (
                      <div key={emp.id} className="text-sm text-red-800">
                        • <strong>{emp.name}</strong> - Hết thử việc: {formatDate(emp.probationEndDate!)} 
                        ({Math.floor((new Date().getTime() - new Date(emp.probationEndDate!).getTime()) / (1000 * 60 * 60 * 24))} ngày trước)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng nhân viên</p>
                  <p className="text-2xl font-bold">{sampleEmployees.length}</p>
                </div>
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chính thức</p>
                  <p className="text-2xl font-bold text-green-600">{officialEmployees.length}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Thử việc</p>
                  <p className="text-2xl font-bold text-yellow-600">{probationEmployees.length}</p>
                  {overdueProbationEmployees.length > 0 && (
                    <p className="text-xs text-red-600">({overdueProbationEmployees.length} quá hạn)</p>
                  )}
                </div>
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Điểm KPI TB</p>
                  <p className="text-2xl font-bold text-blue-600">{avgKpiScore}</p>
                </div>
                <Target className="w-6 h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chuyên cần TB</p>
                  <p className="text-2xl font-bold text-purple-600">{avgAttendanceRate}%</p>
                </div>
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng lương</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatCurrency(sampleEmployees.reduce((acc, emp) => acc + emp.salary, 0))}
                  </p>
                </div>
                <Award className="w-6 h-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>

        {/* Employee Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhân viên</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Ngày vào làm</TableHead>
                  <TableHead>Hợp đồng</TableHead>
                  <TableHead>KPI</TableHead>
                  <TableHead>Chuyên cần</TableHead>
                  <TableHead>Cấp độ</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleEmployees.map((employee) => {
                  const isOverdueProbation = employee.contractType === 'probation' && 
                    employee.probationEndDate && 
                    new Date(employee.probationEndDate) < new Date()

                  return (
                    <TableRow key={employee.id} className={isOverdueProbation ? 'bg-red-50' : ''}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>{employee.name.split(' ').pop()?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{employee.department}</p>
                          {employee.teamName && (
                            <p className="text-sm text-gray-500">{employee.teamName}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatDate(employee.hireDate)}</p>
                          <p className="text-sm text-gray-500">{employee.workingDays} ngày</p>
                          {employee.probationEndDate && (
                            <p className={`text-xs ${isOverdueProbation ? 'text-red-600' : 'text-gray-500'}`}>
                              Thử việc đến: {formatDate(employee.probationEndDate)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.contractType)}>
                          {employee.contractType === 'official' ? 'Chính thức' : 
                           employee.contractType === 'probation' ? 'Thử việc' : 'Hợp đồng'}
                        </Badge>
                        {isOverdueProbation && (
                          <p className="text-xs text-red-600 mt-1">Quá hạn!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <p className="font-medium">{employee.kpiScore}</p>
                            <Progress value={employee.kpiScore} className="w-16 h-2" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-right">
                          <p className="font-medium">{employee.attendanceRate}%</p>
                          <Progress value={employee.attendanceRate} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSkillLevelColor(employee.skillLevel)}>
                          {employee.skillLevel === 'expert' ? 'Chuyên gia' :
                           employee.skillLevel === 'senior' ? 'Cao cấp' :
                           employee.skillLevel === 'middle' ? 'Trung cấp' : 'Mới'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            {employee.contractType === 'probation' && (
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Chuyển chính thức
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Product Management Component
  const ProductManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h2>
          <p className="text-gray-600">Quản lý danh mục sản phẩm và dịch vụ</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* Product Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng sản phẩm</p>
                <p className="text-2xl font-bold">{sampleProducts.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã bán</p>
                <p className="text-2xl font-bold text-green-600">
                  {sampleProducts.reduce((acc, product) => acc + product.sold, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(sampleProducts.reduce((acc, product) => acc + (product.price * product.sold), 0))}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lợi nhuận</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(sampleProducts.reduce((acc, product) => acc + ((product.price - product.cost) * product.sold), 0))}
                </p>
              </div>
              <PieChart className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá bán</TableHead>
                <TableHead>Giá vốn</TableHead>
                <TableHead>Đã bán</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead>Lợi nhuận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                  <TableCell>{formatCurrency(product.cost)}</TableCell>
                  <TableCell className="text-center">{product.sold}</TableCell>
                  <TableCell className="font-medium text-purple-600">
                    {formatCurrency(product.price * product.sold)}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency((product.price - product.cost) * product.sold)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status === 'active' ? 'Hoạt động' : 
                       product.status === 'inactive' ? 'Tạm ngưng' : 'Ngưng bán'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  // KPI Management Component
  const KPIManagement = () => {
    const [activeKPITab, setActiveKPITab] = useState('overview')
    const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null)
    const [showKPIModal, setShowKPIModal] = useState(false)
    const [kpiSearchTerm, setKpiSearchTerm] = useState('')
    const [kpiCategoryFilter, setKpiCategoryFilter] = useState('')
    const [kpiPeriodFilter, setKpiPeriodFilter] = useState('')

    const filteredKPIs = sampleKPIs.filter(kpi => {
      const matchesSearch = kpi.name.toLowerCase().includes(kpiSearchTerm.toLowerCase()) ||
                           (kpi.description && kpi.description.toLowerCase().includes(kpiSearchTerm.toLowerCase()))
      const matchesCategory = !kpiCategoryFilter || kpi.category === kpiCategoryFilter
      const matchesPeriod = !kpiPeriodFilter || kpi.period === kpiPeriodFilter
      return matchesSearch && matchesCategory && matchesPeriod && kpi.isActive
    })

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

    const renderKPIOverview = () => (
      <div className="space-y-6">
        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng KPIs</p>
                  <p className="text-2xl font-bold">{sampleKPIs.filter(k => k.isActive).length}</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đạt mục tiêu</p>
                  <p className="text-2xl font-bold text-green-600">
                    {sampleKPIs.filter(k => k.achievement >= 100).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cần cải thiện</p>
                  <p className="text-2xl font-bold text-red-600">
                    {sampleKPIs.filter(k => k.achievement < 80).length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hiệu suất TB</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(sampleKPIs.reduce((acc, kpi) => acc + kpi.achievement, 0) / sampleKPIs.length)}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKPIs.map((kpi) => (
            <Card key={kpi.id} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedKPI(kpi)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{kpi.name}</span>
                      <Badge className={`ml-2 ${getCategoryColor(kpi.category)}`}>
                        {getCategoryText(kpi.category)}
                      </Badge>
                    </div>
                  </div>
                  {getTrendIcon(kpi.trend)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-end space-x-2">
                    <span className="text-2xl font-bold">
                      {kpi.unit === 'VND' ? formatCurrency(kpi.current) : 
                       `${kpi.current.toLocaleString()}${kpi.unit === '%' ? '%' : kpi.unit === '/5' ? '/5' : kpi.unit}`}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {kpi.unit === 'VND' ? formatCurrency(kpi.target) : 
                          `${kpi.target.toLocaleString()}${kpi.unit === '%' ? '%' : kpi.unit === '/5' ? '/5' : kpi.unit}`}
                    </span>
                  </div>
                  
                  <Progress value={kpi.achievement} className="w-full" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Đạt {kpi.achievement}%</span>
                    <Badge variant={kpi.achievement >= 100 ? "default" : kpi.achievement >= 80 ? "secondary" : "destructive"}>
                      {kpi.achievement >= 100 ? "Hoàn thành" : kpi.achievement >= 80 ? "Gần đạt" : "Chưa đạt"}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Chu kỳ: {getPeriodText(kpi.period)}</p>
                    {kpi.assignedTo && (
                      <p>Phụ trách: {sampleEmployees.find(e => e.id === kpi.assignedTo)?.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )

    const renderKPIList = () => (
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm KPI..."
                value={kpiSearchTerm}
                onChange={(e) => setKpiSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select 
              value={kpiCategoryFilter}
              onChange={(e) => setKpiCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">Tất cả danh mục</option>
              <option value="sales">Kinh doanh</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Vận hành</option>
              <option value="finance">Tài chính</option>
            </select>
            
            <select 
              value={kpiPeriodFilter}
              onChange={(e) => setKpiPeriodFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">Tất cả chu kỳ</option>
              <option value="daily">Hàng ngày</option>
              <option value="weekly">Hàng tuần</option>
              <option value="monthly">Hàng tháng</option>
              <option value="quarterly">Hàng quý</option>
              <option value="yearly">Hàng năm</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button onClick={() => setShowKPIModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm KPI
            </Button>
          </div>
        </div>

        {/* KPI Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>KPI</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Hiện tại</TableHead>
                  <TableHead>Mục tiêu</TableHead>
                  <TableHead>Tiến độ</TableHead>
                  <TableHead>Chu kỳ</TableHead>
                  <TableHead>Phụ trách</TableHead>
                  <TableHead>Xu hướng</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKPIs.map((kpi) => (
                  <TableRow key={kpi.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{kpi.name}</p>
                        {kpi.description && (
                          <p className="text-sm text-gray-500">{kpi.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(kpi.category)}>
                        {getCategoryText(kpi.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {kpi.unit === 'VND' ? formatCurrency(kpi.current) : 
                       `${kpi.current.toLocaleString()}${kpi.unit === '%' ? '%' : kpi.unit === '/5' ? '/5' : kpi.unit}`}
                    </TableCell>
                    <TableCell>
                      {kpi.unit === 'VND' ? formatCurrency(kpi.target) : 
                       `${kpi.target.toLocaleString()}${kpi.unit === '%' ? '%' : kpi.unit === '/5' ? '/5' : kpi.unit}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={kpi.achievement} className="w-20" />
                        <span className="text-sm font-medium">{kpi.achievement}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getPeriodText(kpi.period)}</TableCell>
                    <TableCell>
                      {kpi.assignedTo ? sampleEmployees.find(e => e.id === kpi.assignedTo)?.name : '-'}
                    </TableCell>
                    <TableCell>{getTrendIcon(kpi.trend)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedKPI(kpi)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Cập nhật giá trị
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Target className="w-4 h-4 mr-2" />
                            Đặt mục tiêu mới
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )

    const renderKPIHistory = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* History Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ xu hướng KPI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-gray-500">Biểu đồ xu hướng KPI theo thời gian</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Cập nhật gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleKPIs.slice(0, 3).map(kpi => (
                  <div key={kpi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{kpi.name}</p>
                      <p className="text-sm text-gray-500">
                        Cập nhật: {formatDate(kpi.updatedAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{kpi.achievement}%</p>
                      <Badge variant={kpi.achievement >= 100 ? "default" : kpi.achievement >= 80 ? "secondary" : "destructive"}>
                        {kpi.achievement >= 100 ? "Đạt" : kpi.achievement >= 80 ? "Gần đạt" : "Chưa đạt"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử KPI</CardTitle>
            <CardDescription>Theo dõi các thay đổi KPI theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>KPI</TableHead>
                  <TableHead>Chu kỳ</TableHead>
                  <TableHead>Giá trị</TableHead>
                  <TableHead>Mục tiêu</TableHead>
                  <TableHead>Đạt được</TableHead>
                  <TableHead>Ghi chú</TableHead>
                  <TableHead>Ngày cập nhật</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleKPIs.flatMap(kpi => 
                  kpi.history.map(history => (
                    <TableRow key={history.id}>
                      <TableCell className="font-medium">{kpi.name}</TableCell>
                      <TableCell>{history.period}</TableCell>
                      <TableCell>
                        {kpi.unit === 'VND' ? formatCurrency(history.value) : 
                         `${history.value.toLocaleString()}${kpi.unit === '%' ? '%' : kpi.unit === '/5' ? '/5' : kpi.unit}`}
                      </TableCell>
                      <TableCell>
                        {kpi.unit === 'VND' ? formatCurrency(history.target) : 
                         `${history.target.toLocaleString()}${kpi.unit === '%' ? '%' : kpi.unit === '/5' ? '/5' : kpi.unit}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          (history.value / history.target * 100) >= 100 ? "default" : 
                          (history.value / history.target * 100) >= 80 ? "secondary" : "destructive"
                        }>
                          {Math.round(history.value / history.target * 100)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {history.note || '-'}
                      </TableCell>
                      <TableCell>{formatDate(history.recordedAt)}</TableCell>
                    </TableRow>
                  ))
                ).slice(0, 10)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )

    const renderKPIReports = () => (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">KPIs đạt mục tiêu</p>
                  <p className="text-2xl font-bold text-green-600">
                    {sampleKPIs.filter(k => k.achievement >= 100).length}/{sampleKPIs.length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hiệu suất trung bình</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(sampleKPIs.reduce((acc, kpi) => acc + kpi.achievement, 0) / sampleKPIs.length)}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">KPIs có xu hướng tăng</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {sampleKPIs.filter(k => k.trend === 'up').length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cần chú ý</p>
                  <p className="text-2xl font-bold text-red-600">
                    {sampleKPIs.filter(k => k.achievement < 80).length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['sales', 'marketing', 'operations', 'finance'].map(category => {
                const categoryKPIs = sampleKPIs.filter(k => k.category === category)
                const avgPerformance = categoryKPIs.length > 0 
                  ? Math.round(categoryKPIs.reduce((acc, kpi) => acc + kpi.achievement, 0) / categoryKPIs.length)
                  : 0

                return (
                  <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Badge className={getCategoryColor(category)}>
                        {getCategoryText(category)}
                      </Badge>
                      <span className="font-medium">{categoryKPIs.length} KPIs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={avgPerformance} className="w-32" />
                      <span className="font-bold">{avgPerformance}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Xuất báo cáo</CardTitle>
            <CardDescription>Tạo báo cáo KPI theo định dạng mong muốn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Xuất Excel
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                Xuất PDF
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Gửi email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quản lý KPIs</h2>
            <p className="text-gray-600">Theo dõi và quản lý các chỉ số hiệu suất quan trọng</p>
          </div>
          <Button onClick={() => setShowKPIModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm KPI
          </Button>
        </div>

        {/* KPI Navigation Tabs */}
        <Tabs value={activeKPITab} onValueChange={setActiveKPITab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="list">Danh sách</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderKPIOverview()}
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            {renderKPIList()}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {renderKPIHistory()}
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            {renderKPIReports()}
          </TabsContent>
        </Tabs>

        {/* KPI Detail Modal */}
        {selectedKPI && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Chi tiết KPI: {selectedKPI.name}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedKPI(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Giá trị hiện tại</label>
                      <p className="text-2xl font-bold">
                        {selectedKPI.unit === 'VND' ? formatCurrency(selectedKPI.current) : 
                         `${selectedKPI.current.toLocaleString()}${selectedKPI.unit === '%' ? '%' : selectedKPI.unit === '/5' ? '/5' : selectedKPI.unit}`}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mục tiêu</label>
                      <p className="text-2xl font-bold">
                        {selectedKPI.unit === 'VND' ? formatCurrency(selectedKPI.target) : 
                         `${selectedKPI.target.toLocaleString()}${selectedKPI.unit === '%' ? '%' : selectedKPI.unit === '/5' ? '/5' : selectedKPI.unit}`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Tiến độ</label>
                    <Progress value={selectedKPI.achievement} className="w-full mb-2" />
                    <p className="text-sm text-gray-500">Đạt {selectedKPI.achievement}% mục tiêu</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Danh mục</label>
                      <p>{getCategoryText(selectedKPI.category)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Chu kỳ</label>
                      <p>{getPeriodText(selectedKPI.period)}</p>
                    </div>
                  </div>

                  {selectedKPI.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mô tả</label>
                      <p>{selectedKPI.description}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Lịch sử gần đây</label>
                    <div className="space-y-2">
                      {selectedKPI.history.slice(0, 3).map(history => (
                        <div key={history.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{history.period}</p>
                            <p className="text-sm text-gray-500">{history.note}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              {selectedKPI.unit === 'VND' ? formatCurrency(history.value) : 
                               `${history.value.toLocaleString()}${selectedKPI.unit === '%' ? '%' : selectedKPI.unit === '/5' ? '/5' : selectedKPI.unit}`}
                            </p>
                            <p className="text-sm text-gray-500">{formatDate(history.recordedAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <BarChart3 className="w-4 h-4 mr-2" />
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

  // Department Management Component
  const DepartmentManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Phòng ban</h2>
          <p className="text-gray-600">Quản lý cơ cấu tổ chức và phòng ban</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm phòng ban
          </Button>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng phòng ban</p>
                <p className="text-2xl font-bold">{sampleDepartments.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng nhân viên</p>
                <p className="text-2xl font-bold text-green-600">
                  {sampleDepartments.reduce((acc, dept) => acc + dept.employeeCount, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng ngân sách</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(sampleDepartments.reduce((acc, dept) => acc + dept.budget, 0))}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Số team</p>
                <p className="text-2xl font-bold text-orange-600">{sampleTeams.length}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Mã phòng ban</TableHead>
                <TableHead>Trưởng phòng</TableHead>
                <TableHead>Số nhân viên</TableHead>
                <TableHead>Ngân sách</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{department.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{department.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{department.code}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{department.managerName}</TableCell>
                  <TableCell className="text-center">{department.employeeCount}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(department.budget)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(department.status)}>
                      {department.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="w-4 h-4 mr-2" />
                          Quản lý team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  // Team Management Component
  const TeamManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Team</h2>
          <p className="text-gray-600">Quản lý các nhóm làm việc trong công ty</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm team
          </Button>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng team</p>
                <p className="text-2xl font-bold">{sampleTeams.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng thành viên</p>
                <p className="text-2xl font-bold text-green-600">
                  {sampleTeams.reduce((acc, team) => acc + team.memberCount, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team trung bình</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(sampleTeams.reduce((acc, team) => acc + team.memberCount, 0) / sampleTeams.length)}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Team Leader</TableHead>
                <TableHead>Số thành viên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleTeams.map((team) => {
                const department = sampleDepartments.find(d => d.id === team.departmentId)
                return (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{team.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{department?.name}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{team.leaderName}</TableCell>
                    <TableCell className="text-center">{team.memberCount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(team.status)}>
                        {team.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="w-4 h-4 mr-2" />
                            Quản lý thành viên
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  // Company Overview Component
  const CompanyOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tổng quan Công ty</h2>
          <p className="text-gray-600">Thông tin tổng quát về công ty và các chỉ số chính</p>
        </div>
        <Button variant="outline">
          <Edit2 className="w-4 h-4 mr-2" />
          Cập nhật thông tin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Thông tin Công ty</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Tên công ty</label>
                <p className="text-lg font-semibold">Công ty TNHH ViLead CRM</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Mã số thuế</label>
                <p className="text-lg">0123456789</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                <p className="text-lg">123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Website</label>
                <p className="text-lg">www.vilead-crm.com</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg">info@vilead-crm.com</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Điện thoại</label>
                <p className="text-lg">028 1234 5678</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng nhân viên</p>
                <p className="text-2xl font-bold">{sampleEmployees.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sản phẩm</p>
                <p className="text-2xl font-bold">{sampleProducts.length}</p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">KPIs đang theo dõi</p>
                <p className="text-2xl font-bold">{sampleKPIs.length}</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hiệu suất TB</p>
                <p className="text-2xl font-bold">
                  {Math.round(sampleKPIs.reduce((acc, kpi) => acc + kpi.achievement, 0) / sampleKPIs.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Công ty</h1>
          <p className="text-gray-600">Quản lý tổng thể nhân viên, sản phẩm và chỉ số hiệu suất</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Tổng quan</span>
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Nhân viên</span>
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Phòng ban</span>
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Team</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Sản phẩm</span>
          </TabsTrigger>
          <TabsTrigger value="kpis" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>KPIs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CompanyOverview />
        </TabsContent>

        <TabsContent value="employees" className="mt-6">
          <EmployeeManagement />
        </TabsContent>

        <TabsContent value="departments" className="mt-6">
          <DepartmentManagement />
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <TeamManagement />
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="kpis" className="mt-6">
          <KPIManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}