import React from "react"
// import "antd/dist/antd.css"
import { DatePicker } from "antd"
import moment from "moment"

// Use for Edit admin
const DatePickerField2 = ({ name, value, onChange }) => {
  const dateFormat = "YYYY/MM/DD"
  return (
    <div className="">
      <DatePicker
        defaultValue={moment("2021/01/01", dateFormat)}
        format={dateFormat}
        style={{
          width: "-webkit-fill-available",
          height: "36px",
        }}
        onChange={(date, dateString) => {
          onChange(name, dateString)
        }}
        disabled
      />
    </div>
  )
}

export default DatePickerField2
