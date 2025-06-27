// src/screens/ChatDetailScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatHeader from '../components/molecules/ChatHeader';

const ChatDetailScreen = ({ route, navigation }: any) => {
  const { userName, userAvatar } = route.params;
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const initialMessages = [
    { id: '3', text: 'Tentu, ada yang bisa saya bantu?', sender: 'them', time: '10:44' },
    { id: '2', text: 'Halo!', sender: 'them', time: '10:43' },
    { id: '1', text: 'Permisi', sender: 'me', time: '10:42' },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Math.random().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);
    setInputText('');

    setTimeout(() => {
      const replyMessage = {
        id: Math.random().toString(),
        text: `Ini adalah balasan otomatis untuk pesan: "${newMessage.text}"`,
        sender: 'them',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [replyMessage, ...prevMessages]);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: typeof messages[0] }) => {
    const isMyMessage = item.sender === 'me';
    return (
      // View ini sekarang akan mendorong bubble ke kanan atau kiri
      <View style={[styles.messageRow, { justifyContent: isMyMessage ? 'flex-end' : 'flex-start' }]}>
        <View style={[
          styles.messageBubble,
          isMyMessage 
            // Bubble saya: menempel di kanan, "ekor" di kanan bawah
            ? { backgroundColor: theme.colors.primary, borderBottomRightRadius: 4 } 
            // Bubble lawan bicara: menempel di kiri, "ekor" di kiri bawah
            : { backgroundColor: theme.colors.card, borderBottomLeftRadius: 4 }
        ]}>
          <Text style={[styles.messageText, { color: isMyMessage ? 'white' : theme.colors.text }]}>{item.text}</Text>
          <Text style={[styles.timeText, { color: isMyMessage ? '#FFFFFF99' : theme.colors.border, alignSelf: 'flex-end' }]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ChatHeader
        userName={userName}
        userAvatarUri={userAvatar}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.chatArea}
          inverted
        />
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
          <TextInput
            style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.background }]}
            placeholder="Ketik pesan..."
            placeholderTextColor={theme.colors.border}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}>
            <Icon name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// --- SATU-SATUNYA PERUBAHAN ADA DI SINI ---
const styles = StyleSheet.create({
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageRow: {
    marginVertical: 4,
    // BARIS INI YANG MEMPERBAIKI MASALAH
    flexDirection: 'row', 
  },
  // --- SELESAI ---
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageText: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatDetailScreen;