import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNflHierarchy} from '../../ducks/reducer.js'

class SearchNflHierarchy extends Component {

  render(){
    return(
      <div>
        <button onClick={this.props.searchNflHierarchy}>nfl teams</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    NFLHierarchy: state.NFLHierarchy
  }
}
export default connect(mapStateToProps,{searchNflHierarchy})(SearchNflHierarchy)
