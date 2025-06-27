// src/navigation/RootNavigator.tsx
import React from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native'; // <-- 1. Impor StatusBar
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AppStack from './AppStack'; 

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Auth.Navigator>
  );
}

const RootNavigator = () => {
  const { userToken, isLoading } = useAuth();
  const { theme, isDark } = useTheme(); // <-- Ambil juga 'isDark'

  // Menampilkan loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    // Kita bungkus semuanya dengan View agar bisa menampung StatusBar dan Navigator
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* 2. Tambahkan komponen StatusBar di sini */}
      <StatusBar
        // 'light-content' (teks putih) untuk tema gelap
        // 'dark-content' (teks hitam) untuk tema terang
        barStyle={isDark ? 'light-content' : 'dark-content'}
        // Atur warna background agar sama dengan header aplikasi
        backgroundColor={theme.colors.card}
      />
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;