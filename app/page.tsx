'use client'

import { useState } from 'react'
import VileadSidebar from './components/VileadSidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import WorkspaceManagement from './components/WorkspaceManagement'
import SalesManagement from './components/SalesManagement'
import CustomersManagement from './components/CustomersManagement'
import OrderManagement from './components/OrderManagement'
import TaskManagement from './components/TaskManagement'
import ReportsManagement from './components/ReportsManagement'
import SettingsManagement from './components/SettingsManagement'
import ChatbotAssistant from './components/ChatbotAssistantNew'
// import VileadsChatbot from './components/VileadsChatbot'

export default function Home() {
  const [currentView, setCurrentView] = useState('workspace') // Đổi mặc định từ 'dashboard' thành 'workspace'

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'workspace':
        return <WorkspaceManagement />
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
      {/* Vileads Chatbot - Available on all pages */}
      <ChatbotAssistant />
      {/* <VileadsChatbot /> */}
    </div>
  )
}
