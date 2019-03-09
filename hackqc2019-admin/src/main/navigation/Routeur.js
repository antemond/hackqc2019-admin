import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import NavigationBar from './NavigationBar';
import CreateOrg from '../components/Orgs/CreateOrg';
import OrgDetails from '../components/Orgs/OrgDetails';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavigationBar>
        <Switch>
          <Route component={() => <Home />} exact path="/org" />
          <Route component={() => <CreateOrg/>} exact path="/newOrg" />
          <Route component={(params) => <OrgDetails params={params}/>} exact path="/org/:id" />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
        </NavigationBar>
    </BrowserRouter>
  );
}