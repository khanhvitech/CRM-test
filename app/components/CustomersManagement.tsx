'use client'

import { useState, useMemo } from 'react'
import { 
  Plus, Search, Filter, MoreVertical, Phone, Mail, Eye, Building2, 
  User, Calendar, Tag, Clock, TrendingUp, TrendingDown, AlertTriangle,
  Star, Heart, DollarSign, MessageCircle, Activity, Target, Gift,
  MapPin, Briefcase, CreditCard, UserCheck, UserX, Users, ChevronDown,
  Bell, RefreshCw, Zap, BarChart3, PieChart, CheckCircle, XCircle,
  FileText, History, Send, Settings, Download, Crown, Award, UserPlus,
  Info, ArrowUpRight, ArrowDownRight, X
} from 'lucide-react'
import CustomerFilters, { CustomerFilters as FilterType } from './CustomerFilters'
import CustomerEventsManager from './CustomerEventsManager'
import CustomerAnalytics from './CustomerAnalytics'
import CustomerAIInsights from './CustomerAIInsights'

interface CustomerTag {
  id: string
  name: string
  color: string
  category: 'behavior' | 'value' | 'engagement' | 'risk'
}

interface CustomerInteraction {
  id: string
  type: 'email' | 'call' | 'meeting' | 'sms' | 'chat' | 'support'
  channel: string
  title: string
  summary: string
  date: string
  status: 'success' | 'pending' | 'failed'
  aiSummary?: string
}

interface CustomerEvent {
  id: string
  type: 'birthday' | 'anniversary' | 'custom'
  title: string
  date: string
  recurring: boolean
  reminderDays: number
  customMessage?: string
}

interface CustomerProduct {
  id: string
  name: string
  category: string
  purchaseDate: string
  quantity: number
  price: number
  status: 'active' | 'expired' | 'cancelled'
}

interface Customer {
  id: number
  name: string
  firstName: string
  lastName: string
  contact: string
  email: string
  secondaryEmail?: string
  company: string
  companySize: 'small' | 'medium' | 'large' | 'enterprise'
  industry: string
  position: string
  department: string
  status: 'active' | 'inactive' | 'at-risk' | 'vip' | 'prospect' | 'lead'
  customerType: 'diamond' | 'gold' | 'silver' | 'bronze' | 'new' | 'returning' | 'inactive'
  tags: CustomerTag[]
  totalValue: string
  lifetimeValue: string
  averageOrderValue: string
  lastOrderDate: string
  lastInteraction: string
  daysSinceLastInteraction: number
  engagementScore: number
  churnRisk: number
  loyaltyPoints: number
  preferredChannel: 'email' | 'phone' | 'chat' | 'in-person' | 'social'
  interactions: CustomerInteraction[]
  events: CustomerEvent[]
  products: CustomerProduct[]
  
  // Personal Information
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed'
  
  // Contact Information
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  phone2?: string
  fax?: string
  website?: string
  
