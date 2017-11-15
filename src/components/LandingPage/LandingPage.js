import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {}

      this.handleLogin = this.handleLogin.bind(this);
  }

    handleLogin() {
      window.location.href = 'http://localhost:3001/login';
    }
    render(){
      return (
        <div>
          <button onClick={this.handleLogin}>Login Here</button>
        </div>
      );
    }
}
export default LandingPage;
