import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './LandingPage.css'

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {}

      this.handleLogin = this.handleLogin.bind(this);
  }

    handleLogin() {
      window.location.href = '/login';
    }
    render(){
      return (
      <div className="background-gif">
        <div className="login-button">
        <h1>Welcome to Sportify</h1>
          <button className="button" onClick={this.handleLogin}>Login Here</button>
          </div>
        </div>
      );
    }
}
export default LandingPage;
