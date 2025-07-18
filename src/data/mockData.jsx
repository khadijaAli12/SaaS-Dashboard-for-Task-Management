export const dashboardStats = [
  {
    title: 'Total Users',
    value: '2,543',
    change: '+12%',
    changeType: 'positive',
    icon: '👥',
    color: 'primary'
  },
  {
    title: 'Revenue',
    value: '$45,210',
    change: '+8%',
    changeType: 'positive',
    icon: '💰',
    color: 'success'
  },
  {
    title: 'Orders',
    value: '1,234',
    change: '-3%',
    changeType: 'negative',
    icon: '📦',
    color: 'warning'
  },
  {
    title: 'Growth',
    value: '15.8%',
    change: '+2%',
    changeType: 'positive',
    icon: '📈',
    color: 'info'
  }
]

export const chartData = {
  line: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }]
  },
  bar: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Sales',
      data: [65, 59, 80, 81],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ],
      borderWidth: 1
    }]
  },
  doughnut: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{
      data: [55, 35, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)'
      ]
    }]
  }
}

export const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', status: 'Active' }
]

export const kanbanData = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-4', 'task-5']
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-6']
    }
  },
  tasks: {
    'task-1': { id: 'task-1', title: 'Design Dashboard', description: 'Create wireframes and mockups', priority: 'High' },
    'task-2': { id: 'task-2', title: 'Setup Database', description: 'Configure PostgreSQL database', priority: 'Medium' },
    'task-3': { id: 'task-3', title: 'User Authentication', description: 'Implement login/register functionality', priority: 'High' },
    'task-4': { id: 'task-4', title: 'API Integration', description: 'Connect frontend with backend APIs', priority: 'Medium' },
    'task-5': { id: 'task-5', title: 'Testing', description: 'Write unit and integration tests', priority: 'Low' },
    'task-6': { id: 'task-6', title: 'Documentation', description: 'Create user and developer documentation', priority: 'Low' }
  },
  columnOrder: ['todo', 'in-progress', 'done']
}

export const calendarEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    date: '2025-07-20',
    color: '#007bff'
  },
  {
    id: 2,
    title: 'Product Launch',
    date: '2025-07-25',
    color: '#28a745'
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: '2025-07-30',
    color: '#ffc107'
  }
]

export const userData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8901',
    location: 'New York, USA',
    role: 'Admin',
    status: 'Active',
    department: 'IT',
    jobTitle: 'Senior Developer',
    bio: 'Experienced full-stack developer with 5+ years of experience.',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8902',
    location: 'San Francisco, USA',
    role: 'Manager',
    status: 'Active',
    department: 'Marketing',
    jobTitle: 'Marketing Manager',
    bio: 'Creative marketing professional with expertise in digital campaigns.',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=4facfe&color=fff',
    createdAt: '2023-02-20T14:15:00Z',
    updatedAt: '2024-01-10T14:15:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 234 567 8903',
    location: 'Chicago, USA',
    role: 'User',
    status: 'Active',
    department: 'Sales',
    jobTitle: 'Sales Representative',
    bio: 'Results-driven sales professional with strong client relationships.',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=fa709a&color=fff',
    createdAt: '2023-03-10T09:20:00Z',
    updatedAt: '2024-01-05T09:20:00Z'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 234 567 8904',
    location: 'Los Angeles, USA',
    role: 'User',
    status: 'Inactive',
    department: 'Design',
    jobTitle: 'UI/UX Designer',
    bio: 'Creative designer passionate about user experience.',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=f093fb&color=fff',
    createdAt: '2023-04-05T16:45:00Z',
    updatedAt: '2023-12-15T16:45:00Z'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 234 567 8905',
    location: 'Boston, USA',
    role: 'Manager',
    status: 'Active',
    department: 'HR',
    jobTitle: 'HR Manager',
    bio: 'HR professional focused on team development and culture.',
    avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=fee140&color=000',
    createdAt: '2023-05-12T11:30:00Z',
    updatedAt: '2024-01-08T11:30:00Z'
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 234 567 8906',
    location: 'Seattle, USA',
    role: 'User',
    status: 'Active',
    department: 'Finance',
    jobTitle: 'Financial Analyst',
    bio: 'Detail-oriented financial analyst with strong analytical skills.',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=a8edea&color=000',
    createdAt: '2023-06-18T13:15:00Z',
    updatedAt: '2024-01-12T13:15:00Z'
  }
]

// Products Data
export const productsData = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    sku: 'MBP-16-001',
    category: 'Laptops',
    price: 2499,
    stock: 15,
    status: 'Active'
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    sku: 'IPH-15-001',
    category: 'Smartphones',
    price: 999,
    stock: 8,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24',
    sku: 'SGS-24-001',
    category: 'Smartphones',
    price: 799,
    stock: 3,
    status: 'Low Stock'
  },
  {
    id: 4,
    name: 'iPad Air',
    sku: 'IPA-AIR-001',
    category: 'Tablets',
    price: 599,
    stock: 25,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Dell XPS 13',
    sku: 'DXP-13-001',
    category: 'Laptops',
    price: 1299,
    stock: 0,
    status: 'Out of Stock'
  }
]

