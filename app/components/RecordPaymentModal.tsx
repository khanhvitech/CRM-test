'use client'

import React, { useState } from 'react'
import { 
  X,
  Save,
  CreditCard,
  Calendar,
  DollarSign,
  FileText,
  Upload
} from 'lucide-react'

interface RecordPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (paymentData: any) => void
  invoices?: any[]
}

export default function RecordPaymentModal({ isOpen, onClose, onSubmit, invoices = [] }: RecordPaymentModalProps) {
  const [formData, setFormData] = useState({
    invoiceId: '',
    amount: '',
    method: 'transfer',
    date: new Date().toISOString().split('T')[0],
    transactionId: '',
    notes: '',
    receipt: null as File | null
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, receipt: file }))
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash': return 'Tiền mặt'
      case 'transfer': return 'Chuyển khoản'
      case 'card': return 'Thẻ tín dụng'
      case 'ewallet': return 'Ví điện tử'
      default: return method
    }
  }

  const selectedInvoice = invoices.find(inv => inv.id === parseInt(formData.invoiceId))

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.invoiceId) {
      newErrors.invoiceId = 'Vui lòng chọn hóa đơn'
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Số tiền phải lớn hơn 0'
    }
    if (selectedInvoice && parseFloat(formData.amount) > selectedInvoice.remainingAmount) {
      newErrors.amount = 'Số tiền không được vượt quá số tiền còn lại'
    }
    if (!formData.date) {
      newErrors.date = 'Ngày thanh toán là bắt buộc'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const paymentData = {
      ...formData,
      amount: parseFloat(formData.amount),
      invoiceNumber: selectedInvoice?.invoiceNumber,
      customerName: selectedInvoice?.customerName,
      status: 'completed'
    }

    onSubmit(paymentData)
    
    // Reset form
    setFormData({
      invoiceId: '',
      amount: '',
      method: 'transfer',
      date: new Date().toISOString().split('T')[0],
      transactionId: '',
      notes: '',
      receipt: null
    })
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Ghi nhận thanh toán</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Invoice Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn hóa đơn *
            </label>
            <select
              value={formData.invoiceId}
              onChange={(e) => handleInputChange('invoiceId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.invoiceId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">-- Chọn hóa đơn --</option>
              {invoices
                .filter(inv => inv.paymentStatus !== 'paid')
                .map(invoice => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.invoiceNumber} - {invoice.customerName} ({invoice.remainingAmount.toLocaleString('vi-VN')} ₫)
                  </option>
                ))}
            </select>
            {errors.invoiceId && (
              <p className="text-red-500 text-xs mt-1">{errors.invoiceId}</p>
            )}
          </div>

          {/* Invoice Details */}
          {selectedInvoice && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-2">Thông tin hóa đơn</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Tổng tiền:</span>
                  <span className="font-medium">{selectedInvoice.total.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Đã thanh toán:</span>
                  <span className="font-medium">{selectedInvoice.paidAmount.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-1 mt-1">
                  <span className="text-blue-700 font-medium">Còn lại:</span>
                  <span className="font-bold text-blue-900">{selectedInvoice.remainingAmount.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số tiền thanh toán *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phương thức thanh toán
            </label>
            <select
              value={formData.method}
              onChange={(e) => handleInputChange('method', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="transfer">Chuyển khoản</option>
              <option value="cash">Tiền mặt</option>
              <option value="card">Thẻ tín dụng</option>
              <option value="ewallet">Ví điện tử</option>
            </select>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày thanh toán *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã giao dịch
            </label>
            <input
              type="text"
              value={formData.transactionId}
              onChange={(e) => handleInputChange('transactionId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nhập mã giao dịch (nếu có)"
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biên lai thanh toán
            </label>
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Chọn file</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {formData.receipt && (
                <span className="text-sm text-green-600 flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{formData.receipt.name}</span>
                </span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ghi chú thêm về thanh toán..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Ghi nhận thanh toán</span>
          </button>
        </div>
      </div>
    </div>
  )
}
