import React from 'react'

interface Column<T extends Record<string, unknown>> {
  key: keyof T
  label: string
  render?: (value: unknown, row: T) => React.ReactNode
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  isEmpty?: boolean
}

export const Table = React.forwardRef<HTMLTableElement, TableProps<Record<string, unknown>>>(
  function Table({ columns, data, isEmpty = false }, ref) {
    if (isEmpty || data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>データがありません</p>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table ref={ref} className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map(col => (
                <th key={String(col.key)} className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-6 py-4 text-sm text-gray-900">
                    {col.render ? col.render(row[String(col.key)], row as Record<string, unknown>) : String(row[String(col.key)])}
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
