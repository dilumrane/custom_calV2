import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { useCalculatorStore } from '@/store/calculator-store';
import { InputField } from '@/types/calculator';
import { FormulaParser } from '@/utils/formula-parser';
import Input from '@/components/Input';
import Button from '@/components/Button';
import FormulaInput from '@/components/FormulaInput';
import AdBanner from '@/components/AdBanner';
import Colors from '@/constants/colors';

export default function CreateCalculatorScreen() {
  const router = useRouter();
  const addCalculator = useCalculatorStore((state) => state.addCalculator);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inputs, setInputs] = useState<InputField[]>([
    { id: `input_${Date.now()}`, name: '', placeholder: '', type: 'number' },
  ]);
  const [formula, setFormula] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addInput = () => {
    const newId = `input_${Date.now()}`;
    setInputs([...inputs, { id: newId, name: '', placeholder: '', type: 'number' }]);
  };

  const removeInput = (index: number) => {
    if (inputs.length <= 1) {
      Alert.alert('Error', 'You need at least one input field.');
      return;
    }
    
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const updateInput = (index: number, field: keyof InputField, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], [field]: value };
    setInputs(newInputs);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    inputs.forEach((input, index) => {
      if (!input.name.trim()) {
        newErrors[`input_name_${index}`] = 'Input name is required';
      }
    });
    
    if (!formula.trim()) {
      newErrors.formula = 'Formula is required';
    } else {
      // Check if formula uses valid input names
      const variables = FormulaParser.extractVariables(formula);
      const inputNames = inputs.map(input => input.name);
      
      const invalidVariables = variables.filter(v => !inputNames.includes(v));
      
      if (invalidVariables.length > 0) {
        newErrors.formula = `Unknown variables: ${invalidVariables.join(', ')}`;
      } else {
        // Test formula with dummy values
        const testVars: Record<string, number> = {};
        inputs.forEach(input => { 
          if (input.name) testVars[input.name] = 1; 
        });
        
        const parser = new FormulaParser(formula, testVars);
        if (!parser.validate()) {
          newErrors.formula = 'Invalid formula syntax';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    const id = addCalculator({
      name,
      description,
      inputs,
      formula,
    });
    
    // Navigate directly to home instead of showing an alert
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <Input
            label="Calculator Name"
            value={name}
            onChangeText={setName}
            placeholder="e.g., BMI Calculator"
            error={errors.name}
            autoCapitalize="words"
          />
          <Input
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what this calculator does"
            multiline
            numberOfLines={3}
            autoCapitalize="sentences"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Fields</Text>
          <Text style={styles.sectionDescription}>
            Define the input fields for your calculator. These will be used in your formula.
          </Text>

          {inputs.map((input, index) => (
            <View key={input.id} style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>Input {index + 1}</Text>
                <Button
                  title=""
                  onPress={() => removeInput(index)}
                  variant="outline"
                  size="small"
                  style={styles.removeButton}
                  textStyle={styles.removeButtonText}
                  fullWidth={false}
                >
                  <Trash2 size={16} color={Colors.error} />
                </Button>
              </View>
              
              <Input
                label="Variable Name"
                value={input.name}
                onChangeText={(text) => updateInput(index, 'name', text)}
                placeholder="e.g., Weight"
                error={errors[`input_name_${index}`]}
                autoCapitalize="words"
              />
              
              <Input
                label="Placeholder"
                value={input.placeholder}
                onChangeText={(text) => updateInput(index, 'placeholder', text)}
                placeholder="e.g., Enter weight in kg"
              />
            </View>
          ))}

          <Button
            title="Add Input Field"
            onPress={addInput}
            variant="outline"
            style={styles.addButton}
            textStyle={styles.addButtonText}
            fullWidth={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formula</Text>
          <Text style={styles.sectionDescription}>
            Create a formula using the input variable names. Click on variables below to add them to your formula.
          </Text>
          
          <FormulaInput
            inputs={inputs}
            formula={formula}
            onChangeFormula={setFormula}
            error={errors.formula}
          />
        </View>

        <Button
          title="Save Calculator"
          onPress={handleSave}
          variant="primary"
          size="large"
          style={styles.saveButton}
          fullWidth={true}
        />
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
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
  section: {
    marginBottom: 24,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  removeButton: {
    width: 36,
    height: 36,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.error,
  },
  removeButtonText: {
    color: Colors.error,
  },
  addButton: {
    marginTop: 8,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: Colors.primary,
  },
  saveButton: {
    marginBottom: 24,
  },
});