'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Calendar, DollarSign, User, Building2 } from 'lucide-react'

export default function DealsManagement() {
  const [deals] = useState([
    {
      id: 1,
      name: 'Hợp đồng phần mềm CRM cho ABC Corp',
      customer: 'ABC Corporation',
      contact: 'Nguyễn Văn A',
      value: '500,000,000',
      stage: 'proposal',
      probability: 75,
      expectedClose: '2024-02-15',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-18',
      owner: 'Nguyễn Sales',
    },
    {
      id: 2,
      name: 'Nâng cấp hệ thống IT cho XYZ Tech',
      customer: 'XYZ Technology',
      contact: 'Trần Thị B',
      value: '750,000,000',
      stage: 'negotiation',
      probability: 85,
      expectedClose: '2024-02-28',
      createdAt: '2024-01-03',
      lastActivity: '2024-01-19',
      owner: 'Trần Manager',
    },
    {
      id: 3,
      name: 'Triển khai ERP cho DEF Manufacturing',
      customer: 'DEF Manufacturing',
      contact: 'Lê Văn C',
      value: '1,200,000,000',
      stage: 'qualified',
      probability: 60,
      expectedClose: '2024-03-31',
      createdAt: '2024-01-01',
      lastActivity: '2024-01-17',
      owner: 'Lê Director',
    },
    {
      id: 4,
      name: 'Tư vấn chuyển đổi số cho GHI',
      customer: 'GHI Consulting',
      contact: 'Phạm Thị D',
      value: '300,000,000',
      stage: 'discovery',
      probability: 40,
      expectedClose: '2024-04-15',
      createdAt: '2023-12-28',
      lastActivity: '2024-01-16',
      owner: 'Phạm Consultant',
    },
    {
      id: 5,
      name: 'Hệ thống POS cho JKL Retail',
      customer: 'JKL Retail',
      contact: 'Hoàng Văn E',
      value: '400,000,000',
      stage: 'closed_won',
      probability: 100,
      expectedClose: '2024-01-20',
      createdAt: '2023-12-20',
      lastActivity: '2024-01-20',
      owner: 'Hoàng Expert',
    },
  ])

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'discovery':
        return 'bg-blue-100 text-blue-800'
      case 'qualified':
        return 'bg-yellow-100 text-yellow-800'
      case 'proposal':
        return 'bg-purple-100 text-purple-800'
      case 'negotiation':
        return 'bg-orange-100 text-orange-800'
      case 'closed_won':
        return 'bg-green-100 text-green-800'
      case 'closed_lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'discovery':
        return 'Khám phá'
      case 'qualified':
        return 'Đủ điều kiện'
      case 'proposal':
        return 'Báo giá'
      case 'negotiation':
        return 'Đàm phán'
      case 'closed_won':
        return 'Thành công'
      case 'closed_lost':
        return 'Thất bại'
      default:
        return stage
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600'
    if (probability >= 60) return 'text-yellow-600'
    if (probability >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const stageStats = [
    { stage: 'discovery', count: deals.filter(d => d.stage === 'discovery').length, label: 'Khám phá' },
    { stage: 'qualified', count: deals.filter(d => d.stage === 'qualified').length, label: 'Đủ điều kiện' },
    { stage: 'proposal', count: deals.filter(d => d.stage === 'proposal').length, label: 'Báo giá' },
    { stage: 'negotiation', count: deals.filter(d => d.stage === 'negotiation').length, label: 'Đàm phán' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Deals</h1>
          <p className="text-gray-600">Theo dõi và quản lý tất cả cơ hội bán hàng</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Tạo Deal mới</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm deals..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </button>
          <select className="input-field w-auto">
            <option value="">Tất cả giai đoạn</option>
            <option value="discovery">Khám phá</option>
            <option value="qualified">Đủ điều kiện</option>
            <option value="proposal">Báo giá</option>
            <option value="negotiation">Đàm phán</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Tổng: {deals.length} deals</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stageStats.map((stat) => (
          <div key={stat.stage} className="card p-4">
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-2xl font-bold text-primary-600">{stat.count}</div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tổng giá trị pipeline</div>
              <div className="text-2xl font-bold text-success-600">
                {deals.filter(d => !d.stage.includes('closed')).reduce((sum, deal) => sum + parseInt(deal.value.replace(/,/g, '')), 0).toLocaleString()} đ
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-success-600" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Deals thành công</div>
              <div className="text-2xl font-bold text-green-600">
                {deals.filter(d => d.stage === 'closed_won').length}
              </div>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tỷ lệ thành công</div>
              <div className="text-2xl font-bold text-primary-600">
                {Math.round((deals.filter(d => d.stage === 'closed_won').length / deals.filter(d => d.stage.includes('closed')).length) * 100) || 0}%
              </div>
            </div>
            <User className="w-8 h-8 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Deal</th>
                <th className="table-header">Khách hàng</th>
                <th className="table-header">Giá trị</th>
                <th className="table-header">Giai đoạn</th>
                <th className="table-header">Xác suất</th>
                <th className="table-header">Dự kiến đóng</th>
                <th className="table-header">Người phụ trách</th>
                <th className="table-header">Hoạt động cuối</th>
                <th className="table-header sticky right-0 bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{deal.name}</div>
                      <div className="text-sm text-gray-500">Tạo: {deal.createdAt}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{deal.customer}</span>
                      </div>
                      <div className="text-sm text-gray-500 ml-6">{deal.contact}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{deal.value} đ</div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStageColor(deal.stage)}`}>
                      {getStageText(deal.stage)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            deal.probability >= 80 ? 'bg-green-500' :
                            deal.probability >= 60 ? 'bg-yellow-500' :
                            deal.probability >= 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getProbabilityColor(deal.probability)}`}>
                        {deal.probability}%
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {deal.expectedClose}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{deal.owner}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{deal.lastActivity}</div>
                  </td>
                  <td className="table-cell sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)] z-10">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Calendar className="w-4 h-4" />
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