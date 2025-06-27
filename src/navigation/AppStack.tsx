// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator'; 
import ScreenTest from '../screens/ScreenTest';
import NotificationScreen from '../screens/NotificationScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen'; // <-- 1. Impor layar baru
import InputFormScreen from '../screens/InputFormScreen';
import MenuCard from '../components/molecules/MenuCard';
import MenuAppScreen from '../screens/MenuAppScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="ScreenTest" component={ScreenTest} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      {/* 2. Daftarkan layar detail chat di sini */}
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="InputFormScreen" component={InputFormScreen} />
      <Stack.Screen name="MenuAppScreen" component={MenuAppScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;