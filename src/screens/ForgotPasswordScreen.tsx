// src/screens/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../context/ToastContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const { theme, isDark } = useTheme();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSendLink = () => {
    if (!email.includes('@') || email.length < 5) {
      showToast({ message: 'Harap masukkan alamat email yang valid.', type: 'error' });
      return;
    }

    // Di aplikasi nyata, di sini Anda akan memanggil API untuk mengirim email reset.
    console.log('Sending reset link to:', email);

    // Tampilkan pesan sukses dan arahkan kembali ke Login setelahnya
    showToast({
      message: 'Tautan reset telah dikirim ke email Anda.',
      type: 'success',
      duration: 3000,
    });
    // Arahkan kembali ke halaman login setelah pesan ditampilkan
    setTimeout(() => {
        navigation.navigate('Login');
    }, 1500);
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Icon name="lock-question" size={60} color={theme.colors.primary} />
        <Gap height={16} />
        <Text style={[styles.title, { color: theme.colors.text }]}>Lupa Kata Sandi?</Text>
        <Text style={[styles.subtitle, { color: theme.colors.border }]}>Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color={theme.colors.border} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Masukkan email terdaftar Anda"
            placeholderTextColor={theme.colors.border}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Gap height={32} />
        <Button title="Kirim Tautan Reset" onPress={handleSendLink} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Kembali ke Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Gunakan style yang mirip dengan layar lainnya untuk konsistensi
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        flex: 1,
        height: 50,
        borderBottomWidth: 1,
        paddingLeft: 40,
        fontSize: 16,
    },
    inputIcon: {
        position: 'absolute',
        left: 8,
    },
    footer: {
        alignItems: 'center',
        marginTop: 48,
        paddingBottom: 24,
    },
});

export default ForgotPasswordScreen;