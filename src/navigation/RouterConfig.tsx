import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { HOME, LOGIN, ROOT } from '../navigation/Constants';
import AddNewData from '../pages/doctor/AddNewData';
import AllData from '../pages/doctor/AllData';
import { NotFound } from './NotFound';
import PrivateRoute from './PrivateRoute';

export const RouterConfig = () => {
  const token = localStorage.getItem('token');

  function getTokenSourceMapRange() {
    return localStorage.getItem('token');
  }

  return (
    <div>
      <Switch>
        <Route exact path={ROOT}>
          {getTokenSourceMapRange() ? <Redirect to={HOME} /> : <AddNewData />}
        </Route>
        <Route path="/all-data" component={AllData} />
        <PrivateRoute path={LOGIN} component={AddNewData}></PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

