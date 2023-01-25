import React from "react";

const VerifiedShopList = (props) => {
  //////debugger;

  var sellerData = props.sellers.map(function (seller, idx) {
    return (
      <tr Key={idx}>
        <td> {idx}</td>
        <td> {seller.sellerName}</td>
        <td> {seller.sellerContactNo}</td>
        <td> {seller.sellerEmail}</td>
        <td> {seller.sellerPresentAddress}</td>

        <td>{seller.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
      </tr>
    );
  });

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <h3 className="box-title m-b-10">Verified Shop List</h3>
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
                    </tr>
                  </thead>
                  <tbody>{sellerData}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifiedShopList;
