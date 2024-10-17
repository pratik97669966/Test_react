import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { HOME, LOGIN, ROOT } from '../navigation/Constants';
import AddNewData from '../pages/doctor/AddNewData';
import AllData from '../pages/doctor/AllData';
import Home from '../pages/home/HomeScreen';
import AddAddress from '../pages/home/screens/add_address/AddAddress';
import BillingPage from '../pages/home/screens/billing_page/BIllingPage';
import BookingDetails from '../pages/home/screens/booking_deatils/BookingDetails';
import BookingTimer from '../pages/home/screens/booking_timer/BookingTimer';
import Lab from '../pages/home/screens/comming_soon/Lab';
import Medicine from '../pages/home/screens/comming_soon/Medicen';
import FamilyMemberSelection from '../pages/home/screens/FamilyMemberSelection';
import PaymentScreen from '../pages/home/screens/payment/PaymentScreen';
import SelectComplaints from '../pages/home/screens/select_disease/SelectComplaint';
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
        <Route path="/billing-page" component={BillingPage} />
        <Route path="/all-data" component={AllData} />
        <PrivateRoute path={HOME} component={Home}></PrivateRoute>
        <PrivateRoute path={LOGIN} component={AddNewData}></PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

