'use client'

import { useState } from 'react'
import VileadSidebar from './components/VileadSidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import CustomersManagement from './components/CustomersManagement'
import DealsManagement from './components/DealsManagement'

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard')

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'leads':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Leads</h1>
                <p className="text-gray-600">Quản lý và theo dõi tất cả khách hàng tiềm năng</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900">Tổng Leads</h3>
                    <p className="text-2xl font-bold text-blue-600">245</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-900">Leads mới</h3>
                    <p className="text-2xl font-bold text-green-600">32</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-yellow-900">Đang xử lý</h3>
                    <p className="text-2xl font-bold text-yellow-600">156</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-purple-900">Đã chuyển đổi</h3>
                    <p className="text-2xl font-bold text-purple-600">57</p>
                  </div>
                </div>
                <p className="text-gray-600">Tính năng quản lý leads chi tiết đang được phát triển...</p>
              </div>
            </div>
          </div>
        )
      case 'customers':
        return <CustomersManagement />
      case 'deals':
        return <DealsManagement />
      case 'orders':
        return <div className="p-6"><h2 className="text-2xl font-bold">Quản lý Đơn hàng</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'products':
        return <div className="p-6"><h2 className="text-2xl font-bold">Quản lý Sản phẩm</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'tasks':
        return <div className="p-6"><h2 className="text-2xl font-bold">Quản lý Công việc</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'calendar':
        return <div className="p-6"><h2 className="text-2xl font-bold">Lịch</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'employees':
        return <div className="p-6"><h2 className="text-2xl font-bold">Quản lý Nhân viên</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'kpis':
        return <div className="p-6"><h2 className="text-2xl font-bold">KPIs</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'reports':
        return <div className="p-6"><h2 className="text-2xl font-bold">Báo cáo</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'company':
        return <div className="p-6"><h2 className="text-2xl font-bold">Công ty</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Cài đặt</h2><p className="text-gray-600 mt-2">Tính năng đang phát triển...</p></div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <VileadSidebar currentView={currentView} setCurrentView={handleViewChange} />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ marginLeft: '256px' }}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
