import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import DATA from "./DATA.json";
import { COLUMNS } from "./Columns";
import { Table } from "react-bootstrap";

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  },
  useSortBy)

  return (
    <>
      <Table striped bordered hover {...getTableProps()} id="data table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className="table-primary" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽 ' : ' 🔼 ') : ''}
                  </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr className="table-light" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}