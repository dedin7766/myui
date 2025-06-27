// src/components/molecules/SettingsRow.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';

interface SettingsRowProps {
  title: string;
  iconLeft?: string;
  onPress?: () => void;
  rightContent?: React.ReactNode; // Untuk menampung Switch, teks, atau ikon lain
}

const SettingsRow = ({ title, iconLeft, onPress, rightContent }: SettingsRowProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
      disabled={!onPress}
    >
      {iconLeft && (
        <Icon name={iconLeft} size={22} color={theme.colors.primary} style={styles.icon} />
      )}
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <View style={styles.rightContainer}>
        {rightContent ? (
          rightContent
        ) : onPress ? (
          <Icon name="chevron-right" size={22} color={theme.colors.border} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
});

export default SettingsRow;