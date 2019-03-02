import React from "react";
import "./Wrapper.css";
import { Sidebar, MainContent } from "./index";

const Wrapper = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Wrapper;
