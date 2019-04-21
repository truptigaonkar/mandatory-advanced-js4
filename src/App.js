import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    // Dynamically add cells to table rows & fill with value=0 from array positions 0 to 6
    let cells = []
    for (let i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0))
    }
    this.state = { cells } // Same as 'this.state = { cells: cells }'
  }

  render() {
    console.log(this.state.cells);
    return (
      <div className="App">
        <h3>Connect 4</h3>
        {this.state.cells}
      </div>
    );
  }
}

export default App;
