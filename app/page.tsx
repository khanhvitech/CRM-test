'use client'

import { useState } from 'react'
import VileadSidebar from './components/VileadSidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import AccountantDashboard from './components/AccountantDashboard'
import SalesManagement from './components/SalesManagement'
import CustomersManagement from './components/CustomersManagement'
import OrderManagement from './components/OrderManagement'
import TaskManagement from './components/TaskManagement'
import ReportsManagement from './components/ReportsManagement'
import SettingsManagement from './components/SettingsManagement'
import ChatbotAssistant from './components/ChatbotAssistantNew'
// import VileadsChatbot from './components/VileadsChatbot'

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard') // Đổi về dashboard làm mặc định
  const [userRole, setUserRole] = useState('admin') // Theo dõi vai trò người dùng

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  const handleRoleChange = (role: string) => {
    setUserRole(role)
    // Nếu chuyển sang kế toán và đang ở dashboard, chuyển sang dashboard kế toán
    if (role === 'accountant' && currentView === 'dashboard') {
      // Dashboard sẽ tự động hiển thị AccountantDashboard
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        // Hiển thị dashboard phù hợp với vai trò
        if (userRole === 'accountant') {
          return <AccountantDashboard />
        }
        return <Dashboard />
      case 'sales':
        return <SalesManagement />
      case 'customers':
        return <CustomersManagement />
      case 'leads': // Redirect cũ để backward compatibility
        return <SalesManagement />
      case 'deals': // Redirect cũ để backward compatibility
        return <SalesManagement />
      case 'orders':
        return <OrderManagement />
      case 'tasks':
        return <TaskManagement />
      case 'products':  // Redirect to settings for backward compatibility
        return <SettingsManagement />
      case 'employees': // Redirect to settings for backward compatibility
        return <SettingsManagement />
      case 'kpis':      // Redirect to reports for backward compatibility
        return <ReportsManagement />
      case 'company':   // Redirect to settings for backward compatibility
        return <SettingsManagement />
      case 'reports':
        return <ReportsManagement />
      case 'settings':
        return <SettingsManagement />
      default:
        return userRole === 'accountant' ? <AccountantDashboard /> : <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <VileadSidebar 
        currentView={currentView} 
        setCurrentView={handleViewChange}
        userRole={userRole}
        onRoleChange={handleRoleChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ marginLeft: '256px' }}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
      {/* Vileads Chatbot - Available on all pages */}
      <ChatbotAssistant />
      {/* <VileadsChatbot /> */}
    </div>
  )
}
