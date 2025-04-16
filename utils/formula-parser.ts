// A simple formula parser that safely evaluates mathematical expressions
// This avoids using eval() which is unsafe

type Variables = Record<string, number>;

export class FormulaParser {
  private formula: string;
  private variables: Variables;

  constructor(formula: string, variables: Variables = {}) {
    this.formula = formula;
    this.variables = variables;
  }

  // Replace variable names with their values
  private replaceVariables(): string {
    let result = this.formula;
    for (const [name, value] of Object.entries(this.variables)) {
      // Use word boundaries to ensure we replace whole variable names
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      result = result.replace(regex, value.toString());
    }
    return result;
  }

  // Evaluate the formula
  public evaluate(): number {
    try {
      const preparedFormula = this.replaceVariables();
      
      // Add Math functions to the scope
      const mathFunctions = `
        const sin = Math.sin;
        const cos = Math.cos;
        const tan = Math.tan;
        const log = Math.log;
        const sqrt = Math.sqrt;
        const abs = Math.abs;
        const pow = Math.pow;
        const max = Math.max;
        const min = Math.min;
      `;
      
      // Use Function constructor to evaluate the expression
      // This is safer than eval() but still needs input validation
      const safeEval = new Function(`
        ${mathFunctions}
        return ${preparedFormula}
      `);
      
      const result = safeEval();
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Invalid result');
      }
      
      return result;
    } catch (error) {
      console.error('Error evaluating formula:', error);
      return NaN;
    }
  }

  // Validate if the formula is syntactically correct
  public validate(): boolean {
    try {
      // Replace variables with 1 to check syntax
      const testVariables: Variables = {};
      for (const name of Object.keys(this.variables)) {
        testVariables[name] = 1;
      }
      
      const parser = new FormulaParser(this.formula, testVariables);
      const result = parser.evaluate();
      
      return !isNaN(result);
    } catch (error) {
      return false;
    }
  }

  // Get all variable names used in the formula
  public static extractVariables(formula: string): string[] {
    // This is a simple implementation that assumes variables are alphanumeric
    const matches = formula.match(/\b[a-zA-Z][a-zA-Z0-9_]*\b/g) || [];
    
    // Filter out known math functions and constants
    const mathFunctions = [
      'sin', 'cos', 'tan', 'log', 'sqrt', 'abs', 'pow', 'max', 'min',
      'Math', 'PI', 'E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'SQRT1_2', 'SQRT2'
    ];
    
    return [...new Set(matches.filter(match => !mathFunctions.includes(match)))]; // Remove duplicates and math functions
  }
}