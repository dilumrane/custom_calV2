import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, SafeAreaView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Edit2, Trash2 } from 'lucide-react-native';
import { useCalculatorStore } from '@/store/calculator-store';
import { FormulaParser } from '@/utils/formula-parser';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AdBanner from '@/components/AdBanner';
import Colors from '@/constants/colors';

export default function CalculatorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const { getCalculator, deleteCalculator } = useCalculatorStore();
  const calculator = getCalculator(id);
  
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  
  useEffect(() => {
    if (!calculator) {
      Alert.alert('Error', 'Calculator not found', [
        { text: 'OK', onPress: () => router.back() }
      ]);
      return;
    }
    
    // Initialize input values
    const initialValues: Record<string, string> = {};
    calculator.inputs.forEach(input => {
      initialValues[input.id] = input.defaultValue || '';
    });
    setInputValues(initialValues);
  }, [calculator, router]);
  
  if (!calculator) {
    return null;
  }
  
  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [id]: value,
    }));
    // Reset result when inputs change
    setResult(null);
  };
  
  const handleCalculate = () => {
    // Check if all inputs have values
    const missingInputs = calculator.inputs.filter(input => !inputValues[input.id]);
    if (missingInputs.length > 0) {
      Alert.alert('Missing Values', 'Please fill in all input fields.');
      return;
    }
    
    setCalculating(true);
    
    try {
      // Convert string values to numbers
      const variables: Record<string, number> = {};
      calculator.inputs.forEach(input => {
        // Use input name as the variable key instead of ID
        variables[input.name] = parseFloat(inputValues[input.id]);
        if (isNaN(variables[input.name])) {
          throw new Error(`Invalid number for ${input.name}`);
        }
      });
      
      // Calculate result
      const parser = new FormulaParser(calculator.formula, variables);
      const calculatedResult = parser.evaluate();
      
      if (isNaN(calculatedResult)) {
        throw new Error('Calculation resulted in an invalid number');
      }
      
      setResult(calculatedResult);
    } catch (error) {
      Alert.alert('Calculation Error', error instanceof Error ? error.message : 'An error occurred');
      setResult(null);
    } finally {
      setCalculating(false);
    }
  };
  
  const handleEdit = () => {
    router.push(`/calculator/edit/${id}`);
  };
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Calculator',
      'Are you sure you want to delete this calculator?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteCalculator(id);
            router.replace('/');
          }
        }
      ]
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: calculator.name,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable onPress={handleEdit} style={styles.headerButton}>
                <Edit2 size={20} color={Colors.primary} />
              </Pressable>
              <Pressable onPress={handleDelete} style={styles.headerButton}>
                <Trash2 size={20} color={Colors.error} />
              </Pressable>
            </View>
          ),
        }} 
      />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {calculator.description ? (
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{calculator.description}</Text>
            </View>
          ) : null}
          
          <View style={styles.inputsContainer}>
            {calculator.inputs.map(input => (
              <Input
                key={input.id}
                label={input.name}
                value={inputValues[input.id] || ''}
                onChangeText={(value) => handleInputChange(input.id, value)}
                placeholder={input.placeholder}
                keyboardType="decimal-pad"
              />
            ))}
          </View>
          
          <Button
            title="Calculate"
            onPress={handleCalculate}
            variant="primary"
            size="large"
            disabled={calculating}
            fullWidth={true}
          />
          
          {result !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Result</Text>
              <Text style={styles.resultValue}>{result.toLocaleString()}</Text>
            </View>
          )}
        </ScrollView>
        <AdBanner />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  descriptionContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  },
  inputsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
});