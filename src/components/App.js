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
  const [speed, setSpeed] = useState(252)

  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        updateGrid()
      }, speed)
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
    setIsOn(false)
    setGenerationCount(0)
  }

  const handleStartStop = () => {
    setIsOn(prev => !prev)
  }

  const handleChangeSpeed = e => {
    setSpeed(e.target.value * -1)
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
          <input
            disabled={isOn}
            onChange={handleChangeSpeed}
            type="range"
            min="-500"
            max="-5"
            value={speed * -1}
            className="slider"
            id="speedSlider"
          ></input>
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
