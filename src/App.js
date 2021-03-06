import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

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

  // Handling click event
  handleClick(row, col) {
    console.log("row: " + row + " | col: " + col, this.state.cells[row][col])
		if (!this.state.cells[row][col] && !this.state.winner) {
			var temp = [],
				newRow = this.findAvailableRow(col)
			for (let i = this.state.cells.length - 1; i >= 0; i--) {
			// for (let i = 0; i < 6; i++) {
				temp.unshift( this.state.cells[i].slice(0) )
			}
			temp[newRow][col] = this.state.player ? 1 : 2
			this.setState({cells: temp, player: !this.state.player}, () => {
				// console.log('updated state:', this.state)
				if (this.checkVictory(newRow, col) > 0) {
					console.log("win")
					this.setState({winner: this.state.player ? 2 : 1})
				}
			});
		}
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

  // Diagonal Left winning conditions
  checkDiagonalLeft(row, col) {
    let cell = this.state.cells
    let changePlayer = this.state.player ? 2 : 1

    while (row < 5 && col > 0) {
      row++
      col--
    }

    while (row >= 3 && col <= 3) {
      if (cell[row][col] === changePlayer &&
        cell[row - 1][col + 1] === changePlayer &&
        cell[row - 2][col + 2] === changePlayer &&
        cell[row - 3][col + 3] === changePlayer) {
        return 1
      }
      row--
      col++
    }
    return 0
  }

  checkVictory(row, col) {
    return this.checkVertical(row, col) || this.checkHorizontal(row, col) || this.checkDiagonalRight(row, col) || this.checkDiagonalLeft(row, col)
  }

  // Reseting and restarting game
  handleReset() {
    let cells = [];
    for (let i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0));
    }
    this.setState({ cells, player: false, winner: 0 }) // Helping to reset the game from scratch
  }

  render() {
    //console.log(this.state.cells);
    return (
      <div className="App">
        
        <div className="form">
          <Card body inverse color="success">
            <CardHeader><h2 style={{ color: '#336E7B' }}>CONNECT 4</h2>
              <div>
                <h4>{this.state.winner > 0 ? this.state.winner === 1 ? <div className="yellowWinner"><i className="trophyIcon fa fa-trophy" style={{ fontSize: '70px', color: '#D4AF37' }}></i></div> : <div className="redWinner"><i className="trophyIcon fa fa-trophy" style={{ fontSize: '70px', color: '#D4AF37' }}></i></div> : this.state.player ? <div className="yellowTurn"></div> : <div className="redTurn"></div>} </h4>
              </div>
            </CardHeader>
            <CardBody>
              <Board cells={this.state.cells} handleClick={this.handleClick} />
            </CardBody>
            <CardFooter>
              <Button color="success" size="lg" active onClick={this.handleReset.bind(this)}><i className="fa fa-refresh fa-spin"></i></Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    );
  }
}

export default App;
