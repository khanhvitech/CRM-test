'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Eye, Building2 } from 'lucide-react'

export default function CustomersManagement() {
  const [customers] = useState([
    {
      id: 1,
      name: 'ABC Corporation',
      contact: 'Nguyễn Văn A',
      email: 'contact@abc.com',
      phone: '0901234567',
      industry: 'Công nghệ',
      status: 'active',
      totalValue: '500,000,000',
      lastPurchase: '2024-01-10',
      joinDate: '2023-06-15',
      deals: 5,
    },
    {
      id: 2,
      name: 'XYZ Technology',
      contact: 'Trần Thị B',
      email: 'info@xyz.com',
      phone: '0902345678',
      industry: 'IT Services',
      status: 'active',
      totalValue: '750,000,000',
      lastPurchase: '2024-01-08',
      joinDate: '2023-04-20',
      deals: 8,
    },
    {
      id: 3,
      name: 'DEF Manufacturing',
      contact: 'Lê Văn C',
      email: 'sales@def.com',
      phone: '0903456789',
      industry: 'Sản xuất',
      status: 'active',
      totalValue: '1,200,000,000',
      lastPurchase: '2024-01-05',
      joinDate: '2023-02-10',
      deals: 12,
    },
    {
      id: 4,
      name: 'GHI Consulting',
      contact: 'Phạm Thị D',
      email: 'hello@ghi.com',
      phone: '0904567890',
      industry: 'Tư vấn',
      status: 'inactive',
      totalValue: '300,000,000',
      lastPurchase: '2023-11-15',
      joinDate: '2023-01-05',
      deals: 3,
    },
    {
      id: 5,
      name: 'JKL Retail',
      contact: 'Hoàng Văn E',
      email: 'team@jkl.com',
      phone: '0905678901',
      industry: 'Bán lẻ',
      status: 'active',
      totalValue: '850,000,000',
      lastPurchase: '2024-01-12',
      joinDate: '2023-08-30',
      deals: 7,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động'
      case 'inactive':
        return 'Không hoạt động'
      case 'pending':
        return 'Chờ xử lý'
      default:
        return status
    }
  }

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'Công nghệ':
        return 'bg-blue-100 text-blue-800'
      case 'IT Services':
        return 'bg-purple-100 text-purple-800'
      case 'Sản xuất':
        return 'bg-orange-100 text-orange-800'
      case 'Tư vấn':
        return 'bg-green-100 text-green-800'
      case 'Bán lẻ':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
          <p className="text-gray-600">Quản lý thông tin và lịch sử giao dịch với khách hàng</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Thêm khách hàng mới</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </button>
          <select className="input-field w-auto">
            <option value="">Tất cả ngành</option>
            <option value="technology">Công nghệ</option>
            <option value="manufacturing">Sản xuất</option>
            <option value="consulting">Tư vấn</option>
            <option value="retail">Bán lẻ</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Tổng: {customers.length} khách hàng</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng khách hàng</div>
              <div className="text-2xl font-bold text-primary-600">{customers.length}</div>
            </div>
            <Building2 className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Đang hoạt động</div>
          <div className="text-2xl font-bold text-green-600">
            {customers.filter(c => c.status === 'active').length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Tổng giá trị</div>
          <div className="text-2xl font-bold text-success-600">
            {customers.reduce((sum, customer) => sum + parseInt(customer.totalValue.replace(/,/g, '')), 0).toLocaleString()} đ
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Tổng deals</div>
          <div className="text-2xl font-bold text-warning-600">
            {customers.reduce((sum, customer) => sum + customer.deals, 0)}
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Công ty</th>
                <th className="table-header">Người liên hệ</th>
                <th className="table-header">Liên hệ</th>
                <th className="table-header">Ngành</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Tổng giá trị</th>
                <th className="table-header">Mua cuối</th>
                <th className="table-header">Số deals</th>
                <th className="table-header sticky right-0 bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">Tham gia: {customer.joinDate}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{customer.contact}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getIndustryColor(customer.industry)}`}>
                      {customer.industry}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{customer.totalValue} đ</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{customer.lastPurchase}</div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-center text-primary-600">{customer.deals}</div>
                  </td>
                  <td className="table-cell sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
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