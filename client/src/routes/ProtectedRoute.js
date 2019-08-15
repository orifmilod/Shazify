import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ render: Component, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={props => {
        if (accessToken !== null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
