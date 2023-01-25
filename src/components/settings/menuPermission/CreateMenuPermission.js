import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

// import CheckBox from "../../../components/settings/menuPermission/CheckBox";

const CreateMenuPermission = (props) => {
  var menuData = props.menus.map(function (menu, idx) {
    return (
      <tr key={idx}>
        <td>{menu.pageDispalyName}</td>
        <td>
          <div className="checkbox">
            <input id="checkbox00" type="checkbox" value={menu.pageId} />
            <label htmlFor="checkbox00"></label>
          </div>
        </td>
        <td>
          <div className="checkbox">
            <input id="checkbox1" type="checkbox" />
            <label htmlFor="checkbox1"></label>
          </div>
        </td>
        <td>
          <div className="checkbox">
            <input id="checkbox2" type="checkbox" />
            <label htmlFor="checkbox2"></label>
          </div>
        </td>
        <td>
          <div className="checkbox">
            <input id="checkbox3" type="checkbox" />
            <label htmlFor="checkbox3"></label>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Formik
      initialValues={{}}
      validationSchema={Yup.object().shape({})}
      onSubmit={(fields) => {

        // props.saveMenuPermission(fields);
      }}
      render={({ errors, status, touched }) => (
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="white-box">
                  <h3 className="box-title m-b-0">Select User Role</h3>
                  <h5 className="m-t-30">User Role</h5>

                  <select
                    className="form-control select2"
                    onChange={props.handleChange}
                  >
                    <option>Select User Role</option>

                    {props.roles.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row menu-permission-form">
              <div className="col-lg-12">
                <div className="white-box">
                  <h3 className="box-title">Permission</h3>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Web Page</th>
                          <th>
                            <div className="checkbox">
                              <input
                                id="checkbox00"
                                type="checkbox"
                                name="isCheckedAdd"
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor="checkbox00">&nbsp;Add </label>
                            </div>
                          </th>

                          <th>
                            <div className="checkbox">
                              <input
                                id="checkbox11"
                                type="checkbox"
                                name="isCheckedDelete"
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor="checkbox11">&nbsp;Delete </label>
                            </div>
                          </th>

                          <th>
                            <div className="checkbox">
                              <input
                                id="checkbox22"
                                type="checkbox"
                                name="isCheckedModify"
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor="checkbox22">&nbsp;Modify </label>
                            </div>
                          </th>
                          <th>
                            <div className="checkbox">
                              <input
                                id="checkbox33"
                                type="checkbox"
                                name="isCheckedRead"
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor="checkbox33">&nbsp;Read </label>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {menuData}

                        {/* <tr>
                          <td>Dashboard</td>
                          <td>
                            <div className="checkbox">
                              <input id="checkbox4" type="checkbox" />
                              <label htmlFor="checkbox4"></label>
                            </div>
                          </td>
                          <td>
                            <div className="checkbox">
                              <input id="checkbox4" type="checkbox" />
                              <label htmlFor="checkbox4"></label>
                            </div>
                          </td>
                          <td>
                            <div className="checkbox">
                              <input id="checkbox4" type="checkbox" />
                              <label htmlFor="checkbox4"></label>
                            </div>
                          </td>
                          <td>
                            <div className="checkbox">
                              <input id="checkbox4" type="checkbox" />
                              <label htmlFor="checkbox4"></label>
                            </div>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row permission-btn">
              <div className="col-md-12 text-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => {
                    alert("Data Successfully Inserted!");
                  }}
                >
                  {" "}
                  <i className="fa fa-check"></i> Create
                </button>
                <button type="button" className="btn btn-default">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};
export default CreateMenuPermission;
