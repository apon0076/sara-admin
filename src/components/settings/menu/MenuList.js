import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuList = (props) => {
  //////debugger;

  var menuData = props.menus.map(function (menu) {
    return (
      <tr key={menu.pageId}>
        <td> {menu.pageId}</td>
        <td> {menu.pageDispalyName}</td>
        <td> {menu.pageTitle}</td>
        <td> {menu.pageUrl}</td>
        <td> {menu.pageSerialNo}</td>
        <td>{menu.isActive}</td>
        <td>{menu.isUI}</td>
        <td>
          <Link
            to={`/EditMenu/${menu.pageId}/${menu.pageDispalyName}`}
            className="btn"
          >
            <Button variant="light" className="btn-sm">
              <i className="fas fa-edit"></i>
            </Button>
          </Link>
          <Button
            variant="danger"
            className="btn-sm"
            onClick={(event) => {
              props.deleteMenu(menu.idx);
            }}
          >
            <i className="fas fa-trash"></i>
          </Button>
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
              <h3 className="box-title m-b-10">Menu List</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>MENU NAME</th>
                      <th>PAGE TITLE</th>
                      <th>PAGE URL</th>
                      <th>SERIAL NO</th>
                      <th>IS ACTIVE</th>
                      <th>IS UI</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>{menuData}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuList;
