import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {searchNBAPlayers} from '../../ducks/reducer.js'

class SearchNbaPlayers extends Component {

  render(){
    console.log(this.props);
    return (
      <div>
        <button onClick={this.props.searchNBAPlayers}> Nba Players </button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    NBA_PLAYERS: state.NBAPlayers
  }
}
export default connect(mapStateToProps, {searchNBAPlayers})(SearchNbaPlayers)
