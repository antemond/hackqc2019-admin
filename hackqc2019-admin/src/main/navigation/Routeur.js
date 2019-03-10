import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import NavigationBar from './NavigationBar';
import CreateOrg from '../components/Orgs/CreateOrg';
import Statistics from '../components/Statistics';
import OrgDetails from '../components/Orgs/OrgDetails';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavigationBar>
        <Switch>
          <Route component={() => <Home />} exact path="/org" />
          <Route component={() => <CreateOrg />} exact path="/newOrg" />
          <Route component={() => <Statistics />} exact path="/statistics" />
          <Route component={(params) => <OrgDetails params={params} />} exact path="/org/:id" />
          <Route component={() => <Redirect to="/org" />} />
        </Switch>
      </NavigationBar>
    </BrowserRouter>
  );
}