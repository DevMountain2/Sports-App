import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNflHierarchy, searchMLBTeams, searchNBALeague, searchMLBRoster, searchNBARoster, searchNFLRoster } from '../../ducks/reducer.js'


class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nflteams: '',
      nbateams: '',
      mlbteams: '',
      selectedSport: '',
      selectedTeam: '',
      dropdownTeam: '',
      teamId: '',
      playerId:'',

  };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
    let dropdown = null
    let options = null
    let roster = null
    let rosterOptions = null

    if (this.state.selectedSport === "NFL"){
      options = this.state.nflteams.map(x => {
        //console.log(x.id)
        return (<option key={x.id} value={x.id}> {x.market + " " + x.name} </option>)
      })
      dropdown = (<select onChange={e => this.props.searchNFLRoster(e.target.value)}>
      {options}
      </select>)
    }
      else if (this.state.selectedSport === "NBA"){
        options = this.state.nbateams.map(x => {
          //console.log(x)
          return (<option key={x.id} value={x.id}> {x.market + " " + x.name} </option>)
      })
      dropdown = (<select onChange={e => this.props.searchNBARoster(e.target.value)}>
      {options}
      </select>)
    }
     else if (this.state.selectedSport === "MLB"){
       options = this.state.mlbteams.map(x => {
         //console.log(x);
         return (<option key={x.id} value={x.name + " " + x.market}> {x.market + " " + x.name} </option>)
       })
      dropdown = (<select>
      {options}
      </select>)
    }
    let playerDropDown = () => {
      if(!this.props.NBARoster){
        return null
      }
      return  (
        <select> {this.props.NBARoster.map(x => {
           return (<option key={x.id} value={x.id}> {x.full_name} </option>)
        })}
          </select>
      )
    }



    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your Sport:
          <select value={this.state.value} onChange={(event) => {this.setState({selectedSport: event.target.value})}}>
            <option value="NFL">Football</option>
            <option value="NBA">Basketball</option>
            <option value="MLB">Baseball</option>
          </select>
          {dropdown}
          {roster}
          {playerDropDown()}
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps,{searchNflHierarchy, searchMLBTeams, searchNBALeague, searchNBARoster, searchNFLRoster, searchMLBRoster})(DropDownMenu)
