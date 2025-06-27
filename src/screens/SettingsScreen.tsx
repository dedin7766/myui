// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useCustomAlert } from '../context/AlertContext'; // <-- 1. Impor hook custom alert
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';

// Impor komponen UI kita
import SettingsRow from '../components/molecules/SettingsRow';
import Accordion from '../components/organisms/Accordion';

// Fungsi helper
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SettingsScreen = ({ navigation }: any) => {
  // 2. Pastikan kita menggunakan hook useTheme yang benar
  const { theme, themeMode, updateTheme } = useTheme();
  const { showAlert } = useCustomAlert(); // <-- Gunakan hook alert custom

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  // 3. Perbarui fungsi ini untuk menggunakan showAlert
  const showThemeOptions = () => {
    showAlert({
      title: "Pilih Mode Tampilan",
      message: "Pilih tema yang ingin Anda gunakan untuk aplikasi.",
      buttons: [
        { text: "Terang", onPress: () => updateTheme('light') },
        { text: "Gelap", onPress: () => updateTheme('dark') },
        { text: "Ikuti Sistem", onPress: () => updateTheme('system') },
        { text: "Batal", onPress: () => {}, style: 'cancel' },
      ]
    });
  };

  const handleLogout = () => {
    // Kita juga bisa menggunakan alert custom di sini untuk konsistensi
    showAlert({
      title: "Keluar",
      message: "Apakah Anda yakin ingin keluar?",
      buttons: [
        { text: "Ya, Keluar", onPress: () => console.log("Proses Logout..."), style: 'destructive' },
        { text: "Batal", onPress: () => {}, style: 'cancel' },
      ]
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        {/* --- Bagian Akun --- */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Akun</Text>
        <Gap height={12} />
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <SettingsRow 
            title="Edit Profil" 
            iconLeft="account-edit-outline" 
            onPress={() => navigation.navigate('Profile')} 
          />
          <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
          <SettingsRow 
            title="Ganti Kata Sandi" 
            iconLeft="lock-reset" 
            onPress={() => navigation.navigate('ScreenTest')}
          />
        </View>
        <Gap height={24} />

        {/* --- Bagian Pengaturan Aplikasi menggunakan Accordion --- */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Aplikasi</Text>
        <Gap height={12} />

        {/* Accordion Tampilan yang sudah menggunakan logika baru */}
        <Accordion title="Tampilan" iconLeft="palette-outline">
          <Gap height={12} />
          <SettingsRow
            title="Mode Tema"
            iconLeft="theme-light-dark"
            onPress={showThemeOptions}
            rightContent={
              <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
                {capitalize(themeMode)}
              </Text>
            }
          />
        </Accordion>

        <Accordion title="Notifikasi" iconLeft="bell-outline">
          <Gap height={12} />
          <SettingsRow
            title="Notifikasi Push"
            iconLeft="cellphone-message"
            rightContent={<Switch value={pushEnabled} onValueChange={setPushEnabled} />}
          />
          <Gap height={12} />
          <SettingsRow
            title="Notifikasi Email"
            iconLeft="email-outline"
            rightContent={<Switch value={emailEnabled} onValueChange={setEmailEnabled} />}
          />
        </Accordion>
        
        <Accordion title="Tentang" iconLeft="information-outline">
          <Gap height={12} />
          <SettingsRow title="Kebijakan Privasi" onPress={() => {}} />
          <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
          <SettingsRow 
            title="Versi Aplikasi"
            rightContent={<Text style={{ color: theme.colors.border }}>1.0.0</Text>}
          />
        </Accordion>
        <Gap height={24} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    opacity: 0.2,
    marginHorizontal: 16,
  },
});

export default SettingsScreen;