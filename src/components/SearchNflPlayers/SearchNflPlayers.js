import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNFLPlayers} from '../../ducks/reducer.js'

class SearchNflPlayers extends Component {

  render(){
    //console.log(this.props);
    return (
      <div>
        <button onClick={this.props.searchNFLPlayers}> Nfl Player profile </button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    NFLPlayers: state.NFLPlayers
  }
}
export default connect(mapStateToProps, {searchNFLPlayers})(SearchNflPlayers)
