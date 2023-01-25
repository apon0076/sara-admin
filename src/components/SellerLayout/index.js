import React from "react";
import { Route } from "react-router-dom";
import SellerFooter from "../../containers/shared/sellerFooterContainer";
import SellerHeader from "../../containers/shared/sellerHeaderContainer";
import SellerNavbar from "../../containers/shared/sellerNavbarContainer";
import Meta from "../../utils/Meta";

const SellerDashboardLayout = ({ children }) => (
  <div>
    <Meta title="SaRa Marketplace - Seller" />
    {children}
  </div>
);

const index = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <SellerDashboardLayout>
          <SellerHeader />
          <div style={{ marginTop: "61px" }}>
            <SellerNavbar />
            <Component {...matchProps} />
            <SellerFooter />
          </div>
        </SellerDashboardLayout>
      )}
    />
  );
};

export default index;
