// src/components/molecules/SinglePageHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';
import Gap from '../atoms/Gap';

interface SinglePageHeaderProps {
  title: string;
  onBackPress: () => void;
}

const SinglePageHeader = ({ title, onBackPress }: SinglePageHeaderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets(); // Untuk padding aman di bagian atas

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: theme.colors.card,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {/* Spacer agar judul tetap di tengah */}
      <View style={{ width: 40 }} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60, // Tinggi dasar header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowOpacity: 0.1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8, // Agar sentuhan lebih mudah
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SinglePageHeader;