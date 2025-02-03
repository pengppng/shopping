import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ItemCard = ({ item, toggleBought, deleteItem }) => {
  return (
    <View style={[styles.card, item.bought && styles.bought]}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toFixed(2)} บาท</Text>
      <TouchableOpacity onPress={() => toggleBought(item.id)}>
        <Text style={styles.status}>{item.bought ? 'ซื้อแล้ว' : 'ยังไม่ได้ซื้อ'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Text style={styles.delete}>ลบ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderColor: '#ccc', marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
  bought: { opacity: 0.5, textDecorationLine: 'line-through' },
  name: { fontSize: 16 },
  price: { fontSize: 14, color: 'green' },
  status: { fontSize: 14, color: 'blue' },
  delete: { fontSize: 14, color: 'red' },
});

export default ItemCard;