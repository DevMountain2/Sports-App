import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNflHierarchy} from '../../ducks/reducer.js'

class SearchNflHierarchy extends Component {

  render(){
    console.log(this.props.NFLHierarchy);
    return(
      <div>
        <button onClick={this.props.SearchNflHierarchy}>nfl league</button>
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
