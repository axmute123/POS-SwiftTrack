import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, ActivityIndicator } from 'react-native';
import { storeSizes } from '../../API/size';
import { router } from 'expo-router';

export default function Sizes() {
  const [name, setName ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ loading , setLoading ] = useState(false);

  const handleaddSizes = async () => {
    if(!name || !price ) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    try{
      const result = await storeSizes({
        name: name,
        price: price
      });
      Alert.alert('Success', 'Size saved succesfully');
      setName('');
      setPrice('');
      console.log("Saved size", result);
    }catch(error){
      console.error("API Error", error);
      Alert.alert('Error', 'Failed to save size');
    }finally{
      setLoading(false);
      router.push('/(drawer)/other');
    }
};
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          placeholder="Price"
          keyboardType="numeric"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
        />
      </View>
        <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.8 },
              loading && { backgroundColor: '#a0c4ff' } 
            ]}
            onPress={handleaddSizes}
            disabled={loading} 
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add Size</Text>
            )}
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e11d48', 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
