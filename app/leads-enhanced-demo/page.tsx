'use client'

import React from 'react'
import LeadsManagement from '../components/LeadsManagementFixed'

export default function LeadsEnhancedDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Demo Quản lý Leads nâng cao</h1>
          <p className="text-gray-600 mt-2">Trải nghiệm tính năng quản lý leads với các công cụ phân tích và tự động hóa</p>
        </div>
        <LeadsManagement />
      </div>
    </div>
  )
}
