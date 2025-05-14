import { storeAddons } from '@/API/addons';
import React from 'react'
import { View, Text, StyleSheet, TextInput} from 'react-native'

export default function add_bundles() {

  const handleaddAddons = async () => {
      if(!name || !price ) {
        Alert.alert('Validation Error', 'Please fill in all fields');
        return;
      }
      try{
        const result = await storeAddons({
          name: name,
          price: price
        });
        Alert.alert('Success', 'Addons saved succesfully');
        setName('');
        setPrice('');
        console.log("Saved size", result);
      }catch(error){
        console.error("API Error", error);
        Alert.alert('Error', 'Failed to save Addons');
      }finally{
        setLoading(false);
      }
  };
  return (
       <View style={styles.container}>
             <Text style={styles.title}>Add Bundle</Text>
       
             <View style={styles.inputGroup}>
               <Text style={styles.label}>Name</Text>
               <TextInput
                 placeholder="Enter bundle name"
                 style={styles.input}
               />
             </View>
       
             <View style={styles.inputGroup}>
               <Text style={styles.label}>Price</Text>
               <TextInput
                 placeholder="Enter price"
                 keyboardType="numeric"
                 style={styles.input}
               />
             </View>
    
    </View>
    
  )
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
});

