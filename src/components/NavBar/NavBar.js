import React, {Component} from 'react'
import './NavBar.css'
import {withRouter} from "react-router-dom"

class NavBar extends Component {

render(){
  console.log(this.props)
  return(
    <div className="main-nav">
      <img className="nav-logo" src={require('../../images/Nav-logo.png')} alt='asdf' />
      <div className="Favorites">Favorites</div>
      <div onClick={() => {this.props.history.push('/')}}className="Logout">Logout</div>
    </div>
  )
}

}
export default withRouter(NavBar);
