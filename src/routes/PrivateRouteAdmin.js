import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default PrivateRouteAdmin;
