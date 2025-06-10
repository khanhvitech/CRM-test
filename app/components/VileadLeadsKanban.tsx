'use client'

import { useState } from 'react'
import { Plus, MoreVertical, Phone, Mail, Eye } from 'lucide-react'

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  company: string
  source: string
  value: string
  createdAt: string
  lastContact: string
}

interface KanbanColumn {
  id: string
  title: string
  color: string
  leads: Lead[]
}

export default function VileadLeadsKanban() {
  const [columns] = useState<KanbanColumn[]>([
    {
      id: 'new',
      title: 'Mới',
      color: 'bg-blue-100 border-blue-200',
      leads: [
        {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          phone: '0901234567',
          company: 'ABC Corp',
          source: 'Facebook',
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
          value: '75,000,000',
          createdAt: '2024-01-14',
          lastContact: '2024-01-16',
        },
      ]
    },
    {
      id: 'contacted',
      title: 'Đã liên hệ',
      color: 'bg-yellow-100 border-yellow-200',
      leads: [
        {
          id: 3,
          name: 'Lê Văn C',
          email: 'levanc@email.com',
          phone: '0903456789',
          company: 'DEF Co',
          source: 'Zalo',
          value: '120,000,000',
          createdAt: '2024-01-13',
          lastContact: '2024-01-17',
        },
      ]
    },
    {
      id: 'qualified',
      title: 'Đủ điều kiện',
      color: 'bg-green-100 border-green-200',
      leads: [
        {
          id: 4,
          name: 'Phạm Thị D',
          email: 'phamthid@email.com',
          phone: '0904567890',
          company: 'GHI Inc',
          source: 'Website',
          value: '200,000,000',
          createdAt: '2024-01-12',
          lastContact: '2024-01-18',
        },
      ]
    },
    {
      id: 'proposal',
      title: 'Báo giá',
      color: 'bg-purple-100 border-purple-200',
      leads: []
    },
    {
      id: 'negotiation',
      title: 'Đàm phán',
      color: 'bg-orange-100 border-orange-200',
      leads: [
        {
          id: 5,
          name: 'Hoàng Văn E',
          email: 'hoangvane@email.com',
          phone: '0905678901',
          company: 'JKL Group',
          source: 'Referral',
          value: '300,000,000',
          createdAt: '2024-01-11',
          lastContact: '2024-01-19',
        },
      ]
    },
    {
      id: 'closed',
      title: 'Đã đóng',
      color: 'bg-gray-100 border-gray-200',
      leads: []
    },
  ])

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
          <h1 className="text-2xl font-bold text-gray-900">Leads Kanban Board</h1>
          <p className="text-gray-600">Quản lý leads theo giai đoạn bán hàng</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Thêm Lead mới</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className={`rounded-lg border-2 border-dashed p-4 ${column.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                  {column.leads.length}
                </span>
              </div>

              <div className="space-y-3">
                {column.leads.map((lead) => (
                  <div key={lead.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-move">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{lead.name}</h4>
                        <p className="text-sm text-gray-600">{lead.company}</p>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getSourceColor(lead.source)}`}></div>
                        <span className="text-xs text-gray-600">{lead.source}</span>
                      </div>
                      
                      <div className="text-sm font-medium text-green-600">
                        {lead.value} đ
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {lead.lastContact}
                        </span>
                        <div className="flex space-x-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Phone className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Mail className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add new lead button */}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                  <Plus className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Thêm lead</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}