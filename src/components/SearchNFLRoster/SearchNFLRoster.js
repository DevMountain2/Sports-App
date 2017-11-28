import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNFLRoster} from '../../ducks/reducer.js'

class SearchNFLRoster extends Component {

  render(){
    //console.log(this.props);
    return (
      <div>
        <button onClick={this.props.searchNFLRoster}> Nfl Roster</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    NFLRoster: state.NFLRoster
  }
}
export default connect(mapStateToProps, {searchNFLRoster})(SearchNFLRoster)
