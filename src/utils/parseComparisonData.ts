/**
 * Utility function to parse markdown tables from AI responses into comparison data
 */

interface ComparisonData {
  products: string[];
  specs: {
    name: string;
    values: string[];
  }[];
}

/**
 * Parses markdown content to extract comparison table data
 * @param content - Markdown content from AI response
 * @returns Structured comparison data or null if no valid table found
 */
export function parseComparisonData(content: string): ComparisonData | null {
  // Check if content contains a markdown table
  if (!content.includes('|')) {
    return null;
  }

  try {
    // Extract table rows (each line containing '|')
    const tableLines = content
      .split('\n')
      .filter(line => line.includes('|') && line.trim() !== '');
    
    if (tableLines.length < 3) { // Need at least header, separator, and one data row
      return null;
    }

    // Process header row to get product names
    const headerRow = tableLines[0];
    const headerCells = headerRow
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');
    
    // First cell is usually empty or contains "Specification"
    const products = headerCells.slice(1);
    
    if (products.length < 1) {
      return null;
    }

    // Skip the separator row (index 1)
    // Process data rows to get specifications
    const specs = [];
    for (let i = 2; i < tableLines.length; i++) {
      const row = tableLines[i];
      const cells = row
        .split('|')
        .map(cell => cell.trim())
        .filter(cell => cell !== '');
      
      if (cells.length >= products.length + 1) {
        const specName = cells[0];
        const values = cells.slice(1, products.length + 1);
        
        specs.push({
          name: specName,
          values: values
        });
      }
    }

    if (specs.length === 0) {
      return null;
    }

    return {
      products,
      specs
    };
  } catch (error) {
    console.error('Error parsing comparison data:', error);
    return null;
  }
}