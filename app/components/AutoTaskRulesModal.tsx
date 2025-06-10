'use client'

import React, { useState, useEffect } from 'react'
import { 
  X, 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  Play, 
  Pause, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Building, 
  ShoppingCart, 
  FileText, 
  Target, 
  Bell, 
  Zap,
  RotateCcw,
  Filter
} from 'lucide-react'

interface AutoTaskRulesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (rules: AutoTaskRule[]) => void
  employees: Employee[]
  rules: AutoTaskRule[]
}

interface AutoTaskRule {
  id: string
  name: string
  trigger: {
    type: 'lead_stage' | 'order_status'
    value: string
  }
  taskTemplate: {
    title: string
    description: string
    dueDays: number
    priority: 'low' | 'medium' | 'high'
    assignToType: 'lead_owner' | 'order_owner' | 'team'
    assignToValue?: string
  }
  isActive: boolean
  variables: string[]
  createdAt: string
  lastTriggered?: string
  triggerCount: number
}

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: string
  team: string
  isActive: boolean
}

export default function AutoTaskRulesModal({
  isOpen,
  onClose,
  onSave,
  employees,
  rules
}: AutoTaskRulesModalProps) {
  const [localRules, setLocalRules] = useState<AutoTaskRule[]>([])
  const [selectedRule, setSelectedRule] = useState<AutoTaskRule | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    triggerType: 'lead_stage' as 'lead_stage' | 'order_status',
    triggerValue: '',
    title: '',
    description: '',
    dueDays: 1,
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignToType: 'lead_owner' as 'lead_owner' | 'order_owner' | 'team',
    assignToValue: '',
    isActive: true
  })

  const [filterStatus, setFilterStatus] = useState('')
  const [filterTrigger, setFilterTrigger] = useState('')

  useEffect(() => {
    if (isOpen) {
      setLocalRules([...rules])
      setSelectedRule(null)
      setIsEditing(false)
      setShowCreateForm(false)
      resetForm()
    }
  }, [isOpen, rules])

  const resetForm = () => {
    setFormData({
      name: '',
      triggerType: 'lead_stage',
      triggerValue: '',
      title: '',
      description: '',
      dueDays: 1,
      priority: 'medium',
      assignToType: 'lead_owner',
      assignToValue: '',
      isActive: true
    })
  }

  if (!isOpen) return null

  // Lead stages and order statuses for trigger options
  const leadStages = [
    { value: 'new', label: 'Mới' },
    { value: 'contacted', label: 'Đã liên hệ' },
    { value: 'qualified', label: 'Đủ điều kiện' },
    { value: 'proposal', label: 'Báo giá' },
    { value: 'negotiation', label: 'Đàm phán' },
    { value: 'won', label: 'Chốt Deal' },
    { value: 'lost', label: 'Mất Lead' }
  ]

  const orderStatuses = [
    { value: 'draft', label: 'Nháp' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'shipped', label: 'Đã gửi' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' },
    { value: 'unpaid', label: 'Chưa thanh toán' },
    { value: 'paid', label: 'Đã thanh toán' },
    { value: 'pending_contract', label: 'Chờ hợp đồng' },
    { value: 'contract_sent', label: 'Đã gửi hợp đồng' }
  ]

  const teams = [
    { id: 'sales', name: 'Kinh doanh' },
    { id: 'support', name: 'Hỗ trợ' },
    { id: 'marketing', name: 'Marketing' }
  ]

  // Template variables
  const availableVariables = [
    { key: '{leadName}', description: 'Tên lead' },
    { key: '{leadPhone}', description: 'Số điện thoại lead' },
    { key: '{orderNumber}', description: 'Mã đơn hàng' },
    { key: '{customerName}', description: 'Tên khách hàng' },
    { key: '{productName}', description: 'Tên sản phẩm' },
    { key: '{assigneeName}', description: 'Tên người phụ trách' },
    { key: '{dueDate}', description: 'Ngày đến hạn' },
    { key: '{currentDate}', description: 'Ngày hiện tại' }
  ]

  const handleCreateRule = () => {
    const newRule: AutoTaskRule = {
      id: Date.now().toString(),
      name: formData.name,
      trigger: {
        type: formData.triggerType,
        value: formData.triggerValue
      },
      taskTemplate: {
        title: formData.title,
        description: formData.description,
        dueDays: formData.dueDays,
        priority: formData.priority,
        assignToType: formData.assignToType,
        assignToValue: formData.assignToValue
      },
      isActive: formData.isActive,
      variables: extractVariables(formData.title + ' ' + formData.description),
      createdAt: new Date().toISOString(),
      triggerCount: 0
    }

    setLocalRules(prev => [newRule, ...prev])
    setShowCreateForm(false)
    resetForm()
  }

  const handleUpdateRule = () => {
    if (!selectedRule) return

    const updatedRule: AutoTaskRule = {
      ...selectedRule,
      name: formData.name,
      trigger: {
        type: formData.triggerType,
        value: formData.triggerValue
      },
      taskTemplate: {
        title: formData.title,
        description: formData.description,
        dueDays: formData.dueDays,
        priority: formData.priority,
        assignToType: formData.assignToType,
        assignToValue: formData.assignToValue
      },
      isActive: formData.isActive,
      variables: extractVariables(formData.title + ' ' + formData.description)
    }

    setLocalRules(prev => prev.map(rule => rule.id === selectedRule.id ? updatedRule : rule))
    setIsEditing(false)
    setSelectedRule(null)
    resetForm()
  }

  const handleDeleteRule = (ruleId: string) => {
    setLocalRules(prev => prev.filter(rule => rule.id !== ruleId))
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null)
      setIsEditing(false)
    }
  }

  const handleToggleRule = (ruleId: string) => {
    setLocalRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ))
  }

  const extractVariables = (text: string): string[] => {
    const regex = /\{([^}]+)\}/g
    const matches = []
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[0])
    }
    return Array.from(new Set(matches))
  }

  const handleEditRule = (rule: AutoTaskRule) => {
    setSelectedRule(rule)
    setFormData({
      name: rule.name,
      triggerType: rule.trigger.type,
      triggerValue: rule.trigger.value,
      title: rule.taskTemplate.title,
      description: rule.taskTemplate.description,
      dueDays: rule.taskTemplate.dueDays,
      priority: rule.taskTemplate.priority,
      assignToType: rule.taskTemplate.assignToType,
      assignToValue: rule.taskTemplate.assignToValue || '',
      isActive: rule.isActive
    })
    setIsEditing(true)
    setShowCreateForm(false)
  }

  const filteredRules = localRules.filter(rule => {
    const matchesStatus = !filterStatus || 
      (filterStatus === 'active' && rule.isActive) ||
      (filterStatus === 'inactive' && !rule.isActive)
    
    const matchesTrigger = !filterTrigger || rule.trigger.type === filterTrigger
    
    return matchesStatus && matchesTrigger
  })

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  const getTriggerText = (trigger: { type: string, value: string }) => {
    if (trigger.type === 'lead_stage') {
      const stage = leadStages.find(s => s.value === trigger.value)
      return `Lead chuyển thành "${stage?.label || trigger.value}"`
    } else {
      const status = orderStatuses.find(s => s.value === trigger.value)
      return `Đơn hàng chuyển thành "${status?.label || trigger.value}"`
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Cao'
      case 'medium': return 'Trung bình'
      case 'low': return 'Thấp'
      default: return priority
    }
  }

  const getAssignmentText = (template: any) => {
    switch (template.assignToType) {
      case 'lead_owner': return 'Người phụ trách Lead'
      case 'order_owner': return 'Người phụ trách Đơn hàng'
      case 'team': 
        const team = teams.find(t => t.id === template.assignToValue)
        return `Đội ${team?.name || template.assignToValue}`
      default: return 'Chưa xác định'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Tự động hóa Công việc</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSave(localRules)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Lưu thay đổi</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex h-[80vh]">
          {/* Rules List */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quy tắc tự động</h3>
                <button
                  onClick={() => {
                    setShowCreateForm(true)
                    setIsEditing(false)
                    setSelectedRule(null)
                    resetForm()
                  }}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo quy tắc</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex space-x-2 mb-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
                
                <select
                  value={filterTrigger}
                  onChange={(e) => setFilterTrigger(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả điều kiện</option>
                  <option value="lead_stage">Lead thay đổi</option>
                  <option value="order_status">Đơn hàng thay đổi</option>
                </select>
              </div>
            </div>

            {/* Rules List */}
            <div className="flex-1 overflow-y-auto">
              {filteredRules.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>Chưa có quy tắc tự động nào</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredRules.map(rule => (
                    <div
                      key={rule.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedRule?.id === rule.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedRule(rule)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900 flex items-center space-x-2">
                          <span>{rule.name}</span>
                          {rule.isActive ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Pause className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleRule(rule.id)
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title={rule.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                          >
                            {rule.isActive ? (
                              <Pause className="w-4 h-4 text-gray-600" />
                            ) : (
                              <Play className="w-4 h-4 text-green-600" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditRule(rule)
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteRule(rule.id)
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        {getTriggerText(rule.trigger)}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Công việc: {rule.taskTemplate.title}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rule.taskTemplate.priority)}`}>
                          {getPriorityText(rule.taskTemplate.priority)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {rule.triggerCount} lần kích hoạt
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Rule Details/Form */}
          <div className="flex-1 flex flex-col">
            {showCreateForm || isEditing ? (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {isEditing ? 'Chỉnh sửa quy tắc' : 'Tạo quy tắc mới'}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Rule Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên quy tắc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nhập tên quy tắc"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Trigger Condition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Điều kiện kích hoạt <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={formData.triggerType}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          triggerType: e.target.value as 'lead_stage' | 'order_status',
                          triggerValue: ''
                        }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="lead_stage">Lead thay đổi giai đoạn</option>
                        <option value="order_status">Đơn hàng thay đổi trạng thái</option>
                      </select>
                      
                      <select
                        value={formData.triggerValue}
                        onChange={(e) => setFormData(prev => ({ ...prev, triggerValue: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Chọn trạng thái</option>
                        {formData.triggerType === 'lead_stage' 
                          ? leadStages.map(stage => (
                              <option key={stage.value} value={stage.value}>{stage.label}</option>
                            ))
                          : orderStatuses.map(status => (
                              <option key={status.value} value={status.value}>{status.label}</option>
                            ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Task Template */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Mẫu công việc sẽ tạo</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tiêu đề công việc <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Ví dụ: Gọi lead {leadName}"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mô tả công việc
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Ví dụ: Liên hệ với {leadName} để tư vấn về sản phẩm"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thời hạn (ngày)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={formData.dueDays}
                            onChange={(e) => setFormData(prev => ({ ...prev, dueDays: parseInt(e.target.value) || 1 }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ưu tiên
                          </label>
                          <select
                            value={formData.priority}
                            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="low">Thấp</option>
                            <option value="medium">Trung bình</option>
                            <option value="high">Cao</option>
                          </select>
                        </div>
                      </div>

                      {/* Assignment */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phân công
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={formData.assignToType}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              assignToType: e.target.value as 'lead_owner' | 'order_owner' | 'team',
                              assignToValue: ''
                            }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="lead_owner">Người phụ trách Lead</option>
                            <option value="order_owner">Người phụ trách Đơn hàng</option>
                            <option value="team">Đội cụ thể</option>
                          </select>

                          {formData.assignToType === 'team' && (
                            <select
                              value={formData.assignToValue}
                              onChange={(e) => setFormData(prev => ({ ...prev, assignToValue: e.target.value }))}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Chọn đội</option>
                              {teams.map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Variables Help */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Biến có thể sử dụng</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {availableVariables.map(variable => (
                        <div key={variable.key} className="flex items-center space-x-2">
                          <code className="px-2 py-1 bg-white rounded text-blue-700 font-mono text-xs">
                            {variable.key}
                          </code>
                          <span className="text-blue-700">{variable.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-900">
                      Kích hoạt quy tắc này
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center space-x-3">
                  <button
                    onClick={isEditing ? handleUpdateRule : handleCreateRule}
                    disabled={!formData.name || !formData.triggerValue || !formData.title}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isEditing ? 'Cập nhật' : 'Tạo quy tắc'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false)
                      setIsEditing(false)
                      setSelectedRule(null)
                      resetForm()
                    }}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : selectedRule ? (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{selectedRule.name}</h3>
                    <div className="flex items-center space-x-2">
                      {selectedRule.isActive ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Đang hoạt động
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Tạm dừng
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Trigger Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Điều kiện kích hoạt</h4>
                    <p className="text-gray-700">{getTriggerText(selectedRule.trigger)}</p>
                  </div>

                  {/* Task Template Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Mẫu công việc</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Tiêu đề</label>
                        <p className="text-gray-900">{selectedRule.taskTemplate.title}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Mô tả</label>
                        <p className="text-gray-900">{selectedRule.taskTemplate.description}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Thời hạn</label>
                          <p className="text-gray-900">{selectedRule.taskTemplate.dueDays} ngày</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Ưu tiên</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(selectedRule.taskTemplate.priority)}`}>
                            {getPriorityText(selectedRule.taskTemplate.priority)}
                          </span>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phân công</label>
                          <p className="text-gray-900">{getAssignmentText(selectedRule.taskTemplate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Variables Used */}
                  {selectedRule.variables.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Biến được sử dụng</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRule.variables.map(variable => (
                          <code key={variable} className="px-2 py-1 bg-white rounded text-blue-700 font-mono text-sm">
                            {variable}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Statistics */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Thống kê</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Tạo lúc</label>
                        <p className="text-gray-900">{formatDateTime(selectedRule.createdAt)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Lần kích hoạt cuối</label>
                        <p className="text-gray-900">
                          {selectedRule.lastTriggered ? formatDateTime(selectedRule.lastTriggered) : 'Chưa có'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Tổng lần kích hoạt</label>
                        <p className="text-gray-900">{selectedRule.triggerCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>Chọn quy tắc để xem chi tiết</p>
                  <p className="text-sm mt-1">hoặc tạo quy tắc mới</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
