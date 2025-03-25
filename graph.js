export default class UGraph {
  /**
   * Map of vertices to a set of their adjacent vertices
   * @type Map<Number, Set<Number>>
   */
  #edgeList = new Map();

  /**
   * Construct a new graph from an array of edges
   * @param {Array<Array<Number>} array Array of edges to add to the graph
   */
  constructor(array = []) {
    array.forEach(([from, to]) => this.addEdge(from, to));
  }

  /**
   * Add an edge to the graph
   * @param {Number} v1 First vertex
   * @param {Number} v2 Second vertex
   */
  addEdge(v1, v2) {
    // create entry for v1 and v2 if they don't exist
    if (!this.#edgeList.has(v1)) {
      this.#edgeList.set(v1, new Set());
    }
    if (!this.#edgeList.has(v2)) {
      this.#edgeList.set(v2, new Set());
    }

    // add edges
    this.#edgeList.get(v1).add(v2);
    this.#edgeList.get(v2).add(v1);
  }

  /**
   * Find the shortest path between two vertices
   * @param {Number} from Start vertex
   * @param {Number} to End vertex
   * @returns {Array<Array<Number>>} Array of edges that form the shortest path
   */
  shortestPath(from, to) {
    /**
     * Set of visited vertices
     * @type Set<Number>
     */
    const visited = new Set();
    /**
     * Queue of paths to explore
     * @type Array<Array<Number>>
     */
    const queue = [[from]];

    visited.add(from);

    while (queue.length > 0) {
      /**
       * Current path being explored from the queue
       * @type Array<Number>
       */
      const path = queue.shift();
      /**
       * Current vertex being explored from the end of the path
       * @type Number
       */
      const current = path[path.length - 1];

      // if destination has been reached, return the path
      if (current === to) {
        return path;
      }

      // add adjacent vertices to the queue
      this.#edgeList.get(current).forEach((vertex) => {
        if (!visited.has(vertex)) {
          visited.add(vertex);
          queue.push([...path, vertex]);
        }
      });
    }
  }
}
