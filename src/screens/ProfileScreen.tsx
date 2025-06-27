// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Modal } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker'; // <-- 1. Impor Image Picker
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../context/ToastContext';
import { useCustomAlert } from '../context/AlertContext'; // Menggunakan custom alert untuk logout

// Impor semua komponen UI yang dibutuhkan
import ProfileHeader from '../components/organisms/ProfileHeader';
import StatsCounter from '../components/molecules/StatsCounter';
import SettingsRow from '../components/molecules/SettingsRow';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { showAlert } = useCustomAlert();

  const { signOut } = useAuth(); // Ambil fungsi signOut

  // --- State untuk data profil ---
  const [profileData, setProfileData] = useState({
    name: 'Gemini AI',
    username: 'gemini_ai_dev',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  });

  // --- State untuk Modal Edit ---
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalUsername, setModalUsername] = useState('');
  
  // --- BARU: State untuk menampung data gambar dari Image Picker ---
  const [avatarAsset, setAvatarAsset] = useState<Asset | null>(null);


  const userStats = [
    { label: 'Pesanan', value: 12 },
    { label: 'Poin', value: '1,250' },
    { label: 'Ulasan', value: 8 },
  ];

  // --- Fungsi-fungsi Handler ---

  const handleOpenEditModal = () => {
    setModalName(profileData.name);
    setModalUsername(profileData.username);
    setEditModalVisible(true);
  };

  const handleSaveChanges = () => {
    setProfileData({ ...profileData, name: modalName, username: modalUsername });
    setEditModalVisible(false);
    showToast({ message: 'Profil berhasil diperbarui!', type: 'success' });
  };
  
  // BARU: Fungsi untuk membuka galeri dan mengganti foto
  const handleAvatarChange = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        showToast({ message: `Error: ${response.errorMessage}`, type: 'error' });
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const newAvatar = response.assets[0];
        // Simpan data aset gambar ke state
        setAvatarAsset(newAvatar);
        // Perbarui juga data URL di profil utama untuk ditampilkan langsung
        setProfileData(prev => ({ ...prev, avatarUrl: newAvatar.uri || prev.avatarUrl }));
        showToast({ message: 'Foto profil berhasil diganti!', type: 'success' });
      }
    });
  };

  const handleLogout = () => {
    showAlert({
      title: "Konfirmasi Keluar",
      message: "Apakah Anda yakin ingin keluar?",
      buttons: [
        { text: 'Batal', onPress: () => {}, style: 'cancel' },
        { text: "Ya, Keluar", onPress: () => console.log("Proses Logout..."), style: 'destructive' },
      ]
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ProfileHeader
          name={profileData.name}
          username={profileData.username}
          avatarUrl={profileData.avatarUrl}
          onEditPress={handleOpenEditModal}
          onLogoutPress={signOut} // Teruskan fungsi signOut ke header
          onAvatarPress={handleAvatarChange} // <-- Hubungkan fungsi ganti foto di sini
        />
        
        <StatsCounter stats={userStats} />

        <View style={styles.container}>
          <Gap height={24} />
          <View style={[styles.menuCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <SettingsRow title="Pesanan Saya" iconLeft="package-variant-closed" onPress={() => navigation.navigate('ScreenTest')} />
            <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
            <SettingsRow title="Pengaturan Aplikasi" iconLeft="cog-outline" onPress={() => navigation.navigate('Settings')} />
          </View>
          
          <Gap height={16} />
          <View style={[styles.menuCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <SettingsRow title="Pusat Bantuan" iconLeft="help-circle-outline" onPress={() => {}} />
          </View>
          <Gap height={24} />
        </View>
      </ScrollView>

      {/* --- Komponen Modal untuk Edit Profil (Tidak berubah) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Edit Profil</Text>
            <Gap height={24} />

            <Text style={[styles.inputLabel, {color: theme.colors.text}]}>Nama Lengkap</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text, }]}
              value={modalName}
              onChangeText={setModalName}
            />
            <Gap height={16} />

            <Text style={[styles.inputLabel, {color: theme.colors.text}]}>Username</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text, }]}
              value={modalUsername}
              onChangeText={setModalUsername}
            />
            <Gap height={32} />

            <View style={styles.modalActions}>
              <Button title="Batal" variant='outlined' onPress={() => setEditModalVisible(false)} />
              <Gap width={16}/>
              <Button title="Simpan" onPress={handleSaveChanges} style={{flex: 1}}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles tidak berubah, jadi bisa disalin langsung
const styles = StyleSheet.create({
  container: { padding: 16 },
  menuCard: { borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
  separator: { height: 1, opacity: 0.2, marginHorizontal: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    padding: 24,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default ProfileScreen;