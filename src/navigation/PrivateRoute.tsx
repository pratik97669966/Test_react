import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute: any = (props: any) => {
  const isAuth = true;

  return isAuth ? (
    props.redirectPath ? (
      <Route path={props.path} exact={props.exact}>
        <Redirect
          to={{
            pathname: props.redirectPath,
            state: { comingFrom: props.path },
          }}
        />
      </Route>
    ) : (
      <Route path={props.path} exact={props.exact} component={props.component} />
    )
  ) : (
    <Redirect to="/" />
  );
};
export default PrivateRoute;
