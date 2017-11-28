import React, {Component} from 'react';
import SearchSchedule from '../Searchschedule/Searchschedule'
import SearchNflGames from '../SearchNflGames/SearchNflGames'
import SearchNflHierarchy from '../SearchNflHierarchy/SearchNflHierarchy'
import SearchNFLRoster from '../SearchNFLRoster/SearchNFLRoster'
import SearchNflPlayers from '../SearchNflPlayers/SearchNflPlayers'
import SearchNbaLeague from '../SearchNbaLeague/SearchNbaLeague'
import SearchNbaRoster from '../SearchNbaRoster/SearchNbaRoster'
import SearchNbaPlayers from '../SearchNbaPlayers/SearchNbaPlayers'
import SearchMlbSchedule from '../SearchMlbSchedule/SearchMlbSchedule'
import SearchMlbPlayers from '../SearchMlbPlayers/SearchMlbPlayers'
import SearchMlbTeams from '../SearchMlbTeams/SearchMlbTeams'
import SearchMlbRoster from '../SearchMlbRoster/SearchMlbRoster'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import NavBar from '../NavBar/NavBar'
import './Home.css'
//import { reduxMethods } from './reducer'



class Home extends Component {
  render(){
    return(
    <div className="main-container">
      <div>
        <NavBar />

        <SearchMlbSchedule />
        <SearchMlbPlayers />
        <SearchSchedule />
        <SearchNbaPlayers />
        <SearchNflGames />      
        <SearchNflPlayers />
        <DropDownMenu />
        <h1>Home page</h1>
      </div>
    </div>
    )
  }
}
export default Home;
