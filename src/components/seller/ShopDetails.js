import React from "react";
//import { Link } from "react-router-dom";

const shopDetails = (props) => {
  //////debugger;

  //   var sellerData = props.sellers.map(function (seller) {
  // return (
  //    <button
  //    onClick={(event) => {
  //    props.shopDetails(seller.shopId);
  //    }}
  //    className="btn btn-warning"
  //    data-toggle="tooltip"
  //    title="Details"
  //    data-toggle="modal"
  //    data-target="#exampleModalCenter"
  // >
  //    Details
  // </button>
  // );
  //     return (
  //       <tr Key={idx}>
  //         <td> {idx}</td>
  //         <td> {seller.sellerName}</td>
  //         <td> {seller.sellerContactNo}</td>
  //         <td> {seller.sellerEmail}</td>
  //         <td> {seller.sellerPresentAddress}</td>

  //         <td>{seller.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
  //         <td>
  //           <button
  //             onClick={(event) => {
  //               props.shopDetails(seller.shopId);
  //             }}
  //             className="btn btn-warning"
  //             data-toggle="tooltip"
  //             title="Details"
  //             data-toggle="modal"
  //             data-target="#exampleModalCenter"
  //           >
  //             Details
  //           </button>

  //         </td>
  //       </tr>
  //);

  //});

  // var shopDetails = props.sellers.map(function (shop) {
  //   return (
  //     <tr Key={shop.shopId}>
  //       <td>{shop.shopId}</td>
  //       <td>{shop.shopName}</td>
  //       <td>{shop.bussinessTypeName}</td>
  //       <td>{shop.shopDescription}</td>
  //       <td>{shop.binNo}</td>
  //       <td>{shop.shopCity}</td>
  //       <td>{shop.shopState}</td>
  //       <td>{shop.shopZipCode}</td>
  //       <td>{shop.shopAddress}</td>
  //     </tr>
  //   );
  // });

  // var shopDetails = props.seller;
  // //////debugger;

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <h3 className="box-title m-b-10">New Seller Request</h3>

              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SELLER NAME</th>
                      <th>CONTACT NO</th>
                      <th>EMAIL</th>
                      <th>ADDRESS</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  {/* <tbody>{sellerData}</tbody> */}
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxwidth: "1000px" }}
          >
            <div className="modal-content" style={{}}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  New Shop Request
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table id="example" className="table table-bordered">
                    <thead>
                      <tr>
                        <th>SHOP ID</th>
                        <th>SHOP NAME</th>
                        <th>BUSINESS TYPE</th>
                        <th>DESCRIPTION</th>
                        <th>BIN NO</th>
                        <th>SHOP CITY</th>
                        <th>SHOP STATE</th>
                        <th>ZIP CODE</th>
                        <th>ADDRESS</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default shopDetails;
