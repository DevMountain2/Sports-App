import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNBALeague} from '../../ducks/reducer.js'

class SearchNbaLeague extends Component {

  render(){
    console.log(this.props);
    return (
      <div>
        <button onClick={this.props.searchNBALeague}> nba league </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    NBALeague: state.NBALeague
  }
}
export default connect(mapStateToProps, {searchNBALeague})(SearchNbaLeague)
