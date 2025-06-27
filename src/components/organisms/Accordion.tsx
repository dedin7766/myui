// src/components/organisms/Accordion.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';


interface AccordionProps {
  title: string;
  iconLeft?: string;
  children: React.ReactNode;
}

const Accordion = ({ title, iconLeft, children }: AccordionProps) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        {iconLeft && <Icon name={iconLeft} size={22} color={theme.colors.primary} style={styles.icon} />}
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={theme.colors.border} />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden', // Penting agar konten tidak keluar dari border radius
    marginBottom: 12,
  },
  header: {
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
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee', // Warna pemisah
  },
});

export default Accordion;