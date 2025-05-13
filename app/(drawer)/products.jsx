import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, FlatList } from 'react-native';
import { retrieveBundles, patchBundle, storeBundles, destroybundle } from '../../API/bundle'
import { retrieveProducts , patchProducts , storeProducts, destroyProducts } from '../../API/product'
import { router } from 'expo-router'



function Products() {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([]);
  const [addons, setAddons ] = useState([]);
  const [bundle, setBundle ] = useState([]);
  const [size, setSizes] = useState([]);

 
 useEffect(() => {
    const fetchProducts = async () => {
      try{
        const data = await retrieveProducts();
        console.log("what is this:", data);
        setProducts(data);
      }catch(err){
        setError('Failed to load products');
      }finally{
        setLoading(false);
      }
    };
    
    fetchProducts();
  
}, []);


  const handleAddProduct = () => {
  
  };

  const handlePrice = () => {

  };

  const handleAddons = () => {

  };

  const handleBundle = () => {

  };

 

  return (
     <View style={styles.container}>
      <Pressable style={styles.item} onPress={() => router.push('../../pages/add_product')}>
        <View>
          <Text>Category</Text>
        </View>
      </Pressable>
      <View style={styles.item}>
        <Text>Bundles</Text>
      </View>
      <View style={styles.item}>
        <Text>Add-Ons</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Sizes</Text>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text> 
            <Text>{item.price}</Text> 
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection:'row',
    flexWrap:'wrap', 
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e11d48',
    padding: 5,
  },
  item: {
  height: '20%',
  width: '45%',
  margin: 5,
  alignItems: 'center',      
  justifyContent: 'center',   
  borderWidth: 1,
  backgroundColor: '#ffff',
  borderColor: '#ccc',
  },
  text:{
    fontSize:15,
  }
});

export default Products;
