// src/components/organisms/HomeMenuPreview.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { menuData } from '../../data/menuData'; // <-- Ambil data dari file terpusat
import CircleMenuItem from '../molecules/CircleMenuItem';
import { theme } from '../../theme/theme';

const HomeMenuPreview = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  // Ambil hanya 8 item pertama untuk ditampilkan di home
  const previewData = menuData.slice(0, 8);

  const handleMenuPress = (screen: string) => {
    if (screen === 'MenuAppScreen') {
      navigation.navigate(screen);
    } else {
      // Untuk menu lainnya, kita tampilkan alert sebagai placeholder
      Alert.alert('Navigasi', `Pergi ke halaman ${screen}`);
    }
  };

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Layanan Kami</Text>
      <FlatList
        data={previewData}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false} // Matikan scroll karena ini hanya pratinjau
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CircleMenuItem
              label={item.label}
              iconName={item.icon}
              color={item.color}
              onPress={() => handleMenuPress(item.screen)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: theme.fontFamily.medium
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HomeMenuPreview;