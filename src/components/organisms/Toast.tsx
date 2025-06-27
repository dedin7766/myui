// src/components/organisms/Toast.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
  onHide: () => void;
}

const Toast = ({ message, type, duration, onHide }: ToastProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-150)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: insets.top + 10,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onHide();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onHide, insets.top, translateY]);

  const backgroundColor = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8',
  }[type];

  const iconName = {
    success: 'check-circle-outline',
    error: 'alert-circle-outline',
    info: 'information-outline',
  }[type];

  return (
    <Animated.View style={[styles.container, { backgroundColor, transform: [{ translateY }] }]}>
      <Icon name={iconName} size={24} color="#fff" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  message: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
});

export default Toast;