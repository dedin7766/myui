// src/screens/InputFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTheme } from '../hooks/useTheme';
import SinglePageHeader from '../components/molecules/SinglePageHeader';
import Button from '../components/atoms/Button';
import Gap from '../components/atoms/Gap';
import Card from '../components/molecules/Card'; // Impor Card

// Impor komponen form reusable kita
import ControlledInput from '../components/form/ControlledInput';
import ControlledDropdown from '../components/form/ControlledDropdown';
import ImagePickerInput from '../components/form/ImagePickerInput';

const InputFormScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { control, handleSubmit, formState: { errors } } = useForm({
    // Tambahkan default values untuk semua field
    defaultValues: {
      fullName: '',
      email: '',
      gender: null,
      interests: [],
      framework: null,
      profilePic: null,
    },
  });

  // Data untuk dropdown
  const [genderItems, setGenderItems] = useState([ { label: 'Pria', value: 'male' }, { label: 'Wanita', value: 'female' } ]);
  const [interestItems, setInterestItems] = useState([ { label: 'Olahraga', value: 'sports' }, { label: 'Musik', value: 'music' }, { label: 'Teknologi', value: 'tech' }, { label: 'Seni', value: 'art' } ]);
  const [frameworkItems, setFrameworkItems] = useState([ { label: 'React Native', value: 'rn' }, { label: 'Flutter', value: 'flutter' }, { label: 'Swift', value: 'swift' }, { label: 'Kotlin', value: 'kotlin' } ]);


  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    Alert.alert('Form Terkirim', 'Data berhasil dikirim! Cek console log Anda.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SinglePageHeader title="Form Input Lengkap" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Buat Akun Baru</Text>
        <Text style={[styles.subtitle, { color: theme.colors.border }]}>Isi data di bawah ini dengan lengkap dan benar.</Text>
        <Gap height={24} />

        {/* --- KELOMPOK 1: DATA DIRI --- */}
        <Card style={styles.card}>
          <ImagePickerInput name="profilePic" control={control} />
          <Gap height={16}/>
          <ControlledInput name="fullName" control={control} placeholder="Nama Lengkap" rules={{ required: 'Nama lengkap wajib diisi.' }}/>
          <ControlledInput name="email" control={control} placeholder="Alamat Email" keyboardType="email-address" rules={{ required: 'Email wajib diisi.', pattern: { value: /^\S+@\S+$/i, message: 'Format email tidak valid.' } }}/>
          <ControlledDropdown name="gender" control={control} items={genderItems} setZIndex={3000} placeholder="Pilih Jenis Kelamin" />
        </Card>
        
        <Gap height={24} />
        
        {/* --- KELOMPOK 2: PREFERENSI --- */}
        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferensi & Minat</Text>
          <Gap height={16}/>

          {/* --- BARU: Searchable Single Select --- */}
          <ControlledDropdown
            name="framework"
            control={control}
            items={frameworkItems}
            placeholder="Framework mobile favorit?"
            searchable={true}
            listMode="MODAL"
            zIndex={2000}
          />

          {/* --- Contoh Multiple Select & Searchable --- */}
          <ControlledDropdown
            name="interests"
            control={control}
            items={interestItems}
            placeholder="Pilih Minat (maks. 3)"
            multiple={true}
            searchable={true}
            min={0}
            max={3}
            mode="BADGE"
            listMode="MODAL"
            zIndex={1000}
          />
        </Card>
        
        <Gap height={32} />
        <Button title="Buat Akun Saya" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7
  },
  card: {
    padding: 20, // Padding lebih besar untuk estetika
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  }
});

export default InputFormScreen;