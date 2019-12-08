import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ render: Component, ...rest }) {
  const accessToken = localStorage.getItem('spotify_access_token');
  return (
    <Route
      {...rest}
      render={props => {
        if (accessToken !== null) {
          return <Component {...props} />;
        }
        else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
