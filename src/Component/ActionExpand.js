import React from "react";
import { FEEDBACK_STATUS } from "../Constant";

function ActionExpand(props) {
  //console.log(props);
  const [actionValue, setActionValue] = React.useState("");
  const [actionComment, setActionComment] = React.useState("");

  const saveAction = () => {
    const newRowData = { ...props.row };
    if (props.updateActionComment) {
      newRowData?.commentData?.push({
        date: new Date().toLocaleDateString(),
        name: "Teja", // Added current Loggedin username here
        status: actionValue,
        comment: actionComment,
      });
      props.updateActionComment(newRowData);
    }
  };
  return (
    <>
      <div className="ExpandAreaAction">
        <div className="ExpandAreaActionInner">
          <div className="ActionControls">
            <div className="ActionLabel">Select Action</div>
            <div className="ActionInput">
              <select
                onChange={(e) => {
                  setActionValue(e.target.value);
                }}
                value={actionValue}
              >
                <option value={0}>Select One</option>
                <option value={FEEDBACK_STATUS.OPEN}>Open</option>
                <option value={FEEDBACK_STATUS.IN_PROGRESS}>In Progress</option>
                <option value={FEEDBACK_STATUS.CLOSED}> Closed</option>
              </select>
            </div>
          </div>

          <div className="ActionControls">
            <div className="ActionLabel">Comments</div>
            <div className="ActionInput">
              <textarea
                onChange={(e) => {
                  setActionComment(e.target.value);
                }}
                value={actionComment}
                rows={5}
              ></textarea>
            </div>
          </div>

          <div className=" ActionControlsSave ">
            <div className="ActionInputSave">
              <button
                disabled={
                  !(
                    isNaN(actionValue) &&
                    actionValue?.length &&
                    actionComment?.length
                  )
                }
                onClick={saveAction}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActionExpand;
