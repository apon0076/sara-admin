import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    this.state = {};
  }
  render() {
    return (
      <div id="wrapper">
        {/*   <!--Start sidebar-wrapper--> */}
        <div
          id="sidebar-wrapper"
          className="bg-theme bg-theme2"
          data-simplebar=""
          data-simplebar-auto-hide="true"
        >
          <div className="brand-logo">
            <a href="#!">
              <img
                src="assets/images/logo-icon.png"
                className="logo-icon"
                alt="logo icon"
              />
              <h5 className="logo-text">SaRa Marketplace Admin</h5>
            </a>
          </div>
          <div className="user-details">
            <div
              className="media align-items-center user-pointer collapsed"
              data-toggle="collapse"
              data-target="#user-dropdown"
            >
              <div className="avatar">
                <img
                  className="mr-3 side-user-img"
                  src="assets/images/avatars/avatar-13.png"
                  alt="user avatar"
                />
              </div>
              <div className="media-body">
                <h6 className="side-user-name">Mark Jhonsan</h6>
              </div>
            </div>
            <div id="user-dropdown" className="collapse">
              <ul className="user-setting-menu">
                <li>
                  <a href="javaScript:void();">
                    <i className="icon-user"></i> My Profile
                  </a>
                </li>
                <li>
                  <a href="javaScript:void();">
                    <i className="icon-settings"></i> Setting
                  </a>
                </li>
                <li>
                  <a href="javaScript:void();">
                    <i className="icon-power"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="sidebar-menu do-nicescrol">
            <li className="sidebar-header">MAIN NAVIGATION</li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-view-dashboard"></i>{" "}
                <span>Dashboard</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              {/* <ul className="sidebar-submenu">
                <li>
                  <a href="index.html">
                    <i className="zmdi zmdi-long-arrow-right"></i> Ecommerce
                  </a>
                </li>
                <li>
                  <a href="index2.html">
                    <i className="zmdi zmdi-long-arrow-right"></i> Property Listings
                  </a>
                </li>
                <li>
                  <a href="dashboard-service-support.html">
                    <i className="zmdi zmdi-long-arrow-right"></i> Services &
                    Support
                  </a>
                </li>
                <li>
                  <a href="dashboard-logistics.html">
                    <i className="zmdi zmdi-long-arrow-right"></i> Logistics
                  </a>
                </li>
              </ul> */}
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-layers"></i>
                <span>UI Elements</span>{" "}
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Typography
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Cards
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Buttons
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Nav Tabs
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Accordions
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Modals
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> List Groups
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> BS Elements
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Pagination
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Alerts
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Progress Bars
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Checkboxes &
                    Radios
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Notifications
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Sweet Alerts
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-card-travel"></i>
                <span>Components</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Range Sliders
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Image
                    Carousels
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Grid Layouts
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Switcher
                    Buttons
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Pricing
                    Tables
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Vertical
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Horizontal
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Fancy
                    Lightbox
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Color Palette
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-chart"></i> <span>Charts</span>
                <i className="fa fa-angle-left float-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Chart JS
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Morris Charts
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Sparkline
                    Charts
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Peity Charts
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Other Charts
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-invert-colors"></i>{" "}
                <span>UI Icons</span>
                <i className="fa fa-angle-left float-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Font Awesome
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Material
                    Design
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Themify Icons
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Line Icons
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Flag Icons
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-calendar-check"></i>{" "}
                <span>Calendar</span>
                <small className="badge float-right badge-light">New</small>
              </a>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-email"></i>
                <span>Mailbox</span>
                <small className="badge float-right badge-warning">12</small>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Inbox
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Compose
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Read Mail
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-format-list-bulleted"></i>{" "}
                <span>Forms</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Basic Inputs
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Input Groups
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Form Layouts
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Form Advanced
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Form Uploads
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Form
                    Validation
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Form Wizard
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Form Editor
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-lock"></i> <span>Authentication</span>
                <i className="fa fa-angle-left float-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> SignIn 1
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> SignUp 1
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> SignIn 2
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> SignUp 2
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Lock Screen
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Reset
                    Password 1
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Reset
                    Password 2
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-widgets"></i> <span>Widgets</span>
                <small className="badge float-right badge-danger">10</small>
              </a>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-grid"></i> <span>Tables</span>
                <i className="fa fa-angle-left float-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Simple Tables
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Data Tables
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-map"></i> <span>Maps</span>
                <i className="fa fa-angle-left float-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Google Maps
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Vector Maps
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-collection-folder-image"></i>{" "}
                <span>Sample Pages</span>
                <i className="fa fa-angle-left float-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Invoice
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> User Profile
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Blank Page
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Coming Soon
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> 403 Error
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> 404 Error
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> 500 Error
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#!" className="waves-effect">
                <i className="fa fa-share"></i> <span>Multilevel</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="sidebar-submenu">
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Level One
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="zmdi zmdi-long-arrow-right"></i> Level One{" "}
                    <i className="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul className="sidebar-submenu">
                    <li>
                      <a href="#!">
                        <i className="zmdi zmdi-long-arrow-right"></i> Level Two
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="zmdi zmdi-long-arrow-right"></i> Level Two{" "}
                        <i className="fa fa-angle-left pull-right"></i>
                      </a>
                      <ul className="sidebar-submenu">
                        <li>
                          <a href="#!">
                            <i className="zmdi zmdi-long-arrow-right"></i> Level
                            Three
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="zmdi zmdi-long-arrow-right"></i> Level
                            Three
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#!" className="waves-effect">
                    <i className="zmdi zmdi-long-arrow-right"></i> Level One
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-header">LABELS</li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-coffee text-danger"></i>{" "}
                <span>Important</span>
              </a>
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-chart-donut text-success"></i>{" "}
                <span>Warning</span>
              </a>
            </li>
            <li>
              <a href="#!" className="waves-effect">
                <i className="zmdi zmdi-share text-info"></i>{" "}
                <span>Information</span>
              </a>
            </li>
          </ul>
        </div>
        {/*    <!--End sidebar-wrapper-->

<!--Start topbar header--> */}
        <header className="topbar-nav">
          <nav className="navbar navbar-expand fixed-top">
            <ul className="navbar-nav mr-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link toggle-menu" href="#!">
                  <i className="icon-menu menu-icon"></i>
                </a>
              </li>
              <li className="nav-item">
                <form className="search-bar">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter keywords"
                  />
                  <a href="#!">
                    <i className="icon-magnifier"></i>
                  </a>
                </form>
              </li>
            </ul>

            <ul className="navbar-nav align-items-center right-nav-link">
              <li className="nav-item dropdown-lg">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                  data-toggle="dropdown"
                  href="#!"
                >
                  <i className="fa fa-envelope-open-o"></i>
                  <span className="badge badge-light badge-up">12</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      You have 12 new messages
                      <span className="badge badge-light">12</span>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <div className="avatar">
                            <img
                              className="align-self-start mr-3"
                              src="assets/images/avatars/avatar-5.png"
                              alt="user avatar"
                            />
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">Jhon Deo</h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet...
                            </p>
                            <small>Today, 4:10 PM</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <div className="avatar">
                            <img
                              className="align-self-start mr-3"
                              src="assets/images/avatars/avatar-6.png"
                              alt="user avatar"
                            />
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">Sara Jen</h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet...
                            </p>
                            <small>Yesterday, 8:30 AM</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <div className="avatar">
                            <img
                              className="align-self-start mr-3"
                              src="assets/images/avatars/avatar-7.png"
                              alt="user avatar"
                            />
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">Dannish Josh</h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet...
                            </p>
                            <small>5/11/2018, 2:50 PM</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <div className="avatar">
                            <img
                              className="align-self-start mr-3"
                              src="assets/images/avatars/avatar-8.png"
                              alt="user avatar"
                            />
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">Katrina Mccoy</h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet.
                            </p>
                            <small>1/11/2018, 2:50 PM</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item text-center">
                      <a href="#!">See All Messages</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdown-lg">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                  data-toggle="dropdown"
                  href="#!"
                >
                  <i className="fa fa-bell-o"></i>
                  <span className="badge badge-info badge-up">14</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      You have 14 Notifications
                      <span className="badge badge-info">14</span>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <i className="zmdi zmdi-accounts fa-2x mr-3 text-info"></i>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">
                              New Registered Users
                            </h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet...
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <i className="zmdi zmdi-coffee fa-2x mr-3 text-warning"></i>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">
                              New Received Orders
                            </h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet...
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#!">
                        <div className="media">
                          <i className="zmdi zmdi-notifications-active fa-2x mr-3 text-danger"></i>
                          <div className="media-body">
                            <h6 className="mt-0 msg-title">New Updates</h6>
                            <p className="msg-info">
                              Lorem ipsum dolor sit amet...
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-group-item text-center">
                      <a href="#!">See All Notifications</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item language">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                  data-toggle="dropdown"
                  href="#!"
                >
                  <i className="fa fa-flag"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li className="dropdown-item">
                    {" "}
                    <i className="flag-icon flag-icon-gb mr-2"></i> English
                  </li>
                  <li className="dropdown-item">
                    {" "}
                    <i className="flag-icon flag-icon-fr mr-2"></i> French
                  </li>
                  <li className="dropdown-item">
                    {" "}
                    <i className="flag-icon flag-icon-cn mr-2"></i> Chinese
                  </li>
                  <li className="dropdown-item">
                    {" "}
                    <i className="flag-icon flag-icon-de mr-2"></i> German
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  data-toggle="dropdown"
                  href="#"
                >
                  <span className="user-profile">
                    <img
                      src="assets/images/avatars/avatar-13.png"
                      className="img-circle"
                      alt="user avatar"
                    />
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li className="dropdown-item user-details">
                    <a href="#!">
                      <div className="media">
                        <div className="avatar">
                          <img
                            className="align-self-start mr-3"
                            src="assets/images/avatars/avatar-13.png"
                            alt="user avatar"
                          />
                        </div>
                        <div className="media-body">
                          <h6 className="mt-2 user-title">Sarajhon Mccoy</h6>
                          <p className="user-subtitle">mccoy@example.com</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="dropdown-item">
                    <i className="icon-envelope mr-2"></i> Inbox
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="dropdown-item">
                    <i className="icon-wallet mr-2"></i> Account
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="dropdown-item">
                    <i className="icon-settings mr-2"></i> Setting
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="dropdown-item">
                    <i className="icon-power mr-2"></i> Logout
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        {/* <!--End topbar header--> */}

        <div className="clearfix"></div>

        <div className="content-wrapper">
          <div className="container-fluid">
            {/*  <!--Start Dashboard Content--> */}

            <div className="row mt-3">
              <div className="col-12 col-lg-6 col-xl-3">
                <div className="card gradient-deepblue">
                  <div className="card-body">
                    <h5 className="text-white mb-0">
                      9526{" "}
                      <span className="float-right">
                        <i className="fa fa-shopping-cart"></i>
                      </span>
                    </h5>
                    {/*   <div className="progress my-3" style="height:3px;"> */}
                    <div className="progress my-3">
                      {/* <div className="progress-bar" style="width:55%"></div> */}
                      <div className="progress-bar"></div>
                    </div>
                    <p className="mb-0 text-white small-font">
                      Total Orders{" "}
                      <span className="float-right">
                        +4.2% <i className="zmdi zmdi-long-arrow-up"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-3">
                <div className="card gradient-orange">
                  <div className="card-body">
                    <h5 className="text-white mb-0">
                      8323{" "}
                      <span className="float-right">
                        <i className="fa fa-usd"></i>
                      </span>
                    </h5>
                    {/* <div className="progress my-3" style="height:3px;"> */}
                    <div className="progress my-3">
                      {/* <div className="progress-bar" style="width:55%"></div> */}
                      <div className="progress-bar"></div>
                    </div>
                    <p className="mb-0 text-white small-font">
                      Total Revenue{" "}
                      <span className="float-right">
                        +1.2% <i className="zmdi zmdi-long-arrow-up"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-3">
                <div className="card gradient-ohhappiness">
                  <div className="card-body">
                    <h5 className="text-white mb-0">
                      6200{" "}
                      <span className="float-right">
                        <i className="fa fa-eye"></i>
                      </span>
                    </h5>
                    {/*  <div className="progress my-3" style="height:3px;"> */}
                    <div className="progress my-3">
                      {/*  <div className="progress-bar" style="width:55%"></div> */}
                      <div className="progress-bar"></div>
                    </div>
                    <p className="mb-0 text-white small-font">
                      Visitors{" "}
                      <span className="float-right">
                        +5.2% <i className="zmdi zmdi-long-arrow-up"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-3">
                <div className="card gradient-ibiza">
                  <div className="card-body">
                    <h5 className="text-white mb-0">
                      5630{" "}
                      <span className="float-right">
                        <i className="fa fa-envira"></i>
                      </span>
                    </h5>
                    {/*  <div className="progress my-3" style="height:3px;"> */}

                    <div className="progress my-3">
                      {/*    <div className="progress-bar" style="width:55%"></div> */}
                      <div className="progress-bar"></div>
                    </div>
                    <p className="mb-0 text-white small-font">
                      Messages{" "}
                      <span className="float-right">
                        +2.2% <i className="zmdi zmdi-long-arrow-up"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/*   <!--End Row--> */}

            <div className="row">
              <div className="col-12 col-lg-8 col-xl-8">
                <div className="card">
                  <div className="card-header">
                    Site Traffic
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#!"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#!">
                            Action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Something else here
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#!">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <i className="fa fa-circle mr-2 text-primary"></i>New
                        Visitor
                      </li>
                      <li className="list-inline-item">
                        {/*  <i className="fa fa-circle mr-2" style="color: #ade2f9"></i> */}
                        <i className="fa fa-circle mr-2"></i>
                        Old Visitor
                      </li>
                    </ul>
                    <canvas id="chart1" height="115"></canvas>
                  </div>

                  <div className="row m-0 row-group text-center border-top border-light-3">
                    <div className="col-12 col-lg-4">
                      <div className="p-3">
                        <h5 className="mb-0">45.87M</h5>
                        <small className="mb-0">
                          Overall Visitor{" "}
                          <span>
                            {" "}
                            <i className="fa fa-arrow-up"></i> 2.43%
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="p-3">
                        <h5 className="mb-0">15:48</h5>
                        <small className="mb-0">
                          Visitor Duration{" "}
                          <span>
                            {" "}
                            <i className="fa fa-arrow-up"></i> 12.65%
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="p-3">
                        <h5 className="mb-0">245.65</h5>
                        <small className="mb-0">
                          Pages/Visit{" "}
                          <span>
                            {" "}
                            <i className="fa fa-arrow-up"></i> 5.62%
                          </span>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    Weekly sales
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#!"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#!">
                            Action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Something else here
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#!">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <canvas id="chart2" height="180"></canvas>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center">
                      <tbody>
                        <tr>
                          <td>
                            <i className="fa fa-circle text-primary mr-2"></i>{" "}
                            Direct
                          </td>
                          <td>$5856</td>
                          <td>+55%</td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fa fa-circle text-success mr-2"></i>
                            Affiliate
                          </td>
                          <td>$2602</td>
                          <td>+25%</td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fa fa-circle text-secondary mr-2"></i>
                            E-mail
                          </td>
                          <td>$1802</td>
                          <td>+15%</td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fa fa-circle text-warning mr-2"></i>
                            Other
                          </td>
                          <td>$1105</td>
                          <td>+5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/*   <!--End Row--> */}

            <div className="row">
              <div className="col-12 col-lg-6 col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="media align-items-center">
                      <div
                        className="w_chart easy-dash-chart1"
                        data-percent="60"
                      >
                        <span className="w_percent"></span>
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0">Facebook Followers</h6>
                        <small className="mb-0">
                          22.14% <i className="fa fa-arrow-up"></i> Since Last
                          Week
                        </small>
                      </div>
                      <i className="fa fa-facebook text-facebook text-right fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="media align-items-center">
                      <div
                        className="w_chart easy-dash-chart2"
                        data-percent="65"
                      >
                        <span className="w_percent"></span>
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0">Twitter Tweets</h6>
                        <small className="mb-0">
                          32.15% <i className="fa fa-arrow-up"></i> Since Last
                          Week
                        </small>
                      </div>
                      <i className="fa fa-twitter text-twitter text-right fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-12 col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="media align-items-center">
                      <div
                        className="w_chart easy-dash-chart3"
                        data-percent="75"
                      >
                        <span className="w_percent"></span>
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0">Youtube Subscribers</h6>
                        <small className="mb-0">
                          58.24% <i className="fa fa-arrow-up"></i> Since Last
                          Week
                        </small>
                      </div>
                      <i className="fa fa-youtube text-youtube fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*   <!--End Row--> */}

            <div className="row">
              <div className="col-12 col-lg-12 col-xl-6">
                <div className="card">
                  <div className="card-header">
                    World Selling Region
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#!"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#!">
                            Action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Something else here
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#!">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {/*  <div id="dashboard-map" style="height: 270px;"></div> */}
                    <div id="dashboard-map"></div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped align-items-center">
                      <thead>
                        <tr>
                          <th>Country</th>
                          <th>Income</th>
                          <th>Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-ca mr-2"></i> USA
                          </td>
                          <td>4,586$</td>
                          <td>
                            <span id="trendchart1"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-us mr-2"></i>
                            Canada
                          </td>
                          <td>2,089$</td>
                          <td>
                            <span id="trendchart2"></span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-in mr-2"></i>India
                          </td>
                          <td>3,039$</td>
                          <td>
                            <span id="trendchart3"></span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-gb mr-2"></i>UK
                          </td>
                          <td>2,309$</td>
                          <td>
                            <span id="trendchart4"></span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-de mr-2"></i>
                            Germany
                          </td>
                          <td>7,209$</td>
                          <td>
                            <span id="trendchart5"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-12 col-xl-6">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <p>Page Views</p>
                        <h4 className="mb-0">
                          8,293{" "}
                          <small className="small-font">
                            5.2% <i className="zmdi zmdi-long-arrow-up"></i>
                          </small>
                        </h4>
                      </div>
                      <canvas id="chart3" height="180"></canvas>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <p>Total Clicks</p>
                        <h4 className="mb-0">
                          7,493{" "}
                          <small className="small-font">
                            1.4% <i className="zmdi zmdi-long-arrow-up"></i>
                          </small>
                        </h4>
                      </div>
                      <canvas id="chart4" height="180"></canvas>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card">
                      <div className="card-body text-center">
                        <p className="mb-4">Total Downloads</p>
                        <input
                          className="knob"
                          data-width="175"
                          data-height="175"
                          data-readOnly="true"
                          data-thickness=".2"
                          data-angleoffset="90"
                          data-linecap="round"
                          data-bgcolor="rgba(0, 0, 0, 0.08)"
                          data-fgcolor="#843cf7"
                          data-max="15000"
                          value="8550"
                        />
                        {/*  <hr> */}
                        <p className="mb-0 small-font text-center">
                          3.4% <i className="zmdi zmdi-long-arrow-up"></i> since
                          yesterday
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <p>Device Storage</p>
                        <h4 className="mb-3">42620/50000</h4>
                        {/*  <hr> */}
                        <div className="progress-wrapper mb-4">
                          <p>
                            Documents <span className="float-right">12GB</span>
                          </p>
                          {/*  <div className="progress" style="height:5px;"> */}

                          <div className="progress">
                            {/*  <div
                              className="progress-bar bg-success"
                              style="width:80%"
                            ></div> */}

                            <div className="progress-bar bg-success"></div>
                          </div>
                        </div>

                        <div className="progress-wrapper mb-4">
                          <p>
                            Images <span className="float-right">10GB</span>
                          </p>
                          {/* <div className="progress" style="height:5px;"> */}
                          <div className="progress">
                            {/*  <div
                              className="progress-bar bg-danger"
                              style="width:60%"
                            ></div> */}

                            <div className="progress-bar bg-danger"></div>
                          </div>
                        </div>

                        <div className="progress-wrapper mb-4">
                          <p>
                            Mails <span className="float-right">5GB</span>
                          </p>
                          {/*  <div className="progress" style="height:5px;"> */}
                          <div className="progress">
                            {/*  <div
                              className="progress-bar bg-primary"
                              style="width:40%"
                            ></div> */}

                            <div className="progress-bar bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*   <!--End Row--> */}

            <div className="row">
              <div className="col-12 col-lg-6 col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <p>Total Earning</p>
                    <h4 className="mb-0">287,493$</h4>
                    <small>
                      1.4% <i className="zmdi zmdi-long-arrow-up"></i> Since
                      Last Month
                    </small>
                    {/*  <hr> */}
                    <p>Total Sales</p>
                    <h4 className="mb-0">87,493</h4>
                    <small>
                      5.43% <i className="zmdi zmdi-long-arrow-up"></i> Since
                      Last Month
                    </small>
                    <div className="mt-5">
                      <canvas id="chart5" height="160"></canvas>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-xl-8">
                <div className="card">
                  <div className="card-header">
                    Customer Review
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#!"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#!">
                            Action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Something else here
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#!">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <img
                          src="assets/images/avatars/avatar-13.png"
                          alt="user avatar"
                          className="customer-img rounded-circle"
                        />
                        <div className="media-body ml-3">
                          <h6 className="mb-0">
                            iPhone X <small className="ml-4">08.34 AM</small>
                          </h6>
                          <p className="mb-0 small-font">
                            Sara Jhon : This i svery Nice phone in low budget.
                          </p>
                        </div>
                        <div className="star">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star text-warning"></i>
                          <i className="fa fa-star text-warning"></i>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <img
                          src="assets/images/avatars/avatar-15.png"
                          alt="user avatar"
                          className="customer-img rounded-circle"
                        />
                        <div className="media-body ml-3">
                          <h6 className="mb-0">
                            Air Pod <small className="ml-4">05.26 PM</small>
                          </h6>
                          <p className="mb-0 small-font">
                            Danish Josh : The brand apple is original !
                          </p>
                        </div>
                        <div className="star">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star text-warning"></i>
                          <i className="fa fa-star text-warning"></i>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <img
                          src="assets/images/avatars/avatar-14.png"
                          alt="user avatar"
                          className="customer-img rounded-circle"
                        />
                        <div className="media-body ml-3">
                          <h6 className="mb-0">
                            Mackbook Pro{" "}
                            <small className="ml-4">06.45 AM</small>
                          </h6>
                          <p className="mb-0 small-font">
                            Jhon Doe : Excllent product and awsome quality
                          </p>
                        </div>
                        <div className="star">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star text-warning"></i>
                          <i className="fa fa-star text-warning"></i>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <img
                          src="assets/images/avatars/avatar-16.png"
                          alt="user avatar"
                          className="customer-img rounded-circle"
                        />
                        <div className="media-body ml-3">
                          <h6 className="mb-0">
                            Air Pod <small className="ml-4">08.34 AM</small>
                          </h6>
                          <p className="mb-0 small-font">
                            Christine : The brand apple is original !
                          </p>
                        </div>
                        <div className="star">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star text-warning"></i>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <img
                          src="assets/images/avatars/avatar-17.png"
                          alt="user avatar"
                          className="customer-img rounded-circle"
                        />
                        <div className="media-body ml-3">
                          <h6 className="mb-0">
                            Mackbook <small className="ml-4">08.34 AM</small>
                          </h6>
                          <p className="mb-0 small-font">
                            Michle : The brand apple is original !
                          </p>
                        </div>
                        <div className="star">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star text-warning"></i>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*  <!--End Row--> */}

            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header border-0">
                    Recent Order Tables
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#!"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#!">
                            Action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#!">
                            Something else here
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#!">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Completion</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              alt="Image placeholder"
                              src="assets/images/products/01.png"
                              className="product-img"
                            />
                          </td>
                          <td>Headphone GL</td>
                          <td>$1,840 USD</td>
                          <td>
                            <span className="badge-dot">
                              <i className="bg-danger"></i> pending
                            </span>
                          </td>
                          <td>
                            {/*  <div className="progress shadow" style="height: 4px;"> */}

                            <div className="progress shadow">
                              {/*  <div
                                className="progress-bar gradient-ibiza"
                                role="progressbar"
                                style="width: 60%"
                              ></div> */}

                              <div
                                className="progress-bar gradient-ibiza"
                                role="progressbar"
                              ></div>
                            </div>
                          </td>
                          <td>10 July 2018</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="Image placeholder"
                              src="assets/images/products/02.png"
                              className="product-img"
                            />
                          </td>
                          <td>Clasic Shoes</td>
                          <td>$1,520 USD</td>
                          <td>
                            <span className="badge-dot">
                              <i className="bg-success"></i> completed
                            </span>
                          </td>
                          <td>
                            {/*   <div className="progress shadow" style="height: 4px;"> */}
                            <div className="progress shadow">
                              {/*  <div
                                className="progress-bar gradient-ohhappiness"
                                role="progressbar"
                                style="width: 100%"
                              ></div> */}

                              <div
                                className="progress-bar gradient-ohhappiness"
                                role="progressbar"
                              ></div>
                            </div>
                          </td>
                          <td>12 July 2018</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="Image placeholder"
                              src="assets/images/products/03.png"
                              className="product-img"
                            />
                          </td>
                          <td>Hand Watch</td>
                          <td>$1,620 USD</td>
                          <td>
                            <span className="badge-dot">
                              <i className="bg-warning"></i> delayed
                            </span>
                          </td>
                          <td>
                            {/* <div className="progress shadow" style="height: 4px;"> */}

                            <div className="progress shadow">
                              {/*  <div
                                className="progress-bar gradient-orange"
                                role="progressbar"
                                style="width: 70%"
                              ></div> */}

                              <div
                                className="progress-bar gradient-orange"
                                role="progressbar"
                              ></div>
                            </div>
                          </td>
                          <td>14 July 2018</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="Image placeholder"
                              src="assets/images/products/04.png"
                              className="product-img"
                            />
                          </td>
                          <td>Hand Camera</td>
                          <td>$2,220 USD</td>
                          <td>
                            <span className="badge-dot">
                              <i className="bg-info"></i> on schedule
                            </span>
                          </td>
                          <td>
                            {/*    <div className="progress shadow" style="height: 4px;"> */}
                            <div className="progress shadow">
                              {/*   <div
                                className="progress-bar gradient-scooter"
                                role="progressbar"
                                style="width: 85%"
                              ></div> */}

                              <div
                                className="progress-bar gradient-scooter"
                                role="progressbar"
                              ></div>
                            </div>
                          </td>
                          <td>16 July 2018</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="Image placeholder"
                              src="assets/images/products/05.png"
                              className="product-img"
                            />
                          </td>
                          <td>Iphone-X Pro</td>
                          <td>$9,890 USD</td>
                          <td>
                            <span className="badge-dot">
                              <i className="bg-success"></i> completed
                            </span>
                          </td>
                          <td>
                            {/*  <div className="progress shadow" style="height: 4px;"> */}
                            <div className="progress shadow">
                              <div
                                className="progress-bar gradient-ohhappiness"
                                role="progressbar"
                              ></div>

                              {/*   <div
                                className="progress-bar gradient-ohhappiness"
                                role="progressbar"
                                style="width: 100%"
                              ></div> */}
                            </div>
                          </td>
                          <td>17 July 2018</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              alt="Image placeholder"
                              src="assets/images/products/06.png"
                              className="product-img"
                            />
                          </td>
                          <td>Ladies Purse</td>
                          <td>$3,420 USD</td>
                          <td>
                            <span className="badge-dot">
                              <i className="bg-danger"></i> pending
                            </span>
                          </td>
                          <td>
                            {/* <div className="progress shadow" style="height: 4px;"> */}
                            <div className="progress shadow">
                              <div
                                className="progress-bar gradient-ibiza"
                                role="progressbar"
                              ></div>
                              {/*  <div className="progress-bar gradient-ibiza" role="progressbar" style="width: 80%"></div> */}
                            </div>
                          </td>
                          <td>18 July 2018</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--End Row-->

      <!--End Dashboard Content--> */}
          </div>
          {/*  <!-- End container-fluid--> */}
        </div>
        {/*  <!--End content-wrapper-->
   <!--Start Back To Top Button--> */}
        <a href="#!" className="back-to-top">
          <i className="fa fa-angle-double-up"></i>{" "}
        </a>
        {/*     <!--End Back To Top Button-->
  
  <!--Start footer--> */}
        <footer className="footer">
          <div className="container">
            <div className="text-center">Copyright © 2018 Bulona Admin</div>
          </div>
        </footer>
        {/*   <!--End footer-->
  
  <!--start color switcher--> */}
        <div className="right-sidebar">
          <div className="switcher-icon">
            <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
          </div>
          <div className="right-sidebar-content">
            <p className="mb-0">Gaussion Texture</p>
            {/*  <hr> */}

            <ul className="switcher">
              <li id="theme1"></li>
              <li id="theme2"></li>
              <li id="theme3"></li>
              <li id="theme4"></li>
              <li id="theme5"></li>
              <li id="theme6"></li>
            </ul>

            <p className="mb-0">Gradient Background</p>
            {/*  <hr> */}

            <ul className="switcher">
              <li id="theme7"></li>
              <li id="theme8"></li>
              <li id="theme9"></li>
              <li id="theme10"></li>
              <li id="theme11"></li>
              <li id="theme12"></li>
            </ul>
          </div>
        </div>
        {/*  <!--end color cwitcher--> */}
      </div>
    );
  }
}

export default Dashboard;
