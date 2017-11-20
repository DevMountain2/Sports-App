import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your Sport:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="NFL">Football</option>
            <option value="NBA">Basketball</option>
            <option value="Baseball">Baseball</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default DropDownMenu
