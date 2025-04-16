import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Plus } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          borderTopColor: Colors.border,
        },
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          color: Colors.text,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Calculators',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Calculator',
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => <Plus size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}