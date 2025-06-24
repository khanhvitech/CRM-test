# Kanban Pipeline - Quản lý Lead theo phương pháp Kanban

## Tổng quan
Đã cập nhật tính năng Pipeline trong SalesManagement để hiển thị dưới dạng Kanban Board, giúp theo dõi trực quan quá trình chuyển đổi của leads qua các giai đoạn.

## Tính năng chính

### 1. Kanban Board Layout
- **6 cột chính** theo trạng thái lead:
  - **Leads Mới** (new) - Màu xám
  - **Đã Liên Hệ** (contacted) - Màu xanh dương  
  - **Đã Xác Định** (qualified) - Màu vàng
  - **Đã Đề Xuất** (proposal) - Màu tím
  - **Đang Đàm Phán** (negotiation) - Màu cam
  - **Đã Chuyển Đổi** (converted) - Màu xanh lá

### 2. Lead Cards (Thẻ Lead)
Mỗi lead được hiển thị dưới dạng card với thông tin:
- **Tên khách hàng** và **công ty**
- **Tags** với màu sắc (🔥 Hot, 🌡️ Warm, ❄️ Cold)
- **Sản phẩm/dịch vụ** quan tâm
- **Giá trị dự tính** (VND)
- **Nhân viên phụ trách**
- **Ngày tạo**
- **Nút hành động**: Xem chi tiết, chỉnh sửa, tạo deal

### 3. Column Headers (Tiêu đề cột)
Mỗi cột hiển thị:
- **Icon** và **tên giai đoạn**
- **Số lượng leads** trong giai đoạn
- **Tổng giá trị** của leads trong cột (VND)
- **Màu sắc phân biệt** cho dễ nhận biết

### 4. Drag & Drop Support
- **Draggable cards**: Các thẻ lead có thể kéo thả
- **Drop zones**: Các cột hỗ trợ thả card
- **Visual feedback**: Hiệu ứng khi drag/drop
- **Event handlers**: Chuẩn bị cho tính năng update status

### 5. Pipeline Analytics
4 metric cards hiển thị:
- **Tỷ lệ chuyển đổi**: Lead → Deal (%)
- **Giá trị Pipeline**: Tổng giá trị tất cả leads
- **Thời gian trung bình**: Ngày/giai đoạn (mock data)
- **Doanh thu thực**: Từ orders đã tạo

### 6. Pipeline Summary
Header section với:
- **Tổng số leads** trong pipeline
- **Số leads đã chuyển đổi**
- **Tỷ lệ chuyển đổi tổng thể**
- **Visual indicators** với dots màu

## Thiết kế UX/UI

### Color Scheme
```css
/* Status Colors */
new: Gray (bg-gray-100, text-gray-700)
contacted: Blue (bg-blue-100, text-blue-700)  
qualified: Yellow (bg-yellow-100, text-yellow-700)
proposal: Purple (bg-purple-100, text-purple-700)
negotiation: Orange (bg-orange-100, text-orange-700)
converted: Green (bg-green-100, text-green-700)
```

### Responsive Design
- **Desktop**: 6 cột ngang
- **Tablet**: 3 cột ngang, 2 hàng
- **Mobile**: 2 cột ngang, 3 hàng

### Interactive Elements
- **Hover effects**: Cards có shadow khi hover
- **Smooth transitions**: Animation khi kéo thả
- **Visual feedback**: Border highlight khi drag over
- **Cursor**: Pointer khi có thể tương tác

## Kỹ thuật Implementation

### Data Structure
```typescript
const kanbanColumns = [
  {
    id: 'new',
    title: 'Leads Mới',
    status: 'new',
    color: 'bg-gray-100 border-gray-300',
    headerColor: 'bg-gray-50 text-gray-700',
    icon: <Users className="w-5 h-5" />,
    leads: leads.filter(lead => lead.status === 'new')
  },
  // ... other columns
]
```

### Drag & Drop Events
```typescript
const handleDragStart = (e: React.DragEvent, leadId: number) => {
  e.dataTransfer.setData('text/plain', leadId.toString())
}

const handleDrop = (e: React.DragEvent, newStatus: string) => {
  e.preventDefault()
  const leadId = parseInt(e.dataTransfer.getData('text/plain'))
  // Update lead status logic here
}
```

### Column Value Calculation
```typescript
const getColumnValue = (columnLeads: Lead[]) => {
  return columnLeads.reduce((sum, lead) => sum + lead.value, 0)
}
```

## Lợi ích của Kanban Pipeline

### Cho Sales Team
1. **Visual workflow**: Nhìn thấy toàn bộ pipeline cùng lúc
2. **Drag & drop**: Di chuyển leads dễ dàng qua các giai đoạn
3. **Quick actions**: Tạo deal ngay từ card
4. **Status overview**: Biết ngay leads nào cần attention

### Cho Sales Manager
1. **Pipeline health**: Đánh giá sức khỏe pipeline nhanh chóng
2. **Bottleneck identification**: Phát hiện giai đoạn tắc nghẽn
3. **Team performance**: Theo dõi hiệu suất theo assignee
4. **Value tracking**: Giá trị pipeline theo từng giai đoạn

### Cho Hệ thống
1. **Real-time updates**: Cập nhật trạng thái real-time
2. **Performance**: Render hiệu quả với filter
3. **Scalability**: Dễ dàng thêm giai đoạn mới
4. **Extensibility**: Có thể thêm tính năng mới

## Tính năng mở rộng có thể thêm

### 1. Functional Drag & Drop
- Cập nhật database khi kéo thả
- Validation rules cho phép chuyển giai đoạn
- History tracking cho mỗi lần chuyển

### 2. Advanced Filtering
- Filter theo assignee trên Kanban
- Date range filter
- Value range filter
- Multiple select filters

### 3. Bulk Operations
- Select multiple cards
- Bulk status update
- Bulk assignment
- Bulk delete/archive

### 4. Customizable Columns
- Add/remove columns
- Rename columns
- Reorder columns
- Custom status definitions

### 5. Timeline View
- Lead journey timeline
- Activity log per lead
- Time spent in each stage
- Conversion funnel metrics

### 6. Collaboration Features
- Comments on leads
- @mentions và notifications
- Activity feed
- Lead sharing

### 7. Advanced Analytics
- Conversion rate per column
- Average time per stage
- Lead source performance
- Assignee performance metrics

### 8. Mobile Optimization
- Touch-friendly drag & drop
- Swipe gestures
- Mobile-specific actions
- Offline capability

## Performance Considerations

### Client-side Filtering
- Efficient array filtering
- Memoization cho expensive calculations
- Virtual scrolling cho large datasets

### Drag & Drop Performance
- Debounced updates
- Optimistic updates
- Batch operations

### Responsive Updates
- Real-time sync với backend
- WebSocket cho live updates
- Conflict resolution

Kanban Pipeline cung cấp trải nghiệm trực quan và hiệu quả cho việc quản lý leads, giúp sales team có overview tốt hơn về pipeline và tối ưu hóa quy trình chuyển đổi.
