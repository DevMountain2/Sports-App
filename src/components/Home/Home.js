import React, {Component} from 'react';
import SearchSchedule from '../Searchschedule/Searchschedule'
import SearchNflGames from '../SearchNflGames/SearchNflGames'
import SearchNflHierarchy from '../SearchNflHierarchy/SearchNflHierarchy'
import SearchNFLRoster from '../SearchNFLRoster/SearchNFLRoster'
import SearchNflPlayers from '../SearchNflPlayers/SearchNflPlayers'
import SearchNbaLeague from '../SearchNbaLeague/SearchNbaLeague'
import SearchNbaRoster from '../SearchNbaRoster/SearchNbaRoster'
import SearchNbaPlayers from '../SearchNbaPlayers/SearchNbaPlayers'
import NavBar from '../NavBar/NavBar'
//import { reduxMethods } from './reducer'



class Home extends Component {
  render(){
    return(
      <div>
        <NavBar />
        <SearchSchedule />
        <SearchNbaPlayers />
        <SearchNbaLeague />
        <SearchNbaRoster />
        <SearchNflGames />
        <SearchNflHierarchy />
        <SearchNFLRoster />
        <SearchNflPlayers />
        <h1>Home page</h1>
      </div>
    )
  }
}
export default Home;
