// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Modal } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/molecules/Card';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';
import HomeMenuPreview from '../components/organisms/HomeMenuPreview'; // <-- Impor komponen pratinjau menu
import { theme } from '../theme/theme';

const HomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const promoData = [
    { id: '1', title: 'Diskon 50%', description: 'Untuk semua produk elektronik.' },
    { id: '2', title: 'Gratis Ongkir', description: 'Tanpa minimum pembelian.' },
    { id: '3', title: 'Cashback 20%', description: 'Khusus pengguna baru.' },
  ];

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
        Selamat Datang!
      </Text>
      <Gap height={8} />
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Mau cari apa hari ini?
      </Text>
      <Gap height={16} />

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text }]}
        placeholder="Ketik pencarian di sini..."
        placeholderTextColor={theme.colors.border}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Gap height={24} />

      {/* Tampilkan komponen pratinjau menu di sini */}
      <HomeMenuPreview />
      <Gap height={24} />

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Promosi Spesial</Text>
      <Gap height={12} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {promoData.map(item => (
          <Card key={item.id} style={styles.promoCard} onPress={() => {}}>
            <View style={[styles.promoImagePlaceholder, { backgroundColor: theme.colors.border }]} />
            <Gap height={8} />
            <Text style={[styles.promoTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.promoDesc, { color: theme.colors.border }]} numberOfLines={2}>{item.description}</Text>
          </Card>
        ))}
      </ScrollView>
      <Gap height={25} />
        <View style={styles.menuContainer}>
        <Card style={styles.menuCard} onPress={() => navigation.navigate('InputFormScreen')}>
        <Text style={[styles.menuText, { color: theme.colors.primary }]}>Input Form</Text>
        </Card>
        {/* --- CARD BARU UNTUK MENU --- */}
        <Card style={styles.menuCard} onPress={() => navigation.navigate('MenuAppScreen')}>
        <Text style={[styles.menuText, { color: theme.colors.primary }]}>Semua Menu</Text>
        </Card>
        </View>
       <Gap height={32} />
      <Button title="Buka Info Penting" onPress={() => setModalVisible(true)} />

      {/* Komponen Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Informasi Penting</Text>
            <Gap height={16}/>
            <Text style={{color: theme.colors.text, textAlign: 'center'}}>
                Ini adalah contoh konten di dalam modal.
            </Text>
            <Gap height={24}/>
            <Button title="Tutup" variant="outlined" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

// --- STYLING (DISEDERHANAKAN) ---
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: theme.fontFamily.bold
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    fontFamily: theme.fontFamily.extraLight
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: theme.fontFamily.light
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium
  },
  promoCard: {
    width: 220, // Dibuat lebih besar
    marginRight: 12,
  },
  promoImagePlaceholder: {
    height: 100, // Dibuat lebih tinggi
    borderRadius: 8,
  },
  promoTitle: {
    fontSize: 16,
    fontFamily: theme.fontFamily.regular
  },
  promoDesc: {
    fontSize: 14,
    opacity: 0.7,
    fontFamily: theme.fontFamily.light
  },
    menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal styles
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  modalContent: { width: '85%', padding: 24, borderRadius: 12, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
});

export default HomeScreen;