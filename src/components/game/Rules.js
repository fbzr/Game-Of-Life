import React from "react"

const Rules = () => {
  return (
    <div>
      <h2>Rules</h2>
      <ul>
        <li>Any live cell with two or three live neighbours survives.</li>
        <li>Any dead cell with three live neighbours becomes a live cell.</li>
        <li>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </li>
      </ul>
    </div>
  )
}

export default Rules
