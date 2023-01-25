import React, { Component } from "react";
import Switcher from "../../components/shared/switcher/Switcher";

class switcherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <Switcher key="Switcher" {...this.state} />
      </div>
    );
  }
}
export default switcherContainer;
