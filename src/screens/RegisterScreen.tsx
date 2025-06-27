// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';

const RegisterScreen = ({ navigation }: any) => {
  const { theme, isDark } = useTheme();
  const { signIn } = useAuth(); // Kita gunakan signIn untuk auto-login setelah registrasi

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validasi sederhana
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }

    // Di aplikasi nyata, di sini Anda akan memanggil API registrasi.
    // Jika berhasil, API akan mengembalikan token, lalu kita panggil signIn.
    console.log('Registering user:', { fullName, email });
    
    // Simulasi berhasil registrasi dan langsung login
    await signIn('dummy-auth-token-from-register');
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Icon name="account-plus" size={60} color={theme.colors.primary} />
        <Gap height={16} />
        <Text style={[styles.title, { color: theme.colors.text }]}>Buat Akun Baru</Text>
        <Text style={[styles.subtitle, { color: theme.colors.border }]}>Satu langkah lagi untuk bergabung</Text>
      </View>

      <View style={styles.form}>
        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <Icon name="account-outline" size={20} color={theme.colors.border} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Nama Lengkap"
            placeholderTextColor={theme.colors.border}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <Gap height={16} />

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color={theme.colors.border} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Email"
            placeholderTextColor={theme.colors.border}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Gap height={16} />

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color={theme.colors.border} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Kata Sandi"
            placeholderTextColor={theme.colors.border}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Gap height={16} />
        
        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock-check-outline" size={20} color={theme.colors.border} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Konfirmasi Kata Sandi"
            placeholderTextColor={theme.colors.border}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Gap height={32} />
        <Button title="Daftar" onPress={handleRegister} />
      </View>

      <View style={styles.footer}>
        <Text style={{ color: theme.colors.border }}>Sudah punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Masuk di sini</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Gunakan style yang sama dengan LoginScreen untuk konsistensi
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
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
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        paddingBottom: 24,
    },
});

export default RegisterScreen;