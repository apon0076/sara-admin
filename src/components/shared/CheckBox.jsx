import React, { useState, useEffect } from "react";
import styles from "./../../assets/styles/checkbox.module.scss";

const CheckBox = ({ label, setter, isDefault }) => {
  const [checkedStatus, setCheckedStatus] = useState(false);

  useEffect(() => {
    setter(checkedStatus);
  }, [checkedStatus]);

  useEffect(() => {
    isDefault === "Y" ? setCheckedStatus(true) : setCheckedStatus(false);
  }, [isDefault]);

  return (
    <div
      className={`${styles.checkbox_container}`}
      style={{ cursor: "pointer" }}
      onClick={() => setCheckedStatus(!checkedStatus)}
    >
      <div className={`${styles.checkbox_body}`}>
        {checkedStatus && <div className={`${styles.checkbox_check}`}></div>}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default CheckBox;
