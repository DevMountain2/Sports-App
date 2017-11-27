import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Signout.css'

class Signout extends Component {
    render(){
    return (
      <div className="signout-button">
        onClick={this.props.history.push('/')}
      </div>
    )
  }

}
export default Signout
