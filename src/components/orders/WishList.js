import React from "react";
import Breadcrumb from "../../containers/shared/breadcrumbContainer";
import Sidebar from "../../containers/profile/sidebarContainer";
import ProfileLayout from "../ProfileLayout";

const WishList = (props) => {
  var wishListData = props.wishLists.map(function (item) {
    return (
      <tr Key={item.wishListId}>
        <td> {item.wishListId}</td>
        <td> {item.productName}</td>
        <td> {item.createDate}</td>
        <td> {item.orderQuantity}</td>
        <td> {item.paymentAmount}</td>
        <td>
          <div className="btn-group">
            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.addToCart(item.wishListId);
              }}
            >
              AddToCart
            </button>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteWishList(item.wishListId);
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
    <main className="site-main my-account">
      <div className="columns container">
        <div className="row">
          <div className="col-md-9 col-md-push-3  col-main">
            <div className="table-wrapper table-responsive">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8 col-xs-6">
                    <h2>My Wishlist</h2>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <div className="filter-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        name="searchBy"
                        value={props.searchBy}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DATE</th>
                    <th>QTY</th>
                    <th>AMOUNT</th>
                    <th colspan="2" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{wishListData}</tbody>
              </table>
            </div>
          </div>
        
        </div>
      </div>
    </main>
  );
};

export default WishList;
