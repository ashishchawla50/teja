import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import makeData from "./makeData";
import TableContent from "./TableContent";

function Feedback(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const data = React.useMemo(() => makeData(10), []);
  const [tableData, setTableData] = React.useState(data);
  //console.log("xxx", data);
  return (
    <>
      <div className="Table">
        <div className="TableInner">
          <div className="TableControls">
            <div className="TableControlsWrapper">
              <div className="recordCount">Viewing : 1-5 of 24 Records</div>
              <div className="SearchFilter">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <div className="SearchBox">
                  <input type={"text"} placeholder="Search By File Name" />
                  <button>Search</button>
                </div>
              </div>
            </div>
          </div>
          <div className="TableData">
            <TableContent setTableData={setTableData} tableData={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
