// src/components/atoms/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';
import { theme } from '../../theme/theme';

// Perbarui interface props kita dengan semua opsi baru
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text'; // Varian style
  color?: 'primary' | 'destructive';       // Varian warna
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: string;
  iconRight?: string;
  style?: ViewStyle;
}

const Button = ({
  title,
  onPress,
  variant = 'filled', // Default variant
  color = 'primary',    // Default color
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  style,
}: ButtonProps) => {
  const { theme } = useTheme();

  // Tentukan warna utama berdasarkan prop 'color'
  const mainColor = color === 'destructive' ? theme.colors.destructive : theme.colors.primary;

  // Siapkan style dinamis berdasarkan variant
  let containerStyle: ViewStyle = { ...styles.container };
  let textStyle: TextStyle = { ...styles.text };
  let iconColor: string = '';

  switch (variant) {
    case 'outlined':
      containerStyle = {
        ...containerStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: mainColor,
      };
      textStyle = { ...textStyle, color: mainColor };
      iconColor = mainColor;
      break;

    case 'text':
      containerStyle = {
        ...containerStyle,
        backgroundColor: 'transparent',
      };
      textStyle = { ...textStyle, color: mainColor };
      iconColor = mainColor;
      break;

    // 'filled' adalah default
    default:
      containerStyle = {
        ...containerStyle,
        backgroundColor: mainColor,
      };
      textStyle = { ...textStyle, color: theme.colors.card };
      iconColor = theme.colors.card;
      break;
  }
  
  // Terapkan style untuk state disabled
  if (disabled || loading) {
    containerStyle.opacity = 0.5;
  }

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <View style={styles.content}>
          {iconLeft && <Icon name={iconLeft} size={20} color={iconColor} style={{ marginRight: 8 }} />}
          <Text style={textStyle}>{title}</Text>
          {iconRight && <Icon name={iconRight} size={20} color={iconColor} style={{ marginLeft: 8 }} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Diubah menjadi lebih bulat (pill shape)
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: theme.fontFamily.bold
  },
});

export default Button;