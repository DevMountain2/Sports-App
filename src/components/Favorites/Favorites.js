import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {requestFavorites} from '../../ducks/reducer.js'
//import { NBA, NFL, MLB } from "../config.js"
import {searchNBAPlayers, searchNFLPlayers, searchMLBPlayers} from '../../ducks/reducer.js'
import NavBar from '../NavBar/NavBar'
import './Favorites.css'

class Favorites extends Component {
    constructor(props){
      super(props)
      this.state = {
        nflplayers: '',
        nbaplayers: '',
        mlbplayers: '',
        selectedPlayer: '',
        selectedPlayerId: '',
        playerSport: '',
        favPlayers: [],
        selectedPlayerStats: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.selectedPlayer = this.selectedPlayer.bind(this);
      this.handlePlayerStat = this.handlePlayerStat.bind(this);

    }

    handleChange(event){
      this.setState({value: event.target.value})
    }

    handlePlayerStat(userInput){
      //console.log(this.state.selectedPlayer);
      this.setState({ selectedPlayer: userInput})
    }

    selectedPlayer(arr){
      const splitArr= arr[0].split(',');
      this.setState({ selectedPlayerId: splitArr[0] });
      this.setState({ playerSport: splitArr[1], selectedPlayerStats: {} });
    }

    requestStats(){
      switch(this.state.playerSport){

        case 'NFL':
          axios.get(`/api/NFLplayers/${this.state.selectedPlayerId}`).then(response => {
            this.setState({ selectedPlayerStats: response.data });
          });
        break;
        case 'NBA':
          axios.get(`/api/NBAplayers/${this.state.selectedPlayerId}`).then(response => {
            this.setState({ selectedPlayerStats: response.data });
            //console.log(response.data);
            //console.log(this.state.playerSport);
          });
        break;
        case 'MLB':
          axios.get(`/api/MLBplayers/${this.state.selectedPlayerId}`).then(response => {
            this.setState({ selectedPlayerStats: response.data });
            //console.log(response.data);
          });
        break;
      }
    }

  componentDidMount(){
    axios.get('/api/Favorites').then(response => {
      this.setState({ favPlayers: response.data })
    })
  }



  render(){
    const playerStats= this.state.selectedPlayerStats;

    let dropdown = null
    let options = null
    options= this.state.favPlayers.map((player, index)=> {
      // console.log('mapping: ', JSON.parse(player.player_id).full_name);

      let playerObj= JSON.parse(player.player_id);
      //console.log(playerObj);
      if (playerObj.player) {
        return (<option key={index} value={[playerObj.player.id, player.player_sport]}>{playerObj.player.name || playerObj.player.full_name}</option>)
      }
      return (<option key={index} value={[playerObj.id, player.player_sport]}>{playerObj.full_name || playerObj.name}</option>)
    })


    return(
      <div className="image">
      <NavBar />

        <div className='main-div'> </div>
        <div className="players-container"> <h3>Your Favorite Players</h3>
        <div className='fav-heading'>
        <select className='player-select' onChange={(e)=> {
          this.selectedPlayer([e.target.value])
        }}>{options}</select>

        <button className='submit-btn' onClick={()=>this.requestStats()}> Submit </button>
        </div>
          <div className='player-stats'>
            {this.state.playerSport === 'NBA' && <div>
              <p>{playerStats.full_name}</p>
            <p>Points: {playerStats.seasons && playerStats.seasons[0].teams[0].average.points}</p>
            <p>Blocks: {playerStats.seasons && playerStats.seasons[0].teams[0].average.blocks}</p>
            <p>Assists: {playerStats.seasons && playerStats.seasons[0].teams[0].average.assists}</p>
            <p>Minutes: {playerStats.seasons && playerStats.seasons[0].teams[0].average.minutes}</p>
            <p>Rebounds: {playerStats.seasons && playerStats.seasons[0].teams[0].average.rebounds}</p> </div> }

            {this.state.playerSport === 'NFL' && <div>
              <p>{playerStats.name}</p>
            <p>College: {playerStats.seasons && playerStats.college}</p>
            <p>College Conference: {playerStats.seasons && playerStats.college_conf}</p>
            <p>Height: {playerStats.seasons && playerStats.height}</p>
            <p>Jersey: {playerStats.seasons && playerStats.jersey}</p>
            <p>Position: {playerStats.seasons && playerStats.position}</p> </div> }

            {this.state.playerSport === 'MLB' && <div>
              <p>{playerStats.full_name}</p>
            <p>Height: {playerStats.player && playerStats.player.height}</p>
            <p>Batting Hand: {playerStats.player && playerStats.player.bat_hand}</p>
            <p>Jersey Number: {playerStats.player && playerStats.player.jersey_number}</p>
            <p>Position: {playerStats.player && playerStats.player.position}</p>
            <p>Weight: {playerStats.player && playerStats.player.weight}</p> </div> }
          </div>
         </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps,{requestFavorites})(Favorites)
