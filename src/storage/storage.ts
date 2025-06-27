import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async save(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async load(key: string) {
    const v = await AsyncStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  },
  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
