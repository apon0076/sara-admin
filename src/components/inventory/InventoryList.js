import React from "react";

const ProductList = (props) => {
  var productData = props.inventories.map(function (product, idx) {
    return (
      <tr id="addr0" key={idx}>
        <td>{idx}</td>

        <td> {product.productName}</td>
        <td> {product.productSku}</td>
        <td> {product.colorName}</td>
        <td> {product.sizeName}</td>
        <td> {product.quantity}</td>
        <td> {product.price}</td>
        <td> {product.inventoryDate}</td>

        <td>
          <div className="btn-group">
            {/*  <Link
              to={`/editInventory/${product.productId}`}
              className="btn btn-success"
              style={{ cursor: "pointer" }}
            >
              Edit
            </Link> */}

            <button
              className="btn btn-warning"
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                props.deleteProduct(product.inventoryDetailId);
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
                        <th>SL</th>

                        <th>NAME</th>
                        <th>SKU</th>
                        <th>COLOR</th>
                        <th>SIZE</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{productData}</tbody>

                    <tfoot>
                      <tr>
                        <th>SL</th>

                        <th>NAME</th>
                        <th>SKU</th>
                        <th>COLOR</th>
                        <th>SIZE</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>DATE</th>
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
export default ProductList;
