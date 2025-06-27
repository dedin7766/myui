// src/screens/ScreenTest.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import SinglePageHeader from '../components/molecules/SinglePageHeader';

// navigation prop akan otomatis dikirim oleh Stack Navigator
const ScreenTest = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SinglePageHeader
        title="Halaman Tes"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>
          Ini adalah Halaman Tes.
        </Text>
        <Text style={{ color: theme.colors.text, textAlign: 'center', marginTop: 8 }}>
          Tidak ada Bottom Tab Bar di sini, dan header ini adalah header kustom.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default ScreenTest;