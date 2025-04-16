import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calculator, InputField } from '@/types/calculator';

interface CalculatorState {
  calculators: Calculator[];
  addCalculator: (calculator: Omit<Calculator, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCalculator: (calculator: Calculator) => void;
  deleteCalculator: (id: string) => void;
  getCalculator: (id: string) => Calculator | undefined;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      calculators: [],
      
      addCalculator: (calculator) => {
        const id = Date.now().toString();
        const timestamp = Date.now();
        
        const newCalculator: Calculator = {
          ...calculator,
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        
        set((state) => ({
          calculators: [...state.calculators, newCalculator],
        }));
        
        return id;
      },
      
      updateCalculator: (calculator) => {
        set((state) => ({
          calculators: state.calculators.map((c) => 
            c.id === calculator.id 
              ? { ...calculator, updatedAt: Date.now() } 
              : c
          ),
        }));
      },
      
      deleteCalculator: (id) => {
        set((state) => ({
          calculators: state.calculators.filter((c) => c.id !== id),
        }));
      },
      
      getCalculator: (id) => {
        return get().calculators.find((c) => c.id === id);
      },
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);