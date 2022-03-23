class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  // vertex and node are the same thing
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let item of vertexArray) {
      this.nodes.add(item);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex

  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex

  removeEdge(v1, v2) {
    const filteredArray = [...v1.adjacent].filter(node => node.value !== v2.value)
    const filteredArray2 = [...v2.adjacent].filter(node => node.value !== v1.value)

    v1.adjacent = new Set(filteredArray)
    v2.adjacent = new Set(filteredArray2)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  
  removeVertex(vertex) {
    this.nodes.delete(vertex)
    const filteredArray = [...this.nodes].map(node => {
      node.adjacent = new Set([...node.adjacent].filter(n => n.value !== vertex.value))
      return node
    })

    this.nodes = new Set(filteredArray)
  }

  // better version
  removeVertex2(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const nodeArray = [];
    const toVisitStack = [start];
    const seen = new Set([start]);

    while (toVisitStack.length > 0) {
      const currentNode = toVisitStack.pop()
      nodeArray.push(currentNode.value)

      for (let linkedNode of currentNode.adjacent) {
        if (!seen.has(linkedNode)) {
          toVisitStack.push(linkedNode)
          seen.add(linkedNode)
        }
      }
    }
    return nodeArray
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) { 
    const result = [];
    const queue = [start];
    const seen = new Set([start]);

    while (queue.length > 0) {
      const currentNode = queue.shift()
      result.push(currentNode.value)

      for (let linkedNode of currentNode.adjacent) {
        if (!seen.has(linkedNode)) {
          queue.push(linkedNode)
          seen.add(linkedNode)
        }
      }
    }
    return result
  }

  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    const queue = [start];
    const visited = new Set();
    const predecessors = {};
    const path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

let graph = new Graph();
let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
let d = new Node("D");
graph.addVertices([a, b, c, d]);
graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, d);
graph.addEdge(c, d);

// graph.removeEdge(a, b)
module.exports = { Graph, Node }