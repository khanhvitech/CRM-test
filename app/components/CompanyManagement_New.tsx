'use client'

import { useState } from 'react'
import { Building2, Users, Package } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Sample data for company overview
const sampleEmployees = [
  {
    id: 1,
    name: "Nguyễn Văn Anh",
    position: "Sales Manager",
    department: "Sales",
    email: "anh.nguyen@company.com",
    phone: "0901234567",
    status: "active"
  },
  {
    id: 2,
    name: "Trần Thị Bích",
    position: "Marketing Specialist",
    department: "Marketing", 
    email: "bich.tran@company.com",
    phone: "0901234568",
    status: "active"
  }
]

const sampleDepartments = [
  {
    id: 1,
    name: "Sales",
    manager: "Nguyễn Văn Anh",
    employees: 15,
    description: "Phòng bán hàng"
  },
  {
    id: 2,
    name: "Marketing",
    manager: "Trần Thị Bích",
    employees: 8,
    description: "Phòng marketing"
  }
]

const sampleProducts = [  {
    id: 1,
    name: "CRM Software",
    category: "Software",
    price: 2000000,
    status: "active",
    description: "Phần mềm chăm sóc khách hàng"
  },
  {
    id: 2,
    name: "Marketing Automation",
    category: "Software",
    price: 1500000,
    status: "active",
    description: "Tự động hóa marketing"
  }
]

function CompanyOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng nhân viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+2 so với tháng trước</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phòng ban</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Sản phẩm đang bán</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EmployeeManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quản lý Nhân viên</h2>
        <Button>Thêm nhân viên</Button>
      </div>
      
      <div className="grid gap-4">
        {sampleEmployees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
                <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                  {employee.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DepartmentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quản lý Phòng ban</h2>
        <Button>Thêm phòng ban</Button>
      </div>
      
      <div className="grid gap-4">
        {sampleDepartments.map((dept) => (
          <Card key={dept.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{dept.name}</h3>
                  <p className="text-sm text-gray-600">Trưởng phòng: {dept.manager}</p>
                  <p className="text-sm text-gray-500">{dept.description}</p>
                </div>
                <Badge>{dept.employees} nhân viên</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TeamManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quản lý Team</h2>
        <Button>Tạo team mới</Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Chưa có team nào được tạo</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quản lý Sản phẩm</h2>
        <Button>Thêm sản phẩm</Button>
      </div>
      
      <div className="grid gap-4">
        {sampleProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.price.toLocaleString('vi-VN')} VNĐ</p>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function CompanyManagement() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Công ty</h1>
          <p className="text-gray-600">Quản lý tổng thể nhân viên và sản phẩm</p>
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
