import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
   componentDidMount (){
     axios.get("/api/test").then(response => {
       console.log(response);
    })
  }
  render() {
    return (
      <div className="App">
          This is the landing page
      </div>
    );
  }
}

export default App;
