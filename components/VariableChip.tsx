import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Colors from '@/constants/colors';

interface VariableChipProps {
  name: string;
  id: string;
  color?: string;
  onPress: (id: string) => void;
}

export default function VariableChip({ name, id, color, onPress }: VariableChipProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        color ? { backgroundColor: `${color}20`, borderColor: `${color}40` } : null,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(id)}
    >
      <Text style={[
        styles.text,
        color ? { color } : null
      ]}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: `${Colors.primary}40`,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
});