import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import CharacterList from './components/CharacterList'

class App extends Component {
  state = {
    characters: [],
    count: 0
  }

  componentDidMount() {
    console.log('Mounting!');
    this.getPeople();
  }

  deletePeople = name => {
    let characters = this.state.characters
    let idx = characters.findIndex(char => char.name === name)
    characters.splice(idx, 1)
  }

  getPeople = () => {
    console.log('getPeople()')
    let count = this.state.count

    fetch('http://galvanize-cors-proxy.herokuapp.com/https://swapi.co/api/people')
      .then(response => response.json())
      .then(data => {
        this.setState({characters: data.results, count: ++count})
        console.log('getPeople() result=', this.state)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Here's a list of students in Galvanize!
        </p>
        <CharacterList 
          deletePeople={this.state.deletePeople}
          characters={this.state.characters} 
          getPeople={this.state.getPeople}
          count={this.state.count} />
      </div>
    );
  }
}

export default App;
