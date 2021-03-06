import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import './DropDownMenu.css'
import {searchNflHierarchy, searchMLBTeams, searchNBALeague, searchMLBRoster, searchNBARoster, searchNFLRoster, searchNBAPlayers, searchNFLPlayers, searchMLBPlayers } from '../../ducks/reducer.js'


class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nflteams: [],
      nbateams: [],
      mlbteams: [],
      selectedSport: '',
      selectedTeam: '',
      dropdownTeam: '',
      teamId: '',
      selectedPlayer: ''
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePlayer = this.handlePlayer.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handlePlayer(userInput){
    this.setState({ selectedPlayer: userInput});
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('/api/postFavorites', {player_id: this.props.selectedPlayer, selectedSport: this.state.selectedSport})
  }


  componentDidMount(){
    this.props.searchNflHierarchy().then(result => {
      this.setState({nflteams: result.value})
    })
     this.props.searchNBALeague().then(result => {
       this.setState({nbateams: result.value})
     })
     this.props.searchMLBTeams().then(result => {
       this.setState({mlbteams: result.value})
     })
   }


  render() {
    // console.log(this.state.nflteams)
    let dropdown = null
    let options = null
    let roster = null
    let rosterOptions = null

    if (this.state.selectedSport === "NFL"){
      options = this.state.nflteams.map(x => {
        //console.log(x)
        return (<option key={x.id} value={x.id}> {x.market + " " + x.name} </option>)
      })
      dropdown = (<select className="Drop-Down" onChange={e => this.props.searchNFLRoster(e.target.value)}>
      {options}
      </select>)
    }
      else if (this.state.selectedSport === "NBA"){
        options = this.state.nbateams.map(x => {
          //console.log(x)
          return (<option key={x.id} value={x.id}> {x.market + " " + x.name} </option>)
      })
      dropdown = (<select className="Drop-Down" onChange={e => this.props.searchNBARoster(e.target.value)}>
      {options}
      </select>)
    }
     else if (this.state.selectedSport === "MLB"){
       options = this.state.mlbteams.map(x => {
         //console.log(x);
         return (<option key={x.id} value={x.id}> {x.market + " " + x.name} </option>)
       })
      dropdown = (<select className="Drop-Down" onChange={e => this.props.searchMLBRoster(e.target.value)}>
      {options}
      </select>)
    }


    let playerDropDown = () => {
      if(this.props.NBARoster.length){
        return  (
          <select className="Drop-Down" onChange={(e)=>this.props.searchNBAPlayers(e.target.value)}> {this.props.NBARoster.map(x => {
             return (<option key={x.id} value={x.id}> {x.full_name} </option>)
          })}
            </select>
        )
      } else if(this.props.NFLRoster.length){
        return  (
          <select className="Drop-Down" onChange={(e)=>this.props.searchNFLPlayers(e.target.value)}> {this.props.NFLRoster.map(x => {
             return (<option key={x.id} value={x.id}> {x.name} </option>)
          })}
            </select>
        )
      } else if(this.props.MLBRoster) {
        return (
          <select className="Drop-Down" onChange={(e)=>this.props.searchMLBPlayers(e.target.value)}> {this.props.MLBRoster.map(x => {
            return (<option key={x.id} value={x.id}> {x.full_name} </option>)
          })}
          </select>
        )
      }
    }



    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select className="Drop-Down" onChange={(event) => {this.setState({selectedSport: event.target.value})}}>
            <option value="NFL">Football</option>
            <option value="NBA">Basketball</option>
            <option value="MLB">Baseball</option>
          </select>
          {dropdown}
          {roster}
          {playerDropDown()}
        </label>
        <input className="player-submit" type="submit" value="Submit" />
      </form>
    );
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps,{searchNflHierarchy, searchMLBTeams, searchNBALeague, searchNBARoster, searchNFLRoster, searchMLBRoster, searchNBAPlayers, searchNFLPlayers, searchMLBPlayers })(DropDownMenu)
