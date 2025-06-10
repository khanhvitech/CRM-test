'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Eye, 
  Users,
  UserPlus,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  company: string
  source: string
  status: string
  value: string
  createdAt: string
  lastContact: string
}

interface MetricData {
  title: string
  value: number
  previousValue: number
  icon: React.ReactNode
  color: string
  bgColor: string
}

export default function LeadsManagementWithMetrics() {
  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      company: 'ABC Corp',
      source: 'Facebook',
      status: 'new',
      value: '50,000,000',
      createdAt: '2024-01-15',
      lastContact: '2024-01-15',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0902345678',
      company: 'XYZ Ltd',
      source: 'Google',
      status: 'contacted',
      value: '75,000,000',
      createdAt: '2024-01-14',
      lastContact: '2024-01-16',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0903456789',
      company: 'DEF Co',
      source: 'Zalo',
      status: 'qualified',
      value: '120,000,000',
      createdAt: '2024-01-13',
      lastContact: '2024-01-17',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0904567890',
      company: 'GHI Inc',
      source: 'Website',
      status: 'proposal',
      value: '200,000,000',
      createdAt: '2024-01-12',
      lastContact: '2024-01-18',
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0905678901',
      company: 'JKL Group',
      source: 'Referral',
      status: 'negotiation',
      value: '300,000,000',
      createdAt: '2024-01-11',
      lastContact: '2024-01-19',
    },
  ])

  const metrics: MetricData[] = [
    {
      title: 'Tổng Leads',
      value: 245,
      previousValue: 230,
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Leads mới',
      value: 32,
      previousValue: 28,
      icon: <UserPlus className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Đang xử lý',
      value: 156,
      previousValue: 162,
      icon: <ClipboardList className="w-6 h-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Đã chuyển đổi',
      value: 57,
      previousValue: 40,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-green-100 text-green-800'
      case 'proposal':
        return 'bg-purple-100 text-purple-800'
      case 'negotiation':
        return 'bg-orange-100 text-orange-800'
      case 'won':
        return 'bg-emerald-100 text-emerald-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Mới'
      case 'contacted':
        return 'Đã liên hệ'
      case 'qualified':
        return 'Đủ điều kiện'
      case 'proposal':
        return 'Báo giá'
      case 'negotiation':
        return 'Đàm phán'
      case 'won':
        return 'Thành công'
      case 'lost':
        return 'Thất bại'
      default:
        return status
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Facebook':
        return 'bg-blue-500'
      case 'Google':
        return 'bg-red-500'
      case 'Zalo':
        return 'bg-blue-600'
      case 'Website':
        return 'bg-green-500'
      case 'Referral':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Leads</h1>
          <p className="text-gray-600">Quản lý và theo dõi tất cả khách hàng tiềm năng</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Thêm Lead mới</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const percentageChange = calculatePercentageChange(metric.value, metric.previousValue)
          const isPositive = percentageChange >= 0
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              </div>
              
              {/* Comparison with previous period */}
              <div className="mt-4 flex items-center text-sm">
                <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  <span className="font-medium">
                    {Math.abs(percentageChange).toFixed(1)}%
                  </span>
                </div>
                <span className="text-gray-500 ml-2">so với tháng trước</span>
              </div>
              
              {/* Previous value */}
              <div className="mt-1">
                <span className="text-xs text-gray-400">
                  Tháng trước: {metric.previousValue}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm leads..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Tên & Email</th>
                <th className="table-header">Công ty</th>
                <th className="table-header">Điện thoại</th>
                <th className="table-header">Nguồn</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Giá trị</th>
                <th className="table-header">Ngày tạo</th>
                <th className="table-header">Liên hệ cuối</th>
                <th className="table-header">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{lead.company}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.phone}</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getSourceColor(lead.source)} mr-2`}></div>
                      <span className="text-sm text-gray-900">{lead.source}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {getStatusText(lead.status)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{lead.value} đ</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.createdAt}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.lastContact}</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
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
