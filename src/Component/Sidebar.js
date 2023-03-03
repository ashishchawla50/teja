import React from "react";
import { logo } from "../Constant";
function Sidebar(props) {
  return (
    <>
      <div className="sideBar">
        <div className="logo">
          <img src={logo} />
        </div>
        <ul className="sideBarMenu">
          <li>
            <span className="menuLabel">
              <div className="menuLabelInner">Dashboard</div>{" "}
            </span>
          </li>
          <li>
            <span className="menuLabel">
              <div className="menuLabelInner">Feedback</div>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
