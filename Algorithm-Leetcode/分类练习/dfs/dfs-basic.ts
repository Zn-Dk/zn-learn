

const graph: Map<number, number[]> = new Map();
graph.set(1, [2, 3]);
graph.set(2, [4, 5]);
graph.set(3, [6, 7]);
graph.set(4, []);
graph.set(5, []);
graph.set(6, []);
graph.set(7, []);

const dfs = (n: number, graph: Map<number, number[]>, visited: Set<number>) => {
  if (visited.has(n)) return;
  visited.add(n);
  const neighbors = graph.get(n) ?? [];
  for (const neighbor of neighbors) {
    console.log(neighbor)
    dfs(neighbor, graph, visited)
  }
}

dfs(1, graph, new Set());