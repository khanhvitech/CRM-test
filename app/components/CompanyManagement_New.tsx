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
  Clock
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
import { DepartmentModal, TeamModal } from './DepartmentTeamModals'

// Interfaces
interface Department {
  id: number
  name: string
  description: string
  managerId: number
  managerName: string
  employeeCount: number
  budget: number
  location: string
  phone: string
  email: string
  established: string
  status: 'active' | 'inactive'
  performance: number
  targetRevenue: number
  currentRevenue: number
  teams: Team[]
}

interface Team {
  id: number
  name: string
  description: string
  departmentId: number
  leaderId: number
  leaderName: string
  memberCount: number
  status: 'active' | 'inactive'
  performance: number
  targetMetric: number
  currentMetric: number
  established: string
  members: number[]
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
}

// Sample data
const sampleDepartments: Department[] = [
  {
    id: 1,
    name: "Kinh doanh",
    description: "Phòng ban phụ trách bán hàng và phát triển khách hàng",
    managerId: 2,
    managerName: "Trần Thị Bình",
    employeeCount: 8,
    budget: 2000000000,
    location: "Tầng 2, Tòa A",
    phone: "028-1234-5678",
    email: "sales@company.com",
    established: "2020-01-15",
    status: "active",
    performance: 88,
    targetRevenue: 500000000,
    currentRevenue: 440000000,
    teams: []
  },
  {
    id: 2,
    name: "Marketing",
    description: "Phòng ban marketing và truyền thông",
    managerId: 4,
    managerName: "Lê Thị Cúc",
    employeeCount: 5,
    budget: 800000000,
    location: "Tầng 3, Tòa A",
    phone: "028-1234-5679",
    email: "marketing@company.com",
    established: "2020-03-01",
    status: "active",
    performance: 92,
    targetRevenue: 200000000,
    currentRevenue: 184000000,
    teams: []
  },
  {
    id: 3,
    name: "Kỹ thuật",
    description: "Phòng ban phát triển sản phẩm và công nghệ",
    managerId: 5,
    managerName: "Phạm Văn Đạt",
    employeeCount: 12,
    budget: 3000000000,
    location: "Tầng 4-5, Tòa B",
    phone: "028-1234-5680",
    email: "tech@company.com",
    established: "2019-08-01",
    status: "active",
    performance: 95,
    targetRevenue: 0,
    currentRevenue: 0,
    teams: []
  },
  {
    id: 4,
    name: "Hành chính - Nhân sự",
    description: "Phòng ban quản lý nhân sự và hành chính",
    managerId: 6,
    managerName: "Hoàng Thị Ế",
    employeeCount: 4,
    budget: 500000000,
    location: "Tầng 1, Tòa A",
    phone: "028-1234-5681",
    email: "hr@company.com",
    established: "2020-01-01",
    status: "active",
    performance: 85,
    targetRevenue: 0,
    currentRevenue: 0,
    teams: []
  }
]

const sampleTeams: Team[] = [
  {
    id: 1,
    name: "Sales Team A",
    description: "Đội bán hàng cho khách hàng doanh nghiệp",
    departmentId: 1,
    leaderId: 1,
    leaderName: "Nguyễn Văn An",
    memberCount: 4,
    status: "active",
    performance: 90,
    targetMetric: 100,
    currentMetric: 85,
    established: "2020-02-01",
    members: [1, 7, 8, 9]
  },
  {
    id: 2,
    name: "Sales Team B",
    description: "Đội bán hàng cho khách hàng cá nhân",
    departmentId: 1,
    leaderId: 2,
    leaderName: "Trần Thị Bình",
    memberCount: 4,
    status: "active",
    performance: 86,
    targetMetric: 80,
    currentMetric: 75,
    established: "2020-04-15",
    members: [2, 10, 11, 12]
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
    achievement: 90
  }
]

export default function CompanyManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [departments, setDepartments] = useState<Department[]>(sampleDepartments)
  const [teams, setTeams] = useState<Team[]>(sampleTeams)
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)

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

        {/* Employee Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhân viên</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Ngày vào làm</TableHead>
                  <TableHead>Loại hợp đồng</TableHead>
                  <TableHead>KPI Score</TableHead>
                  <TableHead>Chuyên cần</TableHead>
                  <TableHead>Hiệu suất</TableHead>
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
                            <AvatarFallback>{employee.name.split(' ').pop()?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{employee.name}</p>
                              {isOverdueProbation && (
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-medium">{employee.position}</p>
                          <p className="text-sm text-gray-500">Cấp: {employee.skillLevel}</p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatDate(employee.hireDate)}</p>
                          <p className="text-sm text-gray-500">{employee.workingDays} ngày</p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={
                          employee.contractType === 'official' 
                            ? 'bg-green-100 text-green-800' 
                            : isOverdueProbation
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }>
                          {employee.contractType === 'official' ? 'Chính thức' : 'Thử việc'}
                        </Badge>
                        {employee.probationEndDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Hết hạn: {formatDate(employee.probationEndDate)}
                          </p>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.kpiScore} className="w-16" />
                          <span className="text-sm">{employee.kpiScore}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.attendanceRate} className="w-16" />
                          <span className="text-sm">{employee.attendanceRate}%</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.performance} className="w-16" />
                          <span className="text-sm">{employee.performance}%</span>
                        </div>
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
                            {isOverdueProbation && (
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Lên chính thức
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

  // Company Overview Component
  const CompanyOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tổng quan Công ty</h2>
          <p className="text-gray-600">Thông tin tổng quát về công ty</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Thông tin Công ty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Tên công ty</label>
                <p className="text-lg font-semibold">Công ty TNHH ViLead CRM</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                <p className="text-lg">123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
            <div className="space-y-4">
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">
            <Building2 className="w-4 h-4 mr-2" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="employees">
            <Users className="w-4 h-4 mr-2" />
            Nhân viên
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CompanyOverview />
        </TabsContent>

        <TabsContent value="employees" className="mt-6">
          <EmployeeManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
