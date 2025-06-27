// src/components/molecules/StatsCounter.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface Stat {
  label: string;
  value: string | number;
}

interface StatsCounterProps {
  stats: Stat[];
}

const StatsCounter = ({ stats }: StatsCounterProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      {stats.map((stat, index) => (
        <TouchableOpacity key={index} style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.border }]}>{stat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});

export default StatsCounter;