import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { InputField } from '@/types/calculator';
import Input from '@/components/Input';
import VariableChip from '@/components/VariableChip';
import FormulaDisplay from '@/components/FormulaDisplay';
import Colors from '@/constants/colors';

// Define variable colors for consistency
const variableColors = [
  '#4A6FA5', // Primary blue
  '#E57373', // Red
  '#81C784', // Green
  '#FFD54F', // Yellow
  '#64B5F6', // Light blue
  '#BA68C8', // Purple
  '#4DB6AC', // Teal
  '#FF8A65', // Orange
];

interface FormulaInputProps {
  inputs: InputField[];
  formula: string;
  onChangeFormula: (text: string) => void;
  error?: string;
}

export default function FormulaInput({
  inputs,
  formula,
  onChangeFormula,
  error,
}: FormulaInputProps) {
  // Create a mapping of variable names to colors
  const variableColorMap = inputs.reduce((map, input, index) => {
    if (input.name) {
      map[input.name] = variableColors[index % variableColors.length];
    }
    return map;
  }, {} as Record<string, string>);

  const handleVariablePress = (variableName: string) => {
    // Insert the variable name at the cursor position or at the end
    onChangeFormula(formula ? `${formula} ${variableName} ` : `${variableName} `);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.variablesTitle}>Available Variables:</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.variablesContainer}
      >
        {inputs.map((input, index) => (
          input.name ? (
            <VariableChip
              key={`var-${input.id}`}
              name={input.name}
              id={input.name} // Use name instead of ID for formula
              color={variableColorMap[input.name]}
              onPress={handleVariablePress}
            />
          ) : null
        ))}
      </ScrollView>
      
      <Text style={styles.operatorsTitle}>Operators:</Text>
      <View style={styles.operatorsContainer}>
        {['+', '-', '*', '/', '(', ')', '^'].map((operator) => (
          <VariableChip
            key={`operator-${operator}`}
            name={operator}
            id={operator}
            onPress={handleVariablePress}
          />
        ))}
      </View>
      
      <Text style={styles.functionsTitle}>Functions:</Text>
      <View style={styles.functionsContainer}>
        {['sin', 'cos', 'tan', 'sqrt', 'pow', 'abs', 'max', 'min'].map((func) => (
          <VariableChip
            key={`function-${func}`}
            name={func}
            id={func}
            onPress={handleVariablePress}
          />
        ))}
      </View>
      
      <Input
        label="Formula"
        value={formula}
        onChangeText={onChangeFormula}
        placeholder="e.g., Weight / (Height * Height)"
        error={error}
      />
      
      {formula ? (
        <View style={styles.formulaPreviewContainer}>
          <Text style={styles.formulaPreviewTitle}>Formula Preview:</Text>
          <FormulaDisplay 
            formula={formula} 
            variableColors={variableColorMap} 
          />
        </View>
      ) : null}
      
      <Text style={styles.formulaHelp}>
        Example: For BMI, if you have Weight and Height variables, use: Weight / (Height * Height)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  variablesTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  variablesContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingVertical: 8,
  },
  operatorsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  operatorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  functionsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  functionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  formulaPreviewContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formulaPreviewTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  formulaHelp: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 8,
    fontStyle: 'italic',
  },
});