  // Social Media
  socialMedia?: {
    facebook?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
  
  // Business Information
  taxId?: string
  registrationNumber?: string
  businessLicense?: string
  
  // Financial Information
  creditLimit: number
  paymentTerms: string
  currency: string
  taxExempt: boolean
  
  // Preferences
  preferences: {
    communicationFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
    marketingConsent: boolean
    newsletter: boolean
    smsConsent: boolean
    language: string
    timezone: string
    communicationHours: {
      start: string
      end: string
    }
  }
  
  // Relationship Information
  assignedSalesRep?: string
  accountManager?: string
  customerSince: string
  referredBy?: string
  referralCode?: string
  
  // Purchase History
  firstPurchaseDate?: string
  lastPurchaseDate?: string
  totalOrders: number
  totalSpent: number
  averageOrderFrequency: number
  
  // Support Information
  supportTickets: number
  supportPriority: 'low' | 'medium' | 'high' | 'critical'
  customFields?: Record<string, any>
  
  // Metadata
  notes: string
  internalNotes?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  isDeleted: boolean
  deletedAt?: string
  
  // Marketing & Campaigns
  remarketing: {
    eligible: boolean
    priority: 'low' | 'medium' | 'high'
    lastCampaign: string
    campaigns: Array<{
      id: string
      name: string
      type: string
      status: string
      sentAt: string
      openRate?: number
      clickRate?: number
    }>
  }
}

export default function CustomersManagement() {
  const [selectedView, setSelectedView] = useState<'list' | 'analytics' | 'events' | 'insights'>('list')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [advancedFilters, setAdvancedFilters] = useState<FilterType>({})
  // Sample customer data
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Nguyễn Văn An',
      firstName: 'An',
      lastName: 'Nguyễn Văn',
      contact: '0901234567',
      email: 'nguyen.van.an@company.com',
      secondaryEmail: 'an.nguyen@personal.com',
      company: 'Tech Solutions Ltd',
      companySize: 'large',
      industry: 'Công nghệ',
      position: 'CEO',
      department: 'Điều hành',
      status: 'vip',
      customerType: 'diamond',
      tags: [
        { id: '1', name: 'VIP', color: 'bg-purple-100 text-purple-800', category: 'value' },
        { id: '2', name: 'Khách hàng lâu năm', color: 'bg-blue-100 text-blue-800', category: 'engagement' }
      ],
      totalValue: '2,500,000',
      lifetimeValue: '15,000,000',
      averageOrderValue: '500,000',
      lastOrderDate: '2024-01-20',
      lastInteraction: '2024-01-22',
      daysSinceLastInteraction: 2,
      engagementScore: 95,
      churnRisk: 5,
      loyaltyPoints: 2500,
      preferredChannel: 'email',
      dateOfBirth: '1985-03-15',
      gender: 'male',
      maritalStatus: 'married',
      address: '123 Đường Nguyễn Huệ',
      city: 'Hà Nội',
      state: 'Hà Nội',
      country: 'Việt Nam',
      postalCode: '100000',
      phone2: '0901234568',
      website: 'https://techsolutions.com',
      socialMedia: {
        linkedin: 'https://linkedin.com/in/nguyen-van-an',
        facebook: 'https://facebook.com/nguyenvanan'
      },
      taxId: '0123456789',
      creditLimit: 5000000,
      paymentTerms: '30 ngày',
      currency: 'VND',
      taxExempt: false,
      preferences: {
        communicationFrequency: 'weekly',
        marketingConsent: true,
        newsletter: true,
        smsConsent: true,
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        communicationHours: {
          start: '08:00',
          end: '18:00'
        }
      },
      assignedSalesRep: 'Lê Thị Mai',
      accountManager: 'Trần Văn Hùng',
      customerSince: '2023-01-15',
      firstPurchaseDate: '2023-01-20',
      lastPurchaseDate: '2024-01-20',
      totalOrders: 25,
      totalSpent: 15000000,
      averageOrderFrequency: 2,
      supportTickets: 3,
      supportPriority: 'high',
      notes: 'Khách hàng VIP, luôn đánh giá cao dịch vụ',
      internalNotes: 'Có thể nâng cấp lên gói Enterprise',
      createdAt: '2023-01-15',
      updatedAt: '2024-01-22',
      createdBy: 'admin',
      updatedBy: 'sales_manager',
      isDeleted: false,
      interactions: [
        {
          id: '1',
          type: 'call',
          channel: 'Phone',
          title: 'Tư vấn nâng cấp hệ thống',
          summary: 'Khách hàng quan tâm đến package Enterprise',
          date: '2024-01-22',
          status: 'success'
        }
      ],
      events: [
        {
          id: '1',
          type: 'birthday',
          title: 'Sinh nhật CEO',
          date: '2024-03-15',
          recurring: true,
          reminderDays: 7
        }
      ],      products: [
        {
          id: '1',
          name: 'CRM Enterprise',
          category: 'Software',
          purchaseDate: '2024-01-20',
          quantity: 1,
          price: 2500000,
          status: 'active'
        },
        {
          id: '2',
          name: 'AI Analytics Module',
          category: 'Add-on',
          purchaseDate: '2023-12-15',
          quantity: 1,
          price: 1200000,
          status: 'active'
        },
        {
          id: '3',
          name: 'Marketing Automation',
          category: 'Software',
          purchaseDate: '2023-11-10',
          quantity: 1,
          price: 800000,
          status: 'active'
        }
      ],
      remarketing: {
        eligible: false,
        priority: 'low',
        lastCampaign: '2024-01-01',
        campaigns: []
      }
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      firstName: 'Bình',
      lastName: 'Trần Thị',
      contact: '0912345678',
      email: 'tran.thi.binh@startup.vn',
      company: 'Startup Innovation',
      companySize: 'medium',
      industry: 'IT Services',
      position: 'CTO',
      department: 'Công nghệ',
      status: 'active',
      customerType: 'gold',
      tags: [
        { id: '3', name: 'Tiềm năng cao', color: 'bg-green-100 text-green-800', category: 'value' },
        { id: '4', name: 'Startup', color: 'bg-orange-100 text-orange-800', category: 'behavior' }
      ],
      totalValue: '1,200,000',
      lifetimeValue: '3,600,000',
      averageOrderValue: '300,000',
      lastOrderDate: '2024-01-18',
      lastInteraction: '2024-01-20',
      daysSinceLastInteraction: 4,
      engagementScore: 78,
      churnRisk: 15,
      loyaltyPoints: 1200,
      preferredChannel: 'chat',
      dateOfBirth: '1990-07-22',
      gender: 'female',
      maritalStatus: 'single',
      address: '456 Đường Lê Lợi',
      city: 'TP.HCM',
      state: 'TP.HCM',
      country: 'Việt Nam',
      postalCode: '700000',
      website: 'https://startupinnovation.vn',
      socialMedia: {
        linkedin: 'https://linkedin.com/in/tran-thi-binh',
        twitter: 'https://twitter.com/tranthibibh'
      },
      creditLimit: 2000000,
      paymentTerms: '15 ngày',
      currency: 'VND',
      taxExempt: false,
      preferences: {
        communicationFrequency: 'monthly',
        marketingConsent: true,
        newsletter: true,
        smsConsent: false,
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        communicationHours: {
          start: '09:00',
          end: '17:00'
        }
      },
      assignedSalesRep: 'Phạm Minh Tuấn',
      customerSince: '2023-06-10',
      firstPurchaseDate: '2023-06-15',
      lastPurchaseDate: '2024-01-18',
      totalOrders: 12,
      totalSpent: 3600000,
      averageOrderFrequency: 1,
      supportTickets: 1,
      supportPriority: 'medium',
      notes: 'Quan tâm đến công nghệ AI, thường yêu cầu demo',
      createdAt: '2023-06-10',
      updatedAt: '2024-01-20',
      createdBy: 'sales_rep',
      updatedBy: 'sales_rep',
      isDeleted: false,
      interactions: [
        {
          id: '2',
          type: 'email',
          channel: 'Email',
          title: 'Proposal mới về AI Solutions',
          summary: 'Gửi proposal tích hợp AI vào sản phẩm hiện tại',
          date: '2024-01-20',
          status: 'pending'
        }
      ],
      events: [],      products: [
        {
          id: '4',
          name: 'CRM Startup',
          category: 'Software',
          purchaseDate: '2024-01-18',
          quantity: 1,
          price: 800000,
          status: 'active'
        },
        {
          id: '5',
          name: 'Lead Management',
          category: 'Module',
          purchaseDate: '2023-12-20',
          quantity: 1,
          price: 400000,
          status: 'active'
        }
      ],
      remarketing: {
        eligible: true,
        priority: 'medium',
        lastCampaign: '2023-12-15',
        campaigns: [
          {
            id: 'c1',
            name: 'AI Solutions Campaign',
            type: 'email',
            status: 'sent',
            sentAt: '2023-12-15',
            openRate: 85,
            clickRate: 12
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Lê Minh Cường',
      firstName: 'Cường',
      lastName: 'Lê Minh',
      contact: '0923456789',
      email: 'le.minh.cuong@manufacturing.com',
      company: 'Manufacturing Corp',
      companySize: 'enterprise',
      industry: 'Sản xuất',
      position: 'Giám đốc IT',
      department: 'IT',
      status: 'at-risk',
      customerType: 'silver',
      tags: [
        { id: '5', name: 'Rủi ro cao', color: 'bg-red-100 text-red-800', category: 'risk' },
        { id: '6', name: 'Khó liên lạc', color: 'bg-gray-100 text-gray-800', category: 'engagement' }
      ],
      totalValue: '800,000',
      lifetimeValue: '2,400,000',
      averageOrderValue: '400,000',
      lastOrderDate: '2023-11-15',
      lastInteraction: '2023-12-01',
      daysSinceLastInteraction: 54,
      engagementScore: 32,
      churnRisk: 75,
      loyaltyPoints: 400,
      preferredChannel: 'phone',
      dateOfBirth: '1978-12-10',
      gender: 'male',
      maritalStatus: 'married',
      address: '789 Đường Trần Phú',
      city: 'Đà Nẵng',
      state: 'Đà Nẵng',
      country: 'Việt Nam',
      postalCode: '550000',
      phone2: '0923456788',
      website: 'https://manufacturingcorp.vn',
      creditLimit: 1500000,
      paymentTerms: '45 ngày',
      currency: 'VND',
      taxExempt: true,
      preferences: {
        communicationFrequency: 'quarterly',
        marketingConsent: false,
        newsletter: false,
        smsConsent: false,
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        communicationHours: {
          start: '07:00',
          end: '16:00'
        }
      },
      assignedSalesRep: 'Nguyễn Thị Lan',
      customerSince: '2023-03-20',
      firstPurchaseDate: '2023-04-01',
      lastPurchaseDate: '2023-11-15',
      totalOrders: 6,
      totalSpent: 2400000,
      averageOrderFrequency: 0.5,
      supportTickets: 8,
      supportPriority: 'high',
      notes: 'Khách hàng ít tương tác, cần chăm sóc đặc biệt',
      internalNotes: 'Có vấn đề về thanh toán, cần theo dõi',
      createdAt: '2023-03-20',
      updatedAt: '2023-12-01',
      createdBy: 'sales_rep',
      updatedBy: 'account_manager',
      isDeleted: false,
      interactions: [
        {
          id: '3',
          type: 'call',
          channel: 'Phone',
          title: 'Cuộc gọi chăm sóc khách hàng',
          summary: 'Không liên lạc được, để lại voicemail',
          date: '2023-12-01',
          status: 'failed'
        }
      ],
      events: [],      products: [
        {
          id: '6',
          name: 'ERP Manufacturing',
          category: 'Software',
          purchaseDate: '2023-11-15',
          quantity: 1,
          price: 800000,
          status: 'active'
        }
      ],
      remarketing: {
        eligible: true,
        priority: 'high',
        lastCampaign: '2024-01-10',
        campaigns: [
          {
            id: 'c2',
            name: 'Win-back Campaign',
            type: 'email',
            status: 'sent',
            sentAt: '2024-01-10',
            openRate: 45,
            clickRate: 3
          }
        ]
      }
    },
    {
      id: 4,
      name: 'Phạm Thanh Hoa',
      firstName: 'Hoa',
      lastName: 'Phạm Thanh',
      contact: '0934567890',
      email: 'pham.thanh.hoa@retail.com',
      company: 'Retail Solutions',
      companySize: 'small',
      industry: 'Bán lẻ',
      position: 'Chủ cửa hàng',
      department: 'Kinh doanh',
      status: 'active',
      customerType: 'bronze',
      tags: [
        { id: '7', name: 'Khách hàng mới', color: 'bg-blue-100 text-blue-800', category: 'value' }
      ],
      totalValue: '450,000',
      lifetimeValue: '450,000',
      averageOrderValue: '150,000',
      lastOrderDate: '2024-01-15',
      lastInteraction: '2024-01-16',
      daysSinceLastInteraction: 8,
      engagementScore: 65,
      churnRisk: 25,
      loyaltyPoints: 150,
      preferredChannel: 'phone',
      dateOfBirth: '1988-05-20',
      gender: 'female',
      maritalStatus: 'married',
      address: '321 Đường Hai Bà Trưng',
      city: 'Hải Phòng',
      state: 'Hải Phòng',
      country: 'Việt Nam',
      postalCode: '180000',
      creditLimit: 500000,
      paymentTerms: '7 ngày',
      currency: 'VND',
      taxExempt: false,
      preferences: {
        communicationFrequency: 'weekly',
        marketingConsent: true,
        newsletter: true,
        smsConsent: true,
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        communicationHours: {
          start: '08:00',
          end: '20:00'
        }
      },
      assignedSalesRep: 'Vũ Thị Nga',
      customerSince: '2023-12-01',
      firstPurchaseDate: '2023-12-05',
      lastPurchaseDate: '2024-01-15',
      totalOrders: 3,
      totalSpent: 450000,
      averageOrderFrequency: 1,
      supportTickets: 0,
      supportPriority: 'low',      notes: 'Khách hàng mới, tiềm năng phát triển',
      createdAt: '2023-12-01',
      updatedAt: '2024-01-16',
      createdBy: 'sales_rep',
      updatedBy: 'sales_rep',
      isDeleted: false,
      interactions: [],
      events: [],
      products: [
        {
          id: '6',
          name: 'CRM Basic',
          category: 'Software',
          purchaseDate: '2024-01-15',
          quantity: 1,
          price: 450000,
          status: 'active'
        }
      ],
      remarketing: {
        eligible: false,
        priority: 'low',
        lastCampaign: '',
        campaigns: []
      }
    },
    {
      id: 5,
      name: 'Hoàng Minh Đức',
      firstName: 'Đức',
      lastName: 'Hoàng Minh',
      contact: '0945678901',
      email: 'hoang.minh.duc@finance.vn',
      company: 'Finance Group',
      companySize: 'large',
      industry: 'Tài chính',
      position: 'Giám đốc Tài chính',
      department: 'Tài chính',
      status: 'inactive',
      customerType: 'inactive',
      tags: [
        { id: '8', name: 'Không quay lại', color: 'bg-gray-100 text-gray-800', category: 'risk' }
      ],
      totalValue: '0',
      lifetimeValue: '5,200,000',
      averageOrderValue: '650,000',
      lastOrderDate: '2023-08-15',
      lastInteraction: '2023-09-10',
      daysSinceLastInteraction: 136,
      engagementScore: 15,
      churnRisk: 95,
      loyaltyPoints: 0,
      preferredChannel: 'email',
      dateOfBirth: '1975-11-30',
      gender: 'male',
      maritalStatus: 'divorced',
      address: '654 Đường Đồng Khởi',
      city: 'TP.HCM',
      state: 'TP.HCM',
      country: 'Việt Nam',
      postalCode: '700000',
      creditLimit: 0,
      paymentTerms: 'Thanh toán ngay',
      currency: 'VND',
      taxExempt: false,
      preferences: {
        communicationFrequency: 'monthly',
        marketingConsent: false,
        newsletter: false,
        smsConsent: false,
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        communicationHours: {
          start: '09:00',
          end: '17:00'
        }
      },
      assignedSalesRep: 'Đỗ Văn Minh',
      customerSince: '2022-05-10',
      firstPurchaseDate: '2022-05-15',
      lastPurchaseDate: '2023-08-15',
      totalOrders: 8,
      totalSpent: 5200000,
      averageOrderFrequency: 0.5,
      supportTickets: 2,
      supportPriority: 'low',
      notes: 'Khách hàng ngưng hoạt động từ Q3/2023',      internalNotes: 'Chuyển sang đối thủ cạnh tranh',
      createdAt: '2022-05-10',
      updatedAt: '2023-09-10',
      createdBy: 'sales_manager',
      updatedBy: 'sales_rep',
      isDeleted: false,
      interactions: [],
      events: [],
      products: [
        {
          id: '7',
          name: 'CRM Enterprise',
          category: 'Software',
          purchaseDate: '2022-05-15',
          quantity: 1,
          price: 2000000,
          status: 'expired'
        },
        {
          id: '8',
          name: 'Financial Analytics',
          category: 'Module',
          purchaseDate: '2022-08-20',
          quantity: 1,
          price: 1500000,
          status: 'expired'
        },
        {
          id: '9',
          name: 'Reporting Dashboard',
          category: 'Add-on',
          purchaseDate: '2023-01-10',
          quantity: 1,
          price: 800000,
          status: 'expired'
        }
      ],
      remarketing: {
        eligible: true,
        priority: 'high',
        lastCampaign: '2023-11-01',
        campaigns: [
          {
            id: 'c3',
            name: 'Reactivation Campaign',
            type: 'email',
            status: 'sent',
            sentAt: '2023-11-01',
            openRate: 25,
            clickRate: 0
          }
        ]
      }
    },
    {
      id: 6,
      name: 'Ngô Thị Linh',
      firstName: 'Linh',
      lastName: 'Ngô Thị',
      contact: '0956789012',
      email: 'ngo.thi.linh@education.edu.vn',
      company: 'Education Institute',
      companySize: 'medium',
      industry: 'Giáo dục',
      position: 'Hiệu trưởng',
      department: 'Điều hành',
      status: 'prospect',
      customerType: 'new',
      tags: [
        { id: '9', name: 'Prospect', color: 'bg-yellow-100 text-yellow-800', category: 'value' },
        { id: '10', name: 'Giáo dục', color: 'bg-indigo-100 text-indigo-800', category: 'behavior' }
      ],
      totalValue: '0',
      lifetimeValue: '0',
      averageOrderValue: '0',
      lastOrderDate: '',
      lastInteraction: '2024-01-23',
      daysSinceLastInteraction: 1,
      engagementScore: 85,
      churnRisk: 10,
      loyaltyPoints: 0,
      preferredChannel: 'email',
      dateOfBirth: '1982-09-12',
      gender: 'female',
      maritalStatus: 'married',
      address: '987 Đường Lý Thường Kiệt',
      city: 'Cần Thơ',
      state: 'Cần Thơ',
      country: 'Việt Nam',
      postalCode: '900000',
      creditLimit: 1000000,
      paymentTerms: '30 ngày',
      currency: 'VND',
      taxExempt: true,
      preferences: {
        communicationFrequency: 'weekly',
        marketingConsent: true,
        newsletter: true,
        smsConsent: false,
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        communicationHours: {
          start: '08:00',
          end: '17:00'
        }
      },
      assignedSalesRep: 'Lý Hoàng Nam',
      customerSince: '2024-01-20',
      firstPurchaseDate: '',
      lastPurchaseDate: '',
      totalOrders: 0,
      totalSpent: 0,
      averageOrderFrequency: 0,
      supportTickets: 0,
      supportPriority: 'medium',
      notes: 'Prospect mới, đang tìm hiểu sản phẩm',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-23',
      createdBy: 'sales_rep',
      updatedBy: 'sales_rep',
      isDeleted: false,      interactions: [
        {
          id: '4',
          type: 'email',
          channel: 'Email',
          title: 'Gửi thông tin sản phẩm',
          summary: 'Gửi brochure và bảng giá chi tiết',
          date: '2024-01-23',
          status: 'success'
        }
      ],
      events: [],
      products: [
        {
          id: '10',
          name: 'CRM Education',
          category: 'Software',
          purchaseDate: '2024-01-22',
          quantity: 1,
          price: 600000,
          status: 'active'
        },
        {
          id: '11',
          name: 'Student Management',
          category: 'Module',
          purchaseDate: '2024-01-22',
          quantity: 1,
          price: 300000,
          status: 'active'
        }
      ],
      remarketing: {
        eligible: false,
        priority: 'medium',
        lastCampaign: '',
        campaigns: []
      }
    }
  ])

  // Helper functions
  const formatCurrency = (value: string) => {
    return parseInt(value.replace(/,/g, '')).toLocaleString()
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'text-red-600'
    if (risk >= 40) return 'text-orange-600'
    return 'text-green-600'
  }

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleExportData = (format: 'csv' | 'excel') => {
    console.log(`Exporting ${filteredCustomers.length} customers as ${format}`)
    // Implement export logic here
  }

  const handleRemarketingClick = () => {
    console.log(`Opening remarketing for ${remarketingCustomers.length} customers`)
    // Implement remarketing logic here
  }

  const handleApplyFilters = (filters: FilterType) => {
    setAdvancedFilters(filters)
  }

  const handleClearFilters = () => {
    setAdvancedFilters({})
    setSearchTerm('')
    setFilterStatus('')
    setFilterIndustry('')
    setFilterTag('')
  }
  // Filter logic with null safety - Only show customers who have purchased products
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Only show customers who have purchased products
      const hasPurchasedProducts = customer.products && customer.products.length > 0
      if (!hasPurchasedProducts) return false

      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = !filterStatus || customer.status === filterStatus
      const matchesIndustry = !filterIndustry || customer.industry === filterIndustry
      const matchesTag = !filterTag || customer.tags.some(tag => tag.name === filterTag)

      let matchesAdvanced = true

      // Range filters with null safety
      const { 
        engagementScore: engagementFilter, 
        churnRisk: churnFilter, 
        totalValue: valueFilter,
        ...booleanFilters 
      } = advancedFilters

      if (engagementFilter) {
        if (engagementFilter.min !== undefined && customer.engagementScore < engagementFilter.min) matchesAdvanced = false
        if (engagementFilter.max !== undefined && customer.engagementScore > engagementFilter.max) matchesAdvanced = false
      }
      if (churnFilter) {
        if (churnFilter.min !== undefined && customer.churnRisk < churnFilter.min) matchesAdvanced = false
        if (churnFilter.max !== undefined && customer.churnRisk > churnFilter.max) matchesAdvanced = false
      }
      if (valueFilter) {
        const customerValue = parseInt(customer.totalValue.replace(/,/g, ''))
        if (valueFilter.min !== undefined && customerValue < valueFilter.min) matchesAdvanced = false
        if (valueFilter.max !== undefined && customerValue > valueFilter.max) matchesAdvanced = false
      }

      // Boolean filters
      Object.entries(booleanFilters).forEach(([key, filterValue]) => {
        if (filterValue) {
          if (key === 'isVip') {
            if (filterValue === true && customer.status !== 'vip') {
              matchesAdvanced = false
            }
          } else if (key === 'isAtRisk') {
            if (filterValue === true && customer.status !== 'at-risk' && customer.churnRisk < 60) {
              matchesAdvanced = false
            }
          } else if (key === 'needsRemarketing') {
            if (filterValue === true && customer.daysSinceLastInteraction <= 30 && customer.churnRisk <= 50) {
              matchesAdvanced = false
            }
          }
        }
      })

      return matchesSearch && matchesStatus && matchesIndustry && matchesTag && 
             matchesAdvanced
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'lastInteraction':
          return new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime()
        case 'engagementScore':
          return b.engagementScore - a.engagementScore
        case 'churnRisk':
          return b.churnRisk - a.churnRisk
        case 'totalValue':
          return parseInt(b.totalValue.replace(/,/g, '')) - parseInt(a.totalValue.replace(/,/g, ''))
        default:
          return 0
      }
    })
  }, [customers, searchTerm, filterStatus, filterIndustry, filterTag, sortBy, advancedFilters])

  const remarketingCustomers = customers.filter(c => 
    c.remarketing.eligible && (c.status === 'at-risk' || c.churnRisk >= 50)
  )

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chăm sóc Khách hàng</h1>
          <p className="text-gray-600">Quản lý thông tin chi tiết và hành vi khách hàng</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Xuất dữ liệu ({filteredCustomers.length})</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="py-2">
                <button
                  onClick={() => handleExportData('csv')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-green-600" />
                  <span>Xuất CSV</span>
                </button>
                <button
                  onClick={() => handleExportData('excel')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Xuất Excel</span>
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleRemarketingClick}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <Target className="w-4 h-4" />
            <span>Remarketing ({remarketingCustomers.length})</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Thêm khách hàng</span>
          </button>
        </div>
      </div>

      {/* Customer Classification Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Phân loại khách hàng</h2>
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Info className="w-4 h-4 mr-2" />
            <span>Định nghĩa phân hạng</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Diamond Customer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-yellow-500 rounded-t-lg"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-yellow-100 p-3 mr-4 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Khách hàng Kim cương</p>
                  <p className="text-2xl font-bold">24</p>
                  <div className="flex items-center text-green-600 text-xs">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="ml-1">8% so với tháng trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Silver Customer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-gray-400 rounded-t-lg"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-gray-100 p-3 mr-4 flex items-center justify-center">
                  <Award className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Khách hàng Bạc</p>
                  <p className="text-2xl font-bold">86</p>
                  <div className="flex items-center text-green-600 text-xs">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="ml-1">12% so với tháng trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gold Customer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-yellow-400 rounded-t-lg"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-yellow-100 p-3 mr-4 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Khách hàng Vàng</p>
                  <p className="text-2xl font-bold">53</p>
                  <div className="flex items-center text-green-600 text-xs">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="ml-1">5% so với tháng trước</span>
                  </div>
                </div>
              </div>
            </div>          </div>

          {/* New Customer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-blue-500 rounded-t-lg"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Khách hàng Mới</p>
                  <p className="text-2xl font-bold">42</p>
                  <div className="flex items-center text-green-600 text-xs">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="ml-1">15% so với tháng trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Old Customer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-purple-500 rounded-t-lg"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4 flex items-center justify-center">
                  <History className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Khách hàng Cũ</p>
                  <p className="text-2xl font-bold">78</p>
                  <div className="flex items-center text-red-600 text-xs">
                    <ArrowDownRight className="w-3 h-3" />
                    <span className="ml-1">5% so với tháng trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inactive Customer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-red-500 rounded-t-lg"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-red-100 p-3 mr-4 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Không quay lại</p>
                  <p className="text-2xl font-bold">37</p>
                  <div className="flex items-center text-red-600 text-xs">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="ml-1">7% so với tháng trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('list')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              🗂️ Danh sách
            </button>            <button
              onClick={() => setSelectedView('analytics')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'analytics' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              📊 Phân tích
            </button>
            <button
              onClick={() => setSelectedView('events')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'events' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              🎉 Sự kiện
            </button>
            <button
              onClick={() => setSelectedView('insights')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedView === 'insights' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
              }`}
            >
              🤖 AI Insights
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="lastInteraction">Tương tác gần nhất</option>
            <option value="engagementScore">Điểm tương tác</option>
            <option value="churnRisk">Rủi ro rời bỏ</option>
            <option value="totalValue">Giá trị</option>
          </select>
        </div>
      </div>

      {/* Filter Summary */}
      {(Object.keys(advancedFilters).length > 0 || searchTerm || filterStatus || filterIndustry || filterTag) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Đang áp dụng bộ lọc - Hiển thị {filteredCustomers.length} trong tổng số {customers.length} khách hàng
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-blue-700">
                {Object.keys(advancedFilters).length > 0 && "Bộ lọc nâng cao ✓"}
                {(searchTerm || filterStatus || filterIndustry || filterTag) && " Bộ lọc cơ bản ✓"}
              </span>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterStatus('')
                  setFilterIndustry('')
                  setFilterTag('')
                  setAdvancedFilters({})
                }}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          </div>
        </div>      )}

      {/* Advanced Filters */}
      <CustomerFilters 
        onFilterChange={handleApplyFilters}
        initialFilters={advancedFilters}
      />

      {/* Content based on selected view */}
      {selectedView === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Danh sách khách hàng</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >                  <option value="">Tất cả trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="at-risk">Có nguy cơ</option>
                  <option value="vip">VIP</option>
                  <option value="prospect">Tiềm năng</option>
                  <option value="lead">Khách hàng tiềm năng</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Khách hàng</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Công ty</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Hạng KH</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sản phẩm đã mua</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Tương tác cuối</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Điểm tương tác</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rủi ro</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Giá trị</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                            customer.status === 'vip' ? 'bg-purple-600' :
                            customer.status === 'active' ? 'bg-green-600' :
                            customer.status === 'at-risk' ? 'bg-red-600' : 'bg-gray-600'
                          }`}>
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </div>
                      </td>                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{customer.company}</div>
                        <div className="text-xs text-gray-500">{customer.industry}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          customer.customerType === 'diamond' ? 'bg-yellow-100 text-yellow-800' :
                          customer.customerType === 'gold' ? 'bg-amber-100 text-amber-800' :
                          customer.customerType === 'silver' ? 'bg-gray-100 text-gray-800' :
                          customer.customerType === 'bronze' ? 'bg-orange-100 text-orange-800' :
                          customer.customerType === 'new' ? 'bg-blue-100 text-blue-800' :
                          customer.customerType === 'returning' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {customer.customerType === 'diamond' ? '💎 Kim cương' :
                           customer.customerType === 'gold' ? '🥇 Vàng' :
                           customer.customerType === 'silver' ? '🥈 Bạc' :
                           customer.customerType === 'bronze' ? '🥉 Đồng' :
                           customer.customerType === 'new' ? '🆕 Mới' :
                           customer.customerType === 'returning' ? '🔄 Quay lại' : '❌ Không hoạt động'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                          customer.status === 'active' ? 'bg-green-100 text-green-800' :
                          customer.status === 'at-risk' ? 'bg-red-100 text-red-800' :
                          customer.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                          customer.status === 'lead' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status === 'vip' ? 'VIP' :
                           customer.status === 'active' ? 'Hoạt động' :
                           customer.status === 'at-risk' ? 'Có nguy cơ' :
                           customer.status === 'prospect' ? 'Tiềm năng' :                           customer.status === 'lead' ? 'Khách hàng tiềm năng' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs">
                          {customer.products && customer.products.length > 0 ? (
                            <div className="space-y-1">
                              {customer.products.slice(0, 2).map((product, index) => (
                                <div key={product.id} className="flex items-center justify-between">
                                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                                    product.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {product.name}
                                  </span>
                                </div>
                              ))}
                              {customer.products.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{customer.products.length - 2} sản phẩm khác
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">Chưa mua sản phẩm</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{customer.lastInteraction || 'Chưa có'}</div>
                        <div className="text-xs text-gray-500">{customer.daysSinceLastInteraction} ngày</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            customer.engagementScore >= 80 ? 'bg-green-500' :
                            customer.engagementScore >= 60 ? 'bg-yellow-500' :
                            customer.engagementScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium">{customer.engagementScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`text-sm font-medium ${getRiskColor(customer.churnRisk)}`}>
                          {customer.churnRisk}%
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{formatCurrency(customer.totalValue)} VNĐ</div>
                        <div className="text-xs text-gray-500">LTV: {formatCurrency(customer.lifetimeValue)} VNĐ</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleCustomerSelect(customer)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Chi tiết
                          </button>
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                            Gọi
                          </button>
                          <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                            Email
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
      )}      {selectedView === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Analytics Overview Cards */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng khách hàng</p>
                <p className="text-2xl font-bold text-gray-900">{filteredCustomers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Khách hàng VIP</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredCustomers.filter(c => c.status === 'vip').length}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Có nguy cơ</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredCustomers.filter(c => c.status === 'at-risk').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng giá trị</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    filteredCustomers.reduce((sum, c) => sum + parseInt(c.totalValue.replace(/,/g, '')), 0).toString()
                  )} VNĐ
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="col-span-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích chi tiết</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Phân bố theo trạng thái</h4>
                  <div className="space-y-2">
                    {['active', 'vip', 'at-risk', 'inactive'].map(status => {
                      const count = filteredCustomers.filter(c => c.status === status).length
                      const percentage = filteredCustomers.length > 0 ? (count / filteredCustomers.length * 100).toFixed(1) : 0
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">
                            {status === 'active' ? 'Hoạt động' :
                             status === 'vip' ? 'VIP' :
                             status === 'at-risk' ? 'Có nguy cơ' : 'Không hoạt động'}
                          </span>
                          <span className="text-sm font-medium">{count} ({percentage}%)</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Điểm tương tác trung bình</h4>
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(
                      filteredCustomers.reduce((sum, c) => sum + c.engagementScore, 0) / filteredCustomers.length || 0
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">trên 100 điểm</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Rủi ro trung bình</h4>
                  <div className="text-3xl font-bold text-orange-600">
                    {Math.round(
                      filteredCustomers.reduce((sum, c) => sum + c.churnRisk, 0) / filteredCustomers.length || 0
                    )}%
                  </div>
                  <p className="text-sm text-gray-500 mt-1">khả năng rời bỏ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'events' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quản lý sự kiện khách hàng</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4 inline mr-2" />
              Thêm sự kiện
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.filter(c => c.events.length > 0).map(customer => (
              <div key={customer.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    customer.status === 'vip' ? 'bg-purple-600' :
                    customer.status === 'active' ? 'bg-green-600' :
                    customer.status === 'at-risk' ? 'bg-red-600' : 'bg-gray-600'
                  }`}>
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{customer.name}</h4>
                    <p className="text-xs text-gray-500">{customer.company}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {customer.events.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.filter(c => c.events.length > 0).length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có sự kiện nào được tạo</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Tạo sự kiện đầu tiên
              </button>
            </div>
          )}
        </div>
      )}

      {selectedView === 'insights' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Insights - Phân tích thông minh</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* High-risk customers insights */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-3">🚨 Cảnh báo rủi ro cao</h4>
                <div className="space-y-2">
                  {filteredCustomers
                    .filter(c => c.churnRisk >= 70)
                    .slice(0, 3)
                    .map(customer => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <span className="text-sm text-red-700">{customer.name}</span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          {customer.churnRisk}% rủi ro
                        </span>
                      </div>
                    ))}
                </div>
                <button className="mt-3 text-xs text-red-600 hover:text-red-800 underline">
                  Xem tất cả khách hàng rủi ro cao
                </button>
              </div>

              {/* Growth opportunities */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-3">📈 Cơ hội tăng trưởng</h4>
                <div className="space-y-2">
                  {filteredCustomers
                    .filter(c => c.engagementScore >= 80 && c.status === 'active')
                    .slice(0, 3)
                    .map(customer => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <span className="text-sm text-green-700">{customer.name}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {customer.engagementScore} điểm
                        </span>
                      </div>
                    ))}
                </div>
                <button className="mt-3 text-xs text-green-600 hover:text-green-800 underline">
                  Xem khách hàng tiềm năng nâng cấp
                </button>
              </div>

              {/* Remarketing recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-3">🎯 Gợi ý Remarketing</h4>
                <div className="space-y-2">
                  {filteredCustomers
                    .filter(c => c.daysSinceLastInteraction > 30)
                    .slice(0, 3)
                    .map(customer => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">{customer.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {customer.daysSinceLastInteraction} ngày
                        </span>
                      </div>
                    ))}
                </div>
                <button className="mt-3 text-xs text-blue-600 hover:text-blue-800 underline">
                  Tạo chiến dịch remarketing
                </button>
              </div>

              {/* Industry insights */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-3">🏢 Phân tích ngành</h4>
                <div className="space-y-2">
                  {Array.from(new Set(filteredCustomers.map(c => c.industry)))
                    .slice(0, 3)
                    .map(industry => {
                      const count = filteredCustomers.filter(c => c.industry === industry).length
                      return (
                        <div key={industry} className="flex items-center justify-between">
                          <span className="text-sm text-purple-700">{industry}</span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {count} khách hàng
                          </span>
                        </div>
                      )
                    })}
                </div>
                <button className="mt-3 text-xs text-purple-600 hover:text-purple-800 underline">
                  Xem báo cáo chi tiết theo ngành
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết khách hàng</h3>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-medium ${
                  selectedCustomer.status === 'vip' ? 'bg-purple-600' :
                  selectedCustomer.status === 'active' ? 'bg-green-600' :
                  selectedCustomer.status === 'at-risk' ? 'bg-red-600' : 'bg-gray-600'
                }`}>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{selectedCustomer.name}</h4>
                  <p className="text-gray-600">{selectedCustomer.position} tại {selectedCustomer.company}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    selectedCustomer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                    selectedCustomer.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedCustomer.status === 'at-risk' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCustomer.status === 'vip' ? 'VIP' :
                     selectedCustomer.status === 'active' ? 'Hoạt động' :
                     selectedCustomer.status === 'at-risk' ? 'Có nguy cơ' : 'Không hoạt động'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Điện thoại</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.contact}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngành</label>
                  <p className="text-sm text-gray-900">{selectedCustomer.industry}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedCustomer.engagementScore}</div>
                  <div className="text-sm text-blue-700">Điểm tương tác</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{selectedCustomer.churnRisk}%</div>
                  <div className="text-sm text-red-700">Rủi ro rời bỏ</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedCustomer.totalValue)}</div>
                  <div className="text-sm text-green-700">Giá trị (VNĐ)</div>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedCustomer.notes}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Gọi điện
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Gửi email
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Đặt lịch
                </button>
              </div>
            </div>
          </div>        </div>
      )}
    </div>
  )
}