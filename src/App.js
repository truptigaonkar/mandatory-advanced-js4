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

  // Horizontal winning conditions
  checkHorizontal(row, col) {
    let cells = this.state.cells;
    let i = 6;
    let changePlayer = this.state.player ? 2 : 1;

    while (i >= 3) {
      if (cells[row][i] === changePlayer && 
        cells[row][i - 1] === changePlayer && 
        cells[row][i - 2] === changePlayer && 
        cells[row][i - 3] === changePlayer) {
        return 1
      }
      i--
    }
    return 0
  }

  // Diagonal Right winning conditions
  checkDiagonalRight(row, col) {
    let cell = this.state.cells
    let changePlayer = this.state.player ? 2 : 1
    while (row < 5 && col < 6) {
      row++
      col++
    }

    while (row >= 3 && col >= 3) {
      if (cell[row][col] === changePlayer && 
        cell[row - 1][col - 1] === changePlayer && 
        cell[row - 2][col - 2] === changePlayer && 
        cell[row - 3][col - 3] === changePlayer) {
        return 1
      }
      row--
      col--
    }
    return 0
  }

  checkVictory(row, col) {
    return this.checkVertical(row, col) || this.checkHorizontal(row, col) || this.checkDiagonalRight(row, col) 
  }

  render() {
    //console.log(this.state.cells);

    return (
      <div className="App">
        <h3>Connect 4</h3>
        {/* Showing next alternate turns Yellow and Red */}
        <h2>{this.state.winner > 0 ? this.state.winner === 1 ? "Yellow Wins! Game over. Please start a new game." : "Red Wins! Game over. Please start a new game." : this.state.player ? "Yellows Turn" : "Reds Turn"} </h2>
        <Board cells={this.state.cells} handleClick={this.handleClick} /><br />
      </div>
    );
  }
}

export default App;
