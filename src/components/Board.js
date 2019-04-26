import React from 'react'

const Circle = (props) => {
    let color = "#006400";
    if(props.cell === 1){
        color = "yellow"
    } else if(props.cell === 2){
        color = "red"
    }
    let circleStyle = {
        backgroundColor: color,
        border: "green 1px solid",
        borderRadius: "40%",
        paddingTop: "90%",
        marginRight: "10%",
    }
    return(
        <div style={circleStyle}></div>
    )
}

const Cell = (props) => {
    // Cell styling
    let cellStyle = {
        height: 100,
        width: 100,
        //backgroundColor: "#0074B3", 
    }
    //console.log(props.cell)
    return (
        <div style={cellStyle} onClick={() => props.handleClick(props.row, props.col)}>
             <Circle cell={props.cell} />
        </div>
    )
}


const Row = (props) => {
    // Row styling
    let rowStyle = {
        display: "flex",
        position: 'relative',
        left: '22%',
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
        rows.push(<Row key={i} row={i} cells={props.cells[i]} handleClick={props.handleClick} />)
    }
    //console.log("Board component: ", props.cells)
    return (
        <div className="App">
            {rows}
        </div>
    )

}

export default Board;
