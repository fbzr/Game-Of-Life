import React, { useState, useEffect } from "react"
import Grid from "./game/Grid"
import Rules from "./game/Rules"
import { createGrid, getNextGrid } from "./game/functions"
import "./App.css"

const App = () => {
  const [grid, setGrid] = useState(createGrid(25, 40))
  const [isOn, setIsOn] = useState(false) // handles when the game is on or off
  const [generationCount, setGenerationCount] = useState(0)
  const [cols, setCols] = useState(40)
  const [rows, setRows] = useState(25)

  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        updateGrid()
      }, 10)
      return () => {
        clearInterval(interval)
      }
    }
  }, [isOn])

  useEffect(() => {
    resetGrid()
  }, [cols, rows])

  const updateGrid = () => {
    setGrid(prev => getNextGrid(prev))
    setGenerationCount(prev => prev + 1)
  }

  const generateRandomGrid = () => {
    setGrid(prev => createGrid(prev.length, prev[0].length, true))
    setGenerationCount(0)
  }

  const resetGrid = () => {
    setGrid(createGrid(rows, cols))
    setGenerationCount(0)
  }

  const handleStartStop = () => {
    setIsOn(prev => !prev)
  }

  return (
    <div className="main-container">
      <div className="top-container">
        <div>
          <Grid
            setData={setGrid}
            resetGenerationCount={() => setGenerationCount(0)}
            data={grid}
          />
        </div>
        <Rules />
      </div>
      <h3 style={{ textAlign: "center" }}>Generation {generationCount}</h3>
      <div className="actions-container">
        <button onClick={handleStartStop}>{isOn ? "Stop" : "Start"}</button>
        <button onClick={resetGrid}>Reset</button>
        <button onClick={generateRandomGrid}>Random</button>
        <button onClick={updateGrid}>Next frame</button>
      </div>
    </div>
  )
}

export default App
