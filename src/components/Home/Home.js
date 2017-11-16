import React, {Component} from 'react';
import SearchSchedule from '../Searchschedule/Searchschedule'
//import { reduxMethods } from './reducer'



class Home extends Component {
  render(){
    return(
      <div>
        <SearchSchedule />
        <h1>Home page</h1>
      </div>
    )
  }
}
export default Home;
