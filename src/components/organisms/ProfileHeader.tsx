import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useToast } from '../../context/ToastContext';
import { useCustomAlert } from '../../context/AlertContext';

interface ProfileHeaderProps {
  name: string;
  username: string;
  avatarUrl?: string;
  onEditPress: () => void;
  onLogoutPress: () => void;
  onAvatarPress: () => void; // Prop untuk menangani klik pada avatar
}

const ProfileHeader = ({ name, username, avatarUrl, onEditPress, onLogoutPress, onAvatarPress }: ProfileHeaderProps) => {
  const { theme } = useTheme();

  
    const { showToast } = useToast();
    const { showAlert } = useCustomAlert();
  
    const handleShowAlert = () => {
    showAlert({
        title: 'Konfirmasi Keluar',
        message: 'Apakah Anda yakin ingin keluar dari akun Anda?',
        buttons: [
        {
            text: 'Batal',
            onPress: () => showToast({ message: 'Logout dibatalkan.' }),
        },
        {
            text: 'Keluar',
            style: 'destructive',
            onPress: () => {
            onLogoutPress(); // Panggil fungsi dari props
            showToast({ message: 'Anda telah berhasil keluar.', type: 'success' });
          },
        },
        ],
    });
    };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={onAvatarPress} style={styles.avatarContainer}>
          <Image
            // Jika ada avatarUrl, gunakan itu. Jika tidak, pakai gambar default.
            source={avatarUrl ? { uri: avatarUrl } : require('../../assets/images/default-avatar.png')}
            style={styles.avatar}
          />
          <View style={[styles.editIconOverlay, { backgroundColor: theme.colors.primary, borderColor: theme.colors.card }]}>
            <Icon name="camera-outline" size={14} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: theme.colors.text }]}>{name}</Text>
          <Text style={[styles.username, { color: theme.colors.border }]}>@{username}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onEditPress}>
          <Icon name="account-edit-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShowAlert}>
          <Icon name="logout" size={24} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default ProfileHeader;