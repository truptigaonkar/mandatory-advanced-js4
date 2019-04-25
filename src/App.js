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
    
    // Adding cells to array without altering its original content
    let temp = []
    for (let i = 0; i < 6; i++) {
      let cellsVar = this.state.cells[i]
      temp.push(cellsVar.slice()) //Slice is used not to alter the original contents
    }
    let newRow = this.findAvailableRow(col) // Getting new row from each column 
    
    console.log(newRow);
    temp[newRow][col] = this.state.player ? 1 : 2
    this.setState({ cells: temp, player: !this.state.player })
  }

  
  findAvailableRow(col) {
    for (let i = 0; i < 6; i++) {
      if (this.state.cells[i][col] === 0) {
        return i
      }
    }
    return -1
  }

  render() {
    //console.log(this.state.cells);
    
    return (
      <div className="App">
        <h3>Connect 4</h3>
        {/* Showing next alternate turns Yellow and Red */}
        <h1>{this.state.player ? "Next YELLOW Turn" : "Next RED Turn"} </h1> 
        <Board cells={this.state.cells} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
