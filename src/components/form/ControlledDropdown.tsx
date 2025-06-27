// src/components/form/ControlledDropdown.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../../hooks/useTheme';

const ControlledDropdown = ({ control, name, items, ...props }: any) => {
  const { theme, isDark } = useTheme(); 
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[styles.container, { zIndex: props.zIndex || (open ? 1000 : 1) }]}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            
            // --- PERBAIKAN UTAMA ADA DI SINI ---
            // Kita tidak lagi menggunakan setValue untuk 'onChange'
            setValue={props.setValue} 
            
            // Kita gunakan onSelectItem untuk menangani perubahan nilai ke react-hook-form
            // Untuk multiple select, prop ini mengembalikan array dari item yang dipilih.
            onSelectItem={(selectedItems) => {
              // Jika multiple, kita ambil value dari setiap item. Jika tidak, ambil value item tunggal.
              const Aset = props.multiple ? selectedItems.map(item => item.value) : selectedItems.value;
              onChange(Aset);
            }}
            // --- SELESAI PERBAIKAN ---

            theme={isDark ? "DARK" : "LIGHT"}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: error ? 'red' : theme.colors.border,
            }}
            textStyle={{ color: theme.colors.text }}
            placeholderStyle={{ color: theme.colors.border }}
            dropDownContainerStyle={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}
            modalContentContainerStyle={{ backgroundColor: theme.colors.card }}
            listItemLabelStyle={{ color: theme.colors.text }}
            searchTextInputStyle={{ borderColor: theme.colors.border, color: theme.colors.text }}
            searchPlaceholderTextColor={theme.colors.border}
            {...props}
          />
          {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  errorText: { 
    color: 'red', 
    marginTop: 4, 
    marginLeft: 4 
  },
});

export default ControlledDropdown;