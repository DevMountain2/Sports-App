import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';

export default (
  <BrowserRouter>
    <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route path='/Home' component={Home} />
    </Switch>
  </BrowserRouter>

)
