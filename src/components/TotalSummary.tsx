import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  total: number;
};

const TotalSummary: React.FC<Props> = ({ total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💰 ราคารวม: {total} บาท</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TotalSummary;
