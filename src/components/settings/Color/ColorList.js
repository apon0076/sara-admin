import React from "react";
import { Link } from "react-router-dom";

const ColorList = (props) => {
  var colorData = props.colors.map(function (color) {
    return (
      <tr key={color.colorId}>
        <td> {color.colorId}</td>
        <td> {color.colorName}</td>
        <td>{color.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
        <td>
          <div className="btn-group">
            <Link
              to={`/EditColor/${color.colorId}/${color.colorName}`}
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteColor(color.colorId);
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <h3 className="box-title m-b-10">Product Color List</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>{colorData}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ColorList;
