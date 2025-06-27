// src/components/molecules/Card.tsx
import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

// Tipe untuk varian yang kita definisikan di tema
type CardVariant = 'primary' | 'success' | 'warning' | 'danger';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: CardVariant; // <-- BARU: Ganti backgroundColor dengan variant
}

const Card = ({ children, style, onPress, variant }: CardProps) => {
  const { theme } = useTheme();
  
  // Fungsi untuk memilih warna berdasarkan varian
  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: theme.colors.primary, text: '#FFFFFF' };
      case 'success':
        return { bg: theme.colors.success, text: theme.colors.text };
      case 'warning':
        return { bg: theme.colors.warning, text: theme.colors.text };
      case 'danger':
        return { bg: theme.colors.danger, text: theme.colors.text };
      default:
        // Jika tidak ada varian, gunakan warna default
        return { bg: theme.colors.card, text: theme.colors.text };
    }
  };

  const { bg: backgroundColor, text: textColor } = getVariantColors();

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor, borderColor: 'transparent' }, // Border bisa kita hilangkan untuk kartu berwarna
        style
      ]}
    >
      {/* Kita bisa secara otomatis mengubah warna teks di dalam kartu jika mau,
          tapi untuk sekarang kita biarkan kontennya yang mengatur. */}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    // Efek shadow yang lebih subtle
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Card;