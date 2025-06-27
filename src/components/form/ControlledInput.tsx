import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { useTheme } from '../../hooks/useTheme';

const ControlledInput = ({ control, name, rules = {}, placeholder, ...props }: any) => {
  const { theme } = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.card, borderColor: error ? 'red' : theme.colors.border, color: theme.colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.border}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...props}
          />
          {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: { height: 50, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, fontSize: 16 },
  errorText: { color: 'red', marginTop: 4, marginLeft: 4 },
});
export default ControlledInput;