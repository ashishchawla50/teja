import React from "react";

import { useTable, useExpanded } from "react-table";
import makeData from "./makeData";
import ReactTable from "react-table";
import SampleData from "./SampleData";
import ActionExpand from "./ActionExpand";
import { COULMN_HEADER, getExpandableFields } from "../Constant";
import CommentExpand from "./CommentExpand";

function Table({
  columns: userColumns,
  data,
  renderRowSubComponent,
  setCurrentExpandableField,
  currentExpandableField,
}) {
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

  console.log("expanded", expanded);

  // rows.map((data, i) => {
  //   console.log("aaa", data, i);
  // });

  return (
    <table {...getTableProps()} border="0" cellspacing="0" cellpadding="0">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <>
                {column.parent ? (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ) : null}
              </>
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
                      {
                        // cell &&
                        // cell.column.getHeaderProps() &&
                        // cell.column.getHeaderProps()?.key === `header_actions`
                        getExpandableFields()?.includes(cell.column.id) ? (
                          <>
                            <td
                              {...cell.getCellProps()}
                              {...row.getToggleRowExpandedProps()}
                            >
                              <div
                                onClick={() => {
                                  setCurrentExpandableField(cell.column.id);
                                }}
                              >
                                {cell.render("Cell")}
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          </>
                        )
                      }
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
                    {renderRowSubComponent({
                      row,
                      currentExpandableField,
                      expanded,
                    })}
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
            accessor: COULMN_HEADER.CREATED_DATE,

            expander: true,
            Expander: ({ isExpanded, ...rest }) => (
              <div>
                {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
              </div>
            ),
          },
          {
            Header: "Is webPage Helpful",
            accessor: COULMN_HEADER.IS_WEB_PAGE_HELPFUL,
          },
        ],
      },
      {
        Header: "info",
        columns: [
          {
            Header: "Feedback",
            accessor: COULMN_HEADER.FEEDBACK,
          },
          {
            Header: "Status",
            accessor: COULMN_HEADER.STATUS,
          },
          {
            Header: "Updated Date",
            accessor: COULMN_HEADER.UPDATED_DATE,
          },
          {
            Header: "Comments",
            accessor: COULMN_HEADER.COMMENTS,
          },
          {
            Header: "Actions",
            accessor: COULMN_HEADER.ACTIONS,
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
  // console.log(data);

  // const renderRowSubComponent = React.useCallback(
  //   ({ row }) => (
  //     <>
  //       <ActionExpand />
  //     </>
  //   ),
  //   []
  // );

  const [currentExpandableField, setCurrentExpandableField] =
    React.useState("");

  const getCurrentExplableAble = (currentField, expanded) => {
    // console.log("xxx", currentField);
    switch (currentField) {
      case COULMN_HEADER.ACTIONS:
        return <>Action area</>;
      case COULMN_HEADER.FEEDBACK:
        return <>FEEDBACK area</>;
      case COULMN_HEADER.COMMENTS:
        return <>COMMENTS area</>;
      default:
        return <CommentExpand />;
    }
  };
  const renderRowSubComponent = (rows, currentField, expanded) => {
    // console.log("xyz", rows, currentField, expanded);
    if (expanded && expanded[rows.row.id]) {
      rows.row.toggleRowExpanded(true);
    }
    return getCurrentExplableAble(currentField, expanded);
  };

  return (
    <>
      {/* <SampleData /> */}
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        currentExpandableField={currentExpandableField}
        setCurrentExpandableField={setCurrentExpandableField}
      />
    </>
  );
}

export default TableContent;
