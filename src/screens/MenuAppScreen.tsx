// src/screens/MenuAppScreen.tsx
import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import SinglePageHeader from '../components/molecules/SinglePageHeader';
import CircleMenuItem from '../components/molecules/CircleMenuItem';

// Data dummy untuk menu-menu aplikasi
const menuData = [
  { id: '1', label: 'Transfer', icon: 'swap-horizontal', color: '#3498db', screen: 'TransferScreen' },
  { id: '2', label: 'Bayar Listrik', icon: 'flash', color: '#f1c40f', screen: 'PLNScreen' },
  { id: '3', label: 'Pulsa & Data', icon: 'signal-cellular-3', color: '#2ecc71', screen: 'TopUpScreen' },
  { id: '4', label: 'Donasi', icon: 'hand-heart', color: '#e74c3c', screen: 'DonationScreen' },
  { id: '5', label: 'Voucher Game', icon: 'gamepad-variant', color: '#9b59b6', screen: 'GameVoucherScreen' },
  { id: '6', label: 'Riwayat', icon: 'history', color: '#1abc9c', screen: 'HistoryScreen' },
  { id: '7', label: 'Investasi', icon: 'chart-line', color: '#34495e', screen: 'InvestmentScreen' },
  { id: '8', label: 'Lainnya', icon: 'dots-horizontal-circle-outline', color: '#7f8c8d', screen: 'MoreScreen' },
];

const MenuAppScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SinglePageHeader
        title="Semua Menu"
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id}
        numColumns={4} // PENTING: Ini yang membuat layout menjadi grid 4 kolom
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CircleMenuItem
              label={item.label}
              iconName={item.icon}
              color={item.color}
              onPress={() => Alert.alert('Navigasi', `Pergi ke halaman ${item.screen}`)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 24,
    paddingHorizontal: 8,
  },
  itemContainer: {
    flex: 1, // Agar setiap item mengambil ruang yang sama
    alignItems: 'center',
    marginBottom: 24, // Jarak vertikal antar baris
  },
});

export default MenuAppScreen;