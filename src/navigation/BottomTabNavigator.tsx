// src/navigation/BottomTabNavigator.tsx
import React, { useState, useEffect } from 'react'; // DITAMBAHKAN: useState dan useEffect
import { View, Platform, Keyboard } from 'react-native'; // DITAMBAHKAN: Keyboard
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ComponentScreen from '../screens/ComponentScreen';
import { useTheme } from '../hooks/useTheme';
import HeaderIcon from '../components/molecules/HeaderIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = useTheme();

  // DITAMBAHKAN: State untuk melacak visibilitas keyboard
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // DITAMBAHKAN: useEffect untuk menambahkan dan menghapus listener keyboard
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Set true saat keyboard muncul
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Set false saat keyboard hilang
      }
    );

    // Jangan lupa untuk membersihkan listener saat komponen dibongkar
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const unreadMessageCount = 125;
  const unreadNotificationCount = 2;

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true, 
        headerStyle: { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontFamily: theme.fontFamily.bold },
        headerRight: () => {
          if (route.name === 'Home') {
            return (
              <View style={{ flexDirection: 'row', marginRight: 8 }}>
                <HeaderIcon 
                  iconName="message-text-outline"
                  count={unreadMessageCount}
                  onPress={() => navigation.navigate('MessagesScreen')}
                />
                <HeaderIcon 
                  iconName="bell-outline"
                  count={unreadNotificationCount}
                  onPress={() => navigation.navigate('NotificationScreen')}
                />
              </View>
            );
          }
          return null;
        },
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
        tabBarStyle: {
          // DITAMBAHKAN: Logika untuk menyembunyikan tab bar
          display: isKeyboardVisible ? 'none' : 'flex',
          
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
        },      
        tabBarLabelStyle: {
          // Hapus fontWeight, karena fontFamily sudah menanganinya
          fontSize: 10,
          // Terapkan font dari tema Anda, 'medium' adalah pilihan yang bagus
          fontFamily: theme.fontFamily.regular, 
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{title: "Beranda"}} />
      <Tab.Screen name="Aset" component={ComponentScreen} options={{ title: 'Aset Komponen' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;