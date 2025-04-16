import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calculator } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  secondaryButtonTitle?: string;
  onSecondaryButtonPress?: () => void;
}

export default function EmptyState({
  title,
  description,
  buttonTitle,
  onButtonPress,
  secondaryButtonTitle,
  onSecondaryButtonPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Calculator size={48} color={Colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          style={styles.button}
        />
      )}
      {secondaryButtonTitle && onSecondaryButtonPress && (
        <Button
          title={secondaryButtonTitle}
          onPress={onSecondaryButtonPress}
          variant="outline"
          style={styles.secondaryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    minWidth: 200,
    marginBottom: 12,
  },
  secondaryButton: {
    minWidth: 200,
  },
});