import React from "react";

import { useTable, useExpanded } from "react-table";
import makeData from "./makeData";
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

  const [currentExpandableField, setCurrentExpandableField] =
    React.useState("");

  const [counter, setCounter] = React.useState(0);
  const [expandComponent, setExpandComponnet] = React.useState();

  React.useEffect(() => {}, [counter]);

  const getCurrentExpandableArea = (currentField) => {
    // console.log("xxx", currentField);
    switch (currentField) {
      case COULMN_HEADER.ACTIONS:
        return (
          <>
            <ActionExpand />
          </>
        );
      case COULMN_HEADER.FEEDBACK:
        return (
          <>
            <FeedbackExpand />
          </>
        );
      case COULMN_HEADER.COMMENTS:
        return (
          <>
            <CommentExpand />
          </>
        );
      default:
        return <ActionExpand />;
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
        data={data}
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
