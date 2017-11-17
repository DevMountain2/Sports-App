import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {searchNBARoster} from '../../ducks/reducer.js'

class SearchNbaRoster extends Component {

  render(){
    console.log(this.props);
    return(
      <div>
        <button onClick={this.props.searchNBARoster}> Nba Roster</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    NBARoster: state.NBARoster
  }
}
export default connect(mapStateToProps, {searchNBARoster})(SearchNbaRoster)
