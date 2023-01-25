import React from "react";
import { Route } from "react-router-dom";
import Footer from "../../containers/shared/footerContainer";
import Header from "../../containers/shared/headerContainer";
import Navbar from "../../containers/shared/navBarContainer";
import RightSidebar from "../../containers/shared/rightSidebarContainer";
import Meta from "../../utils/Meta";

const ProtectedLayout = ({ children }) => (
  <div>
    <Meta title="SaRa Marketplace - Admin" />
    {children}
  </div>
);

const index = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <ProtectedLayout>
          <Header />
          <div style={{ marginTop: "61px" }}>
            <Navbar />
            <RightSidebar />
            <Component {...matchProps} />
            <Footer />
          </div>
        </ProtectedLayout>
      )}
    />
  );
};
export default index;