// Orders Data
export const ordersData = [
  {
    id: 1,
    orderId: 'ORD-2024-001',
    customer: 'John Smith',
    amount: 2499,
    date: '2024-01-15',
    status: 'Completed'
  },
  {
    id: 2,
    orderId: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    amount: 1798,
    date: '2024-01-16',
    status: 'Pending'
  },
  {
    id: 3,
    orderId: 'ORD-2024-003',
    customer: 'Mike Davis',
    amount: 599,
    date: '2024-01-17',
    status: 'Shipped'
  },
  {
    id: 4,
    orderId: 'ORD-2024-004',
    customer: 'Emily Wilson',
    amount: 999,
    date: '2024-01-18',
    status: 'Processing'
  },
  {
    id: 5,
    orderId: 'ORD-2024-005',
    customer: 'David Brown',
    amount: 1299,
    date: '2024-01-19',
    status: 'Cancelled'
  }
]

// Activity Logs Data
export const logsData = [
  {
    id: 1,
    timestamp: '2024-01-20 10:30:00',
    user: 'admin@example.com',
    action: 'User Login',
    level: 'Info',
    details: 'Successful login from IP 192.168.1.100'
  },
  {
    id: 2,
    timestamp: '2024-01-20 10:45:00',
    user: 'john@example.com',
    action: 'Product Update',
    level: 'Info',
    details: 'Updated product SKU MBP-16-001'
  },
  {
    id: 3,
    timestamp: '2024-01-20 11:00:00',
    user: 'system',
    action: 'Database Connection',
    level: 'Error',
    details: 'Failed to connect to database server'
  },
  {
    id: 4,
    timestamp: '2024-01-20 11:15:00',
    user: 'sarah@example.com',
    action: 'Order Creation',
    level: 'Warning',
    details: 'Order created with low stock item'
  },
  {
    id: 5,
    timestamp: '2024-01-20 11:30:00',
    user: 'mike@example.com',
    action: 'Report Generation',
    level: 'Info',
    details: 'Generated monthly sales report'
  }
]

// Reports Data - Enhanced with complete structure
export const reportsData = [
  {
    id: 1,
    title: 'Monthly Sales Report',
    description: 'Comprehensive analysis of sales performance for the current month including revenue breakdown, top products, and sales trends.',
    type: 'chart',
    category: 'sales',
    status: 'Published',
    createdBy: 'John Smith',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:20:00Z',
    views: 145,
    downloads: 23,
    tags: ['sales', 'monthly', 'revenue'],
    schedule: ''
  },
  {
    id: 2,
    title: 'Customer Analytics Dashboard',
    description: 'Interactive dashboard showing customer behavior patterns, demographics, and engagement metrics across all channels.',
    type: 'dashboard',
    category: 'customer',
    status: 'Published',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    views: 89,
    downloads: 12,
    tags: ['customer', 'analytics', 'behavior'],
    schedule: ''
  },
  {
    id: 3,
    title: 'Inventory Status Report',
    description: 'Current inventory levels, stock alerts, and reorder recommendations for all product categories.',
    type: 'table',
    category: 'inventory',
    status: 'Draft',
    createdBy: 'Mike Davis',
    createdAt: '2024-01-18T11:20:00Z',
    updatedAt: '2024-01-19T13:30:00Z',
    views: 34,
    downloads: 5,
    tags: ['inventory', 'stock', 'alerts'],
    schedule: ''
  },
  {
    id: 4,
    title: 'Financial Summary Q1',
    description: 'Quarterly financial performance including P&L, cash flow, and budget variance analysis.',
    type: 'summary',
    category: 'financial',
    status: 'Scheduled',
    createdBy: 'Lisa Chen',
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    views: 67,
    downloads: 18,
    tags: ['financial', 'quarterly', 'summary'],
    schedule: '2024-03-31T23:59:00Z'
  },
  {
    id: 5,
    title: 'Marketing Campaign Performance',
    description: 'Analysis of current marketing campaigns including ROI, conversion rates, and audience engagement metrics.',
    type: 'chart',
    category: 'marketing',
    status: 'Published',
    createdBy: 'David Wilson',
    createdAt: '2024-01-08T08:45:00Z',
    updatedAt: '2024-01-16T12:20:00Z',
    views: 112,
    downloads: 31,
    tags: ['marketing', 'campaigns', 'ROI'],
    schedule: ''
  },
  {
    id: 6,
    title: 'Website Analytics Overview',
    description: 'Comprehensive website performance metrics including traffic, user behavior, and conversion funnels.',
    type: 'dashboard',
    category: 'analytics',
    status: 'Published',
    createdBy: 'Emma Thompson',
    createdAt: '2024-01-05T15:30:00Z',
    updatedAt: '2024-01-17T09:10:00Z',
    views: 203,
    downloads: 45,
    tags: ['website', 'analytics', 'traffic'],
    schedule: ''
  },
  {
    id: 7,
    title: 'Employee Performance Review',
    description: 'Quarterly performance evaluation metrics for all departments with goal tracking and improvement recommendations.',
    type: 'summary',
    category: 'hr',
    status: 'Draft',
    createdBy: 'David Brown',
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-01-22T15:30:00Z',
    views: 28,
    downloads: 7,
    tags: ['hr', 'performance', 'quarterly'],
    schedule: ''
  },
  {
    id: 8,
    title: 'Supply Chain Analysis',
    description: 'Detailed analysis of supply chain efficiency, vendor performance, and cost optimization opportunities.',
    type: 'table',
    category: 'inventory',
    status: 'Published',
    createdBy: 'Mike Davis',
    createdAt: '2024-01-14T11:45:00Z',
    updatedAt: '2024-01-21T09:20:00Z',
    views: 76,
    downloads: 19,
    tags: ['supply-chain', 'vendors', 'cost-analysis'],
    schedule: ''
  }
]
