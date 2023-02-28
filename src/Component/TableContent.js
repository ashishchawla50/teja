import React from "react";

import { useTable, useExpanded } from "react-table";
import makeData from "./makeData";
import ReactTable from "react-table";
import SampleData from "./SampleData";
import ActionExpand from "./ActionExpand";

function Table({ columns: userColumns, data, renderRowSubComponent }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded
  );

  return (
    <table {...getTableProps()} border="0" cellspacing="0" cellpadding="0">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment {...row.getRowProps()}>
              <tr>
                {row.cells.map((cell, index) => {
                  return (
                    <>
                      {cell && cell.column.getHeaderProps() && cell.column.getHeaderProps()?.key === `header_actions` ? (
                        <>
                        
                          <td
                            {...cell.getCellProps()}
                            {...row.getToggleRowExpandedProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        </>
                      ) : (
                        <>
                         
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        </>
                      )}
                    </>
                  );
                })}
              </tr>
              {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
              {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

function TableContent() {
  const columns = React.useMemo(
    () => [
      // {
      //   // Build our expander column
      //   id: "expander", // Make sure it has an ID
      //   Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
      //     <span {...getToggleAllRowsExpandedProps()}>
      //       {isAllRowsExpanded ? "👇" : "👉"}
      //     </span>
      //   ),
      //   Cell: ({ row }) => (
      //     // Use Cell to render an expander for each row.
      //     // We can use the getToggleRowExpandedProps prop-getter
      //     // to build the expander.
      //     <span {...row.getToggleRowExpandedProps()}>
      //       {row.isExpanded ? "👇" : "👉"}
      //     </span>
      //   ),
      // },
      {
        Header: "Name",
        columns: [
          {
            Header: "Created Date",
            accessor: "createdDate",

            expander: true,
            Expander: ({ isExpanded, ...rest }) => (
              <div>
                {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
              </div>
            ),
          },
          {
            Header: "Is webPage Helpful",
            accessor: "isWebPageHelpful",
          },
        ],
      },
      {
        Header: "info",
        columns: [
          {
            Header: "Feedback",
            accessor: "feedback",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Updated Date",
            accessor: "updatedDate",
          },
          {
            Header: "Comments",
            accessor: "comments",
          },
          {
            Header: "Actions",
            accessor: "actions",
            expander: true,
            Expander: ({ isExpanded, ...rest }) => (
              <div>
                {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
              </div>
            ),
          },
        ],
      },
    
    ],
    []
  );

  const data = React.useMemo(() => makeData(10), []);
  console.log(data);

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <>
      <ActionExpand />
      </>
      
    ),
    []
  );
  return (
    <>
      {/* <SampleData /> */}
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </>
  );
}

export default TableContent;
