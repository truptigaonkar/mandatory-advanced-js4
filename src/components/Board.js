import React from 'react'

const Cell = (props) => {
    // Cell styling
    let cellStyle = {
        height: 50,
        width: 50,
        backgroundColor: "blue",
        border: "black 1px solid"
    }
    console.log(props.cell)
    return (
        <div style={cellStyle}>
            {/* {props.cell} */}
        </div>
    )
}


const Row = (props) => {
    // Row styling
    let rowStyle = {
        display: "flex"
    }

    // Dynamically add cells to array
    let cells = []
    for (let i = 0; i < 7; i++) {
        cells.push(<Cell key={i} cell={props.cells[i]} row={props.row} col={i} handleClick={props.handleClick} />)
    }
    return (
        <div style={rowStyle}>
            {cells}
        </div>
    )
}

const Board = (props) => {

    // Dynamically add rows to array
    let rows = [];
    for (let i = 5; i >= 0; i--) {
        rows.push(<Row key={i} row={i} cells={props.cells[i]} />)
    }
    console.log("Board component: ", props.cells)
    return (
        <div>
            <h3>Board</h3>
            {rows}
        </div>
    )

}

export default Board;
