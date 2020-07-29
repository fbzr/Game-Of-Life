import React, { useState, useEffect, useCallback } from "react"
import Grid from "./game/Grid"
import { createGrid, getNextGrid } from "./game/functions"

const initialCols = 40
const initialRows = 25

const App = () => {
  const [grid, setGrid] = useState(createGrid(initialRows, initialCols))
  const [isOn, setIsOn] = useState(false) // handles when the game is on or off
  const [generationCount, setGenerationCount] = useState(0)

  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        updateGrid()
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [isOn])

  const updateGrid = () => {
    setGrid(prev => getNextGrid(prev))
    setGenerationCount(prev => prev + 1)
  }

  const generateRandomGrid = () => {
    setGrid(prev => createGrid(prev.length, prev[0].length, true))
    setGenerationCount(0)
  }

  return (
    <div>
      <Grid setData={setGrid} data={grid} />
      <button onClick={() => setIsOn(!isOn)}>{isOn ? "Stop" : "Start"}</button>

      <p>Generation {generationCount}</p>
      <button onClick={generateRandomGrid}>Random</button>
      <button onClick={updateGrid}>next frame</button>
    </div>
  )
}

export default App
