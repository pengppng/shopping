import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ItemCard = ({ item, onToggle, onDelete }) => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={[styles.card, item.purchased && styles.purchased]}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} ฿</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>📷 เพิ่มรูป</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text style={styles.button}>{item.purchased ? '✅' : '🛒'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.button}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', marginVertical: 5, borderRadius: 5 },
  purchased: { backgroundColor: '#d3d3d3' },
  name: { fontSize: 16, flex: 1 },
  price: { fontSize: 16, color: 'green' },
  button: { fontSize: 18, marginLeft: 10 },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 }
});

export default ItemCard;
