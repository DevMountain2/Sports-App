import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';

export default (
  <BrowserRouter>
    <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route path='/Home' component={Home} />
    <Route path='/Favorites' component={Favorites} />
    <Route path='/Home' component={Home} />
    </Switch>
  </BrowserRouter>

)
