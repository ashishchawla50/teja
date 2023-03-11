import logo from "./logo.svg";
import "./App.scss";
import React, { useState, useEffect } from "react";
// import { useTable } from "react-table";
import Sidebar from "./Component/Sidebar";
import Main from "./Component/Main";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // const data = React.useMemo(
  //   () => [
  //     {
  //       col1: "created Dt",
  //       col2: "27",
  //       col3: "rain",
  //     },
  //     {
  //       col1: "Is Webpage Helpful ? ",
  //       col2: "30",
  //       col3: "rain",
  //     },
  //     {
  //       col1: "Feedback",
  //       col2: "23",
  //       col3: "rain",
  //     },
  //     {
  //       col1: "Status",
  //       col2: "23",
  //       col3: "rain",
  //     },
  //     {
  //       col1: "Updated Dt",
  //       col2: "23",
  //       col3: "rain",
  //     },
  //     {
  //       col1: "Comments",
  //       col2: "23",
  //       col3: "rain",
  //     },
  //     {
  //       col1: "Action",
  //       col2: "23",
  //       col3: "rain",
  //     },
  //   ],
  //   []
  // );

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "City",
  //       accessor: "col1", // accessor is the "key" in the data
  //     },
  //     {
  //       Header: "Temperature",
  //       accessor: "col2",
  //     },
  //     {
  //       Header: "Weather Forecast",
  //       accessor: "col3", // accessor is the "key" in the data
  //     },
  //   ],
  //   []
  // );
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data });

  return (
    <div className="pagewrapper">
      <div className="container">
        {/* <button onClick={toggleSidebar}>Open Sidebar {"" + isOpen}</button> */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <Main />
      </div>
    </div>
  );
}

export default App;
