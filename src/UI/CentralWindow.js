import style from "./CentralWindow.module.css";
import Tabs from "./Tabs";
import React from "react";

const CentralModule = (props) => {
  return (
    <div className={style.card}>
      <Tabs />
    </div>
  );
};

export default CentralModule;
