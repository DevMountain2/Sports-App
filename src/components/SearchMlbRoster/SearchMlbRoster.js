import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchMLBRoster} from '../../ducks/reducer.js'

class SearchMlbRoster extends Component {

  render(){
    //console.log(this.props)
    return (
      <div>
        <button onClick = {this.props.searchMLBRoster}> MLB Roster </button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    MLBRoster: state.MLBRoster
  }
}
export default connect(mapStateToProps, {searchMLBRoster})(SearchMlbRoster)
