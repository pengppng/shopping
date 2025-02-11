import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItems = async (items) => {
  try {
    await AsyncStorage.setItem('items', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save items', error);
  }
};

// export const loadItems = async () => {
//   try {
//     const savedItems = await AsyncStorage.getItem('items');
//     return savedItems ? JSON.parse(savedItems) : [];
//   } catch (error) {
//     console.error('Failed to load items', error);
//     return [];
//   }
// };

const loadItems = async () => {
  const storedItems = await AsyncStorage.getItem('items');
  return storedItems ? JSON.parse(storedItems) : [];
};

// const saveItems = async (items: Item[]) => {
//   await AsyncStorage.setItem('items', JSON.stringify(items));
// };
