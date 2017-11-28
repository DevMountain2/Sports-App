import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchMLBPlayers} from '../../ducks/reducer.js'

class SearchMlbPlayers extends Component {

  render(){
    //console.log(this.props);
    return (
      <div>
        <button onClick={this.props.searchMLBPlayers}> Mlb Player profile</button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    MLBPlayers: state.MLBPlayers
  }
}
export default connect(mapStateToProps, {searchMLBPlayers})(SearchMlbPlayers)
