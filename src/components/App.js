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
  }, [isOn, speed])

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

  const handleGridSizeChange = e => {
    const values = e.target.value.split("x")
    setRows(parseInt(values[0]))
    setCols(parseInt(values[1]))
  }

  return (
    <div className="main-container">
      <div>
        <p>
          Game of Life is a cellular automaton invented by mathematician John
          Horton Conway in 1970. The evolution of the game is determined by its
          initial state, requiring no further input.
        </p>
      </div>
      <div className="top-container">
        <div>
          <Grid
            setData={setGrid}
            resetGenerationCount={() => setGenerationCount(0)}
            data={grid}
          />
          <input
            onChange={handleChangeSpeed}
            type="range"
            min="-500"
            max="-5"
            value={speed * -1}
            className="slider"
            id="speedSlider"
          ></input>
          <label for="grid-sizes">Grid size (rows X cols): </label>
          <select
            onChange={handleGridSizeChange}
            name="grid-sizes"
            id="grid-sizes"
          >
            <option value="25x25">25x25</option>
            <option selected value="25x40">
              25x40
            </option>
            <option value="40x25">40x25</option>
            <option value="40x40">40x40</option>
          </select>
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
