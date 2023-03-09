import React from "react";

import { useTable, useExpanded } from "react-table";
import makeData, { newRecord } from "./makeData";
import ReactTable from "react-table";

import ActionExpand from "./ActionExpand";
import { COULMN_HEADER, data, columns } from "../Constant";
import CommentExpand from "./CommentExpand";

import TableData from "./TableData";
import FeedbackExpand from "./FeedbackExpand";

function TableContent({ columns, setTableData, tableData }) {
  // console.log("new record", newRecord());

  const [currentExpandableField, setCurrentExpandableField] =
    React.useState("");

  const [counter, setCounter] = React.useState(0);
  const [expandComponent, setExpandComponnet] = React.useState();

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

      const updatedTableData = [...tableData];

      if (
        row &&
        row.commentData &&
        row.commentData[0] &&
        updatedTableData[row.index].commentData
      ) {
        updatedTableData[row.index].commentData.push(row.commentData[0]);
      } else {
        updatedTableData[row.index].commentData = row.commentData;
      }

      if (updatedTableData[row.index].commentData) {
        updatedTableData[row.index].status =
          updatedTableData[row.index].commentData[
            updatedTableData[row.index].commentData.length - 1
          ].status;
      }
      updatedTableData[row.index].updatedDate = new Date().toLocaleDateString();

      // updatedDate[row.index] = { ...row?.values };
      // updatedDate[row.index].commentData = row.commentData;
      setTableData(updatedTableData);
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
