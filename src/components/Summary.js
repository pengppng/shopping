import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ items }) => {
  const total = items
    .filter(item => !item.bought)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>รวมราคาสินค้าที่ยังไม่ได้ซื้อ: {total.toFixed(2)} บาท</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, borderTopWidth: 1, borderColor: '#ccc' },
  text: { fontSize: 16, fontWeight: 'bold' },
});

export default Summary;