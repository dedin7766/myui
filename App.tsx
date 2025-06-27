// App.tsx
import React from 'react';

// 1. Impor semua komponen yang dibutuhkan dari library
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// 2. Impor SEMUA provider custom Anda
//    (Pastikan semua path ini sesuai dengan struktur folder Anda)
import { ThemeProvider } from './src/theme/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { AlertProvider } from './src/context/AlertContext';
import { ToastProvider } from './src/context/ToastContext'; // <-- Provider yang dibutuhkan ProfileScreen

// 3. Impor navigator utama Anda
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    // 4. Bungkus aplikasi Anda dengan SEMUA provider. Urutan ini penting.
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AlertProvider>
            {/* ToastProvider harus membungkus semua yang mungkin akan menampilkan toast */}
            <ToastProvider> 
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </ToastProvider>
          </AlertProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;