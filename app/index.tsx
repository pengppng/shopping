import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import ItemCard from '../src/components/ItemCard';
import TotalSummary from '../src/components/Summary';

const HomeScreen = () => {
  type ItemType = {
    id: string;
    name: string;
    price: number;
    purchased: boolean;
  };

  const [items, setItems] = useState<ItemType[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme(); // ตรวจสอบโหมดปัจจุบัน

  // ฟังก์ชันโหลดข้อมูลจาก AsyncStorage
  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('shoppingItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error loading items:', error);
      return [];
    }
  };

  // ฟังก์ชันบันทึกข้อมูลลง AsyncStorage
  const saveItems = async (newItems: ItemType[]) => {
    try {
      await AsyncStorage.setItem('shoppingItems', JSON.stringify(newItems));
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  useEffect(() => {
    loadItems().then(setItems);
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = () => {
    if (!itemName || isNaN(Number(itemPrice)) || Number(itemPrice) <= 0) return;

    setItems([...items, { id: Date.now().toString(), name: itemName, price: Number(itemPrice), purchased: false }]);
    setItemName('');
    setItemPrice('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => (item.id === id ? { ...item, purchased: !item.purchased } : item)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  const totalPrice = filteredItems.filter(item => !item.purchased).reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.title, colorScheme === 'dark' && styles.darkText]}>🛍️ เพื่อนรักนักช้อป</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 ค้นหาสินค้า..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="ชื่อสินค้า" value={itemName} onChangeText={setItemName} />
        <TextInput style={styles.input} placeholder="ราคา" value={itemPrice} onChangeText={setItemPrice} keyboardType="numeric" />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} onToggle={toggleItem} onDelete={deleteItem} />}
      />
      <TotalSummary items={filteredItems} />
      <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
        <Text style={styles.clearText}>ลบทั้งหมด</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
