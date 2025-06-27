// src/components/molecules/HeaderIcon.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Kita ganti ke MaterialCommunityIcons untuk variasi ikon
import { useTheme } from '../../hooks/useTheme';

interface HeaderIconProps {
  iconName: string;
  onPress: () => void;
  count: number;
}

const HeaderIcon = ({ iconName, onPress, count }: HeaderIconProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={iconName} size={24} color={theme.colors.text} />
      {count > 0 && (
        <View style={[styles.badgeContainer, { backgroundColor: 'red' }]}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: 4,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HeaderIcon;