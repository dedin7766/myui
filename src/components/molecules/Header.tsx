// src/components/molecules/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.card,
        paddingTop: insets.top,
        borderBottomColor: theme.colors.border,
      }
    ]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;