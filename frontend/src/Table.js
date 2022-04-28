/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Table component with sorting
 */

import { useEffect, forwardRef, useRef } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import { gridColsClass } from "./utils";

const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef()
        const resolvedRef = ref || defaultRef

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

function Table({ columns, data, setSelectedRows }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } =
        useTable({ columns, data, },
            useSortBy,
            useRowSelect,
            hooks => {
                hooks.visibleColumns.push(columns => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ])
            }
        );

    useEffect(() => {
        setSelectedRows(selectedFlatRows);
    }, [setSelectedRows, selectedFlatRows]);

    // Render the UI for your table
    return (
        <div className={`large-table ${gridColsClass(columns.length + 1)}`} {...getTableProps()}>
            <div className="contents">
                {headerGroups.map((headerGroup) => (
                    <div className="contents" {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <div className="large-table-header-cell" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' ▼'
                                            : ' ▲'
                                        : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="contents" {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <div className="contents" {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <div className="large-table-cell" {...cell.getCellProps()}>{cell.render("Cell")}</div>;
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Table;