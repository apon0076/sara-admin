import React from 'react';
import { Route } from 'react-router-dom';

const NoMatchLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

const NoMatchLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <NoMatchLayout>
        <Component {...matchProps} />
      </NoMatchLayout>
    )} />
  )
};

export default NoMatchLayoutRoute;
