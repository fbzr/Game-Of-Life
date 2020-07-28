import React, { useState } from "react"
import Grid from "../components/game/Grid"

const App = () => {
  // set grid size
  const [gridSize, setGridSize] = useState(25)
  // state that handles when the game is on or off
  const [isOn, setIsOn] = useState(false)

  const handleStartStop = () => {
    // update isOn state
    setIsOn(!isOn)
  }

  return (
    <div>
      <Grid isOn={isOn} rows={25} columns={25} />
      <button onClick={handleStartStop}>{isOn ? "Stop" : "Start"}</button>
    </div>
  )
}

export default App
