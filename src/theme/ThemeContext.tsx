// src/theme/ThemeContext.tsx

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './theme';

type Theme = typeof lightTheme;
// Tipe baru untuk mode tema
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  themeMode: ThemeMode;
  // Fungsi baru untuk mengganti tema
  updateTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  themeMode: 'system',
  updateTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); // 'dark' atau 'light' dari OS
  
  // State utama kita sekarang adalah 'themeMode'
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  
  // 'isDark' sekarang adalah state turunan, ditentukan oleh themeMode
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  // Efek untuk memuat preferensi tema dari storage saat aplikasi dibuka
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem('theme_mode') as ThemeMode | null;
        if (savedMode) {
          setThemeMode(savedMode);
          if (savedMode === 'light') {
            setIsDark(false);
          } else if (savedMode === 'dark') {
            setIsDark(true);
          } else {
            setIsDark(systemScheme === 'dark');
          }
        }
      } catch (error) {
        console.error('Gagal memuat tema dari storage', error);
      }
    };
    loadThemeMode();
  }, [systemScheme]);

  // Efek untuk mendengarkan perubahan tema dari sistem operasi
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Hanya update jika mode saat ini adalah 'system'
      if (themeMode === 'system') {
        setIsDark(colorScheme === 'dark');
      }
    });

    return () => subscription.remove();
  }, [themeMode]); // Jalankan kembali jika themeMode berubah

  // Fungsi baru untuk di-panggil dari UI
  const updateTheme = useCallback(async (mode: ThemeMode) => {
    setThemeMode(mode);
    if (mode === 'light') {
      setIsDark(false);
    } else if (mode === 'dark') {
      setIsDark(true);
    } else {
      // Saat kembali ke mode 'system', langsung sesuaikan dengan tema OS saat ini
      setIsDark(Appearance.getColorScheme() === 'dark');
    }

    try {
      await AsyncStorage.setItem('theme_mode', mode);
    } catch (error) {
      console.error('Gagal menyimpan tema ke storage', error);
    }
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, themeMode, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};