import React from "react";

const Rightsidebar = (props) => {
  return (
    <div className="right-sidebar">
      <div className="slimscrollright">
        <div className="rpanel-title"> Service Panel <span><i className="icon-close right-side-toggler"></i></span> </div>
        <div className="r-panel-body">
          <ul className="hidden-xs">
            <li><b>Layout Options</b></li>
            <li>
              <div className="checkbox checkbox-danger">
                <input id="headcheck" type="checkbox" className="fxhdr" />
                <label htmlFor="headcheck"> Fix Header </label>
              </div>
            </li>
            <li>
              <div className="checkbox checkbox-warning">
                <input id="sidecheck" type="checkbox" className="fxsdr" />
                <label htmlFor="sidecheck"> Fix Sidebar </label>
              </div>
            </li>
          </ul>
          <ul id="themecolors" className="m-t-20">
            <li><b>With Light sidebar</b></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="default" className="default-theme working">1</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="green" className="green-theme">2</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="yellow" className="yellow-theme">3</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="red" className="red-theme">4</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="purple" className="purple-theme">5</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="black" className="black-theme">6</a></li>
            <li className="db"><b>With Dark sidebar</b></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="default-dark" className="default-dark-theme">7</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="green-dark" className="green-dark-theme">8</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="yellow-dark" className="yellow-dark-theme">9</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="red-dark" className="red-dark-theme">10</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="purple-dark" className="purple-dark-theme">11</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault()}} data-theme="black-dark" className="black-dark-theme">12</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rightsidebar;
