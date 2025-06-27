// src/components/form/ImagePickerInput.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';

const ImagePickerInput = ({ control, name }: any) => {
  const { theme } = useTheme();

  // Fungsi untuk membuka galeri
  const handleChoosePhoto = (onChange: (value: Asset | null) => void) => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorCode) Alert.alert('Error', response.errorMessage);
      else if (response.assets && response.assets.length > 0) {
        onChange(response.assets[0]);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Foto Profil</Text>
          <TouchableOpacity
            style={[styles.pickerContainer, { borderColor: theme.colors.border }]}
            onPress={() => handleChoosePhoto(onChange)}
          >
            {value ? (
              // Jika sudah ada gambar, tampilkan preview
              <Image source={{ uri: value.uri }} style={styles.imagePreview} />
            ) : (
              // Jika belum, tampilkan placeholder
              <View style={styles.placeholder}>
                <Icon name="camera-plus-outline" size={30} color={theme.colors.border} />
                <Text style={[styles.placeholderText, { color: theme.colors.border }]}>Unggah Foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  label: { 
    marginBottom: 8, 
    fontSize: 16, 
    fontWeight: '600' 
  },
  pickerContainer: {
    height: 120,
    width: 120,
    borderRadius: 60, // Diubah menjadi lingkaran
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden', // Penting agar gambar tidak keluar dari border
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 12,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePickerInput;