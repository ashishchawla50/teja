import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TableContent from "./TableContent";

function Table(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <>
      <div className="Table">
        <div className="TableInner">
          <div className="TableControls">
            <div className="TableControlsWrapper">
            <div className="recordCount">
Viewing : 1-5 of 24 Records
</div>
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
            <TableContent />
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
