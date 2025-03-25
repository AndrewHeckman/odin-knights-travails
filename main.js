import UGraph from "./graph.js";

const SIZE = 8;
const Board = new UGraph(makeBoard(SIZE));
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);

/**
 * Make an array of edges representing a knight's movement on a board of size `size`
 * @param {Number} size Size of the board
 * @returns {Array<Array<Number>>} Array of edges for knight's movement
 */
function makeBoard(size) {
  const edges = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const moves = [
        [i + 1, j + 2],
        [i + 1, j - 2],
        [i - 1, j + 2],
        [i - 1, j - 2],
        [i + 2, j + 1],
        [i + 2, j - 1],
        [i - 2, j + 1],
        [i - 2, j - 1],
      ];
      moves.forEach(([x, y]) => {
        if (x >= 0 && x < size && y >= 0 && y < size) {
          edges.push([i * size + j, x * size + y]);
        }
      });
    }
  }
  return edges;
}

/**
 * Finds and prints the shortest path between two coordinates on a board
 * @param {Array<Number} from Coordinates of the starting position
 * @param {Array<Number>} to Coordinates of the ending position
 */
function knightMoves(from, to) {
  from = coordsToIndex(from);
  to = coordsToIndex(to);
  const path = Board.shortestPath(from, to);

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((vertex) => {
    console.log(indexToCoords(vertex));
  });
}

/**
 * Convert an index to coordinates
 * @param {Number} index Index to be converted to coordinates
 * @returns {Array<Number>} Coordinates of the index
 */
function indexToCoords(index) {
  return [Math.floor(index / SIZE), index % SIZE];
}

/**
 * Convert coordinates to an index
 * @param {Array<Number>} array Coordinates to be converted to an index
 * @returns {Number} Index of the coordinates
 */
function coordsToIndex([x, y]) {
  return x * SIZE + y;
}
