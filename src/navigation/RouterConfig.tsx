import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { HOME, LOGIN, ROOT } from '../navigation/Constants';
import Login from '../pages/doctor/SignIn';
import Home from '../pages/home/HomeScreen';
import AddAddress from '../pages/home/screens/add_address/AddAddress';
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
          {getTokenSourceMapRange() ? <Redirect to={HOME} /> : <Login />}
        </Route>

        <Route path="/family-member-selection" component={FamilyMemberSelection} />

        <Route path="/select-complaint" component={SelectComplaints} />
        <Route path="/booking-details" component={BookingTimer} />

        <Route path="/add-address" component={AddAddress} />

        <Route path="/tearms-and-condition" component={BookingDetails} />

        <Route path="/lab-test" component={Lab} />
        <Route path="/medicine-delivery" component={Medicine} />
        <Route path="/payment_screen" component={PaymentScreen} />
        <PrivateRoute path={HOME} component={Home}></PrivateRoute>
        <PrivateRoute path={LOGIN} component={Login}></PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

