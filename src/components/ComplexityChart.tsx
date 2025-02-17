import React from 'react';

interface ComplexityChartProps {
  complexity: string;
  type: 'time' | 'space';
}

const complexityOrder = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(2ⁿ)',
  'O(n!)'
];

export function ComplexityChart({ complexity, type }: ComplexityChartProps) {
  // Normalize the complexity string for comparison
  const normalizeComplexity = (c: string): string => {
    return c.replace(/\s/g, '')
      .toLowerCase()
      .replace('²', '2')
      .replace('ⁿ', 'n');
  };

  const normalizedInput = normalizeComplexity(complexity);
  const index = complexityOrder.findIndex(c => 
    normalizeComplexity(c) === normalizedInput
  );
  
  // If we can't find an exact match, try to find the closest match
  const findClosestComplexity = () => {
    if (normalizedInput.includes('o(n')) {
      if (normalizedInput.includes('2') || normalizedInput.includes('²')) return 4; // O(n²)
      if (normalizedInput.includes('logn')) return 3; // O(n log n)
      return 2; // O(n)
    }
    if (normalizedInput.includes('o(1')) return 0; // O(1)
    if (normalizedInput.includes('o(logn')) return 1; // O(log n)
    if (normalizedInput.includes('2^n') || normalizedInput.includes('2ⁿ')) return 5; // O(2ⁿ)
    if (normalizedInput.includes('n!')) return 6; // O(n!)
    return 2; // Default to O(n) if no match found
  };

  const finalIndex = index === -1 ? findClosestComplexity() : index;
  const percentage = ((finalIndex + 1) / complexityOrder.length) * 100;
  const color = percentage > 75 ? 'red' : percentage > 50 ? 'yellow' : 'green';
  
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Efficient</span>
        <span>Complex</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            color === 'red' ? 'bg-red-500' : 
            color === 'yellow' ? 'bg-yellow-500' : 
            'bg-green-500'
          } transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-400">
        {type === 'time' ? 'Time' : 'Space'} Complexity: {complexity}
      </div>
    </div>
  );
}