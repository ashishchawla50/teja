import React from "react";
import { useTable, useExpanded } from "react-table";
import { getExpandableFields } from "../Constant";

function TableData({
  columns: userColumns,
  data,
  renderRowSubComponent,
  currentExpandableField,
  setCurrentExpandableField,

  expandComponent,
  setExpandComponnet,
  getCurrentExpandableArea,
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

  const [tableLocalData, setTableLocalData] = React.useState(data);
  // React.useEffect(() => {
  //   let temp = [...data];
  //   temp = temp.map((e) => {
  //     return {
  //       ...e,
  //       status: e.commentData
  //         ? e.commentData[e.commentData.length - 1].status
  //         : "OPEN",
  //     };
  //   });
  //   console.log("after update", temp);
  //   setTableLocalData(temp);
  // }, [data]);

  // console.log("data in table", data);
  // console.log("expanded", expanded);

  // rows.map((data, i) => {
  //   console.log("aaa", data, i);
  // });

  const columnClick = (currentRow, currentCol, clickEvent) => {
    //console.log("xxx", currentRow, currentCol, clickEvent);
    currentRow.currentSelectedColumn = currentCol;
    currentRow.commentData = [];
    if (currentRow.isExpanded && currentCol !== currentExpandableField) {
    } else {
      clickEvent();
    }
  };
  return (
    <table {...getTableProps()} border="0" cellSpacing="0" cellPadding="0">
      <thead key={Math.random()}>
        {headerGroups.map((headerGroup, headerIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
            {headerGroup.headers.map((column, thIndex) => (
              <React.Fragment key={Math.random()}>
                {column.parent ? (
                  <th {...column.getHeaderProps()} key={Math.random()}>
                    {column.render("Header")}
                  </th>
                ) : null}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} key={Math.random()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment key={Math.random()}>
              <tr key={Math.random()}>
                {row.cells.map((cell, index) => {
                  const eachRow = { ...row.getToggleRowExpandedProps() };

                  return (
                    <React.Fragment key={Math.random()}>
                      {
                        // cell &&
                        // cell.column.getHeaderProps() &&
                        // cell.column.getHeaderProps()?.key === `header_actions`
                        getExpandableFields()?.includes(cell.column.id) ? (
                          <>
                            <td
                              {...cell.getCellProps()}
                              // {...row.getToggleRowExpandedProps()}
                              key={Math.random()}
                              onClick={() => {
                                columnClick(
                                  row,
                                  cell.column.id,
                                  eachRow.onClick
                                );
                              }}
                            >
                              <div
                                onClick={() => {
                                  setCurrentExpandableField(cell.column.id);
                                  setExpandComponnet(
                                    getCurrentExpandableArea(cell.column.id)
                                  );
                                }}
                              >
                                {cell.render("Cell")}
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td {...cell.getCellProps()} key={Math.random()}>
                              {cell.render("Cell")}
                            </td>
                          </>
                        )
                      }
                    </React.Fragment>
                  );
                })}
              </tr>
              {/*
                      If the row is in an expanded state, render a row with a
                      column that fills the entire length of the table.
                    */}
              {row.isExpanded && row.currentSelectedColumn ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}
                    {/* {renderRowSubComponent({
                      row,
                      currentExpandableField,
                      expanded,
                    })} */}

                    {/* <>{expandComponent}</> */}
                    {getCurrentExpandableArea(row.currentSelectedColumn, row)}
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
export default TableData;
