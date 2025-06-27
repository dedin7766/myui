// src/components/molecules/CircleMenuItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';
import { theme } from '../../theme/theme';

interface CircleMenuItemProps {
  label: string;
  iconName: string;
  color: string; // Warna latar belakang lingkaran
  onPress: () => void;
}

const CircleMenuItem = ({ label, iconName, color, onPress }: CircleMenuItemProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Icon name={iconName} size={30} color="white" />
      </View>
      <Text style={[styles.label, { color: theme.colors.text }]} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%', // Ambil lebar penuh dari kolom FlatList
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: theme.fontFamily.light
  },
});

export default CircleMenuItem;