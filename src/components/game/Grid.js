import React, { useState, useEffect, useCallback } from "react"
import { createGrid } from "./functions"
// Questions:
// What data structure should I use?
// Why?

// Thoughts:
// Once grid is loaded, it does not change size. There is no insertion or removal
// Needs to access values in specific positions quickly

// Array does offer good performance for access value in specific indexes
// Problem: To update array in react state

const Grid = ({ data, setData }) => {
  //   const [nextGrid, setNextGrid] = useState(createGrid(columns, rows, true))

  //   useEffect(() => {
  //     if (!grid && !nextGrid) {
  //       // create initial state
  //       // initialize all cells with 0
  //       // set length of array when it is created
  //       const initialGrid = Array(rows)
  //       for (let i = 0; i < rows; i++) {
  //         initialGrid[i] = Array(columns).fill(0)
  //       }

  //       setGrid(initialGrid)
  //       setNextGrid(initialGrid)
  //     }
  //   }, [])

  // create another matrix make the changes to the next state based on the current state
  //   const [nextGrid, setNextGrid] = useState(null)

  const handleClickOnCell = (row, col) => {
    // receives Row and Col indexes/position
    // chenge state of specific cell based on its current value
    // create a copy of grid
    let updatedData = [...data]

    // update the copy with the new value of the cell clicked
    updatedData[col][row] = data[col][row] === 0 ? 1 : 0

    // update original grid with the updated copy
    setData(updatedData)
  }

  return (
    // create grid container/parent element
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${data.length}, 15px)`,
      }}
    >
      {data?.map((col, colIndex) =>
        col.map((value, rowIndex) => (
          // create an element for each cell
          <div
            key={`${colIndex}-${rowIndex}`}
            style={{
              width: 15,
              height: 15,
              backgroundColor: value ? "white" : "#333333",
              border: "solid 1px black",
            }}
            onClick={() => handleClickOnCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}

export default Grid
