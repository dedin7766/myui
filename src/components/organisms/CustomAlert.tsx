// src/components/organisms/CustomAlert.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Gap from '../atoms/Gap';

const CustomAlert = ({ config, onHide }: any) => {
  const { theme } = useTheme();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true} // Visibilitas dikontrol oleh keberadaan komponen ini di AlertProvider
      onRequestClose={onHide}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.alertBox, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{config.title}</Text>
          {config.message && (
            <Text style={[styles.message, { color: theme.colors.text }]}>{config.message}</Text>
          )}
          <Gap height={24} />
          <View style={styles.buttonContainer}>
            {config.buttons.map((button: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, { borderTopColor: theme.colors.border }]}
                onPress={() => {
                  button.onPress();
                  onHide();
                }}
              >
                <Text style={[styles.buttonText, {
                  color: button.style === 'destructive' ? 'red' : theme.colors.primary,
                  fontWeight: button.style === 'cancel' ? 'normal' : 'bold'
                }]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  alertBox: {
    width: '80%',
    maxWidth: 300,
    borderRadius: 14,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    padding: 14,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default CustomAlert;