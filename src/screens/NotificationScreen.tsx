// src/screens/NotificationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import SinglePageHeader from '../components/molecules/SinglePageHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../components/atoms/Gap';

// Data notifikasi dummy
const dummyNotifications = [
  { id: '1', type: 'promo', title: 'Diskon Spesial!', message: 'Dapatkan diskon 50% untuk semua item fashion.', time: '10 menit lalu', read: false },
  { id: '2', type: 'info', title: 'Pesanan Dikirim', message: 'Pesanan #12345 Anda telah dikirim.', time: '1 jam lalu', read: false },
  { id: '3', type: 'warning', title: 'Login Baru', message: 'Ada login baru dari perangkat tidak dikenal.', time: '3 jam lalu', read: true },
  { id: '4', type: 'promo', title: 'Gratis Ongkir Menanti', message: 'Jangan lewatkan promo gratis ongkir akhir pekan ini.', time: '1 hari lalu', read: true },
];

const NotificationScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: typeof dummyNotifications[0] }) => {
    const iconMap = {
      promo: { name: 'sale', color: '#4caf50' },
      info: { name: 'information', color: theme.colors.primary },
      warning: { name: 'alert-circle', color: '#ff9800' },
    };

    return (
      <View style={[styles.itemContainer, { backgroundColor: theme.colors.card, borderLeftColor: iconMap[item.type].color }]}>
        <Icon name={iconMap[item.type].name} size={24} color={iconMap[item.type].color} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.message, { color: theme.colors.text }]}>{item.message}</Text>
          <Text style={[styles.time, { color: theme.colors.border }]}>{item.time}</Text>
        </View>
        {!item.read && <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SinglePageHeader
        title="Notifikasi"
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        data={dummyNotifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <Gap height={12} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: theme.colors.text }}>Tidak ada notifikasi saat ini.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreen;