import React, { Component } from "react";
import RightSidebar from "../../components/shared/rightsidebar/Rightsidebar";

class rightSidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <RightSidebar key="RightSidebar" {...this.state} />
      </div>
    );
  }
}
export default rightSidebarContainer;
