import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Animated, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const animatedValue = useState(new Animated.Value(isDarkMode ? 1 : 0))[0];

  // โหลดข้อมูลจาก AsyncStorage
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('shoppingItems');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();
  }, []);

  // บันทึกข้อมูลลง AsyncStorage ทุกครั้งที่ items เปลี่ยน
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('shoppingItems', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving items:', error);
      }
    };
    saveItems();
  }, [items]);

  // เพิ่มสินค้าใหม่
  const addItem = () => {
    if (!itemName || isNaN(Number(itemPrice)) || Number(itemPrice) <= 0) return;
    setItems([...items, { id: Date.now().toString(), name: itemName, price: Number(itemPrice), purchased: false }]);
    setItemName('');
    setItemPrice('');
  };

  // เปลี่ยนสถานะสินค้าว่าซื้อแล้วหรือยัง
  const toggleItem = (id: string) => {
    setItems(items.map(item => (item.id === id ? { ...item, purchased: !item.purchased } : item)));
  };

  // ลบสินค้า
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // ลบสินค้าทั้งหมด
  const clearAll = () => {
    setItems([]);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    Animated.timing(animatedValue, {
      toValue: isDarkMode ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  const totalPrice = filteredItems.filter(item => !item.purchased).reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Toggle Switch */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
        <Animated.View
          style={[
            styles.toggleCircle,
            {
              transform: [{ translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 25] }) }],
            },
          ]}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.title, isDarkMode && styles.darkText]}>🛍️ Shopping List</Text>

      {/* Search Input */}
      <TextInput
        style={[styles.searchInput, isDarkMode && styles.darkInput]}
        placeholder="🔍 ค้นหาสินค้า..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
      />

      {/* Input Form */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="ชื่อสินค้า"
          value={itemName}
          onChangeText={setItemName}
          placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="ราคา"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="numeric"
          placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addText}>เพิ่ม</Text>
        </TouchableOpacity>
      </View>

      {/* Shopping List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} onToggle={toggleItem} onDelete={deleteItem} />}
      />

      {/* Total Summary */}
      <TotalSummary items={filteredItems} />



      {/* Clear All Button */}
      <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
        <Text style={styles.clearText}>clear all</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  darkText: {
    color: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  darkInput: {
    backgroundColor: '#333',
    color: 'white',
    borderColor: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addText: {
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearText: {
    color: 'white',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#555',
    justifyContent: 'center',
    padding: 5,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
