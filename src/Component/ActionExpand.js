import React from "react";

function ActionExpand(props) {
  return (
    <>
      <div className="ExpandAreaAction">
        <div className="ExpandAreaActionInner">
          <div className="ActionControls">
            <div className="ActionLabel">Select Action</div>
            <div className="ActionInput">
              <select>
                <option>Select One</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div className="ActionControls">
            <div className="ActionLabel">Comments</div>
            <div className="ActionInput">
            <textarea rows={5}></textarea>
            </div>
          </div>

          <div className=" ActionControlsSave ">
          
            <div className="ActionInputSave">
            <button >Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActionExpand;
