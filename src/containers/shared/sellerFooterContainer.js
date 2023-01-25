import React, { Component } from "react";
import SellerFooter from "../../components/shared/sellerfooter/SellerFooter";

class sellerFooterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <SellerFooter key="SellerFooter" {...this.state} />
      </div>
    );
  }
}
export default sellerFooterContainer;
