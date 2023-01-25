import React from "react";

export const CheckBox = (props) => {
  return (
    // <li>
    //  <input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
    // </li>

    <div className="checkbox">
      <input
        id="checkbox0"
        type="checkbox"
        key={props.id}
        onChange={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.value}
      />
      <label htmlFor="checkbox0"></label>
    </div>
  );
};

export default CheckBox;
