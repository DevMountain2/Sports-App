import React, {Component} from 'react';
import SearchSchedule from '../Searchschedule/Searchschedule'
import SearchNflGames from '../SearchNflGames/SearchNflGames'
import SearchNflHierarchy from '../SearchNflHierarchy/SearchNflHierarchy'
import SearchNFLRoster from '../SearchNFLRoster/SearchNFLRoster'
//import { reduxMethods } from './reducer'



class Home extends Component {
  render(){
    return(
      <div>
        <SearchSchedule />
        <SearchNflGames />
        <SearchNflHierarchy />
        <SearchNFLRoster />
        <h1>Home page</h1>
      </div>
    )
  }
}
export default Home;
