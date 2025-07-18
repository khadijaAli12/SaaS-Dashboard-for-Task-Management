import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, Form, Badge, InputGroup, FormControl, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table'
import { 
  Edit3, 
  Trash2, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Eye,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

const DataTable = ({ data, columns, title, onAdd, onEdit, onDelete }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [showActions, setShowActions] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
  })

  const handleGlobalFilterChange = (e) => {
    const value = e.target.value
    setGlobalFilter(value)
  }

  const ActionButton = ({ onClick, icon: Icon, variant = "outline-primary", size = "sm", title }) => (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className="action-btn"
      title={title}
    >
      <Icon size={16} />
    </Button>
  )

  const ActionsCell = ({ row }) => (
    <div className="actions-cell">
      <ActionButton
        onClick={() => onEdit && onEdit(row.original)}
        icon={Edit3}
        variant="outline-primary"
        title="Edit"
      />
      <ActionButton
        onClick={() => console.log('View:', row.original)}
        icon={Eye}
        variant="outline-info"
        title="View"
      />
      <ActionButton
        onClick={() => onDelete && onDelete(row.original.id)}
        icon={Trash2}
        variant="outline-danger"
        title="Delete"
      />
    </div>
  )

  return (
    <div className="data-table-container">
      {/* Table Header Controls */}
      <Card className="table-header-card mb-4">
        <Card.Body>
          <div className="table-header-controls">
            <div className="table-title-section">
              <h3 className="table-title">{title}</h3>
              <p className="table-subtitle">Manage and organize your data efficiently</p>
            </div>
            
            <div className="table-actions-section">
              <div className="search-container">
                <InputGroup className="search-input-group">
                  <InputGroup.Text className="search-icon">
                    <Search size={18} />
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Search records..."
                    value={globalFilter || ''}
                    onChange={handleGlobalFilterChange}
                    className="search-input"
                  />
                </InputGroup>
              </div>
              
              <div className="action-buttons">
                <Button variant="outline-secondary" className="filter-btn">
                  <Filter size={16} className="me-2" />
                  Filter
                </Button>
                <Button variant="outline-primary" className="export-btn">
                  <Download size={16} className="me-2" />
                  Export
                </Button>
                <Button variant="outline-success" className="refresh-btn">
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Table Container */}
      <Card className="table-card">
        <Card.Body className="p-0">
          <div className="table-wrapper">
            <Table className="modern-data-table">
              <thead className="table-header">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th 
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`table-header-cell ${header.column.getCanSort() ? 'sortable' : ''}`}
                      >
                        <div className="header-content">
                          <span className="header-text">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {header.column.getCanSort() && (
                            <span className="sort-indicator">
                              {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === 'desc' ? 
                                  <ArrowDown size={14} /> : 
                                  <ArrowUp size={14} />
                              ) : (
                                <ArrowUpDown size={14} />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="table-header-cell actions-header">
                      Actions
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody className="table-body">
                {table.getRowModel().rows.map(row => (
                  <motion.tr 
                    key={row.id}
                    className="table-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="table-cell">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    <td className="table-cell actions-cell">
                      <ActionsCell row={row} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Pagination Controls */}
      <Card className="pagination-card mt-4">
        <Card.Body>
          <div className="pagination-controls">
            <div className="pagination-info">
              <span className="pagination-text">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getRowCount()
                )} of {table.getRowCount()} entries
              </span>
            </div>
            
            <div className="pagination-buttons">
              <Button 
                variant="outline-primary"
                onClick={() => table.setPageIndex(0)} 
                disabled={!table.getCanPreviousPage()}
                className="pagination-btn"
              >
                First
              </Button>
              <Button 
                variant="outline-primary"
                onClick={() => table.previousPage()} 
                disabled={!table.getCanPreviousPage()} 
                className="pagination-btn"
              >
                Previous
              </Button>
              <Button 
                variant="outline-primary"
                onClick={() => table.nextPage()} 
                disabled={!table.getCanNextPage()} 
                className="pagination-btn"
              >
                Next
              </Button>
              <Button 
                variant="outline-primary"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
                disabled={!table.getCanNextPage()} 
                className="pagination-btn"
              >
                Last
              </Button>
            </div>
            
            <div className="page-size-selector">
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="page-size-select"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default DataTable
