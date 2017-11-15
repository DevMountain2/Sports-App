import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

export default (
  <BrowserRouter>
    <Switch>
    <Route path='/' component={LandingPage} />
    </Switch>
  </BrowserRouter>

)
