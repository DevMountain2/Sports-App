import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNflGames} from '../../ducks/reducer.js'

class SearchNflGames extends Component {

  render(){
    console.log(this.props.NFLgames);
    return (
      <div>

      <button onClick={this.props.searchNflGames}>Nfl games</button>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    NFLgames: state.NFLgames
  }
}
export default connect(mapStateToProps,{searchNflGames})(SearchNflGames)
