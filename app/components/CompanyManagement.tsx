'use client'

import { useState } from 'react'
import { 
  Building2, 
  Users, 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Target,
  DollarSign,
  Filter,
  Download
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Interfaces
interface Employee {
  id: number
  name: string
  email: string
  phone: string
  position: string
  department: string
  departmentId: number
  teamId: number
  teamName: string
  hireDate: string
  salary: number
  status: 'active' | 'inactive' | 'probation'
  performance: number
  avatar?: string
}

interface Department {
  id: number
  name: string
  description: string
  managerId: number
  managerName: string
  employeeCount: number
  budget: number
  status: 'active' | 'inactive'
  createdAt: string
}

interface Team {
  id: number
  name: string
  departmentId: number
  departmentName: string
  leaderId: number
  leaderName: string
  memberCount: number
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  cost: number
  profit: number
  stock: number
  sold: number
  status: 'active' | 'inactive' | 'discontinued'
  description: string
  createdAt: string
}

// Sample Data
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
    salary: 25000000,
    status: "active",
    performance: 92,
    avatar: "/avatars/an.jpg"
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
    salary: 35000000,
    status: "active",
    performance: 88,
    avatar: "/avatars/binh.jpg"
  },
  {
    id: 3,
    name: "Lê Minh Chánh",
    email: "le.minh.chanh@company.com",
    phone: "0901234569",
    position: "Marketing Specialist",
    department: "Marketing",
    departmentId: 2,
    teamId: 3,
    teamName: "Marketing Team",
    hireDate: "2023-06-10",
    salary: 18000000,
    status: "active",
    performance: 85
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "pham.thi.dung@company.com",
    phone: "0901234570",
    position: "HR Manager",
    department: "Nhân sự",
    departmentId: 3,
    teamId: 4,
    teamName: "HR Team",
    hireDate: "2022-11-05",
    salary: 22000000,
    status: "active",
    performance: 90
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    email: "hoang.van.em@company.com",
    phone: "0901234571",
    position: "Junior Developer",
    department: "Công nghệ",
    departmentId: 4,
    teamId: 5,
    teamName: "Dev Team",
    hireDate: "2024-01-20",
    salary: 15000000,
    status: "probation",
    performance: 78
  }
]

const sampleDepartments: Department[] = [
  {
    id: 1,
    name: "Phòng Kinh doanh",
    description: "Phụ trách bán hàng và phát triển khách hàng",
    managerId: 2,
    managerName: "Trần Thị Bình",
    employeeCount: 8,
    budget: 500000000,
    status: "active",
    createdAt: "2022-01-01"
  },
  {
    id: 2,
    name: "Phòng Marketing",
    description: "Phụ trách marketing và truyền thông",
    managerId: 3,
    managerName: "Lê Minh Chánh",
    employeeCount: 4,
    budget: 200000000,
    status: "active",
    createdAt: "2022-01-01"
  },
  {
    id: 3,
    name: "Phòng Nhân sự",
    description: "Quản lý nhân sự và tuyển dụng",
    managerId: 4,
    managerName: "Phạm Thị Dung",
    employeeCount: 3,
    budget: 150000000,
    status: "active",
    createdAt: "2022-01-01"
  },
  {
    id: 4,
    name: "Phòng Công nghệ",
    description: "Phát triển và bảo trì hệ thống",
    managerId: 5,
    managerName: "Hoàng Văn Em",
    employeeCount: 6,
    budget: 300000000,
    status: "active",
    createdAt: "2022-01-01"
  }
]

