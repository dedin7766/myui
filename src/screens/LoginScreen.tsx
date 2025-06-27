// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';

// Di sini kita akan panggil fungsi signIn dari AuthContext
const LoginScreen = ({ navigation }: any) => {
  const { theme, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { signIn } = useAuth(); // Ambil fungsi signIn

  const handleLogin = async () => {
    // Simulasi login berhasil dan dapat token
    await signIn('dummy-auth-token'); 
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Icon name="lock-check" size={60} color={theme.colors.primary} />
        <Gap height={16} />
        <Text style={[styles.title, { color: theme.colors.text }]}>Selamat Datang Kembali</Text>
        <Text style={[styles.subtitle, { color: theme.colors.border }]}>Masuk untuk melanjutkan</Text>
      </View>

      <View style={styles.form}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color={theme.colors.border} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, fontFamily: theme.fontFamily.light }]}
            placeholder="Email atau Nama Pengguna"
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
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, fontFamily: theme.fontFamily.light }]}
            placeholder="Kata Sandi"
            placeholderTextColor={theme.colors.border}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
            <Icon name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={22} color={theme.colors.border} />
          </TouchableOpacity>
        </View>

        {/* Tambahkan onPress di sini */}
        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={[styles.forgotPasswordText, { color: theme.colors.primary, fontFamily: theme.fontFamily.regular }]}>Lupa Kata Sandi?</Text>
        </TouchableOpacity>

        <Gap height={24} />
        <Button title="Masuk" onPress={handleLogin} />
      </View>

    <View style={styles.footer}>
    <Text style={{ color: theme.colors.border, fontFamily: theme.fontFamily.light }}>Belum punya akun? </Text>
    {/* Tambahkan onPress di sini */}
    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: theme.colors.primary, fontFamily: theme.fontFamily.regular }}>Daftar di sini</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

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
        fontSize: 23,
        textAlign: 'center',
        fontFamily: theme.fontFamily.bold
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
        fontFamily: theme.fontFamily.light
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
    eyeIcon: {
        position: 'absolute',
        right: 8,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 12,
    },
    forgotPasswordText: {
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 48,
        paddingBottom: 24,
    },
});

export default LoginScreen;