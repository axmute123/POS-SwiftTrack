import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const EMPLOYEES = [
  { id: '1', name: 'Alice Johnson', role: 'Cashier', status: 'On Shift' },
  { id: '2', name: 'Bob Smith', role: 'Manager', status: 'Off Shift' },
  { id: '3', name: 'Carla Gomez', role: 'Barista', status: 'On Shift' },
];

function Employee() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Role: {item.role}</Text>
      <Text style={[styles.status, item.status === 'On Shift' ? styles.on : styles.off]}>
        {item.status}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employees</Text>
      <FlatList
        data={EMPLOYEES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  status: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  on: {
    color: 'green',
  },
  off: {
    color: 'red',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Employee;
