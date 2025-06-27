// src/navigation/MainTabNavigator.tsx
import React, { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ComponentScreen from '../screens/ComponentScreen';
import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { theme } = useTheme();
  // LOGIKA KEYBOARD KITA LETAKKAN DI SINI
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // KITA TAMPILKAN HEADER DARI TAB NAVIGATOR INI
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: 'bold' },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Aset') iconName = focused ? 'layers' : 'layers-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person-circle' : 'person-circle-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.border,
        // LOGIKA KEYBOARD DITERAPKAN DI SINI
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex',
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: Platform.OS === 'android' ? 70 : 85,
          paddingBottom: Platform.OS === 'android' ? 8 : 25,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />
      <Tab.Screen name="Aset" component={ComponentScreen} options={{ title: 'Aset Komponen' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Pengaturan' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;