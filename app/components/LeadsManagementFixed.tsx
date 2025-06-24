'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Eye, Edit, Trash2, X } from 'lucide-react'

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  
  // Nguồn và phân loại  
  source: string
  region: string
  product: string
  content: string
  
  // Trạng thái và quy trình
  status: string // Mới, Đã liên hệ, Tiềm năng, Không quan tâm
  stage: string // Tiếp nhận, Tư vấn, Báo giá, Đàm phán, Đóng deal
  assignedTo: string
  
  // Giá trị và theo dõi
  value: number
  notes: string
  tags: string[]
  lastContact: string
  createdAt: string
  updatedAt: string
}

export default function LeadsManagement() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  
  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      source: 'Facebook',
      region: 'Hồ Chí Minh',
      product: 'CRM Software',
      content: 'Muốn tìm hiểu về phần mềm CRM cho công ty',
      status: 'new',
      stage: 'Tiếp nhận',
      assignedTo: 'Nguyễn Thị Sales',
      value: 50000000,
      notes: 'Khách hàng quan tâm đến tính năng tự động hóa',
      tags: ['enterprise', 'hot-lead'],
      lastContact: '2024-01-15',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0902345678',
      source: 'Google',
      region: 'Hà Nội',
      product: 'Marketing Automation',
      content: 'Cần giải pháp marketing tự động',
      status: 'contacted',
      stage: 'Tư vấn',
      assignedTo: 'Lê Văn Marketing',
      value: 75000000,
      notes: 'Đã gửi proposal, chờ phản hồi',
      tags: ['marketing', 'follow-up'],
      lastContact: '2024-01-16',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-16',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0903456789',
      source: 'Zalo',
      region: 'Đà Nẵng',
      product: 'Sales Management',
      content: 'Quản lý đội nhóm bán hàng hiệu quả',
      status: 'qualified',
      stage: 'Báo giá',
      assignedTo: 'Phạm Thị Consultant',
      value: 120000000,
      notes: 'Khách hàng rất quan tâm, cần demo chi tiết',
      tags: ['sales', 'demo-required'],
      lastContact: '2024-01-17',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-17',
    },
    {
      id: 4,
      name: 'Hoàng Thị D',
      email: 'hoangthid@email.com',
      phone: '0904567890',
      source: 'Website',
      region: 'Cần Thơ',
      product: 'Customer Service',
      content: 'Cải thiện dịch vụ chăm sóc khách hàng',
      status: 'proposal',
      stage: 'Đàm phán',
      assignedTo: 'Trần Văn Support',
      value: 85000000,
      notes: 'Đang thương lượng về giá và thời gian triển khai',
      tags: ['customer-service', 'negotiation'],
      lastContact: '2024-01-18',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18',
    },
    {
      id: 5,
      name: 'Vũ Minh E',
      email: 'vuminhe@email.com',
      phone: '0905678901',
      source: 'Referral',
      region: 'Hải Phòng',
      product: 'Analytics Dashboard',
      content: 'Phân tích dữ liệu bán hàng chuyên sâu',
      status: 'negotiation',
      stage: 'Đóng deal',
      assignedTo: 'Đỗ Thị Analytics',
      value: 150000000,
      notes: 'Sắp ký hợp đồng, đang hoàn thiện pháp lý',
      tags: ['analytics', 'closing'],
      lastContact: '2024-01-19',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-19',
    },
  ])

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Tiếp nhận':
        return 'bg-blue-100 text-blue-800'
      case 'Tư vấn':
        return 'bg-yellow-100 text-yellow-800'
      case 'Báo giá':
        return 'bg-purple-100 text-purple-800'
      case 'Đàm phán':
        return 'bg-orange-100 text-orange-800'
      case 'Đóng deal':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value)
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
        return 'bg-gray-500'    }
  }
  const handleViewDetail = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailModalOpen(true)
  }

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         lead.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter
    const matchesRegion = regionFilter === 'all' || lead.region === regionFilter
    
    return matchesSearch && matchesStatus && matchesStage && matchesRegion
  })
  // Get unique values for filters
  const uniqueStatuses = Array.from(new Set(leads.map(lead => lead.status)))
  const uniqueStages = Array.from(new Set(leads.map(lead => lead.stage)))
  const uniqueRegions = Array.from(new Set(leads.map(lead => lead.region)))

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
      </div>      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'new').length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => ['contacted', 'qualified', 'proposal'].includes(l.status)).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang đàm phán</p>
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'negotiation').length}</p>
            </div>
          </div>
        </div>
      </div>{/* Filters and Search */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{getStatusText(status)}</option>
            ))}
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">Tất cả giai đoạn</option>
            {uniqueStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">Tất cả khu vực</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Hiển thị {filteredLeads.length} / {leads.length} leads
        </div>
      </div>{/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">STT</th>
                <th className="table-header">Khách hàng</th>
                <th className="table-header">Điện thoại</th>
                <th className="table-header">Khu vực</th>
                <th className="table-header">Sản phẩm</th>
                <th className="table-header">Nguồn</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Giai đoạn</th>                <th className="table-header">Phụ trách</th>
                <th className="table-header">Giá trị</th>
                <th className="table-header">Ghi chú</th>
                <th className="table-header">Tags</th>
                <th className="table-header">Ngày tạo</th>
                <th className="table-header">Liên hệ cuối</th>
                <th className="table-header">Thao tác</th>
              </tr>
            </thead>            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead, index) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{index + 1}</div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      <div className="text-xs text-gray-400 mt-1">{lead.content}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.phone}</div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{lead.region}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.product}</div>
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
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStageColor(lead.stage)}`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.assignedTo}</div>
                  </td>                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{formatCurrency(lead.value)}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-600 max-w-xs">
                      {lead.notes.length > 50 ? `${lead.notes.substring(0, 50)}...` : lead.notes}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.createdAt}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{lead.lastContact}</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Gọi điện">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Gửi email">
                        <Mail className="w-4 h-4" />
                      </button>                      <button 
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                        title="Xem chi tiết"
                        onClick={() => handleViewDetail(lead)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Chỉnh sửa">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {isDetailModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Chi tiết Lead</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Thông tin cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Thông tin liên hệ</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tên khách hàng</label>
                      <p className="text-gray-900 font-medium">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
                      <p className="text-gray-900">{selectedLead.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Khu vực</label>
                      <p className="text-gray-900">{selectedLead.region}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Thông tin sản phẩm</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Sản phẩm quan tâm</label>
                      <p className="text-gray-900">{selectedLead.product}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Nguồn</label>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getSourceColor(selectedLead.source)} mr-2`}></div>
                        <span className="text-gray-900">{selectedLead.source}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Giá trị dự kiến</label>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedLead.value)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phụ trách</label>
                      <p className="text-gray-900">{selectedLead.assignedTo}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trạng thái và giai đoạn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-1 ${getStatusColor(selectedLead.status)}`}>
                    {getStatusText(selectedLead.status)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Giai đoạn</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-1 ${getStageColor(selectedLead.stage)}`}>
                    {selectedLead.stage}
                  </span>
                </div>
              </div>

              {/* Nội dung yêu cầu */}
              <div>
                <label className="text-sm font-medium text-gray-600">Nội dung yêu cầu</label>
                <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{selectedLead.content}</p>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="text-sm font-medium text-gray-600">Ghi chú</label>
                <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{selectedLead.notes}</p>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-gray-600">Tags</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedLead.tags.map((tag, index) => (
                    <span key={index} className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thời gian */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
                  <p className="text-gray-900">{selectedLead.createdAt}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Liên hệ cuối</label>
                  <p className="text-gray-900">{selectedLead.lastContact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cập nhật cuối</label>
                  <p className="text-gray-900">{selectedLead.updatedAt}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Đóng
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
