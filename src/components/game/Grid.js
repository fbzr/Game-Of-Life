import React from "react"
// Questions:
// What data structure should I use?
// Why?

// Thoughts:
// Once grid is loaded, it does not change size. There is no insertion or removal
// Needs to access values in specific positions quickly

// Array does offer good performance for access value in specific indexes
// Problem: To update array in react state

const Grid = ({ data, setData }) => {
  const handleClickOnCell = (row, col) => {
    // receives Row and Col indexes/position
    // chenge state of specific cell based on its current value
    // create a copy of grid
    let updatedData = [...data]

    // update the copy with the new value of the cell clicked
    updatedData[row][col] = data[row][col] === 0 ? 1 : 0

    // update original grid with the updated copy
    setData(updatedData)
  }

  return (
    // create grid container/parent element
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${data[0].length}, 15px)`,
      }}
    >
      {data?.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          // create an element for each cell
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: 15,
              height: 15,
              backgroundColor: value ? "white" : "#333333",
              border: "solid 1px black",
              marginLeft: "-1px",
              marginBottom: "-1px",
            }}
            onClick={() => handleClickOnCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}

export default Grid
