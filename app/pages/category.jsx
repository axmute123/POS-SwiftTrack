import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native';
import { storeCategory } from '@/API/category';
import { router } from 'expo-router';

export default function Category() {
  
  const [category, setCategory] = useState('');

  const handleAddCategory = async () => {
    if (!category.trim()) {
      Alert.alert('Validation Error', 'Please enter a category name');
      return;
    }
    try{
      const response = await storeCategory({name:category});
      Alert.alert('Success', `Category ${category}" added Successfully!`);
      setCategory('');
      console.log('Stored category', response);
    }catch(error){
      console.error('Error storing category', error);
      Alert.alert('Error', 'Failed to store category')
    }finally{
      router.replace('/(drawer)/products');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>

      <TextInput
        placeholder="Enter Category Name"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>Add Category</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#e11d48',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
