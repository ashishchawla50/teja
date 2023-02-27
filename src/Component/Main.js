import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";

function Main(props) {
  return (
    <>
      <div className="Main">
        <Header />
        <MainContent />
      </div>
    </>
  );
}

export default Main;
