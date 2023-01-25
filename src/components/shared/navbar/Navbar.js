/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import * as Icon from "react-feather";
import { BiCrop } from "react-icons/bi";
import { MdOutlinePersonSearch } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import baseUrl from "../../../utils/baseUrl";

const Navbar = (props) => {
  function removeLocalStorage() {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-access-employeeId");
    localStorage.removeItem("x-access-roleId");
    localStorage.removeItem("x-access-token-expiration");
    localStorage.removeItem("admin-remember");
  }

  return (
    <aside className="sidebar" style={{ overflow: "visible" }}>
      <div className="scroll-sidebar" style={{ overflow: "hidden" }}>
        {props.profileById.map((profile) => (
          <div className="user-profile" key={profile.adminId}>
            <div className="dropdown user-pro-body">
              <div className="profile-image">
                <img
                  src={baseUrl.concat(profile.adminImageUrl)}
                  alt="user-img"
                  className="img-circle"
                />
                <Link
                  to="#!"
                  className="dropdown-toggle u-dropdown text-blue"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="badge badge-danger">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </Link>
                <ul className="dropdown-menu animated flipInY">
                  <li>
                    <NavLink to="/Profile">
                      <i className="fa fa-user"></i> Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/EditProfile/${profile.adminId}/${profile.adminName} `}
                    >
                      <i className="fa fa-cog"></i> Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Login" onClick={() => removeLocalStorage()}>
                      <i className="fa fa-power-off"></i> Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
              <p className="profile-text m-t-15 font-16">
                <Link to="/Profile" style={{ textTransform: "capitalize" }}>
                  {profile.adminName}
                </Link>
              </p>
            </div>
          </div>
        ))}
        <nav className="sidebar-nav">
          <ul id="side-menu">
            <li>
              <NavLink to="/Home" aria-expanded="false">
                <Icon.Monitor className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Dashboard </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/createProductAdmin" aria-expanded="false">
                <Icon.HardDrive className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Product</span>
              </NavLink>
            </li>
            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.ShoppingCart className="text-dark fa-fw" />
                <span className="hide-menu"> Order </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/CreateOrder">Create Order</NavLink>
                </li>
                <li>
                  <NavLink to={"/ManageOrdersAdmin?status=pending"}>
                    Manage Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/CancelOrders?status=cancel_request"}>
                    Cancel Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/ReturnOrders?status=return_request"}>
                    Return Orders
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/order-requisition" aria-expanded="false">
                <Icon.Clipboard className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Order Requisition</span>
              </NavLink>
            </li>
            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.Truck className="text-dark fa-fw" />
                <span className="hide-menu"> Shipping </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/CreateCourierProfile">Courier Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/CreateShippingType"> Shipping Type</NavLink>
                </li>
                <li>
                  <NavLink to="/CreateShippingOptions">
                    {" "}
                    Shipping Option
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/CreateCourierProductType">
                    {" "}
                    Courier Product Type
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/CreateShippingCost"> Shipping Cost</NavLink>
                </li>
                <li>
                  <NavLink to="/CreateCourierCost"> Courier Cost</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.Printer className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Report </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                {/* <li>
                  <NavLink to='/report?type=product'> Product </NavLink>
                </li> */}
                <li>
                  <NavLink to="/report?type=order"> Order History</NavLink>
                </li>
                {/* <li>
                  <NavLink to='/report?type=order-requisition'>
                    {' '}
                    Order Requisition{' '}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/report?type=shipping'> Shipping </NavLink>
                </li>
                <li>
                  <NavLink to='/report?type=customer'> Customer </NavLink>
                </li> */}
              </ul>
            </li>
            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.DollarSign className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Payment </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/CreatePaymentMethod"> Payment Method </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <a
                className="waves-effect"
                style={{ display: "flex", alignItemsCenter: "center" }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <BiCrop
                  size="2rem"
                  style={{ color: "#333b3f", marginRight: "1.4rem" }}
                />
                <span className="hide-menu"> Size Chart </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/size-chart-attribute"> Attributes</NavLink>
                </li>
                <li>
                  <NavLink to="/size-guide-measurement">Size Guide</NavLink>
                </li>
              </ul>
            </li>

            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.Edit2 className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Blog </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/CreateBlogCategory"> Blog Category </NavLink>
                </li>
                <li>
                  <NavLink to="/CreateBlogPost"> Blog Post </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.FileText className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Content </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/content-type"> Content Type </NavLink>
                </li>
                <li>
                  <NavLink to="/content-post?type=create">
                    {" "}
                    Content Post{" "}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/career" aria-expanded="false">
                <MdOutlinePersonSearch
                  className="text-dark fa-fw"
                  style={{ fontSize: "20px !important" }}
                />
                <span className="hide-menu"> Career </span>
              </NavLink>
            </li>
            <li>
              <a
                className="waves-effect"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-expanded="false"
              >
                <Icon.Settings className="text-dark fa-fw" />{" "}
                <span className="hide-menu"> Settings </span>
              </a>
              <ul aria-expanded="false" className="collapse">
                <li>
                  <NavLink to="/addNewAdmin"> Admin</NavLink>
                </li>
                <li>
                  <NavLink to="/pendingSeller">Seller</NavLink>
                </li>
                <li>
                  <a
                    className="waves-effect"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    aria-expanded="false"
                  >
                    <span className="hide-menu"> Order </span>
                  </a>
                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <NavLink to="/CreateOrderType">Orders Type</NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/CreateCategory"> Category </NavLink>
                </li>
                <li>
                  <NavLink to="/CreateBrand"> Brand </NavLink>
                </li>
                <li>
                  <a
                    className="waves-effect"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    aria-expanded="false"
                  >
                    <span className="hide-menu"> Variant </span>
                  </a>
                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <NavLink to="/CreateProductVariant">
                        {" "}
                        Product Variant{" "}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/CreateProductVariantOptionValue">
                        {" "}
                        Product Variant Option Value
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/CreateProductVariantOption">
                        {" "}
                        Product Variant Option{" "}
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/CreateAds"> Ads & Banners </NavLink>
                </li>
                <li>
                  <a
                    className="waves-effect"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    aria-expanded="false"
                  >
                    <span className="hide-menu"> Discount </span>
                  </a>
                  <ul aria-expanded="false" className="collapse">
                    {/* <li>
                      <NavLink to='/CreateDiscount'> Discount </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/CreateDiscountType"> Discount Type</NavLink>
                    </li>
                    <li>
                      <NavLink to="/CreateDiscountSummary">
                        {" "}
                        Discount Summary{" "}
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/ProductCampaignSellerList">
                        Campaign Seller
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/CreateVoucher">Voucher</NavLink>
                </li>
                <li>
                  <a
                    className="waves-effect"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    aria-expanded="false"
                  >
                    <span className="hide-menu"> Currency </span>
                  </a>
                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <NavLink to="/ImportCurrency"> Import Currency </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
