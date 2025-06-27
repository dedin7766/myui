// src/components/molecules/ChatHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../hooks/useTheme';

interface ChatHeaderProps {
  onBackPress: () => void;
  userName: string;
  userAvatarUri: string;
}

const ChatHeader = ({ onBackPress, userName, userAvatarUri }: ChatHeaderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[ styles.container, { paddingTop: insets.top, backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      <Image source={{ uri: userAvatarUri }} style={styles.avatar} />
      <Text style={[styles.title, { color: theme.colors.text }]}>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatHeader;