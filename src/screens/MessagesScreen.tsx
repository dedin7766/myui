// src/screens/MessagesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import SinglePageHeader from '../components/molecules/SinglePageHeader';

// Data percakapan dummy
const dummyConversations = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Oke, sampai jumpa besok!', time: '10:45', unread: 2 },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Terima kasih banyak atas bantuannya!', time: '09:30', unread: 0 },
  { id: '3', name: 'Customer Service', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Ada yang bisa kami bantu lagi?', time: 'Kemarin', unread: 125 },
  { id: '4', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=4', lastMessage: 'Gambarnya sudah saya kirim ya.', time: '2 hari lalu', unread: 0 },
  { id: '5', name: 'Emily White', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Jangan lupa meeting jam 2 siang.', time: '2 hari lalu', unread: 1 },
];

const MessagesScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: typeof dummyConversations[0] }) => (
        <TouchableOpacity 
      style={[styles.itemContainer, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('ChatDetailScreen', {
        userId: item.id,
        userName: item.name,
        userAvatar: item.avatar,
      })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.lastMessage, { color: theme.colors.border }]} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <View style={styles.metaContainer}>
        <Text style={[styles.time, { color: theme.colors.border }]}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.unreadText}>{item.unread > 99 ? '99+' : item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SinglePageHeader
        title="Pesan"
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        data={dummyConversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.background }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    marginTop: 2,
  },
  metaContainer: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 4,
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MessagesScreen;