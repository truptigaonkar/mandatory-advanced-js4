import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'

class App extends Component {

  constructor(props) {
    super(props)

    // Dynamically add cells to table rows & fill with value=0 from array positions 0 to 6
    let cells = []
    for (let i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0))
    }
    this.state = { cells } // Same as 'this.state = { cells: cells }'
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(row, col) {
    // Logging row and column when clicked  
    console.log("row: " + row + " | col: " + col)
    
    // for (let i = 0; i < 6; i++) {
    //   temp.push(this.state.cells[i].slice())
    // }
    // var newRow = this.findAvailableRow(col)
    // temp[newRow][col] = this.state.player ? 1 : 2
    // this.setState({ cells: temp, player: !this.state.player }, () => {
    //   if (this.checkVictory(newRow, col) > 0) {
    //     console.log("win")
    //     this.setState({ winner: this.state.player ? 2 : 1 })
    //   }
    // })
  }

  render() {
    console.log(this.state.cells);
    return (
      <div className="App">
        <h3>Connect 4</h3>
        
        <Board cells={this.state.cells} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
