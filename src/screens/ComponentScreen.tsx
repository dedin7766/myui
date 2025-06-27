// src/screens/ComponentScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../context/ToastContext';
import { useCustomAlert } from '../context/AlertContext';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';

const ComponentScreen = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { showAlert } = useCustomAlert();

  const handleShowSuccessToast = () => {
    showToast({ message: 'Operasi berhasil dilakukan!', type: 'success' });
  };

  const handleShowErrorToast = () => {
    showToast({ message: 'Terjadi kesalahan, coba lagi.', type: 'error' });
  };

  const handleShowAlert = () => {
    showAlert({
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin melanjutkan tindakan ini? Tindakan ini tidak dapat diurungkan.',
      buttons: [
        { text: 'Batal', onPress: () => showToast({ message: 'Tindakan dibatalkan.' }) },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => showToast({ message: 'Item telah dihapus!', type: 'error' }),
        },
      ],
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <Button title="Tampilkan Toast Sukses" onPress={handleShowSuccessToast} />
        <Gap height={16} />
        <Button title="Tampilkan Toast Error" onPress={handleShowErrorToast} />
        <Gap height={16} />
        <Button title="Tampilkan Alert Kustom" onPress={handleShowAlert} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ComponentScreen;