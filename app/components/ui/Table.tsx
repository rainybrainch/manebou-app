import React from 'react'

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, row: T) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  rowKey: keyof T
  striped?: boolean
  hoverable?: boolean
}

export const Table = React.forwardRef<HTMLDivElement, TableProps<any>>(
  ({ data, columns, rowKey, striped = true, hoverable = true }, ref) => {
    if (data.length === 0) {
      return <div className="text-center py-8 text-gray-500">データがありません</div>
    }

    return (
      <div ref={ref} className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 font-semibold text-gray-900">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={String(row[rowKey])}
                className={`border-b border-gray-100 ${striped && idx % 2 === 1 ? 'bg-gray-50' : ''} ${hoverable ? 'hover:bg-blue-50' : ''}`}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-4 py-3 text-gray-800 ${col.className || ''}`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

Table.displayName = 'Table'
