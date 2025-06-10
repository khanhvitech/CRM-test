'use client'

import { useState } from 'react'
import VileadSidebar from './components/VileadSidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import LeadsManagement from './components/LeadsManagementWithMetrics'
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
        return <LeadsManagement />
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
