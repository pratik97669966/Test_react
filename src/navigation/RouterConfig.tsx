import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { HOME, LOGIN, ROOT } from '../navigation/Constants';
import Login from '../pages/doctor/SignIn';
import Home from '../pages/home/HomeScreen';
import AddAddress from '../pages/home/screens/add_address/AddAddress';
import AddFamilyMember from '../pages/home/screens/add_member/AddFamilyMember';
import BookingDetails from '../pages/home/screens/booking_deatils/BookingDetails';
import BookingTimer from '../pages/home/screens/booking_timer/BookingTimer';
import ChooseAddress from '../pages/home/screens/choose_address/ChooseAddress';
import Lab from '../pages/home/screens/comming_soon/Lab';
import Medicine from '../pages/home/screens/comming_soon/Medicen';
import FamilyMemberSelection from '../pages/home/screens/FamilyMemberSelection';
import CheckLocationAvailability from '../pages/home/screens/select_city/CheckLocationAvailability';
import CityDetails from '../pages/home/screens/select_city/CityDetails';
import SelectCity from '../pages/home/screens/select_city/SelectCity';
import SelectComplaints from '../pages/home/screens/select_disease/SelectComplaint';
import SelectSlot from '../pages/home/screens/slot_selection/SelectSlot';
import UpdateChooseAddress from '../pages/home/screens/update_address/UpdateChooseAddress';
import UpdateFamilyMember from '../pages/home/screens/update_family_member/UpdateFamilyMember';
import UpdateSelectComplaint from '../pages/home/screens/update_select_disease/UpdateSelectComplaint';
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
        <Route path="/add-family-member" component={AddFamilyMember} />
        <Route path="/update-family-member" component={UpdateFamilyMember} />

        <Route path="/select-complaint" component={SelectComplaints} />
        <Route path="/update-select-complaint" component={UpdateSelectComplaint} />

        <Route path="/select-slot" component={SelectSlot} />

        <Route path="/select-city-details" component={CityDetails} />
        <Route path="/select-city" component={SelectCity} />
        <Route path="/check-location-availability" component={CheckLocationAvailability} />
        <Route path="/booking-details" component={BookingTimer} />

        <Route path="/choose-address" component={ChooseAddress} />
        <Route path="/update-choose-address" component={UpdateChooseAddress} />
        <Route path="/add-address" component={AddAddress} />

        <Route path="/tearms-and-condition" component={BookingDetails} />

        <Route path="/lab-test" component={Lab} />
        <Route path="/medicine-delivery" component={Medicine} />

        <PrivateRoute path={HOME} component={Home}></PrivateRoute>
        <PrivateRoute path={LOGIN} component={Login}></PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

