// src/components/molecules/MenuCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../hooks/useTheme';

interface MenuCardProps {
    iconName: string;
    text: string;
    onPress: () => void;
}

const MenuCard = ({ iconName, text, onPress }: MenuCardProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
        <Card style={styles.menuContainer}>
            <Icon name={iconName} size={24} color={theme.colors.primary} />
            <Text style={[styles.menuText, { color: theme.colors.text }]}>{text}</Text>
            <Icon name="chevron-forward-outline" size={22} color={theme.colors.border} />
        </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  }
});

// Import Card di atas file ini
import Card from './Card';

export default MenuCard;