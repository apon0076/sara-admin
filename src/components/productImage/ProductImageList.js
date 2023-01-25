import React from "react"
import { Link } from "react-router-dom"

const ProductImageList = (props) => {
  const baseUrl = "http://192.168.27.191:82"
  //////debugger;
  var productImageData = props.productImages.map(function (ProductImage) {
    //////debugger;
    return (
      <tr Key={ProductImage.productImageId}>
        <td> {ProductImage.productImageId}</td>
        <td> {ProductImage.productName}</td>
        <td> {ProductImage.colorName}</td>

        <td>
          <img
            style={{ width: "50px", height: "50px" }}
            src={baseUrl.concat(ProductImage.imageName)}
            alt="IMG"
          />
        </td>

        <td>
          <div className="btn-group">
            <Link
              to={`/EditAttribute/${ProductImage.productImageId} `}
              /*  to={`/Brand`} */
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteProductImage(ProductImage.productImageId)
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    )
  })

  //////debugger;

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
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
                        <th>PRODUCT</th>
                        <th>COLOR</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{productImageData}</tbody>

                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>PRODUCT</th>
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
  )
}
export default ProductImageList
