import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchSchedule} from '../../ducks/reducer.js'


class SearchSchedule extends Component {

    componentDidMount(){
      this.props.searchSchedule()

    }


  render(){
    console.log(this.props.NBAgames);
    return(
      <div>
        <input/>
      </div>

    )
  }
}

function mapStateToProps(state){
  return {
     NBAgames: state.NBAgames
  }
}
export default connect(mapStateToProps,{searchSchedule})(SearchSchedule)
