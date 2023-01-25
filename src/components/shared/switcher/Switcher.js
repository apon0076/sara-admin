import React, { Component } from "react";

export const Switcher = (props) => {
  return (
    <div id="wrapper">
      <div className="right-sidebar">
        <div className="switcher-icon">
          <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
        </div>
        <div className="right-sidebar-content">
          <p className="mb-0">Gaussion Texture</p>

          <ul className="switcher">
            <li id="theme1"></li>
            <li id="theme2"></li>
            <li id="theme3"></li>
            <li id="theme4"></li>
            <li id="theme5"></li>
            <li id="theme6"></li>
          </ul>

          <p className="mb-0">Gradient Background</p>

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
    </div>
  );
};

export default Switcher;
