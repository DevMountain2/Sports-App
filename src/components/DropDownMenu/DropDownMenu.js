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
      nflroster: '',
      nbaroster: '',
      mlbroster: '',
      selected: '',
      teamSelect: '',
      dropdownTeam: ''
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
    // this.props.searchNBALeague().then(result => {
    //   this.setState({nbateams: result.value})
    // })
    // this.props.searchMLBTeams().then(result => {
    //   this.setState({mlbteams: result.value})
    // })
    // this.props.searchNBARoster().then(result => {
    //   this.setState({nbaroster: result.value})
    // })
    this.props.searchNFLRoster().then(result => {
      this.setState({nflroster: result.value})
    })
    // this.props.searchMLBRoster().then(result => {
    //   this.setState({mlbroster: result.value})
    // })
  }


  render() {
    let dropdown = null
    let options = null
    let roster = null
    let rosterOptions = null

    if (this.state.selected === "NFL"){
      options = this.state.nflteams.map(x => {
        return (<option key={x} value={x}> {x} </option>)
      })
      dropdown = (<select value={this.state.dropdownTeam} onChange={(event) => {this.setState({dropdownTeam: event.target.value})}}>
      {options}
      </select>)
      if (this.state.nflroster){
        console.log("ya")
        rosterOptions = this.state.nflTeams.map(x => {
          return (<option key={x} value ={x}> {x} </option>)
        })
        roster = (<select onChange={(event) => {console.log(event.target.data)}}>
        {rosterOptions}
        </select>
      )
      }



    } else if (this.state.selected === "NBA"){
        options = this.state.nbateams.map(x => {
          return (<option key={x} value={x}> {x} </option>)
      })
      dropdown = (<select value="MLBTeams" onChange={(event) => {console.log(event.target.value)}}>
      {options}
      </select>)
    }
     else if (this.state.selected === "MLB"){
       options = this.state.mlbteams.map(x => {
         return (<option key={x} value={x}> {x} </option>)
       })
      dropdown = (<select value="MLBTeams">
      {options}
      </select>
    )
    }

    if(this.state.teamSelect === "NFL"){

      options = this.state.nflroster.map(x => {
        return (<option key={x} value={x}> {x} </option>)
      })
      dropdown = (<select value="NFLRoster">
      {options}
      </select>
)
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your Sport:
          <select value={this.state.value} onChange={(event) => {this.setState({selected: event.target.value})}}>
            <option value="NFL">Football</option>
            <option value="NFL">Basketball</option>
            <option value="NFL">Baseball</option>
          </select>
          {dropdown}
          {roster}
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function mapStateToProps(state){
  return {
    NFLHierarchy: state.NFLHierarchy
  }
}
export default connect(mapStateToProps,{searchNflHierarchy, searchMLBTeams, searchNBALeague, searchNBARoster, searchNFLRoster, searchMLBRoster})(DropDownMenu)
