import React from "react";
import Header from "./Header";
import Table from "./Table";

function MainContent(props) {
  return (
    <>
      <div className="MainContent">
        <div className="InnerMainContent">
          <div className="tableheaader">
            <div className="tableTitle">Feedback</div>
            <div className="TableContent">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
