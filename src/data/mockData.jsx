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
  