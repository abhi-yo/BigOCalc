# Code Complexity Analyzer

A powerful tool that leverages Google's Generative AI to analyze and visualize the complexity of your algorithms. This tool provides detailed insights into time complexity, space complexity, and potential optimizations for your code.

## Features

- **Automated Complexity Analysis**: Analyzes both time and space complexity of your code
- **Visual Complexity Scale**: Provides an intuitive visualization of algorithm efficiency
- **Optimization Suggestions**: Offers practical recommendations for code improvement
- **Support for Multiple Languages**: Can analyze code written in various programming languages
- **Clear Explanations**: Provides detailed explanations for complexity assessments

## Prerequisites

- Node.js (v14 or higher)
- Google Cloud Platform account with Gemini API access
- API key for Google's Generative AI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abhi-yo/BigOCalc.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

## Usage

The analyzer can be used both programmatically and through the provided UI interface.

### API Usage

```typescript
import { analyzeComplexity } from './analyzer';

const code = `your code here`;
const analysis = await analyzeComplexity(code);

console.log(analysis);
```

### Response Format

The analyzer returns a structured analysis object:

```typescript
interface CodeAnalysis {
  timeComplexity: string;      // e.g., "O(n)"
  timeExplanation: string;     // Explanation of time complexity
  spaceComplexity: string;     // e.g., "O(1)"
  spaceExplanation: string;    // Explanation of space complexity
  optimizations: string[];     // Array of optimization suggestions
}
```

## Features in Detail

### Time Complexity Analysis
- Automatically detects and analyzes algorithmic patterns
- Provides Big O notation with detailed explanations
- Supports common complexity patterns: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!)

### Space Complexity Analysis
- Evaluates memory usage patterns
- Considers auxiliary space requirements
- Provides clear explanations of space utilization

### Optimization Suggestions
- Offers practical improvement recommendations
- Identifies potential performance bottlenecks
- Suggests alternative approaches when applicable

## Error Handling

The analyzer includes robust error handling:
- Validates input code before processing
- Provides clear error messages for invalid inputs
- Handles API communication errors gracefully

```typescript
try {
  const analysis = await analyzeComplexity(code);
} catch (error) {
  console.error('Error analyzing code:', error);
}
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Google Generative AI team for providing the Gemini API
- All contributors who have helped improve this tool

## Support

For support, please:
1. Check the existing issues in the repository
2. Create a new issue if your problem hasn't been reported
3. Provide detailed information about your environment and the problem


