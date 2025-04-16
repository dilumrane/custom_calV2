import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Calculator } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CalculatorCardProps {
  id: string;
  name: string;
  description?: string;
  inputCount: number;
  onPress: () => void;
}

export default function CalculatorCard({ 
  id, 
  name, 
  description, 
  inputCount,
  onPress 
}: CalculatorCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Calculator size={24} color={Colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        {description ? (
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        ) : null}
        <Text style={styles.meta}>{inputCount} input{inputCount !== 1 ? 's' : ''}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: Colors.textLight,
  },
});