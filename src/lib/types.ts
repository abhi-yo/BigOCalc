export interface CodeAnalysis {
  timeComplexity: string;
  timeExplanation: string;
  spaceComplexity: string;
  spaceExplanation: string;
  optimizations: string[];
}

export interface CodeSnippet {
  name: string;
  description: string;
  code: string;
  complexity: {
    time: string;
    space: string;
  };
}

export const commonSnippets: CodeSnippet[] = [
  {
    name: "Binary Search",
    description: "Efficient search algorithm for sorted arrays",
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    complexity: {
      time: "O(log n)",
      space: "O(1)"
    }
  },
  {
    name: "Quick Sort",
    description: "Fast, in-place sorting algorithm",
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    complexity: {
      time: "O(n log n)",
      space: "O(n)"
    }
  },
  {
    name: "Breadth-First Search",
    description: "Graph traversal algorithm",
    code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex);
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    complexity: {
      time: "O(V + E)",
      space: "O(V)"
    }
  }
];