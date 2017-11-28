import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchMLBSchedule} from '../../ducks/reducer.js'

class SearchMlbSchedule extends Component {

  render(){
    //console.log(this.props);
    return (
      <div>
        <button onClick={this.props.searchMLBSchedule}> mlb Schedule </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    MLBSchedule: state.MLBSchedule
  }
}
export default connect(mapStateToProps, {searchMLBSchedule})(SearchMlbSchedule)
