import React, { useState, useEffect } from "react"

// Questions:
// What data structure should I use?
// Why?

// Thoughts:
// Once grid is loaded, it does not change size. There is no insertion or removal
// Needs to access values in specific positions quickly

// Array does offer good performance for access value in specific indexes
// Problem: To update array in react state

const Grid = ({ columns, rows, isOn, interval = 1000 }) => {
  // create states for current grid and next grid
  const [grid, setGrid] = useState(null)
  const [nextGrid, setNextGrid] = useState(null)

  useEffect(() => {
    if (!grid && !nextGrid) {
      // create initial state
      // initialize all cells with 0
      // set length of array when it is created
      const initialGrid = Array(rows)
      for (let i = 0; i < rows; i++) {
        initialGrid[i] = Array(columns).fill(0)
      }

      setGrid(initialGrid)
      setNextGrid(initialGrid)
    }
  }, [])

  useEffect(() => {
    let myInterval = null
    if (isOn) {
      // setTimeout here
      myInterval = setInterval(updateGrid, interval)
    }
    return () => clearInterval(myInterval)
  }, [isOn])

  const updateCells = (row, col) => {
    const neighbors = [
      [0, 1],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
    ]
  }

  const updateGrid = () => {
    console.log("grid changed")
  }

  // create another matrix make the changes to the next state based on the current state
  //   const [nextGrid, setNextGrid] = useState(null)

  const handleClickOnCell = (row, col) => {
    // receives Row and Col indexes/position
    // chenge state of specific cell based on its current value
    // create a copy of grid
    let updatedGrid = [...grid]

    // update the copy with the new value of the cell clicked
    updatedGrid[row][col] = grid[row][col] === 0 ? 1 : 0

    // update original grid with the updated copy
    setGrid(updatedGrid)
  }

  return (
    // create grid container/parent element
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 15px)`,
      }}
    >
      {grid?.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          // create an element for each cell
          <div
            key={`${rowIndex}${colIndex}`}
            style={{
              width: 15,
              height: 15,
              backgroundColor: grid[rowIndex][colIndex] ? "white" : "darkgrey",
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
