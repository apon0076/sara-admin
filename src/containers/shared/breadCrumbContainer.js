import React, { Component } from "react";
import Breadcrumb from "../../components/shared/breadcrumb/Breadcrumb";

class breadCrumbContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <Breadcrumb key="Breadcrumb" {...this.state} />
      </div>
    );
  }
}
export default breadCrumbContainer;
