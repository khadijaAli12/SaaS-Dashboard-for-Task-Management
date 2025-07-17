import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, Form, Badge, InputGroup, FormControl } from 'react-bootstrap'
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table'
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

const DataTable = ({ data, columns, title }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [globalFilter, setGlobalFilter] = useState('')

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

  const handleEdit = (row) => {
    setSelectedRow(row)
    setShowModal(true)
  }

  const handleDelete = (row) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting:', row)
    }
  }

  const handleGlobalFilterChange = (e) => {
    const value = e.target.value
    setGlobalFilter(value)
  }

  return (
    <>
      <div className="table-controls mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>{title}</h2>
          <div className="d-flex align-items-center">
            <InputGroup style={{ maxWidth: '300px' }} className="me-3">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search..."
                value={globalFilter || ''}
                onChange={handleGlobalFilterChange}
              />
            </InputGroup>
            <Button variant="primary">
              <FaPlus className="me-2" />
              Add New
            </Button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <Table striped bordered hover responsive className="modern-table">
          <thead className="table-dark">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? <FaSortDown /> : <FaSortUp />
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEdit(row.original)}
                  >
                    <FaEdit />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(row.original)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button 
              onClick={() => table.setPageIndex(0)} 
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button 
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()} 
              className="ms-2"
            >
              Previous
            </Button>
            <Button 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()} 
              className="ms-2"
            >
              Next
            </Button>
            <Button 
              onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
              disabled={!table.getCanNextPage()} 
              className="ms-2"
            >
              {'>>'}
            </Button>
          </div>
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Edit functionality can be implemented here</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DataTable
