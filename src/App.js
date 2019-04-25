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
    this.state = { cells, player: false, winner: 0 } // Same as 'this.state = { cells: cells }'
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(row, col) {
    // If winner found do not execute below code or stop playing
    if (this.state.winner)
      return

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

    this.setState({ cells: temp, player: !this.state.player }, () => {
      if (this.checkVictory(newRow, col) > 0) {
        console.log("win")
        this.setState({ winner: this.state.player ? 2 : 1 })
      }

    })

  }


  findAvailableRow(col) {
    for (let i = 0; i < 6; i++) {
      if (this.state.cells[i][col] === 0) {
        return i
      }
    }
    return -1
  }

  // Vertical winning conditions
  checkVertical(row, col) {
    let cells = this.state.cells;
    let changePlayer = this.state.player ? 2 : 1

    if (row >= 3) {
      if (cells[row][col] === changePlayer &&
        cells[row - 1][col] === changePlayer &&
        cells[row - 2][col] === changePlayer &&
        cells[row - 3][col] === changePlayer) {
        return 1
      }
    }
    return 0
  }

  checkVictory(row, col) {
    return this.checkVertical(row, col)
  }

  render() {
    //console.log(this.state.cells);

    return (
      <div className="App">
        <h3>Connect 4</h3>
        {/* Showing next alternate turns Yellow and Red */}
        <h1>{this.state.winner > 0 ? this.state.winner === 1 ? "Black Wins" : "Red Wins" : this.state.player ? "Blacks Turn" : "Reds Turn"} </h1>
        <Board cells={this.state.cells} handleClick={this.handleClick} /><br />
      </div>
    );
  }
}

export default App;
