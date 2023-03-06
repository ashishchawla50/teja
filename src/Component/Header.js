import React from "react";

function Header(props) {
  return (
    <>
      <div className="Header">
        <div className="pageInfo">Feedback</div>

        <div className="AccountInfo">
          Hi <div className="link"> Teja </div>
          <span className="settingsDropdown">
            <ul className="menuGroup">
              <li className="settingLink">
                &#x25BC;
                <ul className="menuList">
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
