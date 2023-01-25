import React from "react";
import baseUrl from "../../utils/baseUrl";

const ProductImageByColorList = (props) => {
  var productImageData = props.productImgColors.map(function (product) {
    //////debugger;
    return (
      <tr key={product.productId}>
        <td> {product.productId}</td>
        <td> {product.productName}</td>
        <td> {product.productSku}</td>
        <td> {product.colorName}</td>

        <td>
          <img
            style={{ width: "50px", height: "50px" }}
            src={baseUrl.concat(product.image)}
            alt="IMG"
          />
        </td>

        <td>
          <div className="btn-group">
            <button
              className="btn btn-warning"
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                props.deleteProduct(
                  product.productId,
                  product.colorId,
                  product.Image
                );
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
    <div className="content-wrapper">
      <div className="container-fluid">
        {/*  Table Start */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-table"></i> Data Exporting
              </div>

              <ul className="navbar-nav mr-auto align-items-center">
                <li className="nav-item">
                  <a className="nav-link toggle-menu" href="#!">
                    <i></i>
                  </a>
                </li>
                <li className="nav-item">
                  <form className="search-bar">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter keywords"
                      name="searchId"
                      value={props.searchId}
                      onChange={props.handleChange}
                    />
                    <a href="#!">
                      <i
                        className="icon-magnifier"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </a>
                  </form>
                </li>
              </ul>

              <div className="card-body">
                <div className="table-responsive">
                  <table id="example" className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>SKU</th>
                        <th>COLOR</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{productImageData}</tbody>

                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>SKU</th>
                        <th>COLOR</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductImageByColorList;