const sampleTeams: Team[] = [
  {
    id: 1,
    name: "Sales Team A",
    departmentId: 1,
    departmentName: "Phòng Kinh doanh",
    leaderId: 1,
    leaderName: "Nguyễn Văn An",
    memberCount: 4,
    description: "Nhóm bán hàng khu vực miền Bắc",
    status: "active",
    createdAt: "2022-01-15"
  },
  {
    id: 2,
    name: "Sales Team B",
    departmentId: 1,
    departmentName: "Phòng Kinh doanh",
    leaderId: 2,
    leaderName: "Trần Thị Bình",
    memberCount: 4,
    description: "Nhóm bán hàng khu vực miền Nam",
    status: "active",
    createdAt: "2022-02-01"
  },
  {
    id: 3,
    name: "Marketing Team",
    departmentId: 2,
    departmentName: "Phòng Marketing",
    leaderId: 3,
    leaderName: "Lê Minh Chánh",
    memberCount: 4,
    description: "Nhóm marketing tổng thể",
    status: "active",
    createdAt: "2022-03-01"
  }
]

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "CRM Pro",
    category: "Software",
    price: 2000000,
    cost: 800000,
    profit: 1200000,
    stock: 100,
    sold: 45,
    status: "active",
    description: "Phần mềm CRM chuyên nghiệp",
    createdAt: "2023-01-01"
  },
  {
    id: 2,
    name: "CRM Enterprise",
    category: "Software",
    price: 5000000,
    cost: 2000000,
    profit: 3000000,
    stock: 50,
    sold: 12,
    status: "active",
    description: "Phần mềm CRM doanh nghiệp",
    createdAt: "2023-02-01"
  },
  {
    id: 3,
    name: "Marketing Suite",
    category: "Software",
    price: 1500000,
    cost: 600000,
    profit: 900000,
    stock: 75,
    sold: 28,
    status: "active",
    description: "Bộ công cụ marketing tự động",
    createdAt: "2023-03-01"
  }
]

export default function CompanyManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Ngừng hoạt động</Badge>
      case 'probation':
        return <Badge className="bg-yellow-100 text-yellow-800">Thử việc</Badge>
      case 'discontinued':
        return <Badge className="bg-gray-100 text-gray-800">Ngừng sản xuất</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Filter functions
  const filteredEmployees = sampleEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDepartments = sampleDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTeams = sampleTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Component renders
  const CompanyOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
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
                <p className="text-sm font-medium text-gray-600">Phòng ban</p>
                <p className="text-2xl font-bold">{sampleDepartments.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-green-500" />
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
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(sampleProducts.reduce((sum, p) => sum + (p.price * p.sold), 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nhân viên mới nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleEmployees.slice(0, 5).map((employee) => (
                <div key={employee.id} className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.position}</p>
                  </div>
                  {getStatusBadge(employee.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleProducts.sort((a, b) => b.sold - a.sold).slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{product.sold} đã bán</p>
                    <p className="text-xs text-gray-500">{formatCurrency(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const EmployeeManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Nhân viên</h2>
          <p className="text-gray-600">Quản lý thông tin và hiệu suất nhân viên</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất danh sách
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
      </div>

      {/* Employee Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Ngày vào</TableHead>
              <TableHead>Lương</TableHead>
              <TableHead>Hiệu suất</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-500">{employee.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{formatDate(employee.hireDate)}</TableCell>
                <TableCell>{formatCurrency(employee.salary)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${employee.performance}%` }}
                      />
                    </div>
                    <span className="text-sm">{employee.performance}%</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(employee.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  const DepartmentManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Phòng ban</h2>
          <p className="text-gray-600">Quản lý cấu trúc tổ chức và phòng ban</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Thêm phòng ban
        </Button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleDepartments.map((dept) => (
          <Card key={dept.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{dept.name}</CardTitle>
                {getStatusBadge(dept.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{dept.description}</p>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{dept.employeeCount} nhân viên</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Trưởng phòng: {dept.managerName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Ngân sách: {formatCurrency(dept.budget)}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">
                    Tạo: {formatDate(dept.createdAt)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const TeamManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Team</h2>
          <p className="text-gray-600">Quản lý các team và nhóm làm việc</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Tạo team mới
        </Button>
      </div>

      {/* Teams Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên team</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Team leader</TableHead>
              <TableHead>Thành viên</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleTeams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-gray-500">{team.description}</p>
                  </div>
                </TableCell>
                <TableCell>{team.departmentName}</TableCell>
                <TableCell>{team.leaderName}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{team.memberCount} người</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(team.status)}</TableCell>
                <TableCell>{formatDate(team.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  const ProductManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h2>
          <p className="text-gray-600">Quản lý danh mục sản phẩm và dịch vụ</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất danh sách
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {getStatusBadge(product.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Giá bán:</span>
                    <p className="font-medium">{formatCurrency(product.price)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Lợi nhuận:</span>
                    <p className="font-medium text-green-600">{formatCurrency(product.profit)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tồn kho:</span>
                    <p className="font-medium">{product.stock}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Đã bán:</span>
                    <p className="font-medium">{product.sold}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Công ty</h1>
          <p className="text-gray-600">Quản lý tổng thể nhân viên, phòng ban và sản phẩm</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
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
      </Tabs>
    </div>
  )
}