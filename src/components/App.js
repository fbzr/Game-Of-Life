import React, { useState, useEffect, useCallback } from "react"
import Grid from "./game/Grid"
import { createGrid } from "./game/functions"
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

const size = 7

const App = () => {
  // set grid size
  const [gridSize, setGridSize] = useState(size)
  const [nextGrid, setNextGrid] = useState(createGrid(size, size))
  const [grid, setGrid] = useState(createGrid(size, size))
  // state that handles when the game is on or off
  const [isOn, setIsOn] = useState(false)
  const [myInterval, setMyInterval] = useState(null)

  useEffect(() => {
    if (isOn) {
      setInterval(updateGrid, 1000)
    }
  }, [isOn])

  // update nextGrid/buffer when grid changes
  useEffect(() => {
    console.log("update next")
    setNextGrid(
      grid.map((col, colIndex) => {
        return col.map((value, rowIndex) => {
          return updateCell(rowIndex, colIndex, value)
        })
      })
    )
  }, [grid])

  const updateGrid = () => {
    // set grid with buffer
    console.log("update grid")
    setGrid(nextGrid)
  }

  const updateCell = (row, col, currentValue) => {
    // update cells based on prev grid
    let liveNeighbors = 0
    neighbors.forEach(([addCol, addRow]) => {
      const neighborRow = row + addRow
      const neighborCol = col + addCol

      // check if indexes are valid in the grid
      if (
        neighborRow >= 0 &&
        neighborRow < grid.length &&
        neighborCol >= 0 &&
        neighborCol < grid[0].length
      ) {
        // add the value of the neighbor (0 or 1) to the count
        liveNeighbors += grid[neighborCol][neighborRow]
      }
    })

    if (liveNeighbors < 2 || liveNeighbors > 3) {
      // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      // Any live cell with more than three live neighbours dies, as if by overpopulation.
      return 0
    } else if (currentValue === 0 && liveNeighbors === 3) {
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      return 1
    }

    // Any live cell with two or three live neighbours lives on to the next generation.
    return currentValue
  }

  const handleStartStop = () => {
    // update isOn state

    let myInterval = setInterval(updateGrid, 200)
  }

  const generateRandomGrid = () => {
    setGrid(createGrid(gridSize, gridSize, true))
  }

  console.table(grid)
  console.table(nextGrid)
  return (
    <div>
      <Grid setData={setGrid} data={grid} rows={gridSize} columns={gridSize} />
      <button onClick={() => setIsOn(!isOn)}>{isOn ? "Stop" : "Start"}</button>

      <button onClick={generateRandomGrid}>Random</button>
      <button onClick={updateGrid}>next frame</button>
    </div>
  )
}

export default App
