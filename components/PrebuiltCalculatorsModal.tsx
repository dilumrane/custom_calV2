import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, Pressable, SafeAreaView } from 'react-native';
import { X } from 'lucide-react-native';
import { prebuiltCalculators } from '@/constants/prebuilt-calculators';
import { useCalculatorStore } from '@/store/calculator-store';
import Button from './Button';
import Colors from '@/constants/colors';

interface PrebuiltCalculatorsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrebuiltCalculatorsModal({ visible, onClose }: PrebuiltCalculatorsModalProps) {
  const addCalculator = useCalculatorStore((state) => state.addCalculator);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAddCalculator = (index: number) => {
    const calculator = prebuiltCalculators[index];
    const id = addCalculator(calculator);
    setSelectedId(id);
    
    // Show success state briefly before closing
    setTimeout(() => {
      onClose();
      setSelectedId(null);
    }, 1000);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pre-built Calculators</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.text} />
            </Pressable>
          </View>
          
          <Text style={styles.modalDescription}>
            Select a pre-built calculator to add to your collection.
          </Text>
          
          <FlatList
            data={prebuiltCalculators}
            keyExtractor={(item, index) => `prebuilt-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.calculatorItem}>
                <View style={styles.calculatorInfo}>
                  <Text style={styles.calculatorName}>{item.name}</Text>
                  <Text style={styles.calculatorDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.calculatorInputs}>
                    {item.inputs.length} input{item.inputs.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                <Button
                  title="Add"
                  onPress={() => handleAddCalculator(index)}
                  variant="primary"
                  size="small"
                  style={styles.addButton}
                />
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  calculatorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calculatorInfo: {
    flex: 1,
    marginRight: 12,
  },
  calculatorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  calculatorDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 6,
  },
  calculatorInputs: {
    fontSize: 12,
    color: Colors.textLight,
  },
  addButton: {
    minWidth: 70,
  },
});