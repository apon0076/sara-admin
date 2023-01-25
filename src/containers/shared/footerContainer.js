import React, { Component } from "react";
import Footer from "../../components/shared/footer/Footer";

class footerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <Footer key="Footer" {...this.state} />
      </div>
    );
  }
}
export default footerContainer;
