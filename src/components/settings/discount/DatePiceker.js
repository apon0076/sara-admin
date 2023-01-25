import React from "react"
// /import DatePicker from "react-datepicker";
//
import "antd/dist/antd.css"
import { DatePicker } from "antd"
import moment from "moment"

const DatePickerField = ({ name, value, onChange }) => {
  const dateFormat = "YYYY/MM/DD"
  return (
    <div className="">
      {/* <DatePicker
        selected={(value && new Date(value)) || null}
        className="form-control"
        onChange={(val) => {
          onChange(name, val);
        }}
      /> */}
      <DatePicker
        defaultValue={moment("2021/01/01", dateFormat)}
        format={dateFormat}
        style={{
          width: "-webkit-fill-available",
          height: "36px",
        }}
        // onChange={(val) => {
        //   onChange(name, val);
        // }}
        onChange={(date, dateString) => {
          onChange(name, dateString)
        }}
      />
    </div>
  )
}

export default DatePickerField
