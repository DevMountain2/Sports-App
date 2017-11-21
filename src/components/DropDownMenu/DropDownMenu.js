import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchNflHierarchy, searchMLBTeams, searchNBALeague} from '../../ducks/reducer.js'


class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nflteams: '',
      nbateams: '',
      mlbteams: '',
      selected: ''
  };

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

  componentDidMount(){
    this.props.searchNflHierarchy().then(result => {
      this.setState({nflteams: result.value})
    })
  }

  render() {
    let dropdown = null
    let options = null

    if (this.state.selected === "NFL"){
      options = this.state.nflteams.map(x => {
        return (<option key={x} value={x}> {x} </option>)
      })

      dropdown = (<select value="NFLTeams" onChange={(event) => {console.log(event.target.value)}}>
      {options}
      </select>)
    } else if (this.state.selected === "NBA"){
      dropdown = (<select value="MLBTeams" onChange={(event) => {console.log(event.target.value)}}>
      <option value="team"> Team </option>
      </select>)
    }
     else if (this.state.selected === "MLB"){
      console.log(typeof this.state.mlbteams)
      dropdown = (<select value="MLBTeams">
      <option value="team"> Team </option>
      </select>
    )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your Sport:
          <select value={this.state.value} onChange={(event) => {this.setState({selected: event.target.value})}}>
            <option value="NFL">Football</option>
            <option value="NBA">Basketball</option>
            <option value="MLB">Baseball</option>
          </select>
          {dropdown}
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function mapStateToProps(state){
  return {
    NFLHierarchy: state.NFLHierarchy
  }
}
export default connect(mapStateToProps,{searchNflHierarchy, searchMLBTeams, searchNBALeague})(DropDownMenu)
