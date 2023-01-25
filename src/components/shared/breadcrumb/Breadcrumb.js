import React from "react";

const Breadcrumb = (props) => {
  return (
    // <div className="container-fluid">
    <div className="row pt-2 pb-2">
      <div className="col-sm-9">
        <h4 className="page-title">Form Layouts</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#!">Bulona</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#!">Forms</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Form Layouts
          </li>
        </ol>
      </div>
      <div className="col-sm-3">
        {/* <div className="btn-group float-sm-right">
              <button
                type="button"
                className="btn btn-light waves-effect waves-light"
              >
                <i className="fa fa-cog mr-1"></i> Setting
              </button>
              <button
                type="button"
                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect waves-light"
                data-toggle="dropdown"
              >
                <span className="caret"></span>
              </button>
              <div className="dropdown-menu">
                <a href="#!" className="dropdown-item">
                  Action
                </a>
                <a href="#!" className="dropdown-item">
                  Another action
                </a>
                <a href="#!" className="dropdown-item">
                  Something else here
                </a>
                <div className="dropdown-divider"></div>
                <a href="#!" className="dropdown-item">
                  Separated link
                </a>
              </div>
            </div> */}
      </div>
    </div>
    // </div>
  );
};

export default Breadcrumb;
