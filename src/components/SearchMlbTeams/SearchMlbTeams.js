import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {searchMLBTeams} from '../../ducks/reducer.js'

class SearchMlbTeams extends Component {

  render(){
    //console.log(this.props.MLBTeams)

    return (
      <div>
        <button onClick={this.props.searchMLBTeams}> MLB teams </button>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    MLBTeams: state.MLBTeams
  }
}
export default connect(mapStateToProps, {searchMLBTeams})(SearchMlbTeams)
