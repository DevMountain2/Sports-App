import React, {Component} from 'react'
import './NavBar.css'


class NavBar extends Component {

render(){
  return(
    <div className="main-nav">
      <img className="nav-logo" src={require('../../images/Nav-logo.png')} alt='asdf' />
      <div className="Favorites">Favorites</div>
      <div className="Logout">Logout</div>
    </div>
  )
}

}
export default NavBar
