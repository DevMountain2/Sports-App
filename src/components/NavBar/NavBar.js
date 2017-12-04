import React, {Component} from 'react'
import './NavBar.css'
import {withRouter} from "react-router-dom"
import {Link} from 'react-router-dom'

class NavBar extends Component {

render(){
  //console.log(this.props)
  return(
    <div className="main-nav">
      <img className="nav-logo" src={require('../../images/Nav-logo.png')} alt='asdf' />
      <Link to= '/Favorites'>
      <span className="Favorites">Favorites</span>
      </Link>
      <Link to='/Home'>
      <span className="Home">Home</span>
      </Link>
      <span onClick={() => {this.props.history.push('/')}}className="Logout">Logout</span>
    </div>
  )
}

}
export default withRouter(NavBar);
