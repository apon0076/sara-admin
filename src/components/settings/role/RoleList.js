import React from "react";
//import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const RoleList = (props) => {
  //////debugger;
  // const dispatch = useDispatch();
  var roleData = props.roles.map(function (role, idx) {
    return (
      <tr key={role.roleId}>
        <td> {role.roleId}</td>
        <td> {role.roleName}</td>
        <td> {role.isActive}</td>
        <td>
          <Link to={`/EditRole/${role.roleId}`}>
            <button type="button" className="btn btn-info m-r-5">
              Edit
            </button>
          </Link>
          <button
            className="btn btn-danger"
            onClick={(event) => {
              props.deleteRole(role.roleId);
            }}
          >
            Delete
          </button>
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
              <h3 className="box-title m-b-10">Role List</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ROLE NAME</th>
                      <th>IS ACTIVE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>{roleData}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoleList;
