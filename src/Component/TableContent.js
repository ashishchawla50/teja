import React from "react";

import { useTable, useExpanded } from "react-table";
import makeData, { newRecord } from "./makeData";
import ReactTable from "react-table";

import ActionExpand from "./ActionExpand";
import { COULMN_HEADER, data, columns } from "../Constant";
import CommentExpand from "./CommentExpand";

import TableData from "./TableData";
import FeedbackExpand from "./FeedbackExpand";

function TableContent() {
  const columns = React.useMemo(
    () => [
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

  // console.log("new record", newRecord());

  const [currentExpandableField, setCurrentExpandableField] =
    React.useState("");

  const [counter, setCounter] = React.useState(0);
  const [expandComponent, setExpandComponnet] = React.useState();
  const [tableData, setTableData] = React.useState(data);
  // console.log("xxx", data);

  React.useEffect(() => {}, [counter]);
  React.useEffect(() => {
    //console.log("tabel darta update", tableData);
  }, [tableData]);
  const getCurrentExpandableArea = (currentField, row) => {
    // console.log("xxx", currentField);

    // if (row) {
    //   console.log(row);
    //   row.commentData = [{ date: "4/8/2023", name: "Teja" }];
    //   console.log(row);
    // }

    const updateActionComment = (updatedRow) => {
      row = { ...updatedRow };
      // console.log(row, tableData);

      const updatedDate = [...tableData];
      if (
        row &&
        row.commentData &&
        row.commentData[0] &&
        updatedDate[row.index].commentData
      ) {
        updatedDate[row.index].commentData.push(row.commentData[0]);
      } else {
        updatedDate[row.index].commentData = row.commentData;
      }

      if (updatedDate[row.index].commentData) {
        updatedDate[row.index].status =
          updatedDate[row.index].commentData[
            updatedDate[row.index].commentData.length - 1
          ].status;
      }

      // updatedDate[row.index] = { ...row?.values };
      // updatedDate[row.index].commentData = row.commentData;
      setTableData(updatedDate);
      setCounter(counter + 1);
    };

    switch (currentField) {
      case COULMN_HEADER.ACTIONS:
        return (
          <>
            <ActionExpand
              row={row}
              updateActionComment={updateActionComment}
              counter={counter}
              data={tableData}
            />
          </>
        );
      case COULMN_HEADER.FEEDBACK:
        return (
          <>
            <FeedbackExpand counter={counter} data={tableData} />
          </>
        );
      case COULMN_HEADER.COMMENTS:
        return (
          <>
            <CommentExpand row={row} data={tableData} counter={counter} />
          </>
        );
      default:
        return (
          <ActionExpand
            row={row}
            updateActionComment={updateActionComment}
            counter={counter}
            data={tableData}
          />
        );
    }
  };
  const renderRowSubComponent = (rows, currentField, expanded) => {
    // console.log("xyz", rows, currentField, expanded);
    if (expanded && expanded[rows.row.id]) {
      rows.row.toggleRowExpanded(true);
    }
    return getCurrentExpandableArea(currentField, expanded);
  };

  return (
    <>
      <TableData
        columns={columns}
        data={tableData}
        renderRowSubComponent={renderRowSubComponent}
        currentExpandableField={currentExpandableField}
        setCurrentExpandableField={setCurrentExpandableField}
        expandComponent={expandComponent}
        setExpandComponnet={setExpandComponnet}
        getCurrentExpandableArea={getCurrentExpandableArea}
      />
    </>
  );
}

export default TableContent;
