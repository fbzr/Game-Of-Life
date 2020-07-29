export const createGrid = (rows, cols, random = false) => {
  let grid = new Array(rows)
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols)
    for (let j = 0; j < cols; j++) {
      grid[i][j] = random ? Math.floor(Math.random() * 2) : 0
    }
  }

  return grid
}

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

const getUpdatedCellValue = (row, col, grid) => {
  const currentValue = grid[row][col]
  // update cells based on prev grid
  let liveNeighbors = 0
  neighbors.forEach(([addRow, addCol]) => {
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
      liveNeighbors += grid[neighborRow][neighborCol]
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

export const getNextGrid = grid => {
  return grid.map((row, rowIndex) =>
    row.map((value, colIndex) => getUpdatedCellValue(rowIndex, colIndex, grid))
  )
}
