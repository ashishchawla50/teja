import React from "react";
import Feedback from "./Feedback";
import Header from "./Header";

function MainContent(props) {
  return (
    <>
      <div className="MainContent">
        <div className="InnerMainContent">
          <div className="tableheaader">
            <div className="tableTitle">Feedback</div>
            <div className="TableContent">
              <Feedback />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
