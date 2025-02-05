import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id: '1', name: 'Anotomy Rabbit', price: 100 },
  { id: '2', name: 'Blood', price: 200 },
  { id: '3', name: 'Cat', price: 300 },
  { id: '4', name: 'Dogbrowwww', price: 400 },
  { id: '5', name: 'Elephant', price: 500 },
];

const Item = ({ name, price }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.price}>{price} บาท</Text>
  </View>
);

const ExampleFlatList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item name={item.name} price={item.price} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green' },
});

export default ExampleFlatList;