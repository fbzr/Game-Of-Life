export const createGrid = (cols, rows, random = false) => {
  let grid = new Array(cols)
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random ? Math.floor(Math.random() * 2) : 0
    }
  }

  return grid
}
