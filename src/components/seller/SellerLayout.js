import React from "react";
import { Route } from "react-router-dom";
import Meta from '../../utils/Meta';

const SellerLayout = ({ children }) => 
<div><Meta title="SaRa Marketplace - Seller" />{children}</div>;

const SellerLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <SellerLayout>
          <Component {...matchProps} />
        </SellerLayout>
      )}
    />
  );
};

export default SellerLayoutRoute;
