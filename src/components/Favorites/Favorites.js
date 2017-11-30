import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {requestFavorites} from '../../ducks/reducer.js'
import './Favorites.css'

class Favorites extends Component {
    constructor(props){
      super(props)
      this.state = {

      }


    }
  componentDidMount(){
    axios.get('/api/Favorites').then(response => {
      console.log(response.data);
    })
    
  }



  render(){

    return(
      <div className="image">
        <div className='main-div'> This is the favorites page </div>
        <h1> </h1>
      </div>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps,{requestFavorites})(Favorites)
