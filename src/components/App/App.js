import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import router from '../../router'

class App extends Component {
   componentDidMount (){
     axios.get("/api/test").then(response => {
       //console.log(response);
    })
  }
  render() {
    return (
      <div className="App">
        {router}
      </div>

    );
  }
}

export default App;
