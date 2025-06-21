'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Eye, Edit, Trash2 } from 'lucide-react'

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

export default function LeadsManagement() {
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
  ])

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng Leads</p>
              <p className="text-2xl font-bold text-gray-900">245</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Leads mới</p>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <div className="w-6 h-6 bg-yellow-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã chuyển đổi</p>
              <p className="text-2xl font-bold text-gray-900">57</p>
            </div>
          </div>
        </div>
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
          <button className="btn-secondary flex items-center space-x-2">
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
                <th className="table-header">Khách hàng</th>
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
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
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
