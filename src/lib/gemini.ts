import { GoogleGenerativeAI } from '@google/generative-ai';
import { CodeAnalysis } from './types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeComplexity(code: string): Promise<CodeAnalysis> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze the following code and provide a structured analysis. You MUST follow this EXACT format:

Time Complexity
O(X) // where X is the complexity notation, e.g., O(1), O(n), O(n²), etc.
A brief explanation of why this is the time complexity.

Space Complexity
O(X) // where X is the complexity notation
A brief explanation of why this is the space complexity.

Optimizations
1. First optimization suggestion
2. Second optimization suggestion
3. Third optimization suggestion (if applicable)

CRITICAL REQUIREMENTS:
1. Always use big O notation (O(n), O(1), etc.)
2. Never use markdown or special formatting
3. Keep explanations clear and concise
4. Always specify both time and space complexity
5. Format must match exactly as shown above
6. Use standard notation: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!)

Here's the code to analyze:
${code}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response into structured data
    const sections = text.split('\n\n');
    
    // Helper function to extract complexity notation
    const extractComplexity = (text: string): string => {
      const match = text.match(/O\([^)]+\)/);
      return match ? match[0] : 'O(1)'; // Default to O(1) if no match found
    };

    // Helper function to extract explanation
    const extractExplanation = (section: string[]): string => {
      const explanationLines = section.slice(2);
      return explanationLines.join(' ').trim();
    };

    // Parse time complexity section
    const timeSection = sections[0].split('\n');
    const timeComplexity = extractComplexity(timeSection[1]);
    const timeExplanation = extractExplanation(timeSection);

    // Parse space complexity section
    const spaceSection = sections[1].split('\n');
    const spaceComplexity = extractComplexity(spaceSection[1]);
    const spaceExplanation = extractExplanation(spaceSection);

    // Parse optimizations
    const optimizationsSection = sections[2].split('\n').slice(1);
    const optimizations = optimizationsSection
      .filter(opt => opt.trim())
      .map(opt => opt.replace(/^\d+\.\s*/, '').trim());

    return {
      timeComplexity,
      timeExplanation,
      spaceComplexity,
      spaceExplanation,
      optimizations
    };
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw new Error('Failed to analyze code complexity');
  }
}