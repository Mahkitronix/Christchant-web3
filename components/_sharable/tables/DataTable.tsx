import { useState, useCallback, ChangeEvent } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  Pagination,
  Input,
} from '@heroui/react'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'
import { toLowerCase } from 'camote-utils'

export default function DataTable({
  columns,
  children,
  refetch: refetchQuery,
  total,
}: any) {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const searchPattern = `%${searchTerm}%`

  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
      refetchQuery({
        offset: (newPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        searchPattern,
        sortBy,
        sortOrder,
      })
    },
    [itemsPerPage, refetchQuery, searchPattern, sortBy, sortOrder]
  )

  const handleItemsPerPageChange = useCallback(
    (newItemsPerPage: number) => {
      setPage(1)
      setItemsPerPage(newItemsPerPage)
      refetchQuery({
        offset: 0,
        limit: newItemsPerPage,
        searchPattern,
        sortBy,
        sortOrder,
      })
    },
    [refetchQuery, searchPattern, sortBy, sortOrder]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    setPage(1)
    refetchQuery({
      offset: 0,
      limit: itemsPerPage,
      searchPattern: `%${term || ''}%`,
      sortBy: '',
      sortOrder: 'desc',
    })
  }

  const handleSort = (columnKey: string) => {
    refetchQuery({
      offset: 0,
      limit: itemsPerPage,
      searchPattern,
      sortBy: toLowerCase(columnKey),
      sortOrder,
    })
  }

  const startIndex = (page - 1) * itemsPerPage + 1

  const endIndex = Math.min(page * itemsPerPage, total)

  return (
    <div className="mb-12">
      <div className="rounded-xl border border-gray-100 px-5 py-3 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="mb-4 mt-3 w-[400px]">
            <Input
              isClearable={true}
              classNames={{
                label: 'text-black/50 dark:text-white/90',
                input: [
                  'bg-transparent',
                  'text-black/90 dark:text-white/90',
                  'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                ],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'bg-default-200/50',
                  'dark:bg-default/60',
                  'hover:bg-default-200/70',
                  'dark:hover:bg-default/70',
                  'group-data-[focus=true]:bg-default-200/50',
                  'dark:group-data-[focus=true]:bg-default/60',
                  '!cursor-text',
                ],
              }}
              label=""
              placeholder="Type to search..."
              radius="lg"
              startContent={
                <IconSearch
                  size={16}
                  className="pointer-events-none mr-2 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90"
                />
              }
              onChange={handleChange}
              onClear={() => {
                handleChange({
                  target: { value: '' },
                } as ChangeEvent<HTMLInputElement>)
              }}
              value={searchTerm}
            />
          </div>
          {children[0]}
        </div>

        <Table
          isStriped
          classNames={{
            base: 'border border-gray-100 rounded-xl',
          }}
          shadow="none"
          bottomContent={
            total > 0 ? (
              <div className="mt-3 flex items-center justify-between gap-5 px-4 pt-4 dark:border-default-600">
                <div className="inline-flex gap-2">
                  <div className="mb-4 w-24">
                    <label
                      htmlFor="rows-per-page"
                      className="block bg-transparent text-sm font-medium text-gray-700"
                    >
                      Per page:
                    </label>
                    <select
                      id="rows-per-page"
                      value={itemsPerPage || 10}
                      onChange={(e) => {
                        setPage(1)
                        handleItemsPerPageChange(Number(e.target.value))
                      }}
                      className="mt-1 block w-full cursor-pointer rounded-lg bg-transparent text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:border-gray-600 dark:text-gray-300"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
                <Pagination
                  color="primary"
                  total={Math.ceil(total / itemsPerPage) || 1}
                  onChange={onPageChange}
                  showControls
                  variant="light"
                  isCompact
                  page={page}
                  showShadow={false}
                  initialPage={1}
                />
                <div>
                  <h4 className="text-sm font-medium">
                    Showing: {startIndex} to {endIndex} of {total} entries
                  </h4>
                </div>
              </div>
            ) : null
          }
        >
          <TableHeader>
            {columns.map((column: any) => (
              <TableColumn
                key={column.id}
                align={column.align as 'start' | 'end' | 'center'}
                width={column.width}
                onClick={() => {
                  if (column?.withSort) {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    setSortBy(toLowerCase(column.name))
                    handleChange({
                      target: { value: '' },
                    } as ChangeEvent<HTMLInputElement>)
                    handleSort(column.name)
                  }
                }}
                style={column?.withSort && { cursor: 'pointer' }}
              >
                <span className="mr-2">{column.name}</span>
                {column?.withSort && (
                  <>
                    <span
                      style={{
                        opacity:
                          sortBy === toLowerCase(column.name) &&
                          sortOrder === 'asc'
                            ? 1
                            : 0.5,
                      }}
                    >
                      ↑
                    </span>
                    <span
                      style={{
                        opacity:
                          sortBy === toLowerCase(column.name) &&
                          sortOrder === 'desc'
                            ? 1
                            : 0.5,
                      }}
                    >
                      ↓
                    </span>
                  </>
                )}
              </TableColumn>
            ))}
          </TableHeader>
          {children[1]}
        </Table>
      </div>
    </div>
  )
}
