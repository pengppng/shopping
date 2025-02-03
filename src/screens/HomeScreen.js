import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard from '../components/ItemCard';
import Summary from '../components/Summary';

const HomeScreen = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState([]);

  // โหลดข้อมูลจาก AsyncStorage เมื่อเปิดแอป
  useEffect(() => {
    loadItems();
  }, []);

  // บันทึกข้อมูลลง AsyncStorage เมื่อ items เปลี่ยนแปลง
  useEffect(() => {
    saveItems();
  }, [items]);

  // โหลดรายการสินค้า
  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('items');
      if (savedItems) setItems(JSON.parse(savedItems));
    } catch (error) {
      console.error('Failed to load items', error);
    }
  };

  // บันทึกรายการสินค้า
  const saveItems = async () => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save items', error);
    }
  };

  // เพิ่มสินค้า
  const addItem = () => {
    if (!itemName || !itemPrice || isNaN(itemPrice)) {
      alert('กรุณากรอกชื่อสินค้าและราคาให้ถูกต้อง');
      return;
    }
    const newItem = { id: Date.now().toString(), name: itemName, price: parseFloat(itemPrice), bought: false };
    setItems([...items, newItem]);
    setItemName('');
    setItemPrice('');
  };

  // ทำเครื่องหมายว่าซื้อแล้ว
  const toggleBought = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };

  // ลบสินค้า
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // ลบรายการทั้งหมด
  const clearAll = () => {
    setItems([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ชื่อสินค้า"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="ราคาสินค้า"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="เพิ่มสินค้า" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} toggleBought={toggleBought} deleteItem={deleteItem} />
        )}
      />

      <Summary items={items} />
      <Button title="ลบทั้งหมด" onPress={clearAll} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
});

export default HomeScreen;