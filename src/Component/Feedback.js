import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { COULMN_HEADER } from "../Constant";
import makeData from "./makeData";

import TableContent from "./TableContent";

function Feedback(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [search, setSearch] = React.useState("");
  const data = React.useMemo(() => makeData(10), []);
  const [tableData, setTableData] = React.useState(data);
  const [originalData, setOriginalData] = React.useState(data);
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

  const startSearch = () => {
    if (search?.length) {
      setTableData(
        originalData?.filter((e) =>
          e?.status?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
        )
      );
    }
  };
  const clearSearch = () => {
    setSearch("");
    setTableData([...originalData]);
  };

  return (
    <>
      <div className="Table">
        <div className="TableInner">
          <div className="TableControls">
            <div className="TableControlsWrapper">
              <div className="recordCount">
                Viewing : 1-5 of {tableData.length} Records
              </div>
              <div className="SearchFilter">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <div className="SearchBox">
                  <input
                    type={"text"}
                    placeholder="Search By Status"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <div className="searchControls">
                  <button onClick={clearSearch}>Clear All</button>
                  <button className="solid" onClick={startSearch}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="TableData">
            <TableContent
              setTableData={setTableData}
              tableData={tableData}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
