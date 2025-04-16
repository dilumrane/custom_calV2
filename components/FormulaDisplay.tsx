import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';

interface FormulaDisplayProps {
  formula: string;
  variableColors: Record<string, string>;
}

export default function FormulaDisplay({ formula, variableColors }: FormulaDisplayProps) {
  // Split the formula into tokens (variables, operators, functions, etc.)
  const tokenize = (text: string) => {
    // This regex splits by spaces but keeps parentheses and operators as separate tokens
    return text.split(/(\s+|\(|\)|\+|\-|\*|\/|\^)/).filter(token => token.trim() !== '');
  };

  const tokens = tokenize(formula);

  return (
    <View style={styles.container}>
      <Text style={styles.formula}>
        {tokens.map((token, index) => {
          // Check if token is a variable (exists in our color map)
          if (variableColors[token]) {
            return (
              <Text 
                key={`token-${index}`} 
                style={[styles.variable, { color: variableColors[token] }]}
              >
                {token}
              </Text>
            );
          }
          
          // Check if token is a function
          if (['sin', 'cos', 'tan', 'sqrt', 'pow', 'abs', 'max', 'min'].includes(token)) {
            return (
              <Text key={`token-${index}`} style={styles.function}>
                {token}
              </Text>
            );
          }
          
          // Check if token is an operator
          if (['+', '-', '*', '/', '(', ')', '^'].includes(token)) {
            return (
              <Text key={`token-${index}`} style={styles.operator}>
                {token}
              </Text>
            );
          }
          
          // Default styling for other tokens
          return (
            <Text key={`token-${index}`} style={styles.text}>
              {token}
            </Text>
          );
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
  },
  formula: {
    fontSize: 16,
    lineHeight: 24,
  },
  text: {
    color: Colors.text,
  },
  variable: {
    fontWeight: '600',
  },
  function: {
    color: '#9C27B0', // Purple for functions
    fontWeight: '500',
  },
  operator: {
    color: '#FF5722', // Orange for operators
    fontWeight: '500',
  },
});